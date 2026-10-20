import { SITE } from '../config/site';

const alt = `${SITE.name} — ${SITE.nameHy}`;
const img = (file: string, cls: string) =>
  `<picture><source srcset="/${file}.webp" type="image/webp"><img class="logo ${cls}" src="/${file}.png" width="640" height="215" alt="${alt}"></picture>`;

/**
 * Company logo.
 * - 'auto'  : original colors on light backgrounds, light-on-dark version in dark theme (header).
 * - 'dark'  : always the light-on-dark version (footer, dark bands).
 * The light-on-dark file (public/logo-on-dark.*) is the original artwork with only the dark
 * petrol colors lightened. Replace it with an official reversed logo if one exists.
 */
export const logo = (on: 'auto' | 'dark' = 'auto') =>
  on === 'dark'
    ? img('logo-on-dark', 'logo--on-dark')
    : `<span class="logo-swap">${img('logo', 'logo--on-light')}${img('logo-on-dark', 'logo--on-dark')}</span>`;

/** Just the round mark (gear + leaf), for the compact header. */
export const logoMark = () =>
  `<picture><source srcset="/logo-mark.webp" type="image/webp"><img class="logo-mark" src="/logo-mark.png" width="128" height="128" alt=""></picture>`;
