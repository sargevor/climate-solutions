const ICONS = {
  design: '<path d="M8 40V8l32 32z"/><path d="M15 33V25l8 8z"/><path class="ico-ruler" d="M30 6l12 12M33 9l-3 3M37 13l-3 3"/>',
  heating: '<rect x="7" y="16" width="34" height="24" rx="1"/><path d="M14 16v24M21 16v24M28 16v24M35 16v24"/><g class="ico-waves"><path class="ico-heat" d="M16 10c2-2 0-4 2-6"/><path class="ico-heat" d="M24 10c2-2 0-4 2-6"/><path class="ico-heat" d="M32 10c2-2 0-4 2-6"/></g>',
  ventilation: '<circle cx="24" cy="24" r="18"/><g class="ico-fan"><path d="M24 24c-2-6 0-12 6-12 0 6-3 10-6 12zM24 24c6-1 11 3 9 9-5-2-8-6-9-9zM24 24c-3 5-9 7-13 2 4-4 9-4 13-2z"/></g><circle cx="24" cy="24" r="2"/>',
  ac: '<g class="ico-flake ico-air"><path d="M24 6v36M8.4 15l31.2 18M8.4 33l31.2-18"/><path d="M19 9l5 4 5-4M19 39l5-4 5 4M9 21l6-1-2-6M39 27l-6 1 2 6M9 27l6 1-2 6M39 21l-6-1 2-6"/></g>',
  efficiency: '<path d="M7 34a17 17 0 1 1 34 0"/><path d="M12 34h-3M39 34h-3M24 17v3M14 22l2 2M34 22l-2 2"/><g class="ico-needle"><path class="ico-leaf" d="M24 34l8-10"/></g><circle cx="24" cy="34" r="2.5"/>',
  // Wrench: based on the Lucide "wrench" icon (ISC licence), scaled to the 48×48 grid.
  maintenance: '<path class="ico-wrench" d="M29.4 12.6a2 2 0 0 0 0 2.8l3.2 3.2a2 2 0 0 0 2.8 0l7.54-7.54a12 12 0 0 1-15.88 15.88l-13.82 13.82a4.24 4.24 0 0 1-6-6l13.82-13.82a12 12 0 0 1 15.88-15.88l-7.52 7.52z"/>',
  phone: '<path d="M14 6h7l3 9-5 3a24 24 0 0 0 11 11l3-5 9 3v7a4 4 0 0 1-4 4A34 34 0 0 1 10 10a4 4 0 0 1 4-4z"/>',
  mail: '<rect x="6" y="11" width="36" height="26" rx="2"/><path d="M6 13l18 13 18-13"/>',
  pin: '<path d="M24 43s14-13 14-24a14 14 0 0 0-28 0c0 11 14 24 14 24z"/><circle cx="24" cy="19" r="5"/>',
  clock: '<circle cx="24" cy="24" r="18"/><path d="M24 13v11l7 5"/>',
} as const;

export type IconName = keyof typeof ICONS;

export const icon = (name: IconName, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
