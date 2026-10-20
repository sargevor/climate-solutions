/**
 * Post-build step: writes one HTML file per page and language with the right <html lang>,
 * <title>, description, canonical, hreflang alternates and Open Graph tags, so search
 * engines and link previews see correct metadata before JavaScript runs.
 * Armenian pages live at /..., English pages at /en/....
 * Also writes 404.html and sitemap.xml (with language alternates).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const seo = JSON.parse(readFileSync(join(root, 'src/config/seo.json'), 'utf8'));
const siteUrl = (process.env.SITE_URL || seo.siteUrl).replace(/\/$/, '');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const LANGS = {
  hy: { routes: seo.routes, locale: 'hy_AM', prefix: '' },
  en: { routes: seo.routesEn, locale: 'en_US', prefix: '/en' },
};
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const localPath = (path, lang) => (lang === 'hy' ? path : path === '/' ? '/en' : '/en' + path);
const abs = (path, lang) => {
  const p = localPath(path, lang);
  return siteUrl + (p === '/' ? '/' : p);
};

function page(path, lang, { title, description }) {
  const url = abs(path, lang);
  const alternates = [
    `<link rel="alternate" hreflang="hy" href="${abs(path, 'hy')}" />`,
    `<link rel="alternate" hreflang="en" href="${abs(path, 'en')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${abs(path, 'hy')}" />`,
  ].join('\n    ');
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>.*?<\/title>/s, `<title>${attr(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${attr(description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${attr(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${attr(description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:locale" content=")[^"]*/, `$1${LANGS[lang].locale}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${siteUrl}${seo.ogImage}`)
    .replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${url}$2\n    ${alternates}`);
}

const hidden = new Set(seo.hiddenRoutes || []);
const sitemap = [];
let count = 0;

for (const lang of Object.keys(LANGS)) {
  for (const [path, data] of Object.entries(LANGS[lang].routes)) {
    if (hidden.has(path)) continue;
    if (path === '/404') {
      // One 404 file serves both languages; the app picks the language from the address.
      if (lang === 'hy') {
        writeFileSync(join(dist, '404.html'), page(path, lang, data).replace('<head>', '<head>\n    <meta name="robots" content="noindex" />'));
      }
      continue;
    }
    const p = localPath(path, lang);
    const out = p === '/' ? join(dist, 'index.html') : join(dist, p.slice(1), 'index.html');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, page(path, lang, data));
    count++;
    if (lang === 'hy') sitemap.push(path);
  }
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap
  .flatMap((path) =>
    ['hy', 'en'].map(
      (lang) => `  <url>
    <loc>${abs(path, lang)}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="hy" href="${abs(path, 'hy')}" />
    <xhtml:link rel="alternate" hreflang="en" href="${abs(path, 'en')}" />
  </url>`,
    ),
  )
  .join('\n')}
</urlset>
`,
);
console.log(`prerender: ${count} pages (hy + en) + 404.html + sitemap.xml`);
