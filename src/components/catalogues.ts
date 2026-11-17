import { lang, tx } from '../i18n';
import { html, arrow } from '../lib/dom';
import { CLINA_DOCS, type ClinaDoc } from '../content/clinaDocs';

/**
 * Home page showcase of the CLINA product catalogue: the complete edition as a large card,
 * the chapter catalogues as covers. Every card opens the PDF in a new tab.
 */
const name = (d: ClinaDoc) => (lang === 'hy' && d.hy ? d.hy : d.title);

const mb = (kb: number) => `${(kb / 1024).toFixed(1)} ${tx('ՄԲ', 'MB')}`;

export function catalogueShowcase(): string {
  const group = CLINA_DOCS.find((g) => g.id === 'catalogue');
  if (!group) return '';
  const [full, ...parts] = group.docs;
  return html`
  <section class="sec cats" aria-labelledby="cats-h">
    <div class="wrap">
      <div class="cats__head rv">
        <div class="stack">
          <p class="kicker kicker--band">CLINA · ${tx('Գերմանիա', 'Germany')}</p>
          <h2 id="cats-h">${tx('Արտադրանքի կատալոգներ', 'Product catalogues')}</h2>
          <p class="system__lead">${tx(
            'Ծանոթացեք մեր առաջարկած արտադրանքին՝ կապիլյար խողովակային մատերից և պատրաստի պանելներից մինչև ֆիթինգներ, ավտոմատիկա և մոնտաժի գործիքներ։',
            'See what we offer: from capillary tube mats and prefabricated panels to fittings, controls and installation tools.',
          )}</p>
        </div>
        <a class="link cats__all" href="/clina-documents">${tx('Բոլոր կատալոգներն ու փաստաթղթերը', 'All catalogues and documents')} ${arrow}</a>
      </div>

      <div class="cats__grid rv">
        <a class="catf" href="${full.url}" target="_blank" rel="noopener" data-external>
          <span class="catf__cover"><img src="${full.cover}" alt="" width="520" height="729" loading="lazy" decoding="async"></span>
          <span class="catf__body">
            <span class="catf__tag">${tx('Ամբողջական հրատարակություն', 'Complete edition')}</span>
            <span class="catf__title">${tx('Արտադրանքի կատալոգ 2025', 'Product Catalogue 2025')}</span>
            <span class="catf__meta">PDF · ${mb(full.kb)}</span>
            <span class="btn btn--primary catf__btn">${tx('Բացել կատալոգը', 'Open the catalogue')} ${arrow}</span>
          </span>
        </a>
        <ul class="cats__parts" aria-label="${tx('Կատալոգի բաժիններ', 'Catalogue chapters')}">
          ${parts.map((d) => html`
          <li><a class="catp" href="${d.url}" target="_blank" rel="noopener" data-external>
            <span class="catp__cover"><img src="${d.cover}" alt="" width="520" height="729" loading="lazy" decoding="async"></span>
            <span class="catp__title">${name(d)}</span>
            <span class="vh"> (PDF)</span>
          </a></li>`)}
        </ul>
      </div>
    </div>
  </section>`;
}
