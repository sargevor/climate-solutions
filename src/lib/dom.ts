/** Template helper: joins arrays, skips null/false/undefined. Content is trusted (from our own content files). */
export function html(strings: TemplateStringsArray, ...values: unknown[]): string {
  let out = '';
  strings.forEach((s, i) => {
    out += s;
    if (i < values.length) out += toStr(values[i]);
  });
  return out;
}
const toStr = (v: unknown): string =>
  v === null || v === undefined || v === false ? '' : Array.isArray(v) ? v.map(toStr).join('') : String(v);

/** Escape user-provided text before inserting it into markup. */
export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export const arrow = '<span class="arr" aria-hidden="true">→</span>';
