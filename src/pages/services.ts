import { tx } from '../i18n';
import type { Page } from '../lib/router';
import { html, arrow } from '../lib/dom';
import { SERVICES, findService, type Service } from '../content/services';
import { ctaBand, pageHead, iconTile } from '../components/blocks';
import { photo } from '../lib/photo';
import type { SceneName } from '../features/backgrounds';

/** Background scene per service: each one shows the idea behind the service. */
const SERVICE_FX: Record<string, SceneName> = {
  design: 'blueprint',
  heating: 'heat',
  ventilation: 'air',
  'air-conditioning': 'air',
  'energy-efficiency': 'hex',
  maintenance: 'blueprint',
};

const list = (items: string[]) => html`<ul class="ticks">${items.map((x) => html`<li>${x}</li>`)}</ul>`;

export const servicesPage = (): Page => ({
  seoPath: '/services',
  navPath: '/services',
  render: () => html`
  ${pageHead({
    crumbs: [{ href: '/', label: tx('Գլխավոր', 'Home') }, { label: tx('Ծառայություններ', 'Services') }],
    title: tx('Ծառայություններ', 'Services'),
    fx: 'blueprint',
    lead: tx('Աշխատում ենք նախագծման փուլից մինչև գործարկում և սպասարկում։ Ընտրեք ծառայությունը՝ տեսնելու, թե ինչ է այն ներառում, ինչ օբյեկտների համար է հարմար և ինչ տեղեկություն է պետք աշխատանքը սկսելու համար։', 'We work from design through commissioning and maintenance. Choose a service to see what it includes, which buildings it suits and what information we need to get started.'),
  })}
  <section class="sec" aria-label="${tx('Ծառայությունների ցանկ', 'List of services')}">
    <div class="wrap">
      <ol class="svc-index">
        ${SERVICES.map((s) => html`
        <li class="svc-row rv">
          <div class="svc-row__img">${photo(s.photo, { sizes: '(min-width: 1000px) 200px, 120px' })}</div>
          <div class="svc-row__main">
            <h2><a href="/services/${s.slug}">${s.title}</a></h2>
            <p>${s.short}</p>
          </div>
          <ul class="svc-row__inc" aria-label="${tx('Ներառում է', 'Includes')}">
            ${s.includes.slice(0, 3).map((x) => html`<li>${x}</li>`)}
          </ul>
          <span class="svc-row__go" aria-hidden="true">${arrow}</span>
        </li>`)}
      </ol>
    </div>
  </section>
  ${ctaBand()}`,
});

export const serviceDetailPage = (slug: string): Page | null => {
  const s = findService(slug);
  if (!s) return null;
  const i = SERVICES.indexOf(s);
  const next: Service = SERVICES[(i + 1) % SERVICES.length];
  return {
    seoPath: `/services/${s.slug}`,
    navPath: '/services',
    render: () => html`
    ${pageHead({
      crumbs: [{ href: '/', label: tx('Գլխավոր', 'Home') }, { href: '/services', label: tx('Ծառայություններ', 'Services') }, { label: s.title }],
      title: s.title,
      lead: s.intro,
      extra: html`<div class="btns"><a class="btn btn--primary" href="/contact?service=${s.slug}">${tx('Քննարկել այս ծառայությունը', 'Discuss this service')} ${arrow}</a></div>`,
      photo: s.photo,
      fx: SERVICE_FX[s.slug] ?? 'blueprint',
      fxWarm: s.slug !== 'air-conditioning',
    })}
    <section class="sec">
      <div class="wrap svd">
        <div class="svd__side">
          ${iconTile(s.icon, s.tone, 'lg')}
          <h2 class="eyebrow">${tx('Հարմար է', 'Suitable for')}</h2>
          <ul class="tags">${s.buildings.map((b) => html`<li>${b}</li>`)}</ul>
          <nav class="svd__nav" aria-label="${tx('Այլ ծառայություններ', 'Other services')}">
            <h2 class="eyebrow">${tx('Այլ ծառայություններ', 'Other services')}</h2>
            <ul>${SERVICES.filter((x) => x !== s).map((x) => html`<li><a href="/services/${x.slug}">${x.title}</a></li>`)}</ul>
          </nav>
        </div>
        <div class="svd__body">
          <section class="svd__blk rv" aria-labelledby="inc-h"><h2 id="inc-h">${tx('Ինչ է ներառում', 'What it includes')}</h2>${list(s.includes)}</section>
          <section class="svd__blk rv" aria-labelledby="prob-h"><h2 id="prob-h">${tx('Ինչ խնդիրներ է լուծում', 'Problems it solves')}</h2>${list(s.problems)}</section>
          <section class="svd__blk svd__blk--need rv" aria-labelledby="need-h"><h2 id="need-h">${tx('Ինչ է պետք սկսելու համար', 'What we need to get started')}</h2>${list(s.needed)}
            <p class="svd__hint">${tx('Եթե որոշ տվյալներ դեռ չունեք, դա խնդիր չէ․ դրանք կարող ենք պարզել միասին՝ նախնական խորհրդատվության ընթացքում։', 'If you don\'t have some of this yet, that\'s fine: we can work it out together during the initial consultation.')}</p>
          </section>
          <a class="next" href="/services/${next.slug}">
            <span class="eyebrow">${tx('Հաջորդ ծառայությունը', 'Next service')}</span>
            <span class="next__t">${next.title} ${arrow}</span>
          </a>
        </div>
      </div>
    </section>
    ${ctaBand()}`,
  };
};
