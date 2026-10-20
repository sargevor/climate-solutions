import { tx } from '../i18n';

/** Աշխատանքային սկզբունքներ («Ինչու ընտրել մեզ»)՝ արժեքներ, ոչ թե չստուգված ձեռքբերումներ։ */
export const PRINCIPLES = tx([
  { title: 'Անհատական մոտեցում', text: 'Յուրաքանչյուր օբյեկտ ունի իր կառուցվածքը, կողմնորոշումը և օգտագործման ռեժիմը։ Լուծումը ձևավորում ենք դրանց հիման վրա։' },
  { title: 'Տեխնիկապես հիմնավորված լուծումներ', text: 'Սարքավորումների ընտրությունը հիմնվում է հաշվարկի վրա՝ առանց հզորության ավելորդ պաշարի և առանց թերագնահատման։' },
  { title: 'Էներգաարդյունավետություն', text: 'Համեմատում ենք ոչ միայն սկզբնական արժեքը, այլև տարիների ընթացքում շահագործման ծախսերը։' },
  { title: 'Մոնտաժի որակ', text: 'Ուշադրություն ենք դարձնում մանրուքներին՝ խողովակների մեկուսացումից մինչև թրթռումային միացումներ, քանի որ դրանցից է կախված համակարգի կյանքը։' },
  { title: 'Հստակ հաղորդակցություն', text: 'Լուծումները բացատրում ենք հասկանալի լեզվով, յուրաքանչյուր փուլ համաձայնեցնում ենք և կապի մեջ ենք մնում նաև գործարկումից հետո։' },
], [
  { title: 'An individual approach', text: 'Every building has its own structure, orientation and pattern of use. We shape the solution around them.' },
  { title: 'Technically sound solutions', text: 'Equipment is selected from calculations, without oversizing and without underestimating the load.' },
  { title: 'Energy efficiency', text: 'We compare not only the purchase price but also the running costs over the years.' },
  { title: 'Quality installation', text: 'We pay attention to the details, from pipe insulation to anti-vibration mounts, because the life of the system depends on them.' },
  { title: 'Clear communication', text: 'We explain our solutions in plain language, agree each stage with you and stay in touch after commissioning.' },
]);

/** Աշխատանքի փուլերը։ Կարգը կարևոր է։ */
export const PROCESS = tx([
  { title: 'Նախնական խորհրդատվություն', text: 'Քննարկում ենք Ձեր պահանջները, օբյեկտը և ժամկետները, պատասխանում հարցերին։' },
  { title: 'Օբյեկտի և պահանջների ուսումնասիրություն', text: 'Այցելում ենք օբյեկտ, ծանոթանում փաստաթղթերին և գնահատում առկա պայմանները։' },
  { title: 'Տեխնիկական լուծումների մշակում', text: 'Կատարում ենք հաշվարկներ և առաջարկում տարբերակներ՝ համեմատելով արժեքը և շահագործման ծախսերը։' },
  { title: 'Նախագծում և իրականացում', text: 'Մշակում ենք նախագիծը, մատակարարում սարքավորումները և կատարում մոնտաժը։' },
  { title: 'Ստուգում և հետագա սպասարկում', text: 'Գործարկում և կարգաբերում ենք համակարգը, փոխանցում փաստաթղթերը և ապահովում սպասարկում։' },
], [
  { title: 'Initial consultation', text: 'We discuss your requirements, the building and the timeline, and answer your questions.' },
  { title: 'Site and requirements survey', text: 'We visit the site, review the documents and assess the existing conditions.' },
  { title: 'Technical solution', text: 'We run the calculations and propose options, comparing cost and running expenses.' },
  { title: 'Design and installation', text: 'We prepare the design, supply the equipment and carry out the installation.' },
  { title: 'Testing and ongoing service', text: 'We commission and fine-tune the system, hand over the documentation and provide maintenance.' },
]);

export const FOCUS = tx([
  { tag: 'Հարմարավետություն', title: 'Կայուն միկրոկլիմա', text: 'Հավասարաչափ ջերմաստիճան, մաքուր օդ և հանգիստ աշխատող սարքավորումներ։' },
  { tag: 'Արդյունավետություն', title: 'Խելամիտ էներգասպառում', text: 'Լուծումներ, որոնք հաշվի են առնում ոչ միայն գինը, այլև շահագործման ծախսերը։' },
  { tag: 'Որակ', title: 'Մանրակրկիտ մոնտաժ', text: 'Ուշադրություն նախագծի մանրամասներին և աշխատանքի կատարմանը տեղում։' },
  { tag: 'Հուսալիություն', title: 'Պատասխանատու իրականացում', text: 'Համաձայնեցված փուլեր, հստակ ժամկետներ և աջակցություն գործարկումից հետո։' },
], [
  { tag: 'Comfort', title: 'A stable indoor climate', text: 'Even temperatures, fresh air and quiet equipment.' },
  { tag: 'Efficiency', title: 'Sensible energy use', text: 'Solutions that consider running costs, not just the price.' },
  { tag: 'Quality', title: 'Careful installation', text: 'Attention to the design details and to the work on site.' },
  { tag: 'Reliability', title: 'Responsible delivery', text: 'Agreed stages, clear timelines and support after commissioning.' },
]);

/** Թիմ։ Լրացնել ՄԻԱՅՆ իրական տվյալներով. դատարկ զանգվածի դեպքում բաժինը չի ցուցադրվում։ */
export const TEAM: { name: string; role: string; bio?: string; photo?: string }[] = [];
