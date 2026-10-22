/**
 * Animated logo mark for the home page hero.
 *
 * The mark is split into the logo's own layers (public/brand/*.webp, cut from the
 * original logo artwork) and assembled in one SVG:
 *   - the gear spins and slows down until the whole sequence is finished;
 *   - the heat arcs and the two wind lines are drawn in one after another, like threads
 *     (each layer is revealed by a mask whose stroke follows the line);
 *   - the leaf grows from the bottom of its stem.
 *
 * Coordinates are those of the original artwork (1106 × 1058), shifted by OFFSET so the
 * gear sits in the middle of a 1120 × 1120 view box.
 */
import { html } from '../lib/dom';

const OFFSET = [34, 29] as const;
const SIZE = 1120;

/** [x, y, width, height] of every layer in artwork coordinates. */
const LAYERS = {
  // The gear box is a square centred on the gear's axis, so it can spin about its own centre.
  gear: [-8, -3, 1068, 1068],
  // Leaf and its outline share one box, so they grow from the same point.
  halo: [446, 136, 660, 924],
  leaf: [446, 136, 660, 924],
  // Full outline as in the logo (wider gaps by the stem); appears once the leaf is grown.
  haloFix: [444, 134, 662, 924],
  arcTop: [238, 230, 474, 248],
  windTop: [230, 380, 334, 160],
  windBot: [234, 560, 286, 138],
  arcBot: [250, 626, 262, 204],
} as const;

type Thread = 'arcTop' | 'windTop' | 'windBot' | 'arcBot';

/** Path each thread is drawn along, and the width of the drawing stroke. */
const THREADS: Record<Thread, { d: string; w: number }> = {
  arcTop: { d: 'M276.9 487A251.5 251.5 0 0 1 694.3 335.1', w: 90 },
  windTop: {
    d: 'M200 519L485 518L504 515L518 508L531 493L536 480L538 466L535 436L528 423L516 411L501 405L487 402L468 404L449 413L439 423L432 435L429 446L428 462L428 492',
    w: 54,
  },
  windBot: {
    d: 'M205 582L443 581L456 584L472 587L477 590L490 604L495 625L494 639L488 657L477 667L456 674L436 672L426 667L414 655L408 640L408 602',
    w: 54,
  },
  arcBot: { d: 'M283.2 610.1A257 257 0 0 0 520 791.8', w: 90 },
};

const ORDER: Thread[] = ['arcTop', 'windTop', 'windBot', 'arcBot'];

const img = (name: keyof typeof LAYERS, extra = '') => {
  const [x, y, w, h] = LAYERS[name];
  return `<image href="/brand/${name}.webp" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="none"${extra}/>`;
};

export const BRAND_LAYER_URLS = (Object.keys(LAYERS) as (keyof typeof LAYERS)[]).map((n) => `/brand/${n}.webp`);

export function brandMark(): string {
  return html`
  <div class="bm" aria-hidden="true">
    <svg class="bm__svg" viewBox="0 0 ${SIZE} ${SIZE}" focusable="false">
      <defs>
        <clipPath id="bm-disc"><circle cx="${560 - OFFSET[0]}" cy="${560 - OFFSET[1]}" r="545"/></clipPath>
        ${ORDER.map((t) => `<mask id="bm-m-${t}" maskUnits="userSpaceOnUse" x="-100" y="-100" width="1400" height="1400">
          <path class="bm__thread bm__thread--${t}" d="${THREADS[t].d}" pathLength="1" fill="none" stroke="#fff" stroke-width="${THREADS[t].w}" stroke-linejoin="round"/>
        </mask>`)}
      </defs>
      <g transform="translate(${OFFSET[0]} ${OFFSET[1]})">
        <g class="bm__gear">${img('gear')}</g>
        <g clip-path="url(#bm-disc)"><g class="bm__grow">${img('halo')}</g><g class="bm__fix">${img('haloFix')}</g></g>
        <g class="bm__grow">${img('leaf')}</g>
        ${ORDER.map((t) => img(t, ` mask="url(#bm-m-${t})"`))}
      </g>
    </svg>
  </div>`;
}

/**
 * Start the animation once every layer has loaded and the mark is on screen (on phones
 * the hero photo is below the fold), so the gear, threads and leaf play together and are
 * actually seen. Until then the mark is hidden; if loading stalls it simply plays anyway.
 */
export function mountBrandMark(root: ParentNode): void {
  const el = root.querySelector<HTMLElement>('.bm');
  if (!el) return;
  el.classList.add('is-wait');
  let loaded = false;
  let visible = !('IntersectionObserver' in window);
  let started = false;
  const tryStart = () => {
    if (started || !loaded || !visible) return;
    started = true;
    io?.disconnect();
    el.classList.remove('is-wait');
    // A frame later, so the browser starts all layers on the same tick.
    requestAnimationFrame(() => el.classList.add('is-play'));
  };
  const io = visible
    ? null
    : new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { visible = true; tryStart(); }
      }, { threshold: 0.5 });
  io?.observe(el);
  const loads = BRAND_LAYER_URLS.map(
    (src) =>
      new Promise<void>((resolve) => {
        const i = new Image();
        i.onload = i.onerror = () => resolve();
        i.src = src;
      }),
  );
  const ready = () => { loaded = true; tryStart(); };
  Promise.all(loads).then(ready);
  window.setTimeout(ready, 2500);
}
