/**
 * Languages: Armenian (default, at /...) and English (at /en/...).
 *
 * The language is read once from the address when the page loads. Switching language is a
 * normal link to the same page in the other language, so every page has its own address
 * that search engines can index.
 *
 * In templates:  tx('Հայերեն տեքստ', 'English text')
 */
export type Lang = 'hy' | 'en';

export const lang: Lang =
  typeof location !== 'undefined' && /^\/en(\/|$)/.test(location.pathname) ? 'en' : 'hy';

/** Pick the text for the current language. Works for strings, arrays and objects alike. */
export const tx = <T>(hy: T, en: T): T => (lang === 'en' ? en : hy);

/** '/en/about' -> '/about' */
export const stripLang = (path: string) => path.replace(/^\/en(?=\/|$)/, '') || '/';

/** '/about' -> '/en/about' when the target language is English */
export const withLang = (path: string, l: Lang = lang) => {
  const p = stripLang(path);
  if (l === 'hy') return p;
  return p === '/' ? '/en' : '/en' + p;
};

/** Internal links that point to files (not pages) keep their address. */
const isFileOrApi = (href: string) => /^\/(api|assets)\//.test(href) || /\.[a-z0-9]{2,5}$/i.test(href.split(/[?#]/)[0]);

/**
 * Rewrites internal page links ('/about', '/contact?x') to the current language.
 * Called after each render so templates can always write plain paths.
 */
export function localizeLinks(root: ParentNode) {
  if (lang === 'hy') return;
  root.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((a) => {
    const href = a.getAttribute('href')!;
    if (href.startsWith('//') || /^\/en(\/|$|\?|#)/.test(href) || isFileOrApi(href) || a.hasAttribute('data-lang-switch')) return;
    const [, path, rest = ''] = href.match(/^([^?#]*)(.*)$/)!;
    a.setAttribute('href', withLang(path) + rest);
  });
}

export const LANG_LABEL: Record<Lang, { short: string; name: string; locale: string }> = {
  hy: { short: 'ՀԱՅ', name: 'Հայերեն', locale: 'hy_AM' },
  en: { short: 'EN', name: 'English', locale: 'en_US' },
};
