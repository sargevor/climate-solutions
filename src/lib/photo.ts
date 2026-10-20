import { PHOTOS, type PhotoKey, type Photo } from '../content/photos';

const WIDTHS = [640, 960, 1280, 1920];
/** When true, photos are served from public/photos/ (run `npm run photos` first). */
const SELF_HOST = import.meta.env.VITE_SELF_HOST_PHOTOS === 'true';

function url(key: PhotoKey, p: Photo, w: number) {
  if (SELF_HOST) return `/photos/${key}-${w}.webp`;
  const h = Math.round(w / p.ratio);
  return `https://images.unsplash.com/${p.unsplashId}?auto=format&fit=crop&w=${w}&h=${h}&q=72`;
}

/**
 * Responsive <img> for a photo from content/photos.ts.
 * `sizes` describes the rendered width; `eager` for above-the-fold images (the hero).
 */
export function photo(key: PhotoKey, opts: { sizes: string; eager?: boolean; cls?: string }) {
  const p: Photo = PHOTOS[key];
  const w = 1280;
  const h = Math.round(w / p.ratio);
  const style = p.focus ? ` style="object-position:${p.focus}"` : '';
  const loading = opts.eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
  if (p.src) {
    return `<img class="${opts.cls ?? 'photo'}" src="${p.src}" alt="${p.alt}" width="${w}" height="${h}" ${loading} decoding="async"${style}>`;
  }
  const srcset = WIDTHS.map((x) => `${url(key, p, x)} ${x}w`).join(', ');
  return `<img class="${opts.cls ?? 'photo'}" src="${url(key, p, 1280)}" srcset="${srcset}" sizes="${opts.sizes}" alt="${p.alt}" width="${w}" height="${h}" ${loading} decoding="async"${style}>`;
}
