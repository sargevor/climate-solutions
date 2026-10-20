import { tx } from '../i18n';
import type { Page } from '../lib/router';
import { html, arrow } from '../lib/dom';
import { icon } from '../lib/icons';
import { SITE, hasPhone, phoneHref } from '../config/site';
import { SERVICES } from '../content/services';
import { CATEGORIES } from '../content/projects';
import { pageHead } from '../components/blocks';
import { mountContactForm } from '../features/contactForm';

export const contactPage = (): Page => ({
  seoPath: '/contact',
  navPath: '/contact',
  render: () => {
    const c = SITE.contacts;
    const preselect = new URLSearchParams(location.search).get('service') ?? '';
    return html`
    ${pageHead({
      crumbs: [{ href: '/', label: tx('Գլխավոր', 'Home') }, { label: tx('Կապ', 'Contact') }],
      title: tx('Կապ և խորհրդատվություն', 'Contact and consultation'),
      photo: 'contact',
      fx: 'ripples',
      lead: tx('Կապվեք մեզ հետ նախնական խորհրդատվության կամ նախագծի քննարկման համար։ Որքան մանրամասն նկարագրեք օբյեկտը, այնքան կոնկրետ կլինի մեր պատասխանը։', 'Get in touch for an initial consultation or to discuss your project. The more you tell us about the building, the more specific our answer will be.'),
    })}
    <section class="sec">
      <div class="wrap contact">
        <div class="contact__info">
          <h2 class="vh">${tx('Կոնտակտային տվյալներ', 'Contact details')}</h2>
          <ul class="cinfo">
            ${hasPhone && html`<li>${icon('phone', 'ico ico--sm')}<div><span class="k">${tx('Հեռախոս', 'Phone')}</span>
              <span class="v"><a href="tel:${phoneHref}" data-external>${c.phone}</a><button class="copy" type="button" data-copy="${c.phone}">${tx('Պատճենել', 'Copy')}</button></span></div></li>`}
            <li>${icon('mail', 'ico ico--sm')}<div><span class="k">${tx('Էլ. փոստ', 'Email')}</span>
              <span class="v"><a href="mailto:${c.email}" data-external>${c.email}</a><button class="copy" type="button" data-copy="${c.email}">${tx('Պատճենել', 'Copy')}</button></span></div></li>
            <li>${icon('pin', 'ico ico--sm')}<div><span class="k">${tx('Գրասենյակ', 'Office')}</span>
              <span class="v"><span>${c.address}</span></span>
              <a class="link" href="${c.mapUrl}" target="_blank" rel="noopener">${tx('Բացել քարտեզում', 'Open in Maps')} ${arrow}<span class="vh">${tx(' (բացվում է նոր պատուհանում)', ' (opens in a new window)')}</span></a></div></li>
            ${c.hours && html`<li>${icon('clock', 'ico ico--sm')}<div><span class="k">${tx('Աշխատանքային ժամեր', 'Working hours')}</span><span class="v">${c.hours}</span></div></li>`}
            ${SITE.social.length > 0 && html`<li><div><span class="k">${tx('Սոցիալական ցանցեր', 'Social media')}</span><span class="v">${SITE.social.map((s) => html`<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`)}</span></div></li>`}
          </ul>
          <div class="hint">
            <h3>${tx('Ինչ նշել հաղորդագրությունում', 'What to include in your message')}</h3>
            <ul class="ticks">
              <li>${tx('Օբյեկտի տեսակը և մոտավոր մակերեսը', 'Type of building and approximate floor area')}</li>
              <li>${tx('Քաղաքը կամ համայնքը', 'City or town')}</li>
              <li>${tx('Ինչ համակարգ է անհրաժեշտ կամ ինչ խնդիր կա', 'Which system you need, or what the problem is')}</li>
              <li>${tx('Ցանկալի ժամկետները', 'Your preferred timeline')}</li>
            </ul>
          </div>
        </div>

        <div class="contact__form">
          <h2 class="h2-sm">${tx('Հայտի ձև', 'Request form')}</h2>
          <form class="form" id="cform" novalidate>
            <div id="formSummary" class="summary" tabindex="-1" role="alert" hidden></div>
            <div class="row2">
              <div class="field">
                <label for="f-name">${tx('Անուն', 'Name')} <span class="req" aria-hidden="true">*</span></label>
                <input class="input" id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="e-name">
                <p class="err" id="e-name" hidden></p>
              </div>
              <div class="field">
                <label for="f-contact">${tx('Հեռախոս կամ էլ. հասցե', 'Phone or email')} <span class="req" aria-hidden="true">*</span></label>
                <input class="input" id="f-contact" name="contact" type="text" autocomplete="tel" required aria-describedby="h-contact e-contact">
                <p class="help" id="h-contact">${tx('Օրինակ՝', 'For example:')} +374 XX XXX XXX</p>
                <p class="err" id="e-contact" hidden></p>
              </div>
            </div>
            <div class="row2">
              <div class="field">
                <label for="f-type">${tx('Նախագծի տեսակը', 'Project type')} <span class="req" aria-hidden="true">*</span></label>
                <select class="input" id="f-type" name="projectType" required aria-describedby="e-type">
                  <option value="">${tx('Ընտրեք…', 'Choose…')}</option>
                  ${CATEGORIES.map((k) => html`<option value="${k.id}">${k.one}</option>`)}
                  <option value="other">${tx('Այլ', 'Other')}</option>
                </select>
                <p class="err" id="e-type" hidden></p>
              </div>
              <div class="field">
                <label for="f-service">${tx('Ծառայություն', 'Service')} <span class="opt">${tx('(ըստ ցանկության)', '(optional)')}</span></label>
                <select class="input" id="f-service" name="service">
                  <option value="">${tx('Դեռ չգիտեմ', 'Not sure yet')}</option>
                  ${SERVICES.map((s) => html`<option value="${s.slug}"${s.slug === preselect ? ' selected' : ''}>${s.title}</option>`)}
                </select>
              </div>
            </div>
            <div class="field">
              <label for="f-msg">${tx('Հաղորդագրություն', 'Message')} <span class="req" aria-hidden="true">*</span></label>
              <textarea class="input" id="f-msg" name="message" rows="6" required aria-describedby="e-msg"></textarea>
              <p class="err" id="e-msg" hidden></p>
            </div>
            <div class="hp" aria-hidden="true">
              <label for="f-web">Website</label><input id="f-web" name="website" type="text" tabindex="-1" autocomplete="off">
            </div>
            <div class="field">
              <label class="check" for="f-consent">
                <input type="checkbox" id="f-consent" name="consent" aria-describedby="e-consent">
                <span>${tx('Համաձայն եմ, որ իմ տվյալները օգտագործվեն միայն այս հարցմանը պատասխանելու համար', 'I agree that my details are used only to answer this request')} <span class="req" aria-hidden="true">*</span></span>
              </label>
              <p class="err" id="e-consent" hidden></p>
            </div>
            <p class="privacy-note">${tx('Աստղանիշով', 'Fields marked')} <span class="req">*</span> ${tx('նշված դաշտերը պարտադիր են։ Տվյալները չենք փոխանցում երրորդ անձանց և չենք օգտագործում գովազդային նպատակներով։ Մանրամասները՝', 'are required. We do not share your details with third parties or use them for advertising. Details in our')} <a href="/privacy">${tx('Գաղտնիության քաղաքականությունում', 'Privacy policy')}</a>${tx('։', '.')}</p>
            <div><button class="btn btn--primary" type="submit" id="fSubmit">${tx('Ուղարկել հայտը', 'Send request')} ${arrow}</button></div>
            <div id="formStatus" role="status" aria-live="polite"></div>
          </form>
        </div>
      </div>
    </section>`;
  },
  mount: (root) => mountContactForm(root),
});
