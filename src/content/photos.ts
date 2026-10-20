/**
 * Photos used on the site.
 *
 * All photos are from Unsplash and free to use commercially under the Unsplash License
 * (https://unsplash.com/license), which does not require attribution. They illustrate the type of work; they are NOT the
 * company's own projects and must not be presented as such.
 *
 * To replace a photo with your own: put the file in public/photos/ and set `src`
 * (e.g. src: '/photos/our-rooftop.webp'). Own photos always take priority.
 */
import { tx } from '../i18n';

export interface Photo {
  /** Unsplash image id (the "photo-…" part of the image URL) */
  unsplashId?: string;
  /** Own photo path in public/, used instead of Unsplash when set */
  src?: string;
  /** Armenian description for screen readers */
  alt: string;
  /** Intrinsic aspect ratio used to reserve space (width / height) */
  ratio: number;
  /** Optional CSS object-position for cropping */
  focus?: string;
  credit?: { name: string; url: string };
}

export const PHOTOS = {
  hero: {
    unsplashId: 'photo-1590620284812-3216c0ea0a75',
    alt: tx('Լուսավոր տարածքի առաստաղ՝ բաց օդատարներով, օդաբաշխիչով և լուսատուներով', 'Bright ceiling with exposed ducts, an air diffuser and lights'),
    ratio: 3 / 2,
    focus: '50% 40%',
    credit: { name: 'Drew Beamer', url: 'https://unsplash.com/@dbeamer_jpg' },
  },
  about: {
    unsplashId: 'photo-1531973576160-7125cd663d86',
    alt: tx('Բաց գրասենյակային տարածք՝ առաստաղի տակ տեսանելի օդափոխության օդատարներով', 'Open-plan office with ventilation ducts visible under the ceiling'),
    ratio: 3 / 2,
    credit: { name: 'LYCS Architecture', url: 'https://unsplash.com/@lycs' },
  },
  design: {
    unsplashId: 'photo-1503387762-592deb58ef4e',
    alt: tx('Ինժեները աշխատում է տեխնիկական գծագրի վրա՝ մատիտով և քանոնով', 'Engineer working on a technical drawing with a pencil and ruler'),
    ratio: 3 / 2,
    credit: { name: 'Daniel McCullough', url: 'https://unsplash.com/@d_mccullough' },
  },
  heating: {
    unsplashId: 'photo-1772066043908-0033fd15ecc4',
    alt: tx('Սպիտակ ռադիատոր բաց կանաչ պատի մոտ', 'White radiator against a pale green wall'),
    ratio: 3 / 2,
    credit: { name: 'Andrew Bright', url: 'https://unsplash.com/@andrew_bright' },
  },
  ventilation: {
    unsplashId: 'photo-1574334292321-4844f63aefef',
    alt: tx('Օդափոխության մետաղական օդատարներ առաստաղի տակ', 'Metal ventilation ducts under a ceiling'),
    ratio: 3 / 2,
    credit: { name: 'Mitchell Luo', url: 'https://unsplash.com/@mitchel3uo' },
  },
  airConditioning: {
    unsplashId: 'photo-1698479603408-1a66a6d9e80f',
    alt: tx('Օդորակման արտաքին բլոկներ՝ վերևից', 'Air-conditioning outdoor units seen from above'),
    ratio: 3 / 2,
    credit: { name: 'Kettenreaktion', url: 'https://unsplash.com/@kettenreaktion' },
  },
  efficiency: {
    unsplashId: 'photo-1776860150272-653efc74193c',
    alt: tx('Ջերմային պոմպի արտաքին բլոկ ժամանակակից շենքի մոտ', 'Heat pump outdoor unit next to a modern building'),
    ratio: 3 / 2,
    credit: { name: 'alpha innotec', url: 'https://unsplash.com/@alpha_innotec' },
  },
  maintenance: {
    unsplashId: 'photo-1769695832228-ab959c7c7e0d',
    alt: tx('Տեխնիկական սենյակ՝ խողովակաշարերով, պոմպերով և բաքերով', 'Plant room with pipework, pumps and tanks'),
    ratio: 3 / 2,
    credit: { name: 'Haberdoedas', url: 'https://unsplash.com/@haberdoedas' },
  },
  contact: {
    unsplashId: 'photo-1776860155275-eee24bfb1dee',
    alt: tx('Ժամանակակից տան մուտք՝ ջերմային պոմպի արտաքին բլոկով', 'Modern house entrance with a heat pump outdoor unit'),
    ratio: 3 / 2,
    credit: { name: 'alpha innotec', url: 'https://unsplash.com/@alpha_innotec' },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;
