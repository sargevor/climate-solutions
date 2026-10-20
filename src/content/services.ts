import type { IconName } from '../lib/icons';
import type { PhotoKey } from './photos';
import { tx } from '../i18n';

/** Color coding: heat = warm red/orange, air = cool blue, leaf = efficiency green, brand = engineering teal */
export type Tone = 'heat' | 'air' | 'leaf' | 'brand';

export interface Service {
  /** URL-ի մաս՝ /services/<slug> */
  slug: string;
  icon: IconName;
  tone: Tone;
  photo: PhotoKey;
  title: string;
  short: string;
  intro: string;
  includes: string[];
  buildings: string[];
  problems: string[];
  needed: string[];
}

/** Armenian service texts. Add, remove or edit services here (and in SERVICES_EN below). */
const SERVICES_HY: Service[] = [
  {
    slug: 'design',
    icon: 'design',
    tone: 'brand',
    photo: 'design',
    title: 'HVAC համակարգերի նախագծում',
    short: 'Ջեռուցման, օդափոխության և օդորակման համալիր նախագծում՝ ջերմային բեռնվածքների հաշվարկից մինչև աշխատանքային գծագրեր։',
    intro:
      'Լավ աշխատող համակարգը սկսվում է ճիշտ նախագծից։ Հաշվարկում ենք շենքի ջերմային և սառեցման բեռնվածքները, օդափոխանակության պահանջները և ընտրում այն սխեման, որը համապատասխանում է օբյեկտին, բյուջեին և շահագործման պայմաններին։',
    includes: [
      'Ջերմային և սառեցման բեռնվածքների հաշվարկ',
      'Օդափոխանակության հաշվարկ՝ ըստ տարածքների նշանակության',
      'Համակարգի սկզբունքային սխեմայի ընտրություն և հիմնավորում',
      'Սարքավորումների ընտրություն և տեխնիկական բնութագրեր',
      'Աշխատանքային գծագրեր և նյութերի ցանկ',
    ],
    buildings: ['Առանձնատներ', 'Բազմաբնակարան շենքեր', 'Գրասենյակներ', 'Առևտրային և հասարակական տարածքներ', 'Արտադրական օբյեկտներ'],
    problems: [
      'Սխալ ընտրված հզորություն և ավելորդ ծախսեր',
      'Անհավասար ջերմաստիճան տարբեր սենյակներում',
      'Սարքավորումների աղմուկ',
      'Համակարգերի անհամատեղելիություն ճարտարապետական լուծումների հետ',
    ],
    needed: [
      'Ճարտարապետական հատակագծեր և կտրվածքներ (եթե առկա են)',
      'Տարածքների նշանակությունը և մարդկանց մոտավոր քանակը',
      'Հասանելի էներգակիրները՝ գազ, էլեկտրաէներգիա',
      'Ցանկալի ժամկետները և բյուջեի կողմնորոշիչը',
    ],
  },
  {
    slug: 'heating',
    icon: 'heating',
    tone: 'heat',
    photo: 'heating',
    title: 'Ջեռուցման համակարգեր',
    short: 'Կաթսայատներ, ջերմային պոմպեր, տաք հատակ և ռադիատորային համակարգեր՝ ընտրված ըստ շենքի և էներգակրի։',
    intro:
      'Ջեռուցման համակարգը պետք է տաքացնի հավասարաչափ, աշխատի լուռ և չծախսի ավելին, քան անհրաժեշտ է։ Ընտրում ենք ջերմության աղբյուրը և բաշխման եղանակը՝ հաշվի առնելով շենքի ջերմամեկուսացումը, էներգակիրը և օգտագործման ռեժիմը։',
    includes: [
      'Ջերմության աղբյուրի ընտրություն՝ գազային կաթսա, ջերմային պոմպ կամ համակցված լուծում',
      'Ռադիատորային և հատակային ջեռուցում',
      'Կաթսայատան սխեմա և խողովակաշարեր',
      'Համակարգի հիդրավլիկ հավասարակշռում',
      'Ավտոմատ կառավարում՝ ըստ արտաքին ջերմաստիճանի',
    ],
    buildings: ['Առանձնատներ', 'Բնակարաններ', 'Գրասենյակներ', 'Հասարակական շենքեր', 'Արտադրական տարածքներ'],
    problems: [
      'Սառը սենյակներ և անհավասար տաքացում',
      'Գազի կամ էլեկտրաէներգիայի բարձր ծախս',
      'Աղմկոտ խողովակներ և օդի կուտակում համակարգում',
      'Հնացած և անարդյունավետ կաթսաներ',
    ],
    needed: [
      'Ջեռուցվող մակերեսը և հարկերի քանակը',
      'Պատերի և պատուհանների մոտավոր տեսակը',
      'Առկա համակարգի նկարագրություն (եթե կա)',
      'Հասանելի էներգակիրը',
    ],
  },
  {
    slug: 'ventilation',
    icon: 'ventilation',
    tone: 'air',
    photo: 'ventilation',
    title: 'Օդափոխության համակարգեր',
    short: 'Ներհոսքային և արտածման օդափոխություն, ջերմության վերականգնմամբ սարքեր՝ մաքուր օդ առանց ավելորդ ջերմակորուստների։',
    intro:
      'Մաքուր օդը ազդում է առողջության, աշխատունակության և շենքի վիճակի վրա։ Նախագծում և տեղադրում ենք օդափոխության համակարգեր, որոնք ապահովում են անհրաժեշտ օդափոխանակությունը՝ առանց միջանցիկ քամու, աղմուկի և ավելորդ ջերմակորուստի։',
    includes: [
      'Ներհոսքային և արտածման համակարգեր',
      'Ռեկուպերատորներ՝ արտածվող օդի ջերմության վերականգնմամբ',
      'Խոհանոցների, սանհանգույցների և ավտոկայանատեղերի արտածում',
      'Օդատարների ցանցի և օդաբաշխիչների նախագծում',
      'Աղմուկի և թրթռման նվազեցում',
    ],
    buildings: ['Բնակարաններ և առանձնատներ', 'Գրասենյակներ', 'Ռեստորաններ և սրճարաններ', 'Մարզասրահներ', 'Պահեստներ և արտադրամասեր'],
    problems: [
      'Խեղդվածություն և ածխաթթու գազի բարձր մակարդակ',
      'Խոնավություն, քրտնած պատուհաններ և բորբոս',
      'Տհաճ հոտեր',
      'Ձմռանը մեծ ջերմակորուստ բաց պատուհաններից',
    ],
    needed: [
      'Տարածքների ցանկը և նշանակությունը',
      'Առաստաղի բարձրությունը և կախովի առաստաղի առկայությունը',
      'Սարքավորումների տեղադրման հնարավոր տեղերը',
      'Աղմուկի նկատմամբ պահանջները',
    ],
  },
  {
    slug: 'air-conditioning',
    icon: 'ac',
    tone: 'air',
    photo: 'airConditioning',
    title: 'Օդորակում և կլիմայի կառավարում',
    short: 'Split, multi-split և VRF համակարգեր, չիլլեր-ֆանկոյլներ և կենտրոնացված կառավարում՝ կայուն միկրոկլիմայի համար։',
    intro:
      'Երևանի շոգ ամառը օդորակումը դարձնում է հարմարավետության անհրաժեշտ մաս։ Ընտրում ենք համակարգ, որը համապատասխանում է տարածքների չափին, արևային բեռնվածքին և ճակատի պահանջներին, և կազմակերպում ենք դրա կառավարումը՝ մեկ սենյակից մինչև ամբողջ շենք։',
    includes: [
      'Պատային, առաստաղային և կանալային օդորակիչներ',
      'VRF բազմագոտի համակարգեր (փոփոխական սառնագենտի հոսքով)',
      'Չիլլեր-ֆանկոյլ համակարգեր',
      'Կլիմայի կենտրոնացված և գոտիական կառավարում',
      'Ջերմաստիճանի և խոնավության կարգավորում',
    ],
    buildings: ['Բնակարաններ և առանձնատներ', 'Գրասենյակներ', 'Հյուրանոցներ', 'Առևտրային տարածքներ', 'Սերվերային և տեխնիկական սենյակներ'],
    problems: [
      'Ամռանը գերտաքացում',
      'Տարբեր գոտիների տարբեր պահանջներ',
      'Արտաքին բլոկների տեղադրման սահմանափակումներ և ճակատի տեսքի պահպանում',
      'Բարձր էներգասպառում',
    ],
    needed: [
      'Տարածքների մակերեսը և կողմնորոշումը',
      'Ապակեպատման մոտավոր չափը',
      'Արտաքին բլոկների տեղադրման թույլատրելի տեղերը',
      'Կառավարման ցանկալի մակարդակը',
    ],
  },
  {
    slug: 'energy-efficiency',
    icon: 'efficiency',
    tone: 'leaf',
    photo: 'efficiency',
    title: 'Էներգաարդյունավետ լուծումներ',
    short: 'Ջերմային պոմպեր, ջերմության վերականգնում և ավտոմատացում՝ շահագործման ծախսերը նվազեցնելու համար։',
    intro:
      'Ինժեներական համակարգերը շենքի էներգասպառման մեծ մասն են կազմում։ Գնահատում ենք առկա իրավիճակը և առաջարկում միջոցառումներ, որոնց արդյունավետությունը կարելի է հաշվարկել ու համեմատել ներդրման հետ։',
    includes: [
      'Առկա համակարգի էներգասպառման գնահատում',
      'Ջերմային պոմպերի և ռեկուպերացիայի կիրառման հնարավորությունների վերլուծություն',
      'Ավտոմատացում և ժամանակացույցով կառավարում',
      'Պոմպերի և օդափոխիչների փոփոխական արագությամբ կառավարում',
      'Ներդրման և սպասվող խնայողության համեմատական հաշվարկ',
    ],
    buildings: ['Առանձնատներ', 'Գրասենյակային շենքեր', 'Հյուրանոցներ', 'Կրթական և հասարակական շենքեր', 'Արտադրական օբյեկտներ'],
    problems: [
      'Բարձր կոմունալ վճարներ',
      'Համակարգերի աշխատանք դատարկ տարածքներում',
      'Հնացած, անարդյունավետ սարքավորումներ',
      'Ջերմության կորուստ օդափոխության միջոցով',
    ],
    needed: [
      'Վերջին 12 ամսվա էներգակիրների հաշիվները',
      'Առկա սարքավորումների ցանկը',
      'Շենքի օգտագործման ռեժիմը',
      'Նախատեսվող ներդրման մոտավոր շրջանակը',
    ],
  },
  {
    slug: 'maintenance',
    icon: 'maintenance',
    tone: 'brand',
    photo: 'maintenance',
    title: 'Տեխնիկական սպասարկում և համակարգերի արդիականացում',
    short: 'Պլանային սպասարկում, անսարքությունների ախտորոշում և հնացած համակարգերի փուլային արդիականացում։',
    intro:
      'Կանոնավոր սպասարկումը երկարացնում է սարքավորումների կյանքը և պահպանում դրանց արդյունավետությունը։ Իսկ երբ համակարգը հնացել է, առաջարկում ենք արդիականացում փուլերով՝ առանց ամեն ինչ միանգամից փոխարինելու։',
    includes: [
      'Պլանային և սեզոնային սպասարկում',
      'Ֆիլտրերի և ջերմափոխանակիչների մաքրում',
      'Անսարքությունների ախտորոշում',
      'Կարգաբերում և հիդրավլիկ հավասարակշռում',
      'Հին համակարգերի արդիականացման ծրագրի մշակում',
    ],
    buildings: ['Բնակելի շենքեր', 'Գրասենյակներ', 'Առևտրային տարածքներ', 'Արտադրական օբյեկտներ'],
    problems: [
      'Հաճախակի խափանումներ',
      'Հզորության նվազում',
      'Աղմուկ և թրթռում',
      'Սպասարկման պատմության և փաստաթղթերի բացակայություն',
    ],
    needed: [
      'Սարքավորումների մակնիշը և մոտավոր տարիքը',
      'Խնդրի նկարագրությունը',
      'Սպասարկման նախորդ փաստաթղթերը (եթե կան)',
    ],
  },
];

/** English service texts — same order and slugs as SERVICES_HY. */
const SERVICES_EN: Service[] = [
  {
    slug: 'design', icon: 'design', tone: 'brand', photo: 'design',
    title: 'HVAC system design',
    short: 'Complete heating, ventilation and air-conditioning design, from heat-load calculations to working drawings.',
    intro: 'A system that works well starts with the right design. We calculate the building\'s heating and cooling loads and its air-exchange needs, then choose the system that fits the building, the budget and the way it will be used.',
    includes: ['Heating and cooling load calculations', 'Air-exchange calculations for each type of room', 'Choice and justification of the system concept', 'Equipment selection and technical specifications', 'Working drawings and bill of materials'],
    buildings: ['Private houses', 'Apartment buildings', 'Offices', 'Retail and public spaces', 'Industrial facilities'],
    problems: ['Wrongly sized equipment and unnecessary costs', 'Uneven temperatures between rooms', 'Noisy equipment', 'Systems that clash with the architecture'],
    needed: ['Architectural plans and sections (if available)', 'What each room is used for and roughly how many people use it', 'Available energy sources: gas, electricity', 'Preferred timeline and a budget range'],
  },
  {
    slug: 'heating', icon: 'heating', tone: 'heat', photo: 'heating',
    title: 'Heating systems',
    short: 'Boiler rooms, heat pumps, underfloor and radiator heating, chosen to suit the building and the energy source.',
    intro: 'A heating system should heat evenly, run quietly and use no more energy than it needs. We choose the heat source and the way heat is distributed based on the building\'s insulation, energy source and how it is used.',
    includes: ['Choice of heat source: gas boiler, heat pump or a combination', 'Radiator and underfloor heating', 'Boiler-room layout and pipework', 'Hydraulic balancing of the system', 'Weather-compensated automatic control'],
    buildings: ['Private houses', 'Apartments', 'Offices', 'Public buildings', 'Industrial spaces'],
    problems: ['Cold rooms and uneven heating', 'High gas or electricity bills', 'Noisy pipes and air locks', 'Old, inefficient boilers'],
    needed: ['Heated floor area and number of floors', 'Approximate wall and window type', 'Description of the existing system (if any)', 'Available energy source'],
  },
  {
    slug: 'ventilation', icon: 'ventilation', tone: 'air', photo: 'ventilation',
    title: 'Ventilation systems',
    short: 'Supply and extract ventilation and heat-recovery units: fresh air without wasting heat.',
    intro: 'Fresh air affects health, productivity and the condition of the building. We design and install ventilation that delivers the air exchange you need, without draughts, noise or unnecessary heat loss.',
    includes: ['Supply and extract systems', 'Heat-recovery units that reuse heat from extracted air', 'Extraction for kitchens, bathrooms and car parks', 'Ductwork and air-diffuser design', 'Noise and vibration control'],
    buildings: ['Apartments and houses', 'Offices', 'Restaurants and cafés', 'Gyms', 'Warehouses and workshops'],
    problems: ['Stuffy air and high CO₂ levels', 'Damp, condensation on windows and mould', 'Unpleasant smells', 'Heat lost through open windows in winter'],
    needed: ['List of rooms and their use', 'Ceiling height and whether there is a suspended ceiling', 'Possible locations for the equipment', 'Noise requirements'],
  },
  {
    slug: 'air-conditioning', icon: 'ac', tone: 'air', photo: 'airConditioning',
    title: 'Air conditioning and climate control',
    short: 'Split, multi-split and VRF systems, chillers with fan coils, and central control for a stable indoor climate.',
    intro: 'Yerevan\'s hot summers make air conditioning part of everyday comfort. We choose a system that matches the size of the rooms, the solar load and the requirements for the façade, and set up control for anything from one room to a whole building.',
    includes: ['Wall-mounted, ceiling and ducted air conditioners', 'VRF multi-zone systems (variable refrigerant flow)', 'Chiller and fan-coil systems', 'Central and zone climate control', 'Temperature and humidity control'],
    buildings: ['Apartments and houses', 'Offices', 'Hotels', 'Retail spaces', 'Server and technical rooms'],
    problems: ['Overheating in summer', 'Different zones needing different settings', 'Limited places for outdoor units and keeping the façade tidy', 'High energy use'],
    needed: ['Floor area and orientation of the rooms', 'Approximate amount of glazing', 'Where outdoor units may be installed', 'How much control you want'],
  },
  {
    slug: 'energy-efficiency', icon: 'efficiency', tone: 'leaf', photo: 'efficiency',
    title: 'Energy-efficient solutions',
    short: 'Heat pumps, heat recovery and automation to cut running costs.',
    intro: 'Building services account for a large share of a building\'s energy use. We assess the current situation and propose measures whose savings can be calculated and compared with the investment.',
    includes: ['Assessment of the existing system\'s energy use', 'Analysis of where heat pumps and heat recovery make sense', 'Automation and scheduled control', 'Variable-speed control of pumps and fans', 'Comparison of investment and expected savings'],
    buildings: ['Private houses', 'Office buildings', 'Hotels', 'Schools and public buildings', 'Industrial facilities'],
    problems: ['High utility bills', 'Systems running in empty spaces', 'Old, inefficient equipment', 'Heat lost through ventilation'],
    needed: ['Energy bills for the last 12 months', 'List of existing equipment', 'How the building is used', 'Approximate budget for the investment'],
  },
  {
    slug: 'maintenance', icon: 'maintenance', tone: 'brand', photo: 'maintenance',
    title: 'Maintenance and system upgrades',
    short: 'Scheduled maintenance, fault diagnosis and step-by-step upgrades of older systems.',
    intro: 'Regular maintenance extends equipment life and keeps it efficient. When a system is outdated, we propose upgrading it in stages instead of replacing everything at once.',
    includes: ['Scheduled and seasonal maintenance', 'Cleaning of filters and heat exchangers', 'Fault diagnosis', 'Commissioning and hydraulic balancing', 'Upgrade plans for older systems'],
    buildings: ['Residential buildings', 'Offices', 'Retail spaces', 'Industrial facilities'],
    problems: ['Frequent breakdowns', 'Loss of capacity', 'Noise and vibration', 'No maintenance history or documentation'],
    needed: ['Equipment brand and approximate age', 'Description of the problem', 'Previous maintenance records (if any)'],
  },
];

export const SERVICES: Service[] = tx(SERVICES_HY, SERVICES_EN);

export const findService = (slug: string) => SERVICES.find((s) => s.slug === slug);
