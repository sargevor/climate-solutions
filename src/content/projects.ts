import { tx } from '../i18n';

export type ProjectCategory = 'residential' | 'commercial' | 'office' | 'industrial';

export interface Project {
  category: ProjectCategory;
  title: string;
  description: string;
  /** Լուսանկար public/ թղթապանակից, օր.՝ '/projects/office-1.webp' */
  image?: string;
  imageAlt?: string;
  /** Տեխնիկական մանրամասներ՝ [պիտակ, արժեք] */
  details?: [string, string][];
}

export const CATEGORIES: { id: ProjectCategory; label: string; one: string }[] = [
  { id: 'residential', label: tx('Բնակելի շենքեր', 'Residential buildings'), one: tx('Բնակելի շենք', 'Residential building') },
  { id: 'commercial', label: tx('Կոմերցիոն տարածքներ', 'Commercial spaces'), one: tx('Կոմերցիոն տարածք', 'Commercial space') },
  { id: 'office', label: tx('Գրասենյակներ', 'Offices'), one: tx('Գրասենյակ', 'Office') },
  { id: 'industrial', label: tx('Արտադրական օբյեկտներ', 'Industrial facilities'), one: tx('Արտադրական օբյեկտ', 'Industrial facility') },
];

/**
 * ԻՐԱԿԱՆ նախագծեր։ Ավելացրեք միայն իրական, հաստատված տվյալներ։
 * Քանի դեռ զանգվածը դատարկ է, «Նախագծեր» էջը և բաժինը ամբողջությամբ թաքցված են
 * (նավարկությունից, գլխավոր էջից, sitemap-ից)։ Առաջին իրական նախագիծն ավելացնելուց հետո
 * դրանք ավտոմատ կհայտնվեն. հեռացրեք նաև "/projects"-ը seo.json-ի hiddenRoutes-ից։
 *
 * Օրինակ՝
 * { category: 'office', title: '…', description: '…', image: '/projects/office-1.webp',
 *   imageAlt: '…', details: [['Մակերես', '1200 մ²'], ['Համակարգ', 'VRF']] }
 */
export const PROJECTS: Project[] = [];
