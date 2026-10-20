import seo from '../config/seo.json';
import { lang, withLang, LANG_LABEL, type Lang } from '../i18n';

type RouteSeo = { title: string; description: string };
const ROUTES: Record<Lang, Record<string, RouteSeo>> = {
  hy: seo.routes as Record<string, RouteSeo>,
  en: seo.routesEn as Record<string, RouteSeo>,
};

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

function setLink(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}

const abs = (path: string) => seo.siteUrl + (path === '/' ? '/' : path);

/** Updates title, description, canonical, language alternates and Open Graph tags. */
export function applySeo(path: string) {
  const routes = ROUTES[lang];
  const data = routes[path] ?? routes['/404'];
  const url = abs(withLang(path));
  document.documentElement.lang = lang;
  document.title = data.title;
  setMeta('meta[name="description"]', 'name', 'description', data.description);
  setMeta('meta[property="og:title"]', 'property', 'og:title', data.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', data.description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', url);
  setMeta('meta[property="og:locale"]', 'property', 'og:locale', LANG_LABEL[lang].locale);
  setLink('link[rel="canonical"]', { rel: 'canonical', href: url });
  setLink('link[hreflang="hy"]', { rel: 'alternate', hreflang: 'hy', href: abs(withLang(path, 'hy')) });
  setLink('link[hreflang="en"]', { rel: 'alternate', hreflang: 'en', href: abs(withLang(path, 'en')) });
  setLink('link[hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default', href: abs(withLang(path, 'hy')) });
}
