# Climate Solutions — website

Corporate website for Climate Solutions (Քլիմաթ Սոլուշնզ), an HVAC engineering company in Yerevan.
All visitor-facing content is in Eastern Armenian.

**Stack:** TypeScript + plain CSS, built with Vite. No framework, no runtime dependencies
(fonts are self-hosted from `@fontsource`).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, production build to dist/, per-page SEO files + sitemap
npm run preview    # serve the production build locally
```

Requires Node.js 18 or newer.

## Where to edit things

| What | File |
|---|---|
| Company name, phone, email, address, social links, working hours | `src/config/site.ts` |
| Page titles and meta descriptions (Armenian and English) | `src/config/seo.json` |
| Services (title, description, includes, buildings, problems, what's needed) | `src/content/services.ts` |
| Working principles, process steps, team | `src/content/company.ts` |
| Projects (real only) | `src/content/projects.ts` |
| Photos (Unsplash or your own) | `src/content/photos.ts` |
| Trust figures and equipment brands (empty = hidden) | `src/config/site.ts` → `stats`, `brands` |
| Colors, fonts, type scale | `src/styles/tokens.css` |
| Logo and icons | `public/` |

### Projects page (hidden until you add real projects)
The Projects page, its menu item and the home-page section are hidden while `PROJECTS` is empty,
so the site never shows placeholder work. To publish it:
1. Put photos in `public/projects/` (WebP, ~1600 px wide).
2. Add entries to `PROJECTS` in `src/content/projects.ts`.
3. Remove `"/projects"` from `hiddenRoutes` in `src/config/seo.json` (adds it to the sitemap).

### Phone number
`src/config/site.ts` → `contacts.phone`, written as `+374 XX XXX XXX`. The number is shown only
if it has exactly 8 digits after +374; otherwise it is hidden everywhere.

### Languages (Armenian and English)
Armenian pages live at `/…` and English pages at `/en/…` (e.g. `/en/about`). The ՀԱՅ | EN switch
in the header (and in the phone menu) opens the same page in the other language.
- In page files, text is written as `tx('Հայերեն տեքստ', 'English text')`. Edit both parts.
- Service texts: `SERVICES_HY` and `SERVICES_EN` in `src/content/services.ts` (same order and slugs).
- Principles, process steps, "focus" points: `src/content/company.ts`, each as `tx([Armenian list], [English list])`.
- Page titles and Google descriptions: `routes` (Armenian) and `routesEn` (English) in `src/config/seo.json`.
- The build writes a page file for every page in both languages, with `hreflang` links and a
  bilingual `sitemap.xml`, so Google can index both.

### Photos
All photos are from Unsplash, free for commercial use under the Unsplash License (no credit
required). They show the type of work, not the company's own projects.
- By default they load from Unsplash's image CDN in the right size for each screen.
- To host them yourself: `npm run photos` (downloads WebP files into `public/photos/`), then
  build with `VITE_SELF_HOST_PHOTOS=true npm run build`.
- To use your own photo: put it in `public/photos/` and set `src: '/photos/your-file.webp'`
  on that entry in `src/content/photos.ts`. Your own photos of real installations and your
  team will always build more trust than stock photos.

### Trust figures and brands
`stats` (e.g. years of experience, completed projects) and `brands` (equipment you install)
in `src/config/site.ts` appear on the home page only when filled. Use real, verifiable figures
only, and show manufacturer names as partners only if that is true.

### Adding team members
Fill `TEAM` in `src/content/company.ts`. The team section appears on the About page only when
the list is not empty.

### Adding a service
Add an object to `SERVICES`, then add a matching `/services/<slug>` entry to `seo.json`.

## Contact form

The form validates in the browser (Armenian messages, error summary, honeypot + minimum fill
time against spam). To actually deliver requests, set an endpoint:

```bash
cp .env.example .env
# VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx   (or your own /api/contact)
```

The form sends `POST` JSON: `{ name, contact, projectType, service, message }`.
Until an endpoint is set, a valid submission tells the visitor plainly that online sending is
not connected and offers a pre-filled email to info@climatesolutions.am instead.

## Deploying to HayHost (cPanel)

`npm run build` creates `dist/`: one HTML file per page, `.htaccess` (clean addresses, 404 page,
caching), `api/contact.php` (sends the contact form by email), `sitemap.xml` and `robots.txt`.

1. cPanel → **Email Accounts**: create `info@climatesolutions.am` (the form sends from and to it).
2. cPanel → **File Manager** → `public_html`: delete the hosting's placeholder `index.html`/`index.php`,
   upload the upload zip, **Extract** it there, then delete the zip.
   (Turn on *Settings → Show Hidden Files* to see `.htaccess`.)
3. cPanel → **SSL/TLS Status**: run AutoSSL for the domain (or install the certificate HayHost sold you),
   then cPanel → **Domains** → turn on **Force HTTPS Redirect**.
4. If you bought the domain and hosting in the same HayHost account, the domain already points to
   the hosting. If not, set the domain's nameservers to the ones in HayHost's hosting welcome email
   (Client area → Domains → ⚙ → *Change the nameservers*). Changes can take up to 48 hours.

To change the form's recipient, edit `TO_EMAIL` in `public/api/contact.php`.
If you deploy somewhere without PHP (Netlify, Vercel), set `VITE_FORM_ENDPOINT` to a form service instead.
If the domain is not `climatesolutions.am`, update `siteUrl` in `src/config/seo.json` and
`public/robots.txt`, then rebuild.

## Project structure

```
src/
  main.ts              app shell + routes
  config/              site details, SEO data
  content/             all text content (services, principles, process, projects)
  lib/                 router, SEO, DOM helpers, icons, SVG drawings
  components/          header (+ mobile menu), footer, shared blocks
  pages/               home, about, services, service detail, projects, contact, privacy, 404
  features/            contact form logic
  styles/              tokens, base, layout, components, pages
scripts/prerender.mjs  writes per-page HTML in both languages, 404.html and sitemap.xml after the build
src/i18n.ts            language detection, tx() helper, link localisation
src/features/effects.ts  air-flow backgrounds, scroll reveals, parallax, card tilt
src/styles/effects.css   styles for those effects, buttons and the language switch
```

## Before going live

- Replace stock photos with your own where possible, and add real projects.
- Have a lawyer review the privacy policy page text (`src/pages/privacy.ts`).
- Replace the hero drawing or add project photos when real photography is available.
- Accessibility targets WCAG 2.2 AA (semantic HTML, keyboard navigation, visible focus,
  reduced-motion support, form error handling), but has not been formally audited.
