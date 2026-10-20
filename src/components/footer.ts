import { NAV, SITE, hasPhone, phoneHref } from '../config/site';
import { SERVICES } from '../content/services';
import { html } from '../lib/dom';
import { logo } from './logo';
import { tx } from '../i18n';

export function renderFooter(): string {
  const c = SITE.contacts;
  return html`
  <footer class="ftr">
    <div class="wrap ftr__in">
      <div class="ftr__grid">
        <div class="ftr__about">
          <a class="ftr__brand" href="/" aria-label="${SITE.name} — ${tx('գլխավոր էջ', 'home page')}">${logo('dark')}</a>
          <p>${SITE.description}</p>
        </div>
        <nav aria-label="${tx('Էջեր', 'Pages')}"><h2>${tx('Էջեր', 'Pages')}</h2><ul>
          ${NAV.map((n) => html`<li><a href="${n.href}">${n.label}</a></li>`)}
          <li><a href="/privacy">${tx('Գաղտնիություն', 'Privacy')}</a></li>
        </ul></nav>
        <nav aria-label="${tx('Ծառայություններ', 'Services')}"><h2>${tx('Ծառայություններ', 'Services')}</h2><ul>
          ${SERVICES.map((s) => html`<li><a href="/services/${s.slug}">${s.title}</a></li>`)}
        </ul></nav>
        <div><h2>${tx('Կապ', 'Contact')}</h2>
          <address><ul>
            ${hasPhone && html`<li><a href="tel:${phoneHref}" data-external>${c.phone}</a></li>`}
            <li><a href="mailto:${c.email}" data-external>${c.email}</a></li>
            <li><a href="${c.mapUrl}" target="_blank" rel="noopener">${c.address}</a></li>
            ${c.hours && html`<li>${c.hours}</li>`}
            ${SITE.social.map((s) => html`<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`)}
          </ul></address>
        </div>
      </div>
      <div class="ftr__bot">
        <span>© ${new Date().getFullYear()} ${SITE.name} (${SITE.nameHy})${tx('։ Բոլոր իրավունքները պաշտպանված են։', '. All rights reserved.')}</span>
        <span class="ftr__links"><a href="/privacy">${tx('Գաղտնիության քաղաքականություն', 'Privacy policy')}</a></span>
      </div>
    </div>
  </footer>`;
}
