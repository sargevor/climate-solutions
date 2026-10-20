import { tx } from '../i18n';
import type { Page } from '../lib/router';
import { html, arrow } from '../lib/dom';

export const notFoundPage = (): Page => ({
  seoPath: '/404',
  navPath: '',
  render: () => html`
  <section class="sec nf" data-fx="dots">
    <div class="wrap nf__in">
      <p class="nf__code" aria-hidden="true">404</p>
      <h1>${tx('Էջը չի գտնվել', 'Page not found')}</h1>
      <p class="lead">${tx('Հնարավոր է՝ հղումը սխալ է, կամ էջը տեղափոխվել է։', 'The link may be wrong, or the page may have moved.')}</p>
      <div class="btns"><a class="btn btn--primary" href="/">${tx('Վերադառնալ գլխավոր էջ', 'Back to the home page')} ${arrow}</a><a class="btn btn--ghost" href="/contact${tx('">Կապ', 'Contact')}</a></div>
    </div>
  </section>`,
});
