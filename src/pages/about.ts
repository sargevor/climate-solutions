import { tx } from '../i18n';
import type { Page } from '../lib/router';
import { html } from '../lib/dom';
import { TEAM } from '../content/company';
import { ctaBand, pageHead } from '../components/blocks';

const QUALITY = tx([
  { title: 'Հաշվարկ՝ ընտրությունից առաջ', text: 'Հզորությունը որոշում ենք ջերմային բեռնվածքների և օդափոխանակության հաշվարկով՝ առանց ավելորդ պաշարի և առանց թերագնահատման։' },
  { title: 'Ամբողջ կյանքի արժեք', text: 'Տարբերակները համեմատում ենք ոչ միայն սկզբնական գնով, այլև էներգասպառմամբ, սպասարկման ծախսերով և ծառայության ժամկետով։' },
  { title: 'Մոնտաժի մշակույթ', text: 'Մեկուսացում, ամրակցում, թրթռումային միացումներ, հերմետիկություն․ համակարգի կյանքը կախված է հենց այս մանրուքներից։' },
  { title: 'Փաստաթղթավորում', text: 'Գործարկումից հետո պատվիրատուն պետք է ունենա սխեմաներ և շահագործման ցուցումներ, որպեսզի համակարգը մնա հասկանալի նաև տարիներ անց։' },
], [
  { title: 'Calculation before selection', text: 'We size equipment from heat-load and air-exchange calculations, without oversizing and without underestimating.' },
  { title: 'Whole-life cost', text: 'We compare options not only by price but by energy use, maintenance costs and service life.' },
  { title: 'Installation culture', text: 'Insulation, fixings, anti-vibration mounts, airtightness: the life of a system depends on exactly these details.' },
  { title: 'Documentation', text: 'After commissioning, the client should have diagrams and operating instructions, so the system stays understandable years later.' },
]);

const APPROACH = tx([
  { title: 'Հստակ առաջադրանք', text: 'Աշխատանքը սկսում ենք պահանջների, սահմանափակումների և ակնկալիքների համատեղ ձևակերպումից։' },
  { title: 'Թափանցիկ առաջարկ', text: 'Ներկայացնում ենք, թե ինչ է ներառված գնի մեջ, ինչ տարբերակներ կան և ինչով են դրանք տարբերվում։' },
  { title: 'Համաձայնեցված փուլեր', text: 'Յուրաքանչյուր փուլ ավարտվում է արդյունքի ներկայացմամբ և հաստատմամբ, որպեսզի անակնկալներ չլինեն։' },
  { title: 'Կապ գործարկումից հետո', text: 'Համակարգի հանձնումը համագործակցության ավարտը չէ․ պատրաստ ենք սպասարկման և խորհրդատվության։' },
], [
  { title: 'A clear brief', text: 'We start by defining the requirements, constraints and expectations together with you.' },
  { title: 'A transparent proposal', text: 'We show what the price includes, which options exist and how they differ.' },
  { title: 'Agreed stages', text: 'Each stage ends with the results presented and approved, so there are no surprises.' },
  { title: 'Support after handover', text: 'Handing over the system is not the end of our work together: we are ready to maintain it and advise you.' },
]);

export const aboutPage = (): Page => ({
  seoPath: '/about',
  navPath: '/about',
  render: () => html`
  ${pageHead({
    crumbs: [{ href: '/', label: tx('Գլխավոր', 'Home') }, { label: tx('Մեր մասին', 'About us') }],
    title: tx('Մեր մասին', 'About us'),
    photo: 'about',
    fx: 'isotherm',
    lead: tx('Climate Solutions-ը ինժեներական ընկերություն է, որը զբաղվում է ջեռուցման, օդափոխության և օդորակման համակարգերով։ Մեր նպատակն է ստեղծել տարածքներ, որտեղ հարմար է ապրել և աշխատել, իսկ համակարգերը ծառայում են երկար և խնայողաբար։', 'Climate Solutions is an engineering company specialising in heating, ventilation and air-conditioning systems. Our goal is to create spaces that are comfortable to live and work in, with systems that last and run economically.'),
  })}

  <section class="sec" aria-labelledby="mission-h">
    <div class="wrap split">
      <div class="stack rv">
        <h2 class="eyebrow" id="mission-h">${tx('Առաքելություն', 'Mission')}</h2>
        <p class="mission">${tx('Առաջարկել ինժեներական լուծումներ, որոնք հիմնված են հաշվարկի, որակյալ մոնտաժի և բաց հաղորդակցության վրա։', 'To deliver engineering solutions built on calculation, quality installation and open communication.')}</p>
      </div>
      <div class="stack rv">
        <h2 class="h2-sm">${tx('Ինժեներական մոտեցում', 'Our engineering approach')}</h2>
        <div class="prose prose--muted">
          <p>${tx('Լավ համակարգը սկսվում է ճիշտ հարցերից․ ինչպես է օգտագործվելու տարածքը, քանի մարդ է այնտեղ լինելու, որ կողմից է ընկնում արևը, ինչ էներգակիր է հասանելի։ Միայն այս պատասխաններից հետո ենք ընտրում սարքավորումները։', 'A good system starts with the right questions: how the space will be used, how many people will be there, where the sun comes from, which energy source is available. Only after answering them do we choose the equipment.')}</p>
          <p>${tx('Մենք նախընտրում ենք պարզ, հասկանալի և սպասարկման համար հարմար լուծումներ։ Բարդ համակարգը տեղին է այնտեղ, որտեղ այն իրական օգուտ է տալիս՝ հարմարավետության կամ խնայողության տեսքով։', 'We prefer simple, understandable solutions that are easy to maintain. A complex system belongs only where it brings a real benefit in comfort or savings.')}</p>
          <p>${tx('Ինժեներական համակարգերը շենքի մաս են, ուստի աշխատում ենք ճարտարապետների, կոնստրուկտորների և շինարարների հետ համաձայնեցված՝ նախագծման վաղ փուլից։', 'Building services are part of the building, so we coordinate with architects, structural engineers and builders from the early design stage.')}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec sec--tint" aria-labelledby="quality-h">
    <div class="wrap">
      <div class="sec-head rv">
        <p class="eyebrow">${tx('Որակ և արդյունավետություն', 'Quality and efficiency')}</p>
        <h2 id="quality-h">${tx('Սկզբունքներ, որոնցով առաջնորդվում ենք', 'The principles we follow')}</h2>
      </div>
      <ul class="tiles rv">${QUALITY.map((q) => html`<li><h3>${q.title}</h3><p>${q.text}</p></li>`)}</ul>
    </div>
  </section>

  <section class="sec" aria-labelledby="approach-h">
    <div class="wrap princ">
      <div class="princ__head rv">
        <p class="eyebrow">${tx('Պատվիրատուների հետ', 'Working with clients')}</p>
        <h2 id="approach-h">${tx('Ինչպես ենք կառուցում համագործակցությունը', 'How we work together')}</h2>
      </div>
      <ul class="princ__list rv">${APPROACH.map((a) => html`<li><h3>${a.title}</h3><p>${a.text}</p></li>`)}</ul>
    </div>
  </section>

  ${TEAM.length > 0 && html`
  <section class="sec sec--tint" aria-labelledby="team-h">
    <div class="wrap">
      <div class="sec-head"><p class="eyebrow"${tx('>Թիմ', 'Team')}</p><h2 id="team-h">${tx('Մեր մասնագետները', 'Our specialists')}</h2></div>
      <ul class="tiles">${TEAM.map((m) => html`
        <li>${m.photo && html`<img class="team__photo" src="${m.photo}" alt="${m.name}" loading="lazy" width="320" height="320">`}
        <h3>${m.name}</h3><p class="pcard__cat">${m.role}</p>${m.bio && html`<p>${m.bio}</p>`}</li>`)}
      </ul>
    </div>
  </section>`}

  ${ctaBand()}`,
});
