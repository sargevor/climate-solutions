import { tx } from '../i18n';
import type { Page } from '../lib/router';
import { html, arrow } from '../lib/dom';
import { capillaryDrawing, CAPILLARY_CALLOUTS } from '../lib/drawings';
import { ctaBand, pageHead } from '../components/blocks';

/*
 * Capillary tube mats (CLINA). Product facts come from clina.de; general notes on design
 * (dew point, heat pumps, radiant exchange) are standard engineering knowledge.
 */

const STEPS = tx([
  { title: 'Ջրի պատրաստում', text: 'Ջերմային պոմպը, կաթսան կամ չիլլերը պատրաստում են տաք կամ սառը ջուր։' },
  { title: 'Բաշխում մատում', text: 'Ջուրը կոլեկտորից զուգահեռ անցնում է բազմաթիվ բարակ խողովակներով, ինչպես արյունը՝ մարդու մազանոթներով։' },
  { title: 'Ջերմափոխանակություն մակերևույթով', text: 'Առաստաղը, պատը կամ հատակը տաքանում կամ սառչում է, և սենյակը ջերմություն է ստանում կամ տալիս հիմնականում ճառագայթման միջոցով։' },
], [
  { title: 'Water is prepared', text: 'A heat pump, boiler or chiller prepares warm or cool water.' },
  { title: 'It spreads through the mat', text: 'From the header the water flows in parallel through many thin tubes, much like blood through the body\'s capillaries.' },
  { title: 'The surface exchanges heat', text: 'The ceiling, wall or floor becomes warm or cool, and the room gains or loses heat mainly by radiation.' },
]);

const BENEFITS = tx([
  { title: 'Հավասարաչափ ջերմաստիճան', text: 'Խողովակները դրված են միմյանց մոտ, ուստի ամբողջ մակերևույթն աշխատում է հավասարաչափ՝ առանց տաք և սառը գոտիների։' },
  { title: 'Արագ արձագանք', text: 'Արտադրողի տվյալներով համակարգը արձագանքում է ընդամենը մի քանի րոպեում։' },
  { title: 'Ցածր ճնշման կորուստ', text: 'Ջուրը բաժանվում է բազմաթիվ զուգահեռ հոսքերի, ինչը նվազեցնում է շրջանառու պոմպի էներգածախսը։' },
  { title: 'Էներգաարդյունավետություն', text: 'Մեծ մակերեսի շնորհիվ ջրի և սենյակի ջերմաստիճանների տարբերությունը փոքր է, ինչը հարմար է ջերմային պոմպերի հետ աշխատելու համար։' },
  { title: 'Անաղմուկ և առանց քամու', text: 'Սենյակում չկան օդափոխիչներ և օդի ուժեղ հոսքեր․ կլիման զգացվում է բնական։' },
  { title: 'Թեթև և ճկուն', text: 'Մատերը բարակ են և թեթև, կարող են տեղադրվել նաև կոր մակերևույթներին և վերակառուցվող շենքերում։' },
], [
  { title: 'Even temperature', text: 'The tubes lie close together, so the whole surface works evenly, without warm and cold spots.' },
  { title: 'Fast response', text: 'According to the manufacturer, the system responds within just a few minutes.' },
  { title: 'Low pressure loss', text: 'The water splits into many parallel flows, which lowers the energy used by the circulation pump.' },
  { title: 'Energy-efficient', text: 'Thanks to the large surface, the water temperature stays close to room temperature, which suits heat pumps well.' },
  { title: 'Silent, no draughts', text: 'There are no fans and no strong air currents in the room, so the climate feels natural.' },
  { title: 'Light and flexible', text: 'The mats are thin and light, and can follow curved surfaces or go into buildings being renovated.' },
]);

const SURFACES = tx([
  { title: 'Առաստաղ', text: 'Սվաղի կամ ակուստիկ սվաղի մեջ, գիպսաստվարաթղթե առաստաղում, մետաղական պանելներում և կախովի առաստաղներում։' },
  { title: 'Պատեր', text: 'Աղյուսե կամ բետոնե պատի սվաղի մեջ և գիպսաստվարաթղթե պատերում։' },
  { title: 'Հատակ', text: 'Լցվածքի մեջ կամ դրա վրա, ինչպես նաև փայտե կամ չոր հիմքի վրա։' },
  { title: 'Սենյակային տարրեր', text: 'GRAVIMAT կոնվեկտոր, որը կարող է ջեռուցել, հովացնել և չորացնել օդը։' },
], [
  { title: 'Ceilings', text: 'In plaster or acoustic plaster, in plasterboard ceilings, in metal panels and in suspended ceilings.' },
  { title: 'Walls', text: 'In plaster on brick or concrete walls, and in plasterboard walls.' },
  { title: 'Floors', text: 'In or on screed, and on timber or dry subfloors.' },
  { title: 'Room units', text: 'The GRAVIMAT convector, which can heat, cool and dehumidify.' },
]);

const BUILDINGS = tx(
  ['Գրասենյակներ', 'Հյուրանոցներ', 'Կլինիկաներ և լաբորատորիաներ', 'Հասարակական շենքեր', 'Բնակելի շենքեր', 'Արտադրական շենքեր'],
  ['Offices', 'Hotels', 'Clinics and laboratories', 'Public buildings', 'Residential buildings', 'Industrial buildings'],
);

const DESIGN = tx([
  { title: 'Ցողի կետի վերահսկում', text: 'Հովացման ռեժիմում մակերևույթը չպետք է սառչի ցողի կետից ցածր։ Նախատեսում ենք խոնավության տվիչներ և, անհրաժեշտության դեպքում, օդի չորացում օդափոխության միջոցով։' },
  { title: 'Առանձին շղթա', text: 'Եթե ջերմության կամ սառնության աղբյուրը կոռոզիակայուն չէ, մատերը միացվում են առանձին շղթայով՝ ջերմափոխանակիչի միջոցով։' },
  { title: 'Համաձայնեցում հարդարման հետ', text: 'Մատերը դառնում են առաստաղի կամ պատի մաս, ուստի դրանց տեղադրումը պլանավորում ենք ճարտարապետի և հարդարման աշխատանքների հետ միասին։' },
  { title: 'Հաշվարկ և կառավարում', text: 'Մակերեսը, ջրի ջերմաստիճանները և ավտոմատիկան որոշում ենք ջերմային բեռնվածքների հաշվարկով։' },
], [
  { title: 'Dew point control', text: 'In cooling mode the surface must not get colder than the dew point. We plan humidity sensors and, where needed, dehumidification through the ventilation system.' },
  { title: 'A separate circuit', text: 'If the heat or cold source is not corrosion-resistant, the mats are connected as a separate circuit through a heat exchanger.' },
  { title: 'Coordination with the finish', text: 'The mats become part of the ceiling or wall, so we plan their installation together with the architect and the finishing trades.' },
  { title: 'Calculation and controls', text: 'We set the active area, water temperatures and controls from heating and cooling load calculations.' },
]);

export const capillaryPage = (): Page => ({
  seoPath: '/capillary-tube-mats',
  navPath: '/partners',
  render: () => html`
  ${pageHead({
    crumbs: [
      { href: '/', label: tx('Գլխավոր', 'Home') },
      { href: '/partners', label: tx('Գործընկերներ', 'Partners') },
      { label: tx('Կապիլյար մատեր', 'Capillary mats') },
    ],
    title: tx('Կապիլյար խողովակային մատեր', 'Capillary tube mats'),
    fx: 'capillary',
    lead: tx(
      'Ջեռուցում և հովացում առաստաղի, պատերի և հատակի միջոցով՝ բարակ խողովակների ցանցով, որը թաքնված է հարդարման մեջ։ Լուծումը ներկայացնում ենք մեր գործընկեր CLINA-ի (Գերմանիա) հետ։',
      'Heating and cooling through ceilings, walls and floors, with a network of thin tubes hidden in the finish. We offer this solution with our partner CLINA (Germany).',
    ),
    extra: html`<div class="btns btns--row"><a class="btn btn--primary" href="/contact">${tx('Քննարկել նախագիծը', 'Discuss your project')} ${arrow}</a></div>`,
  })}

  <section class="sec system cap" aria-labelledby="cap-what-h">
    <div class="wrap system__grid">
      <div class="stack rv">
        <p class="kicker kicker--band">${tx('Ինչ է դա', 'What it is')}</p>
        <h2 id="cap-what-h">${tx('Մակերևույթ, որը ջեռուցում և հովացնում է', 'A surface that heats and cools')}</h2>
        <div class="stack cap__txt">
          <p class="system__lead">${tx(
            'Կապիլյար մատը բարակ պոլիպրոպիլենային (PP-R) խողովակների ցանց է՝ 3.4 կամ 4.3 մմ արտաքին տրամագծով, որոնք միացված են մատակարարման և վերադարձի կոլեկտորներին։',
            'A capillary mat is a network of thin polypropylene (PP-R) tubes, 3.4 or 4.3 mm in outer diameter, connected to a supply header and a return header.',
          )}</p>
          <p class="system__lead">${tx(
            'Մատը տեղադրվում է սվաղի, գիպսաստվարաթղթի, մետաղական պանելների կամ լցվածքի մեջ, և ամբողջ մակերևույթը դառնում է մեծ, մեղմ ջերմափոխանակիչ՝ ձմռանը տաքացնում է, ամռանը՝ հովացնում։',
            'The mat is laid in plaster, plasterboard, metal panels or screed, and the whole surface becomes a large, gentle heat exchanger: warming the room in winter and cooling it in summer.',
          )}</p>
        </div>
        <div class="capmode" role="group" aria-label="${tx('Գծագրի ռեժիմ', 'Drawing mode')}">
          <button type="button" class="capmode__btn" data-mode="heat" aria-pressed="true">${tx('Ջեռուցում', 'Heating')}</button>
          <button type="button" class="capmode__btn" data-mode="cool" aria-pressed="false">${tx('Հովացում', 'Cooling')}</button>
        </div>
      </div>
      <figure class="system__dwg rv">
        ${capillaryDrawing()}
        <figcaption class="vh">${tx('Կապիլյար մատի սխեմա՝ վերևում մատակարարման կոլեկտոր, ներքևում վերադարձի կոլեկտոր և դրանց միջև բազմաթիվ բարակ զուգահեռ խողովակներ։', 'Diagram of a capillary mat: supply header at the top, return header at the bottom, and many thin parallel tubes between them.')}</figcaption>
        <ol class="legend">${CAPILLARY_CALLOUTS.map((c, i) => html`
          <li class="legend__item legend__item--cap"><span class="legend__n" aria-hidden="true">${i + 1}</span><div><h3>${c.title}</h3><p>${c.text}</p></div></li>`)}
        </ol>
      </figure>
    </div>
  </section>

  <section class="sec" aria-labelledby="cap-how-h">
    <div class="wrap">
      <div class="sec-head rv">
        <p class="eyebrow">${tx('Ինչպես է աշխատում', 'How it works')}</p>
        <h2 id="cap-how-h">${tx('Երեք քայլ՝ ջրից մինչև հարմարավետություն', 'Three steps from water to comfort')}</h2>
      </div>
      <ol class="proc proc--3 rv">
        ${STEPS.map((p, i) => html`
          <li><span class="proc__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
          <h3><span class="vh">${tx('Քայլ', 'Step')} ${i + 1}. </span>${p.title}</h3><p>${p.text}</p></li>`)}
      </ol>
    </div>
  </section>

  <section class="sec sec--tint" aria-labelledby="cap-why-h">
    <div class="wrap">
      <div class="sec-head rv">
        <p class="eyebrow">${tx('Առավելություններ', 'Benefits')}</p>
        <h2 id="cap-why-h">${tx('Ինչու ընտրել կապիլյար համակարգ', 'Why choose a capillary system')}</h2>
      </div>
      <ul class="tiles tiles--3 rv">${BENEFITS.map((b) => html`<li><h3>${b.title}</h3><p>${b.text}</p></li>`)}</ul>
    </div>
  </section>

  <section class="sec" aria-labelledby="cap-where-h">
    <div class="wrap princ">
      <div class="princ__head rv">
        <p class="eyebrow">${tx('Կիրառում', 'Where it is used')}</p>
        <h2 id="cap-where-h">${tx('Որտեղ կարելի է տեղադրել', 'Where it can be installed')}</h2>
        <p class="lead">${tx('Համակարգը կիրառվում է ինչպես նոր շինարարությունում, այնպես էլ վերակառուցման ժամանակ։', 'The system is used both in new construction and in renovation.')}</p>
        <ul class="chips" aria-label="${tx('Շենքերի տեսակներ', 'Building types')}">${BUILDINGS.map((b) => html`<li>${b}</li>`)}</ul>
      </div>
      <ul class="princ__list rv">${SURFACES.map((s) => html`<li><h3>${s.title}</h3><p>${s.text}</p></li>`)}</ul>
    </div>
  </section>

  <section class="sec sec--tint" aria-labelledby="cap-design-h">
    <div class="wrap">
      <div class="sec-head rv">
        <p class="eyebrow">${tx('Մեր աշխատանքը', 'Our part')}</p>
        <h2 id="cap-design-h">${tx('Ինչ ենք հաշվի առնում նախագծելիս', 'What we take care of in the design')}</h2>
        <p class="lead">${tx('Կապիլյար համակարգը լավ է աշխատում, երբ այն ճիշտ է նախագծված և համաձայնեցված շենքի մյուս համակարգերի հետ։', 'A capillary system works well when it is designed correctly and coordinated with the building\'s other systems.')}</p>
      </div>
      <ul class="tiles rv">${DESIGN.map((d) => html`<li><h3>${d.title}</h3><p>${d.text}</p></li>`)}</ul>
    </div>
  </section>

  ${ctaBand()}`,
  mount(root) {
    const sec = root.querySelector<HTMLElement>('.cap');
    if (!sec) return;
    const btns = [...sec.querySelectorAll<HTMLButtonElement>('.capmode__btn')];
    btns.forEach((b) =>
      b.addEventListener('click', () => {
        btns.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
        sec.classList.toggle('cap--cool', b.dataset.mode === 'cool');
      }),
    );
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => sec.classList.toggle('is-live', e.isIntersecting), { threshold: 0.15 });
    io.observe(sec);
    return () => io.disconnect();
  },
});
