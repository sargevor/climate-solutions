import '@fontsource-variable/noto-sans-armenian/wght.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/effects.css';
import './styles/brandmark.css';

import { Router } from './lib/router';
import { HAS_PROJECTS } from './config/site';
import { renderHeader, mountHeader, setActiveNav, updateLangSwitch } from './components/header';
import { lang, localizeLinks } from './i18n';
import { renderFooter } from './components/footer';
import { homePage } from './pages/home';
import { aboutPage } from './pages/about';
import { servicesPage, serviceDetailPage } from './pages/services';
import { projectsPage } from './pages/projects';
import { contactPage } from './pages/contact';
import { privacyPage } from './pages/privacy';
import { notFoundPage } from './pages/notFound';
import { mountGlobalEffects, mountPageEffects } from './features/effects';

const app = document.getElementById('app')!;
document.documentElement.lang = lang;
app.innerHTML = `${renderHeader()}<main id="main" tabindex="-1"></main>${renderFooter()}`;
localizeLinks(app);
mountHeader();

const main = document.getElementById('main')!;
let fxCleanup: (() => void) | undefined;
mountGlobalEffects();
const router = new Router(main, notFoundPage, (page) => {
  setActiveNav(page.navPath);
  updateLangSwitch();
  fxCleanup?.();
  fxCleanup = mountPageEffects(main);
});
router
  .add('/', homePage)
  .add('/about', aboutPage)
  .add('/services', servicesPage)
  .add('/services/:slug', ({ slug }) => serviceDetailPage(slug))
  .add('/contact', contactPage)
  .add('/privacy', privacyPage);
// The portfolio page exists only once real projects are added.
if (HAS_PROJECTS) router.add('/projects', projectsPage);
router.start();
