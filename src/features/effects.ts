/**
 * Visual effects layer: air-flow background, scroll reveals, hero parallax, card tilt.
 * Everything is progressive enhancement: content is fully visible and usable without it,
 * and all motion is skipped when the visitor prefers reduced motion.
 */
import { $$ } from '../lib/dom';
import { mountBackground } from './backgrounds';

type Cleanup = () => void;

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ------------------------------------------------------------------ */
/* 2. Scroll reveal: sections slide/fade in; grid items are staggered. */
/* ------------------------------------------------------------------ */
const STAGGER = '.svc-grid > .svc, .proc > li, .focus > li, .legend > li, .tiles > li, .princ__list > li, .svc-index > li, .pgrid > *, .cinfo > li';

function reveals(root: HTMLElement): Cleanup {
  const items = $$<HTMLElement>('.rv', root);
  $$<HTMLElement>(STAGGER, root).forEach((el) => {
    const i = Array.prototype.indexOf.call(el.parentElement!.children, el);
    el.classList.add('rv-item');
    el.style.setProperty('--d', `${Math.min(i, 8) * 70}ms`);
  });
  const targets = [...items, ...$$<HTMLElement>('.rv-item', root)];
  // Anything already on screen is shown immediately (no flash on page load).
  const vh = window.innerHeight;
  targets.forEach((el) => {
    if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('is-in');
  });
  document.documentElement.classList.add('fx-reveal');
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  targets.filter((el) => !el.classList.contains('is-in')).forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/* ------------------------------------------------------------------ */
/* 3. Gentle parallax for hero / page-head photos (desktop only).      */
/* ------------------------------------------------------------------ */
function parallax(root: HTMLElement): Cleanup {
  const imgs = $$<HTMLElement>('.hero__frame .photo, .phead__photo .photo, .intro__photo .photo', root);
  if (!imgs.length || !matchMedia('(min-width: 960px)').matches) return () => {};
  let raf = 0;
  const update = () => {
    raf = 0;
    const vh = window.innerHeight;
    for (const img of imgs) {
      const r = img.parentElement!.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1 around viewport centre
      img.style.transform = `translate3d(0, ${(p * -28).toFixed(1)}px, 0) scale(1.08)`;
    }
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  imgs.forEach((i) => i.classList.add('fx-parallax'));
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}

/* ------------------------------------------------------------------ */
/* 4. Card spotlight (mouse/trackpad only): a soft light and a glowing */
/*    border edge follow the cursor. Cards stay flat and aligned.       */
/* ------------------------------------------------------------------ */
function spotlight(root: HTMLElement): Cleanup {
  const cards = $$<HTMLElement>('.svc, .tiles > li, .legend__item, .cta__contacts, .inline-cta', root);
  const offs: Cleanup[] = [];
  for (const card of cards) {
    card.classList.add('fx-card');
    const edge = document.createElement('span');
    edge.className = 'fx-edge';
    edge.setAttribute('aria-hidden', 'true');
    card.appendChild(edge);
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.setProperty('--mx', `${x.toFixed(0)}px`);
        card.style.setProperty('--my', `${y.toFixed(0)}px`);
      });
    };
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerenter', move);
    offs.push(() => {
      cancelAnimationFrame(raf);
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerenter', move);
      edge.remove();
    });
  }
  return () => offs.forEach((f) => f());
}

/* ------------------------------------------------------------------ */
/* Button pointer glow: the shine follows the cursor across the button */
/* ------------------------------------------------------------------ */
function buttonGlow(): Cleanup {
  const move = (e: PointerEvent) => {
    const b = (e.target as Element).closest<HTMLElement>('.btn');
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty('--bx', `${e.clientX - r.left}px`);
    b.style.setProperty('--by', `${e.clientY - r.top}px`);
  };
  document.addEventListener('pointermove', move, { passive: true });
  return () => document.removeEventListener('pointermove', move);
}

/* ------------------------------------------------------------------ */

let globalsDone = false;
const globalOffs: Cleanup[] = [];

/** Effects for the persistent shell (footer etc.). Called once. */
export function mountGlobalEffects() {
  if (globalsDone) return;
  globalsDone = true;
  if (reducedMotion()) return;
  if (finePointer()) globalOffs.push(buttonGlow());
}

/** Effects for the current page; returns a cleanup for the next navigation. */
export function mountPageEffects(root: HTMLElement): Cleanup {
  const hosts = $$<HTMLElement>('[data-fx]', root);
  // Reduced motion: no animation, but scenes that have a meaningful still frame are drawn once.
  if (reducedMotion()) {
    const offs = hosts.map((host) => mountBackground(host, true));
    return () => offs.forEach((f) => f());
  }
  const offs: Cleanup[] = [reveals(root)];
  hosts.forEach((host) => offs.push(mountBackground(host, false)));
  offs.push(parallax(root));
  if (finePointer()) offs.push(spotlight(root));
  return () => offs.forEach((f) => f());
}
