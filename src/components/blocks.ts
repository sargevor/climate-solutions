import { tx } from '../i18n';
import { html, arrow } from '../lib/dom';
import { SITE, hasPhone, phoneHref } from '../config/site';
import { icon, type IconName } from '../lib/icons';
import { photo } from '../lib/photo';
import type { PhotoKey } from '../content/photos';
import type { Service, Tone } from '../content/services';
import { CATEGORIES, type Project } from '../content/projects';
import type { SceneName } from '../features/backgrounds';

/** Icon in a tinted round tile, color-coded by tone (heat / air / leaf / brand). */
export const iconTile = (name: IconName, tone: Tone, size: 'md' | 'lg' = 'md') =>
  `<span class="tile tile--${tone} tile--${size}" aria-hidden="true">${icon(name)}</span>`;

export const pageHead = (opts: {
  crumbs: { href?: string; label: string }[];
  title: string;
  lead?: string;
  extra?: string;
  photo?: PhotoKey;
  /** Animated background scene for this page (see features/backgrounds.ts) */
  fx?: SceneName;
  fxWarm?: boolean;
}) => html`
  <section class="phead${opts.photo ? ' phead--photo' : ''}" data-fx="${opts.fx ?? 'dots'}"${opts.fxWarm === false ? ' data-fx-warm="0"' : ''}>
    <div class="wrap phead__in">
      <div class="phead__txt">
        <nav class="crumbs" aria-label="${tx('Դիրքը կայքում', 'Breadcrumb')}"><ol>
          ${opts.crumbs.map((c, i) =>
            i === opts.crumbs.length - 1
              ? html`<li aria-current="page">${c.label}</li>`
              : html`<li><a href="${c.href}">${c.label}</a></li>`)}
        </ol></nav>
        <h1>${opts.title}</h1>
        ${opts.lead && html`<p class="lead">${opts.lead}</p>`}
        ${opts.extra}
      </div>
      ${opts.photo && html`<figure class="phead__photo"><div class="phead__clip">${photo(opts.photo, { sizes: '(min-width: 1000px) 520px, 100vw', eager: true })}</div></figure>`}
    </div>
  </section>`;

export const ctaBand = () => html`
  <section class="cta" aria-labelledby="cta-h">
    <div class="wrap cta__in">
      <div class="stack">
        <p class="eyebrow">${tx('Նախնական խորհրդատվություն', 'Initial consultation')}</p>
        <h2 id="cta-h">${tx('Եկեք քննարկենք Ձեր նախագիծը', 'Let\'s discuss your project')}</h2>
        <p class="cta__lead">${tx('Պատմեք մեզ Ձեր օբյեկտի և պահանջների մասին։ Խորհրդատվության ընթացքում կպարզենք առաջադրանքը, կքննարկենք հնարավոր լուծումները և կառաջարկենք հաջորդ քայլերը։', 'Tell us about your building and what you need. In a consultation we clarify the task, discuss possible solutions and suggest the next steps.')}</p>
        <div class="btns">
          <a class="btn btn--primary btn--lg" href="/contact">${tx('Ստանալ խորհրդատվություն', 'Get a consultation')} ${arrow}</a>
        </div>
      </div>
      <address class="cta__side"><ul class="cta__contacts">
        ${hasPhone && html`<li>${icon('phone', 'ico')}<span><span class="k">${tx('Հեռախոս', 'Phone')}</span><a href="tel:${phoneHref}" data-external>${SITE.contacts.phone}</a></span></li>`}
        <li>${icon('mail', 'ico')}<span><span class="k">${tx('Էլ. փոստ', 'Email')}</span><a href="mailto:${SITE.contacts.email}" data-external>${SITE.contacts.email}</a></span></li>
        <li>${icon('pin', 'ico')}<span><span class="k">${tx('Գրասենյակ', 'Office')}</span><a href="${SITE.contacts.mapUrl}" target="_blank" rel="noopener">${SITE.contacts.address}<span class="vh">${tx(' (քարտեզը բացվում է նոր պատուհանում)', ' (map opens in a new window)')}</span></a></span></li>
      </ul></address>
    </div>
  </section>`;

export const serviceCard = (s: Service) => html`
  <article class="svc svc--${s.tone}">
    ${iconTile(s.icon, s.tone)}
    <h3><a href="/services/${s.slug}">${s.title}</a></h3>
    <p>${s.short}</p>
    <span class="link" aria-hidden="true">${tx('Մանրամասն', 'Learn more')} ${arrow}</span>
  </article>`;

/** Real projects only (see content/projects.ts). Projects without a photo show no image block. */
export const projectCard = (p: Project) => {
  const cat = CATEGORIES.find((c) => c.id === p.category);
  return html`
  <article class="pcard" data-cat="${p.category}">
    ${p.image && html`<figure class="pcard__fig"><img src="${p.image}" alt="${p.imageAlt ?? p.title}" loading="lazy" decoding="async" width="800" height="600"></figure>`}
    <span class="pcard__cat">${cat?.one}</span>
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    ${!!p.details && p.details.length > 0 && html`<dl>${p.details.map(([k, v]) => html`<div><dt>${k}</dt><dd>${v}</dd></div>`)}</dl>`}
  </article>`;
};
