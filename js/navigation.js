/*
 * Shared page chrome and small formatting helpers. Every page includes this
 * script; it fills the header/footer placeholders and keeps the account state
 * in sync with the demo session.
 */
import { getCustomerSession, logoutCustomer } from './auth.js';

const BASE = document.body.dataset.base || './';
const NAV_ITEMS = [
  ['home', 'Home', `${BASE}index.html`],
  ['customer-login', 'Customer login', `${BASE}pages/customer-login.html`],
  ['register', 'Create account', `${BASE}pages/register.html`],
  ['staff-login', 'Staff login', `${BASE}pages/staff-login.html`]
];

export function peso(value) {
  return `₱${Number(value || 0).toLocaleString('en-PH')}`;
}

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return map[character];
  });
}

export function formatDateTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-PH', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

let toastTimer;

export function toast(message, tone = 'default') {
  let host = document.querySelector('.toast-host');
  if (!host) {
    host = document.createElement('div');
    host.className = 'toast-host';
    host.setAttribute('aria-live', 'polite');
    document.body.append(host);
  }
  host.replaceChildren();
  const node = document.createElement('div');
  node.className = `toast toast--${tone}`;
  node.setAttribute('role', 'status');
  node.textContent = message;
  host.append(node);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.remove(), 3400);
}

function currentNavId() {
  const page = document.body.dataset.page || '';
  return page === 'forgot-password' ? 'customer-login' : page;
}

function headerMarkup(session) {
  const active = currentNavId();
  const navItems = session
    ? [NAV_ITEMS[0], ['shop', 'Shop', `${BASE}pages/shop.html`], NAV_ITEMS[3]]
    : NAV_ITEMS;
  const account = session
    ? `<span class="site-header__user"><span class="site-header__dot" aria-hidden="true"></span>${escapeHtml(session.name)}</span>
       <button type="button" class="site-header__logout" data-logout>Sign out</button>`
    : `<a class="site-header__account-link" href="${BASE}pages/customer-login.html">Sign in</a>`;

  const mobileAccount = session
    ? `<a href="#" class="site-nav__auth" data-nav-logout>Sign out — ${escapeHtml(session.name)}</a>`
    : '';

  return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="site-header__inner">
        <a class="brand" href="${BASE}index.html" aria-label="G Spot Automotive home">
          <span class="brand__mark" aria-hidden="true">G</span>
          <span class="brand__text"><strong>G Spot</strong><small>Automotive Center</small></span>
        </a>
        <button class="site-header__toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-nav">Menu</button>
        <nav class="site-nav" id="site-nav" aria-label="Main">
          ${navItems.map(
            ([id, label, href]) =>
              `<a href="${href}"${id === active ? ' aria-current="page"' : ''}>${label}</a>`
          ).join('')}
          ${mobileAccount}
        </nav>
        <div class="site-header__account">${account}</div>
      </div>
    </header>`;
}

function footerMarkup() {
  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__brand">
          <a class="brand brand--footer" href="${BASE}index.html">
            <span class="brand__mark" aria-hidden="true">G</span>
            <span class="brand__text"><strong>G Spot</strong><small>Automotive Center</small></span>
          </a>
          <p>Quality automotive maintenance, repairs and genuine parts in Metro Manila.</p>
          <span class="site-footer__tag">Offline demo · No real accounts or payments</span>
        </div>
        <div class="site-footer__col">
          <h4>Account</h4>
          <a href="${BASE}pages/shop.html">Shop parts &amp; services</a>
          <a href="${BASE}pages/customer-login.html">Customer login</a>
          <a href="${BASE}pages/register.html">Create account</a>
          <a href="${BASE}pages/forgot-password.html">Forgot password</a>
        </div>
        <div class="site-footer__col">
          <h4>Shop access</h4>
          <a href="${BASE}pages/staff-login.html">Staff login</a>
          <a href="${BASE}pages/manager.html">Manager dashboard</a>
          <a href="${BASE}pages/admin.html">Admin dashboard</a>
        </div>
        <div class="site-footer__col">
          <h4>Visit</h4>
          <p>Unit 5, 123 J.P. Rizal Street<br>Mandaluyong City, 1550</p>
          <p><a href="tel:+63281234789">(02) 8123-4789</a><br><a href="mailto:service@gspotauto.ph">service@gspotauto.ph</a></p>
          <p>Mon–Sat 8:00 AM – 6:00 PM<br>Sun 9:00 AM – 4:00 PM</p>
        </div>
      </div>
      <div class="site-footer__bottom">
        <span>© ${new Date().getFullYear()} G Spot Automotive Service Center</span>
        <span>Frontend demo · Data stays in this browser</span>
      </div>
    </footer>`;
}

function mountDemoNotice() {
  if (document.getElementById('demo-notice')) return;
  const notice = document.createElement('div');
  notice.id = 'demo-notice';
  notice.innerHTML =
    'Offline demo · Accounts/orders stay in this browser · No real payments ' +
    '<button type="button" aria-label="Dismiss demo notice">×</button>';
  notice.querySelector('button').addEventListener('click', () => notice.remove());
  document.body.append(notice);
}

function wireHeader(host) {
  const toggle = host.querySelector('[data-nav-toggle]');
  const nav = host.querySelector('#site-nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  host.querySelector('[data-logout]')?.addEventListener('click', () => {
    logoutCustomer();
    location.reload();
  });
  host.querySelector('[data-nav-logout]')?.addEventListener('click', event => {
    event.preventDefault();
    logoutCustomer();
    location.reload();
  });
}

function handleWelcomeMessage() {
  const params = new URLSearchParams(location.search);
  if (params.get('welcome') === '1') {
    toast('Account created. You are signed in.', 'success');
  } else if (params.get('signedin') === '1') {
    toast('Signed in. Welcome back.', 'success');
  } else {
    return;
  }
  params.delete('welcome');
  params.delete('signedin');
  const query = params.toString();
  try {
    history.replaceState({}, '', `${location.pathname}${query ? `?${query}` : ''}${location.hash}`);
  } catch {
    /* history is unavailable on some file:// setups */
  }
}

function initSiteChrome() {
  const headerHost = document.querySelector('[data-site-header]');
  if (headerHost) {
    headerHost.innerHTML = headerMarkup(getCustomerSession());
    wireHeader(headerHost);
  }
  const footerHost = document.querySelector('[data-site-footer]');
  if (footerHost) footerHost.innerHTML = footerMarkup();
  mountDemoNotice();
  handleWelcomeMessage();
}

initSiteChrome();
