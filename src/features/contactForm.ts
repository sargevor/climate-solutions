import { $, $$, esc } from '../lib/dom';
import { tx } from '../i18n';
import { SITE, hasPhone, phoneHref } from '../config/site';

type FieldId = 'f-name' | 'f-contact' | 'f-type' | 'f-msg' | 'f-consent';

const MSG = {
  name: tx('Նշեք Ձեր անունը։', 'Please enter your name.'),
  contactEmpty: tx('Նշեք հեռախոսահամար կամ էլ. հասցե, որպեսզի կարողանանք կապվել Ձեզ հետ։', 'Please enter a phone number or email address so we can get back to you.'),
  contactBad: tx('Ստուգեք հեռախոսահամարը կամ էլ. հասցեն։ Հեռախոսահամարը պետք է պարունակի առնվազն 8 թվանշան։', 'Please check the phone number or email address. A phone number needs at least 8 digits.'),
  type: tx('Ընտրեք նախագծի տեսակը։', 'Please choose a project type.'),
  msg: tx('Գրեք մի քանի նախադասություն Ձեր նախագծի կամ հարցի մասին (առնվազն 10 նշան)։', 'Please write a few sentences about your project or question (at least 10 characters).'),
  consent: tx('Հայտն ուղարկելու համար անհրաժեշտ է Ձեր համաձայնությունը։', 'Please tick the box to agree before sending.'),
};

const FIELDS: FieldId[] = ['f-name', 'f-contact', 'f-type', 'f-msg', 'f-consent'];
const MIN_FILL_MS = 2500; // spam guard: humans need a moment to fill the form

export function isValidContact(raw: string): boolean {
  const v = raw.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return true;
  return /^[+\d\s()\-]+$/.test(v) && v.replace(/\D/g, '').length >= 8;
}

export function mountContactForm(root: HTMLElement) {
  const form = $<HTMLFormElement>('#cform', root);
  if (!form) return;
  const startedAt = Date.now();
  const status = $('#formStatus', root)!;
  const summary = $('#formSummary', root)!;
  const submit = $<HTMLButtonElement>('#fSubmit', root)!;

  const check = (id: FieldId): string => {
    const el = $<HTMLInputElement>('#' + id, form)!;
    const value = el.type === 'checkbox' ? el.checked : el.value.trim();
    let m = '';
    if (id === 'f-name' && !value) m = MSG.name;
    if (id === 'f-contact') m = !value ? MSG.contactEmpty : !isValidContact(String(value)) ? MSG.contactBad : '';
    if (id === 'f-type' && !value) m = MSG.type;
    if (id === 'f-msg' && String(value).length < 10) m = MSG.msg;
    if (id === 'f-consent' && !value) m = MSG.consent;
    const err = $('#e-' + id.slice(2), form)!;
    err.textContent = m;
    err.hidden = !m;
    if (m) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
    return m;
  };

  for (const id of FIELDS) {
    const el = $<HTMLInputElement>('#' + id, form)!;
    el.addEventListener('blur', () => {
      if (el.type !== 'checkbox' && (el.value || el.hasAttribute('aria-invalid'))) check(id);
    });
    el.addEventListener('input', () => el.hasAttribute('aria-invalid') && check(id));
    el.addEventListener('change', () => el.hasAttribute('aria-invalid') && check(id));
  }

  summary.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('[data-focus]');
    if (!a) return;
    e.preventDefault();
    $('#' + a.dataset.focus, form)?.focus();
  });

  const showStatus = (kind: 'ok' | 'warn', title: string, text: string) => {
    status.innerHTML = `<div class="status status--${kind}"><h3>${title}</h3><p>${text}</p></div>`;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.innerHTML = '';
    const errors = FIELDS.map((id) => [id, check(id)] as const).filter(([, m]) => m);
    if (errors.length) {
      summary.hidden = false;
      summary.innerHTML = `<h3>${tx(`Ձևում կա ${errors.length} սխալ`, errors.length === 1 ? 'There is 1 error in the form' : `There are ${errors.length} errors in the form`)}</h3><ul>${errors
        .map(([id, m]) => `<li><a href="#${id}" data-focus="${id}" data-external>${m}</a></li>`)
        .join('')}</ul>`;
      summary.focus();
      return;
    }
    summary.hidden = true;
    summary.innerHTML = '';

    // Spam protection: honeypot field + minimum fill time.
    const honeypot = $<HTMLInputElement>('#f-web', form)!.value;
    if (honeypot || Date.now() - startedAt < MIN_FILL_MS) {
      showStatus('ok', tx('Շնորհակալություն', 'Thank you'), tx('Ձեր հայտը ստացվել է։', 'Your request has been received.'));
      return;
    }

    const typeSel = $<HTMLSelectElement>('#f-type', form)!;
    const svcSel = $<HTMLSelectElement>('#f-service', form)!;
    const data = {
      name: $<HTMLInputElement>('#f-name', form)!.value.trim(),
      contact: $<HTMLInputElement>('#f-contact', form)!.value.trim(),
      projectType: typeSel.selectedOptions[0]?.text ?? '',
      service: svcSel.value ? svcSel.selectedOptions[0]?.text ?? '' : '',
      message: $<HTMLTextAreaElement>('#f-msg', form)!.value.trim(),
    };

    const c = SITE.contacts;
    if (!SITE.form.endpoint) {
      // No backend configured yet: say so plainly and offer working alternatives.
      const L = tx({ n: 'Անուն՝', c: 'Կապ՝', t: 'Նախագծի տեսակը՝', s: 'Ծառայություն՝', subj: 'Հայտ կայքից՝ ' }, { n: 'Name:', c: 'Contact:', t: 'Project type:', s: 'Service:', subj: 'Website request: ' });
      const body = `${L.n} ${data.name}\n${L.c} ${data.contact}\n${L.t} ${data.projectType}\n${data.service ? `${L.s} ${data.service}\n` : ''}\n${data.message}`;
      const mailto = `mailto:${c.email}?subject=${encodeURIComponent(L.subj + data.name)}&body=${encodeURIComponent(body)}`;
      status.innerHTML = `<div class="status status--warn">
        <h3>${tx('Առցանց ուղարկումը դեռ միացված չէ', 'Online sending is not connected yet')}</h3>
        <p>${tx('Ձևը ճիշտ է լրացված, սակայն հայտը ավտոմատ չի ուղարկվել։ Սեղմեք ստորև՝ այն Ձեր էլ. փոստի ծրագրով ուղարկելու համար', 'The form is filled in correctly, but the request was not sent automatically. Click below to send it with your email app')}${hasPhone ? `${tx(', կամ զանգահարեք', ', or call')} <a href="tel:${phoneHref}" data-external>${esc(c.phone)}</a>` : ''}${tx('։', '.')}</p>
        <div class="btns"><a class="btn btn--primary" href="${mailto}" data-external>${tx('Ուղարկել էլ. փոստով', 'Send by email')}</a></div>
      </div>`;
      return;
    }

    submit.disabled = true;
    submit.dataset.label = submit.textContent ?? '';
    submit.textContent = tx('Ուղարկվում է…', 'Sending…');
    try {
      const res = await fetch(SITE.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      showStatus('ok', tx('Շնորհակալություն', 'Thank you'), tx('Ձեր հայտը ստացվել է։ Մենք կկապվենք Ձեզ հետ մոտ ժամանակներս։', 'Your request has been received. We will get back to you soon.'));
    } catch {
      showStatus('warn', tx('Հայտը չհաջողվեց ուղարկել', 'The request could not be sent'), tx(`Ստուգեք ինտերնետ կապը և փորձեք կրկին, կամ գրեք մեզ ${esc(c.email)} հասցեով։`, `Check your internet connection and try again, or email us at ${esc(c.email)}.`));
    } finally {
      submit.disabled = false;
      submit.innerHTML = tx('Ուղարկել հայտը', 'Send request') + ' <span class="arr" aria-hidden="true">→</span>';
    }
  });

  // Copy buttons for contact details
  $$<HTMLButtonElement>('[data-copy]', root).forEach((b) =>
    b.addEventListener('click', async () => {
      const label = b.textContent;
      try {
        await navigator.clipboard.writeText(b.dataset.copy!);
        b.textContent = tx('Պատճենված է', 'Copied');
      } catch {
        b.textContent = tx('Չհաջողվեց', 'Copy failed');
      }
      setTimeout(() => (b.textContent = label), 2000);
    }),
  );
}
