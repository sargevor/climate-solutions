import type { Page } from '../lib/router';
import { html } from '../lib/dom';
import { SITE } from '../config/site';
import { pageHead } from '../components/blocks';
import { tx } from '../i18n';

const mail = () => html`<a href="mailto:${SITE.contacts.email}" data-external>${SITE.contacts.email}</a>`;

const HY = () => html`
  <p class="draft"><strong>Նախնական տարբերակ։</strong> Հրապարակելուց առաջ տեքստը խորհուրդ է տրվում համաձայնեցնել իրավաբանի հետ։</p>
  <section><h2>Ով է մշակում տվյալները</h2><p>${SITE.name} (${SITE.nameHy}), հասցե՝ ${SITE.contacts.address}, էլ. փոստ՝ ${SITE.contacts.email}։</p></section>
  <section><h2>Ինչ տվյալներ ենք հավաքում</h2><p>Կապի ձևի միջոցով Դուք կարող եք տրամադրել Ձեր անունը, հեռախոսահամարը կամ էլ. հասցեն, նախագծի տեսակը, հետաքրքրող ծառայությունը և հաղորդագրության տեքստը։ Այլ անձնական տվյալներ կայքը չի հավաքում։</p></section>
  <section><h2>Ինչ նպատակով</h2><p>Տվյալներն օգտագործվում են միայն Ձեր հարցմանը պատասխանելու և նախագծի քննարկման համար։ Մենք դրանք չենք օգտագործում գովազդային նպատակներով և չենք փոխանցում երրորդ անձանց՝ բացառությամբ օրենքով նախատեսված դեպքերի։</p></section>
  <section><h2>Պահպանում</h2><p>Տվյալները պահվում են այնքան ժամանակ, որքան անհրաժեշտ է հարցմանը պատասխանելու և հնարավոր համագործակցության համար, որից հետո ոչնչացվում են։</p></section>
  <section><h2>Թխուկներ (cookies)</h2><p>Կայքը չի օգտագործում վերլուծական կամ գովազդային թխուկներ։ Եթե ապագայում ավելացվի այցելությունների վիճակագրություն, այս բաժինը կթարմացվի, և անհրաժեշտության դեպքում կխնդրենք Ձեր համաձայնությունը։</p></section>
  <section><h2>Ձեր իրավունքները</h2><p>«Անձնական տվյալների պաշտպանության մասին» ՀՀ օրենքին համապատասխան՝ Դուք կարող եք պահանջել Ձեր տվյալների մասին տեղեկություն, դրանց ուղղում կամ ոչնչացում՝ գրելով ${mail()} հասցեով։</p></section>`;

const EN = () => html`
  <p class="draft"><strong>Draft version.</strong> We recommend having this text reviewed by a lawyer before publishing.</p>
  <section><h2>Who processes your data</h2><p>${SITE.name} (${SITE.nameHy}), address: ${SITE.contacts.address}, email: ${SITE.contacts.email}.</p></section>
  <section><h2>What data we collect</h2><p>Through the contact form you can give us your name, phone number or email address, the type of project, the service you are interested in and your message. The website does not collect any other personal data.</p></section>
  <section><h2>Why we use it</h2><p>We use this data only to answer your request and discuss your project. We do not use it for advertising and do not share it with third parties, except where the law requires it.</p></section>
  <section><h2>How long we keep it</h2><p>We keep the data for as long as needed to answer your request and for any resulting work, and then delete it.</p></section>
  <section><h2>Cookies</h2><p>The website does not use analytics or advertising cookies. If we add visitor statistics in the future, we will update this section and ask for your consent where required.</p></section>
  <section><h2>Your rights</h2><p>Under the Law of the Republic of Armenia on Protection of Personal Data, you can ask us what data we hold about you, and ask us to correct or delete it, by writing to ${mail()}.</p></section>`;

export const privacyPage = (): Page => ({
  seoPath: '/privacy',
  navPath: '',
  render: () => html`
  ${pageHead({
    crumbs: [{ href: '/', label: tx('Գլխավոր', 'Home') }, { label: tx('Գաղտնիություն', 'Privacy') }],
    title: tx('Գաղտնիության քաղաքականություն', 'Privacy policy'),
  })}
  <section class="sec"><div class="wrap legal">${tx(HY, EN)()}</div></section>`,
});
