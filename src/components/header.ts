import { NAV, SITE, hasPhone, phoneHref } from '../config/site';
import { $, $$, html, arrow } from '../lib/dom';
import { logo, logoMark } from './logo';
import { tx, lang, withLang, LANG_LABEL, type Lang } from '../i18n';

const LANGS: Lang[] = ['hy', 'en'];

/** ՀԱՅ | EN switch. Links are full page loads to the same page in the other language. */
const langSwitch = (where: 'hdr' | 'mnav') => html`
  <div class="lang lang--${where}" role="group" aria-label="${tx('Լեզու', 'Language')}">
    ${LANGS.map((l) => html`<a class="lang__opt" href="${withLang('/', l)}" hreflang="${l}" lang="${l}" data-external data-lang-switch="${l}"${l === lang ? ' aria-current="true"' : ''} title="${LANG_LABEL[l].name}">${LANG_LABEL[l].short}<span class="vh"> — ${LANG_LABEL[l].name}</span></a>`)}
  </div>`;

export function renderHeader(): string {
  return html`
  <a class="skip" href="#main" data-external>${tx('Անցնել հիմնական բովանդակությանը', 'Skip to main content')}</a>
  <header class="hdr" id="hdr">
    <div class="wrap hdr__in">
      <a class="hdr__brand" href="/" aria-label="${SITE.name} — ${tx('գլխավոր էջ', 'home page')}">
        <span class="hdr__full">${logo()}</span>
        <span class="hdr__compact" aria-hidden="true">${logoMark()}<span class="hdr__name">${SITE.name}</span></span>
      </a>
      <nav class="nav" aria-label="${tx('Հիմնական նավարկում', 'Main navigation')}">
        <ul>${NAV.map((n) => html`<li><a href="${n.href}" data-nav="${n.href}">${n.label}</a></li>`)}</ul>
      </nav>
      ${langSwitch('hdr')}
      <a class="btn btn--primary hdr__cta" href="/contact">${tx('Ստանալ խորհրդատվություն', 'Get a consultation')}</a>
      <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="${tx('Բացել ընտրացանկը', 'Open menu')}">
        <span class="menu-btn__ico" aria-hidden="true"><span></span><span></span><span></span></span>
        <span class="menu-btn__lbl" id="menuLbl">${tx('Ընտրացանկ', 'Menu')}</span>
      </button>
    </div>
  </header>
  <div class="mnav" id="mnav" hidden>
    <nav class="wrap" aria-label="${tx('Բջջային նավարկում', 'Mobile navigation')}">
      <ul>${NAV.map((n) => html`<li><a href="${n.href}" data-nav="${n.href}">${n.label}<span aria-hidden="true">→</span></a></li>`)}</ul>
      <a class="btn btn--primary mnav__cta" href="/contact">${tx('Ստանալ խորհրդատվություն', 'Get a consultation')} ${arrow}</a>
      ${langSwitch('mnav')}
      <div class="mnav__contact">
        ${hasPhone && html`<a href="tel:${phoneHref}" data-external>${SITE.contacts.phone}</a>`}
        <a href="mailto:${SITE.contacts.email}" data-external>${SITE.contacts.email}</a>
      </div>
    </nav>
  </div>`;
}

export function mountHeader() {
  const hdr = $('#hdr')!;
  const btn = $<HTMLButtonElement>('#menuBtn')!;
  const menu = $('#mnav')!;
  const lbl = $('#menuLbl')!;

  const onScroll = () => hdr.classList.toggle('is-compact', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const open = () => {
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', tx('Փակել ընտրացանկը', 'Close menu'));
    lbl.textContent = tx('Փակել', 'Close');
    document.body.classList.add('menu-open');
    menu.querySelector<HTMLElement>('a')?.focus();
  };
  const close = (returnFocus = true) => {
    if (menu.hidden) return;
    menu.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', tx('Բացել ընտրացանկը', 'Open menu'));
    lbl.textContent = tx('Ընտրացանկ', 'Menu');
    document.body.classList.remove('menu-open');
    if (returnFocus) btn.focus();
  };

  btn.addEventListener('click', () => (menu.hidden ? open() : close()));
  menu.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) close(false);
  });
  document.addEventListener('keydown', (e) => {
    if (menu.hidden) return;
    if (e.key === 'Escape') return close();
    if (e.key !== 'Tab') return;
    const items = [btn, ...$$<HTMLElement>('a', menu)];
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
    else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
  });
  matchMedia('(min-width: 1080px)').addEventListener('change', (m) => m.matches && close(false));

  // Skip link: focus main without changing the route.
  $('.skip')!.addEventListener('click', (e) => {
    e.preventDefault();
    $('#main')!.focus();
  });

  return { close };
}

/** Points the language switch at the current page in each language. */
export function updateLangSwitch() {
  const path = location.pathname + location.search + location.hash;
  $$<HTMLAnchorElement>('[data-lang-switch]').forEach((a) => {
    a.href = withLang(path.replace(/^\/en(?=\/|$|\?|#)/, '') || '/', a.dataset.langSwitch as Lang);
  });
}

/** Marks the active nav item for the current page. */
export function setActiveNav(navPath: string) {
  $$<HTMLAnchorElement>('[data-nav]').forEach((a) => {
    if (a.dataset.nav === navPath) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}
