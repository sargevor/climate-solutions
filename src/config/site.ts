import { tx } from '../i18n';
import { PROJECTS } from '../content/projects';

/**
 * Company details. Change them here and the whole site updates.
 * Text that differs by language is written as tx('Հայերեն', 'English').
 */
export const SITE = {
  name: 'Climate Solutions',
  nameHy: 'Քլիմաթ Սոլուշնզ',
  tagline: tx('HVAC ինժեներական լուծումներ', 'HVAC engineering solutions'),
  description: tx(
    'Ջեռուցման, օդափոխության և օդորակման համակարգերի նախագծում, մոնտաժ և սպասարկում Հայաստանում։',
    'Design, installation and maintenance of heating, ventilation and air-conditioning systems in Armenia.',
  ),

  contacts: {
    /** Phone in +374 XX XXX XXX format (8 digits after +374). Hidden on the site if the format is wrong. */
    phone: '+374 99 999 999',
    email: 'info@climatesolutions.am',
    address: tx('ՀՀ, ք. Երևան, Բագրևանդ 52/12', '52/12 Bagrevand St, Yerevan, Armenia'),
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Bagrevand 52/12, Yerevan, Armenia'),
    /** e.g. tx('Երկ–Ուրբ, 09:00–18:00', 'Mon–Fri, 9:00–18:00'). Empty = not shown. */
    hours: '',
  },

  /**
   * Trust figures on the home page, e.g. { value: '12', label: tx('տարվա փորձ', 'years of experience') }.
   * Real, verifiable numbers only. Empty = not shown.
   */
  stats: [] as { value: string; label: string }[],

  /** Equipment brands you actually install (e.g. 'Daikin'). Shown as text. Empty = not shown. */
  brands: [] as string[],

  /** Social links: { label: 'Facebook', url: 'https://…' }. Empty = not shown. */
  social: [] as { label: string; url: string }[],

  form: {
    /**
     * Where the contact form is sent. In production builds it defaults to the bundled
     * PHP script (public/api/contact.php). Override with VITE_FORM_ENDPOINT if needed.
     */
    endpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? (import.meta.env.PROD ? '/api/contact.php' : ''),
  },
};

export type NavItem = { href: string; label: string };

/** The Projects page appears only once real projects are added. */
export const HAS_PROJECTS = PROJECTS.length > 0;

const ALL_NAV: NavItem[] = [
  { href: '/', label: tx('Գլխավոր', 'Home') },
  { href: '/about', label: tx('Մեր մասին', 'About') },
  { href: '/services', label: tx('Ծառայություններ', 'Services') },
  { href: '/projects', label: tx('Նախագծեր', 'Projects') },
  { href: '/contact', label: tx('Կապ', 'Contact') },
];

export const NAV: NavItem[] = ALL_NAV.filter((n) => n.href !== '/projects' || HAS_PROJECTS);

/** Digits after the country code must be exactly 8 for an Armenian number. */
const phoneDigits = SITE.contacts.phone.replace(/\D/g, '');
export const hasPhone = /^374\d{8}$/.test(phoneDigits);
export const phoneHref = '+' + phoneDigits;
