/**
 * Optional: download the Unsplash photos into public/photos/ so the site serves them
 * itself (no requests to images.unsplash.com). Then build with VITE_SELF_HOST_PHOTOS=true.
 *
 *   npm run photos
 *   VITE_SELF_HOST_PHOTOS=true npm run build
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'src/content/photos.ts'), 'utf8');
const entries = [...src.matchAll(/^\s{2}(\w+): \{\s*\n\s*unsplashId: '([^']+)'[\s\S]*?ratio: ([\d. /]+),/gm)];
const out = join(root, 'public/photos');
mkdirSync(out, { recursive: true });

for (const [, key, id, ratioExpr] of entries) {
  const ratio = Function(`return (${ratioExpr})`)();
  for (const w of [640, 960, 1280, 1920]) {
    const h = Math.round(w / ratio);
    const url = `https://images.unsplash.com/${id}?fm=webp&fit=crop&w=${w}&h=${h}&q=72`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${key} ${w}: HTTP ${res.status}`);
    writeFileSync(join(out, `${key}-${w}.webp`), Buffer.from(await res.arrayBuffer()));
  }
  console.log('✓', key);
}
