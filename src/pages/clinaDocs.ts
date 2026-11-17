import { lang, tx } from '../i18n';
import type { Page } from '../lib/router';
import { html, arrow } from '../lib/dom';
import { CLINA_DOCS, type ClinaDoc } from '../content/clinaDocs';
import { ctaBand, pageHead } from '../components/blocks';

const TOTAL = CLINA_DOCS.reduce((n, g) => n + g.docs.length, 0);

const fileIcon = `<svg class="doc__ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 2.5h8l4.5 4.5v14.5H6z"/><path d="M14 2.5V7h4.5"/><text x="12.2" y="17.6" text-anchor="middle">PDF</text></svg>`;

const size = (kb: number) =>
  kb >= 1024 ? `${(kb / 1024).toFixed(1)} ${tx('ՄԲ', 'MB')}` : `${kb} ${tx('ԿԲ', 'KB')}`;

const pages = (n: number) => (lang === 'hy' ? `${n} էջ` : `${n} ${n === 1 ? 'page' : 'pages'}`);

const docRow = (d: ClinaDoc) => html`
  <li class="doc" data-q="${(d.title + ' ' + (d.meaning ?? '')).toLowerCase()}">
    ${fileIcon}
    <div class="doc__main">
      <p class="doc__title" ${d.lang === 'de' ? 'lang="de"' : 'lang="en"'}>${d.title}</p>
      ${d.meaning && html`<p class="doc__meaning" lang="en">${d.meaning}</p>`}
      <p class="doc__meta">
        <span class="doc__lang doc__lang--${d.lang}" title="${d.lang === 'de' ? tx('Գերմաներեն', 'German') : tx('Անգլերեն', 'English')}">${d.lang.toUpperCase()}</span>
        <span>${pages(d.pages)}</span><span>${size(d.kb)}</span>
      </p>
    </div>
    <a class="btn btn--ghost doc__open" href="${d.url}" target="_blank" rel="noopener" data-external>
      ${tx('Բացել', 'Open')}<span class="vh">: ${d.title} (PDF, ${size(d.kb)})</span>
    </a>
  </li>`;

export const clinaDocsPage = (): Page => ({
  seoPath: '/clina-documents',
  navPath: '/partners',
  render: () => html`
  ${pageHead({
    crumbs: [
      { href: '/', label: tx('Գլխավոր', 'Home') },
      { href: '/partners', label: tx('Գործընկերներ', 'Partners') },
      { label: tx('CLINA փաստաթղթեր', 'CLINA documents') },
    ],
    title: tx('CLINA տեխնիկական փաստաթղթեր', 'CLINA technical documents'),
    fx: 'blueprint',
    lead: tx(
      'Մեր գործընկեր CLINA-ի մոնտաժի ուղեցույցները, կատալոգները, տեխնիկական թերթերը և համակարգերի նկարագրությունները՝ մեկ տեղում։ Փաստաթղթերն անգլերեն են, իսկ մի քանի մոնտաժի ուղեցույց՝ միայն գերմաներեն։',
      'Installation guidelines, catalogues, data sheets and system descriptions from our partner CLINA, all in one place. The documents are in English; a few installation guidelines are available in German only.',
    ),
    extra: html`<ul class="docstats">
      <li><strong>${TOTAL}</strong> ${tx('փաստաթուղթ', 'documents')}</li>
      <li><strong>${CLINA_DOCS.length}</strong> ${tx('բաժին', 'sections')}</li>
      <li><strong>PDF</strong> ${tx('ձևաչափ', 'format')}</li>
    </ul>`,
  })}

  <section class="sec" aria-labelledby="docs-h">
    <div class="wrap docs">
      <h2 class="vh" id="docs-h">${tx('Փաստաթղթեր', 'Documents')}</h2>
      <div class="docs__bar">
        <label class="docs__search">
          <span class="vh">${tx('Որոնել փաստաթուղթ', 'Search documents')}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>
          <input type="search" class="docs__input" placeholder="${tx('Որոնել, օրինակ՝ OPTIPANEL, floor heating…', 'Search, e.g. OPTIPANEL, floor heating…')}" autocomplete="off">
        </label>
        <p class="docs__count" aria-live="polite"></p>
      </div>
      <div class="docs__groups">
        ${CLINA_DOCS.map((g, i) => html`
        <details class="docg" id="${g.id}"${i === 0 ? ' open' : ''}>
          <summary class="docg__head">
            <span class="docg__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="docg__title">${tx(g.hy, g.en)}</h3>
            <span class="docg__count">${g.docs.length}</span>
            <span class="docg__chev" aria-hidden="true"></span>
          </summary>
          <ul class="docg__list">${g.docs.map(docRow)}</ul>
        </details>`)}
      </div>
      <p class="docs__empty" hidden>${tx('Ոչինչ չի գտնվել։ Փորձեք այլ բառ կամ', 'Nothing found. Try another word or')} <a class="link" href="/contact">${tx('գրեք մեզ', 'write to us')}</a>.</p>
      <p class="docs__note">${tx(
        'Փաստաթղթերը պատրաստել է CLINA Heiz- und Kühlelemente GmbH-ը (Գերմանիա)։ Ձեր նախագծի համար ճիշտ լուծումն ընտրելու հարցում կօգնենք մենք։',
        'The documents are published by CLINA Heiz- und Kühlelemente GmbH (Germany). We will help you choose the right solution for your project.',
      )}</p>
    </div>
  </section>

  ${ctaBand()}`,
  mount(root) {
    const input = root.querySelector<HTMLInputElement>('.docs__input');
    const count = root.querySelector<HTMLElement>('.docs__count');
    const empty = root.querySelector<HTMLElement>('.docs__empty');
    const groups = [...root.querySelectorAll<HTMLDetailsElement>('.docg')];
    if (!input || !count || !empty) return;
    const initialOpen = groups.map((g) => g.open);
    const say = (n: number, q: string) => {
      count.textContent = q
        ? tx(`Գտնվեց՝ ${n}`, `${n} found`)
        : tx(`Ընդամենը՝ ${TOTAL} փաստաթուղթ`, `${TOTAL} documents in total`);
    };
    const filter = () => {
      const q = input.value.trim().toLowerCase();
      let total = 0;
      groups.forEach((g, i) => {
        let n = 0;
        g.querySelectorAll<HTMLElement>('.doc').forEach((li) => {
          const hit = !q || (li.dataset.q ?? '').includes(q);
          li.hidden = !hit;
          if (hit) n++;
        });
        g.hidden = n === 0;
        g.open = q ? n > 0 : initialOpen[i];
        const badge = g.querySelector<HTMLElement>('.docg__count');
        if (badge) badge.textContent = String(n);
        total += n;
      });
      empty.hidden = total > 0;
      say(total, q);
    };
    input.addEventListener('input', filter);
    say(TOTAL, '');
    // Opening a section from a link such as /clina-documents#catalogue
    const target = location.hash && groups.find((g) => '#' + g.id === location.hash);
    if (target) { target.open = true; initialOpen[groups.indexOf(target)] = true; }
  },
});

/** Link to the documents page, used on the Partners and capillary pages. */
export const clinaDocsLink = (cls = 'btn btn--ghost') =>
  html`<a class="${cls}" href="/clina-documents">${tx('CLINA տեխնիկական փաստաթղթեր', 'CLINA technical documents')} (${TOTAL}) ${arrow}</a>`;
