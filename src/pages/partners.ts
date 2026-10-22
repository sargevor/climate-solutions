import { tx } from '../i18n';
import type { Page } from '../lib/router';
import { html, arrow } from '../lib/dom';
import { PARTNERS } from '../content/partners';
import { capillaryTeaser, ctaBand, pageHead, partnerCard } from '../components/blocks';

export const partnersPage = (): Page => ({
  seoPath: '/partners',
  navPath: '/partners',
  render: () => html`
  ${pageHead({
    crumbs: [{ href: '/', label: tx('Գլխավոր', 'Home') }, { label: tx('Գործընկերներ', 'Partners') }],
    title: tx('Մեր գործընկերները', 'Our partners'),
    fx: 'convection',
    lead: tx(
      'Մենք համագործակցում ենք սարքավորումներ արտադրողների հետ, որոնց լուծումները առաջարկում ենք մեր պատվիրատուներին։ Սարքավորումն ընտրում ենք հաշվարկից հետո՝ ըստ օբյեկտի պահանջների, իսկ նախագծումը, մոնտաժը և սպասարկումը կատարում ենք մենք։',
      'We work with equipment manufacturers whose solutions we offer to our clients. We choose the equipment after the calculations, to suit each building, and we handle the design, installation and maintenance ourselves.',
    ),
  })}

  <section class="sec" aria-labelledby="partners-h">
    <div class="wrap">
      <h2 class="vh" id="partners-h">${tx('Գործընկերներ', 'Partners')}</h2>
      <div class="partners partners--full rv">${PARTNERS.map((p) => partnerCard(p, true))}</div>
    </div>
  </section>

  <section class="sec sec--tint" aria-labelledby="cap-teaser-h">
    <div class="wrap">${capillaryTeaser('cap-teaser-h')}</div>
  </section>

  <section class="sec" aria-labelledby="pw-h">
    <div class="wrap princ">
      <div class="princ__head rv">
        <p class="eyebrow">${tx('Համագործակցություն', 'How it works')}</p>
        <h2 id="pw-h">${tx('Ինչ է դա նշանակում պատվիրատուի համար', 'What this means for you')}</h2>
      </div>
      <ul class="princ__list rv">
        <li><h3>${tx('Մեկ պատասխանատու', 'One point of contact')}</h3><p>${tx('Համակարգի նախագծման, սարքավորման ընտրության, մոնտաժի և գործարկման համար պատասխանատու ենք մենք։', 'We are responsible for the system design, equipment selection, installation and commissioning.')}</p></li>
        <li><h3>${tx('Ընտրություն՝ ըստ առաջադրանքի', 'Chosen for the task')}</h3><p>${tx('Գործընկերների սարքավորումն առաջարկում ենք այնտեղ, որտեղ այն իսկապես համապատասխանում է օբյեկտին և Ձեր պահանջներին։', 'We propose our partners\' equipment where it genuinely suits the building and your requirements.')}</p></li>
        <li><h3>${tx('Տեխնիկական աջակցություն', 'Technical support')}</h3><p>${tx('Բարդ հարցերի դեպքում աշխատում ենք արտադրողի հետ՝ ճիշտ լուծում գտնելու համար։', 'For complex questions we work with the manufacturer to find the right solution.')}</p></li>
      </ul>
    </div>
  </section>

  ${ctaBand()}`,
});

export const partnersMore = () => html`<p class="more"><a class="link" href="/partners">${tx('Ավելին գործընկերների մասին', 'More about our partners')} ${arrow}</a></p>`;
