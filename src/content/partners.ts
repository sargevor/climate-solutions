import { tx } from '../i18n';

/**
 * Manufacturers we work with. Shown on the home page and on /partners.
 * Text only: no links to the partners' websites, by the company's choice.
 * Facts are taken from the manufacturers' own websites — keep it that way when editing.
 */
export interface Partner {
  id: 'clina' | 'shenling';
  /** Wordmark shown on the card. */
  name: string;
  legalName: string;
  country: string;
  /** Short line under the name. */
  field: string;
  text: string;
  focus: string[];
  tone: 'heat' | 'air' | 'leaf';
}

export const PARTNERS: Partner[] = tx<Partner[]>([
  {
    id: 'clina',
    name: 'CLINA',
    legalName: 'Clina Heiz- und Kühlelemente GmbH',
    country: 'Գերմանիա, Բեռլին',
    field: 'Կապիլյար խողովակային համակարգեր',
    text: 'Գերմանական ընկերություն, որը մշակում և արտադրում է կապիլյար խողովակային մատեր՝ առաստաղի, պատերի և հատակի միջոցով ջեռուցման և հովացման համար։ CLINA-ի թիմը այս տեխնոլոգիայով զբաղվում է 1990-ականներից, իսկ արտադրությունը գտնվում է Գերմանիայում։',
    focus: ['Կապիլյար խողովակային մատեր', 'Մակերևութային ջեռուցում և հովացում', 'GRAVIMAT կոնվեկտորներ'],
    tone: 'leaf',
  },
  {
    id: 'shenling',
    name: 'SHENLING',
    legalName: 'Guangdong Shenling Environmental Systems Co., Ltd.',
    country: 'Չինաստան, Ֆոշան',
    field: 'Կլիմայական սարքավորումներ և ջերմային պոմպեր',
    text: '2000 թվականին հիմնադրված ընկերություն, որը մշակում և արտադրում է կլիմայական սարքավորումներ, այդ թվում՝ օդ-ջուր և ջուր-ջուր արդյունաբերական ջերմային պոմպեր, ինչպես նաև լուծումներ տվյալների կենտրոնների և արտադրական գործընթացների համար։ Ընկերության բաժնետոմսերը շրջանառվում են Շենժենի ֆոնդային բորսայում։',
    focus: ['Արդյունաբերական ջերմային պոմպեր', 'Տվյալների կենտրոնների կլիմա', 'Ջերմության վերականգնում'],
    tone: 'air',
  },
], [
  {
    id: 'clina',
    name: 'CLINA',
    legalName: 'Clina Heiz- und Kühlelemente GmbH',
    country: 'Germany, Berlin',
    field: 'Capillary tube systems',
    text: 'A German company that develops and manufactures capillary tube mats for heating and cooling through ceilings, walls and floors. The CLINA team has worked on this technology since the 1990s, and production is in Germany.',
    focus: ['Capillary tube mats', 'Surface heating and cooling', 'GRAVIMAT convectors'],
    tone: 'leaf',
  },
  {
    id: 'shenling',
    name: 'SHENLING',
    legalName: 'Guangdong Shenling Environmental Systems Co., Ltd.',
    country: 'China, Foshan',
    field: 'Climate equipment and heat pumps',
    text: 'Founded in 2000, the company develops and manufactures climate-control equipment, including air-source and water-source industrial heat pumps and solutions for data centres and industrial processes. Its shares are listed on the Shenzhen Stock Exchange.',
    focus: ['Industrial heat pumps', 'Data centre cooling', 'Heat recovery'],
    tone: 'air',
  },
]);
