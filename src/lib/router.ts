import { applySeo } from './seo';
import { localizeLinks, stripLang } from '../i18n';
import { prefersReducedMotion } from './dom';

export interface Page {
  /** Key in seo.json, e.g. '/services/heating' */
  seoPath: string;
  /** Path used to highlight the active nav item */
  navPath: string;
  render(): string;
  /** Attach behaviour after render; may return a cleanup function. */
  mount?(root: HTMLElement): void | (() => void);
}

type Resolver = (params: Record<string, string>) => Page | null;
interface Route { pattern: RegExp; keys: string[]; resolve: Resolver }

export class Router {
  private routes: Route[] = [];
  private cleanup: (() => void) | void = undefined;
  private first = true;

  constructor(
    private outlet: HTMLElement,
    private notFound: () => Page,
    private onChange: (page: Page) => void,
  ) {}

  add(path: string, resolve: Resolver) {
    const keys: string[] = [];
    const pattern = new RegExp(
      '^' + path.replace(/\/:(\w+)/g, (_, k) => (keys.push(k), '/([^/]+)')) + '/?$',
    );
    this.routes.push({ pattern, keys, resolve });
    return this;
  }

  start() {
    document.addEventListener('click', (e) => this.onClick(e));
    window.addEventListener('popstate', () => this.render(location.pathname, false));
    this.render(location.pathname, false);
  }

  navigate(url: string) {
    const u = new URL(url, location.origin);
    const target = u.pathname + u.search + u.hash;
    if (u.pathname === location.pathname && u.search === location.search && u.hash) {
      history.pushState(null, '', target);
      this.scrollToHash(u.hash);
      return;
    }
    history.pushState(null, '', target);
    this.render(u.pathname, true, u.hash);
  }

  private onClick(e: MouseEvent) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest('a');
    if (!a || a.target || a.hasAttribute('download') || a.dataset.external !== undefined) return;
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('/') || href.startsWith('//')) return;
    e.preventDefault();
    this.navigate(href);
  }

  private resolve(path: string): Page {
    for (const r of this.routes) {
      const m = path.match(r.pattern);
      if (!m) continue;
      const params = Object.fromEntries(r.keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
      const page = r.resolve(params);
      if (page) return page;
    }
    return this.notFound();
  }

  private render(path: string, userNav: boolean, hash = location.hash) {
    const page = this.resolve(stripLang(path));
    if (typeof this.cleanup === 'function') this.cleanup();

    this.outlet.innerHTML = page.render();
    localizeLinks(this.outlet);
    if (!this.first && !prefersReducedMotion()) {
      this.outlet.classList.remove('page-enter');
      void this.outlet.offsetWidth;
      this.outlet.classList.add('page-enter');
    }
    this.cleanup = page.mount?.(this.outlet);
    applySeo(page.seoPath);
    this.onChange(page);

    if (hash) {
      requestAnimationFrame(() => this.scrollToHash(hash));
    } else if (userNav) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      // Move focus to the page heading so screen readers announce the new page.
      const h1 = this.outlet.querySelector<HTMLElement>('h1');
      if (h1) {
        h1.tabIndex = -1;
        h1.focus({ preventScroll: true });
      }
    }
    this.first = false;
  }

  private scrollToHash(hash: string) {
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    if (!el.hasAttribute('tabindex')) el.tabIndex = -1;
    el.focus({ preventScroll: true });
  }
}
