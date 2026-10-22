import { tx } from '../i18n';
import type { Page } from '../lib/router';
import { html, arrow } from '../lib/dom';
import { icon } from '../lib/icons';
import { photo } from '../lib/photo';
import { systemDrawing, SYSTEM_CALLOUTS } from '../lib/drawings';
import { SITE, HAS_PROJECTS } from '../config/site';
import { SERVICES } from '../content/services';
import { FOCUS, PRINCIPLES, PROCESS } from '../content/company';
import { PROJECTS } from '../content/projects';
import { capillaryTeaser, ctaBand, partnerCard, projectCard, serviceCard } from '../components/blocks';
import { PARTNERS } from '../content/partners';
import { partnersMore } from './partners';
import { brandMark, mountBrandMark } from '../components/brandMark';

/** Facts shown under the hero buttons when no verified statistics are configured. */
const HERO_FACTS = [
  { icon: 'design' as const, text: tx('Նախագծում, մոնտաժ և սպասարկում', 'Design, installation and maintenance') },
  { icon: 'ventilation' as const, text: tx('Բնակելի, կոմերցիոն և արտադրական օբյեկտներ', 'Residential, commercial and industrial buildings') },
  { icon: 'pin' as const, text: tx('Գրասենյակ Երևանում՝ Բագրևանդ 52/12', 'Office in Yerevan, 52/12 Bagrevand St') },
];

export const homePage = (): Page => ({
  seoPath: '/',
  navPath: '/',
  render: () => html`
  <section class="hero" aria-labelledby="hero-h" data-fx="air">
    <div class="wrap hero__in">
      <div class="hero__txt">
        <p class="kicker kicker--band">Climate Solutions · ${tx('Երևան', 'Yerevan')}</p>
        <h1 id="hero-h">${tx('Ջեռուցում, օդափոխություն և օդորակում Հայաստանում', 'Heating, ventilation and air conditioning in Armenia')}</h1>
        <p class="hero__lead">${tx('Նախագծում, մոնտաժ և սպասարկում բնակելի, կոմերցիոն և արտադրական շենքերի համար։ Ինժեներական լուծումներ՝ հարմարավետ և էներգաարդյունավետ միջավայրի համար։', 'Design, installation and maintenance for residential, commercial and industrial buildings. Engineering solutions for comfortable, energy-efficient spaces.')}</p>
        <div class="btns btns--row">
          <a class="btn btn--primary btn--lg" href="/contact"><span class="shine" aria-hidden="true"></span>${tx('Ստանալ խորհրդատվություն', 'Get a consultation')} ${arrow}</a>
          <a class="btn btn--ghost btn--lg" href="/services">${tx('Դիտել ծառայությունները', 'View services')}</a>
        </div>
        ${SITE.stats.length > 0
          ? html`<dl class="stats">${SITE.stats.map((s) => html`<div><dt>${s.label}</dt><dd>${s.value}</dd></div>`)}</dl>`
          : html`<ul class="facts">${HERO_FACTS.map((f) => html`<li>${icon(f.icon, 'ico')}<span>${f.text}</span></li>`)}</ul>`}
      </div>
      <figure class="hero__media">
        <div class="hero__frame">${photo('hero', { sizes: '(min-width: 1080px) 46vw, 100vw', eager: true })}</div>
        ${brandMark()}
        <ul class="hero__tags" aria-label="${tx('Մեր ուղղությունները', 'What we do')}">
          <li class="tag tag--heat">${tx('Ջեռուցում', 'Heating')}</li>
          <li class="tag tag--air">${tx('Օդափոխություն', 'Ventilation')}</li>
          <li class="tag tag--air">${tx('Օդորակում', 'Air conditioning')}</li>
        </ul>
      </figure>
    </div>
  </section>

  <section class="sec" aria-labelledby="intro-h">
    <div class="wrap">
      <div class="intro">
        <div class="stack rv">
          <p class="eyebrow">${tx('Ընկերության մասին', 'About the company')}</p>
          <h2 id="intro-h">${tx('Ինժեներական գործընկեր՝ նախագծից մինչև շահագործում', 'An engineering partner from design to operation')}</h2>
          <div class="prose prose--lead">
            <p>${tx('Մենք աշխատում ենք այն ամենի վրա, ինչ շենքում սովորաբար չի երևում, բայց անմիջապես զգացվում է՝ ջերմություն, մաքուր օդ, խոնավություն և հանգիստ աշխատող սարքավորումներ։', 'We work on the parts of a building you rarely see but always feel: warmth, fresh air, humidity and quietly running equipment.')}</p>
            <p>${tx('Յուրաքանչյուր նախագիծ սկսում ենք օբյեկտի ուսումնասիրությունից և հաշվարկից։ Սարքավորումները ընտրում ենք դրանից հետո՝ այնպես, որ համակարգը երկար ծառայի և լինի սպասարկման համար հարմար։', 'Every project starts with a site survey and calculations. Only then do we choose the equipment, so the system lasts and is easy to maintain.')}</p>
          </div>
          <div><a class="link" href="/about">${tx('Ավելին մեր մոտեցման մասին', 'More about our approach')} ${arrow}</a></div>
        </div>
        <figure class="intro__photo rv">${photo('design', { sizes: '(min-width: 960px) 46vw, 100vw' })}</figure>
      </div>
      <ul class="focus rv">
        ${FOCUS.map((f) => html`<li><span class="focus__tag">${f.tag}</span><h3>${f.title}</h3><p>${f.text}</p></li>`)}
      </ul>
    </div>
  </section>

  <section class="sec sec--tint" aria-labelledby="svc-h">
    <div class="wrap">
      <div class="sec-head rv">
        <p class="eyebrow">${tx('Ծառայություններ', 'Services')}</p>
        <h2 id="svc-h">${tx('Ինչով կարող ենք օգնել', 'How we can help')}</h2>
        <p class="lead">${tx('Աշխատում ենք ինչպես առանձին համակարգերի, այնպես էլ համալիր նախագծերի վրա՝ նոր շինարարության և վերակառուցման դեպքում։', 'We work on single systems and complete projects, in new buildings and renovations.')}</p>
      </div>
      <div class="svc-grid rv">${SERVICES.map(serviceCard)}</div>
      <div class="inline-cta rv">
        <p><strong>${tx('Չգիտե՞ք, թե որ համակարգն է Ձեզ անհրաժեշտ։', 'Not sure which system you need?')}</strong> ${tx('Պատմեք օբյեկտի մասին, և կօգնենք ընտրել ճիշտ լուծումը։', 'Tell us about your building and we\'ll help you choose the right solution.')}</p>
        <a class="btn btn--primary" href="/contact">${tx('Ստանալ խորհրդատվություն', 'Get a consultation')} ${arrow}</a>
      </div>
    </div>
  </section>

  <section class="sec system" aria-labelledby="sys-h" id="system" data-fx="convection">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker kicker--band">${tx('Ինչպես է աշխատում', 'How it works')}</p>
        <h2 id="sys-h">${tx('Ջերմություն և մաքուր օդ՝ մեկ համակարգում', 'Heat and fresh air in one system')}</h2>
        <p class="system__lead">${tx('Պայմանական օրինակ․ ձմռանը, երբ դրսում −8 °C է, ջերմային պոմպը և տաք հատակը պահպանում են +21 °C, իսկ օդափոխման կայանքը մատակարարում է մաքուր օդ՝ վերադարձնելով արտածվող օդի ջերմությունը։', 'An illustrative example: in winter, at −8 °C outside, the heat pump and underfloor heating keep the rooms at +21 °C, while the ventilation unit supplies fresh air and recovers heat from the extracted air.')}</p>
      </div>
      <div class="system__grid">
        <figure class="system__dwg">${systemDrawing()}</figure>
        <ol class="legend">
          ${SYSTEM_CALLOUTS.map((c, i) => html`
          <li class="legend__item legend__item--${c.tone}">
            <span class="legend__n" aria-hidden="true">${i + 1}</span>
            <div><h3>${c.title}</h3><p>${c.text}</p></div>
          </li>`)}
        </ol>
      </div>
    </div>
  </section>

  <section class="sec" aria-labelledby="partners-h">
    <div class="wrap">
      <div class="sec-head rv">
        <p class="eyebrow">${tx('Գործընկերներ', 'Partners')}</p>
        <h2 id="partners-h">${tx('Արտադրողներ, որոնց հետ աշխատում ենք', 'Manufacturers we work with')}</h2>
        <p class="lead">${tx('Համագործակցում ենք եվրոպական և ասիական արտադրողների հետ, որոնց լուծումները առաջարկում ենք մեր պատվիրատուներին։', 'We partner with European and Asian manufacturers whose solutions we offer to our clients.')}</p>
      </div>
      <div class="partners rv">${PARTNERS.map((p) => partnerCard(p))}</div>
      ${partnersMore()}
    </div>
  </section>

  <section class="sec sec--tint" aria-labelledby="capt-h">
    <div class="wrap">${capillaryTeaser('capt-h')}</div>
  </section>

  ${SITE.brands.length > 0 && html`
  <section class="brands" aria-labelledby="brands-h">
    <div class="wrap brands__in">
      <h2 id="brands-h" class="eyebrow">${tx('Սարքավորումներ, որոնց հետ աշխատում ենք', 'Equipment we work with')}</h2>
      <ul>${SITE.brands.map((b) => html`<li>${b}</li>`)}</ul>
    </div>
  </section>`}

  <section class="sec" aria-labelledby="princ-h">
    <div class="wrap princ">
      <div class="princ__head rv">
        <p class="eyebrow">${tx('Ինչու ընտրել մեզ', 'Why choose us')}</p>
        <h2 id="princ-h">${tx('Մեր աշխատանքային սկզբունքները', 'How we work')}</h2>
        <p class="quote">${tx('Լավ համակարգը սկսվում է ճիշտ հարցերից, ոչ թե սարքավորումների կատալոգից։', 'A good system starts with the right questions, not with an equipment catalogue.')}</p>
      </div>
      <ul class="princ__list rv">
        ${PRINCIPLES.map((p) => html`<li><h3>${p.title}</h3><p>${p.text}</p></li>`)}
      </ul>
    </div>
  </section>

  <section class="sec sec--tint" aria-labelledby="proc-h">
    <div class="wrap">
      <div class="sec-head rv">
        <p class="eyebrow">${tx('Աշխատանքի ընթացքը', 'The process')}</p>
        <h2 id="proc-h">${tx('Առաջին զրույցից մինչև կայուն շահագործում', 'From the first conversation to reliable operation')}</h2>
      </div>
      <ol class="proc rv">
        ${PROCESS.map((p, i) => html`
          <li><span class="proc__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
          <h3><span class="vh">${tx('Քայլ', 'Step')} ${i + 1}. </span>${p.title}</h3><p>${p.text}</p></li>`)}
      </ol>
      <div class="sec-foot btns btns--row rv">
        <a class="btn btn--primary" href="/contact">${tx('Սկսել առաջին քայլից', 'Take the first step')} ${arrow}</a>
        <a class="btn btn--ghost" href="/services">${tx('Դիտել ծառայությունները', 'View services')}</a>
      </div>
    </div>
  </section>

  ${HAS_PROJECTS && html`
  <section class="sec" aria-labelledby="feat-h">
    <div class="wrap">
      <div class="sec-head rv"><p class="eyebrow">${tx('Նախագծեր', 'Projects')}</p><h2 id="feat-h">${tx('Իրականացված աշխատանքներ', 'Completed work')}</h2></div>
      <div class="pgrid rv">${PROJECTS.slice(0, 3).map(projectCard)}</div>
      <p class="more"><a class="link" href="/projects">${tx('Բոլոր նախագծերը', 'All projects')} ${arrow}</a></p>
    </div>
  </section>`}

  ${ctaBand()}`,
  mount(root) {
    mountBrandMark(root);
    // Animate the system drawing only while it is on screen.
    const sys = root.querySelector<HTMLElement>('.system');
    if (!sys || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => sys.classList.toggle('is-live', e.isIntersecting), { threshold: 0.15 });
    io.observe(sys);
    return () => io.disconnect();
  },
});
