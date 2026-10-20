import { tx } from '../i18n';
import type { Page } from '../lib/router';
import { html, $, $$ } from '../lib/dom';
import { CATEGORIES, PROJECTS } from '../content/projects';
import { ctaBand, pageHead, projectCard } from '../components/blocks';

/** Registered only when PROJECTS contains real projects (see main.ts). */
export const projectsPage = (): Page => {
  let filter = 'all';
  const used = CATEGORIES.filter((c) => PROJECTS.some((p) => p.category === c.id));

  const grid = () => {
    const visible = PROJECTS.filter((p) => filter === 'all' || p.category === filter);
    return html`<p class="vh" role="status">${visible.length}${tx(' նախագիծ', ' projects')}</p>
      <div class="pgrid">${visible.map(projectCard)}</div>`;
  };

  return {
    seoPath: '/projects',
    navPath: '/projects',
    render: () => html`
      ${pageHead({
        crumbs: [{ href: '/', label: tx('Գլխավոր', 'Home') }, { label: tx('Նախագծեր', 'Projects') }],
        title: tx('Նախագծեր', 'Projects'),
        fx: 'blueprint',
        lead: tx('Մեր իրականացրած աշխատանքները՝ կիրառված լուծումներով և տեխնիկական մանրամասներով։', 'Our completed work, with the solutions used and technical details.'),
      })}
      <section class="sec" aria-label="${tx('Նախագծերի ցանկ', 'List of projects')}">
        <div class="wrap">
          ${used.length > 1 && html`<div class="filters" role="group" aria-label="${tx('Զտել ըստ օբյեկտի տեսակի', 'Filter by building type')}">
            ${[{ id: 'all', label: tx('Բոլորը', 'All') }, ...used].map(
              (c) => html`<button class="chip" type="button" data-filter="${c.id}" aria-pressed="${c.id === filter}">${c.label}</button>`,
            )}
          </div>`}
          <div id="projBody">${grid()}</div>
        </div>
      </section>
      ${ctaBand()}`,
    mount(root) {
      const onClick = (e: Event) => {
        const f = (e.target as Element).closest<HTMLButtonElement>('[data-filter]');
        if (!f) return;
        filter = f.dataset.filter!;
        $$<HTMLButtonElement>('[data-filter]', root).forEach((b) => b.setAttribute('aria-pressed', String(b === f)));
        $('#projBody', root)!.innerHTML = grid();
      };
      root.addEventListener('click', onClick);
      return () => root.removeEventListener('click', onClick);
    },
  };
};
