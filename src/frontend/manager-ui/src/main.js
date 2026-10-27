import { endSession, getSession, stats } from '../../shared/js/store.js';
import { staffShell, bindStaffShell } from '../../shared/components/staff-shell.js';
import { renderStaffLogin } from '../../shared/components/staff-login.js';
import { toast } from '../../shared/components/toast.js';

import * as dashboard from './pages/dashboard.js';
import * as queue from './pages/queue.js';
import * as inventory from './pages/inventory.js';
import * as services from './pages/services.js';
import * as reports from './pages/reports.js';

const ALLOWED_ROLES = ['Manager', 'Admin'];
const PAGES = [dashboard, queue, inventory, services, reports];
const app = document.querySelector('#app');

let session = getSession();

function currentPage() {
  const id = (location.hash.replace(/^#\/?/, '').split('?')[0] || 'dashboard').trim();
  return PAGES.find(page => page.meta.id === id) ?? PAGES[0];
}

function deniedMarkup() {
  return `
  <div class="gs-login-page">
    <section class="gs-login-hero">
      <div class="gs-login-hero__overlay">
        <a class="gs-login-brand" href="../../index.html">
          <span class="gs-brand-mark">G</span>
          <span><strong>G SPOT</strong><small>AUTOMOTIVE CENTER</small></span>
        </a>
        <div class="gs-login-hero__copy">
          <p class="gs-eyebrow">MANAGER PORTAL</p>
          <h1>Staff access only</h1>
          <p>This portal is limited to Manager and Admin accounts.</p>
        </div>
        <p class="gs-login-hero__foot">G SPOT © 2026 · OFFLINE DEMO</p>
      </div>
    </section>
    <section class="gs-login-panel">
      <div class="gs-login-card">
        <p class="gs-eyebrow">ROLE MISMATCH</p>
        <h2>Switch account</h2>
        <p class="gs-muted">You are signed in as <strong>${session ? session.name : 'a customer'}</strong>. Sign out and use a staff account to continue.</p>
        <button class="gs-btn gs-btn--primary gs-btn--block" type="button" data-action="switch-account">Sign out and switch</button>
        <a class="gs-login-back" href="../../customer-ui/public/index.html">← Go to customer portal</a>
      </div>
    </section>
  </div>`;
}

function renderLogin() {
  renderStaffLogin(app, {
    appLabel: 'MANAGER PORTAL',
    title: 'Run the shop floor',
    subtitle: 'Review bookings, move tickets through service, and keep the parts catalog current.',
    allowRoles: ALLOWED_ROLES,
    bullets: [
      'Ticket queue with status updates',
      'Additional quotes that need customer approval',
      'Live stock and price editing'
    ],
    onSuccess: member => {
      session = member;
      if (!location.hash) history.replaceState(null, '', '#/dashboard');
      render();
      toast(`Signed in as ${member.name}.`);
    }
  });
}

function render() {
  if (!session) {
    renderLogin();
    return;
  }

  if (!ALLOWED_ROLES.includes(session.role)) {
    app.innerHTML = deniedMarkup();
    app.querySelector('[data-action="switch-account"]')?.addEventListener('click', () => {
      endSession();
      session = null;
      renderLogin();
    });
    return;
  }

  const summary = stats();
  const page = currentPage();
  const nav = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'queue', label: 'Ticket & Order Queue', count: summary.pending + summary.active },
    { id: 'inventory', label: 'Catalog & Inventory', count: summary.lowStock.length },
    { id: 'services', label: 'Services' },
    { id: 'reports', label: 'Reports' }
  ];

  app.innerHTML = staffShell({
    session,
    appLabel: 'MANAGER PORTAL',
    appTitle: 'G Spot Operations',
    nav,
    active: page.meta.id,
    pageTitle: page.meta.title,
    actions: `
      <button type="button" class="gs-btn gs-btn--sm" data-action="refresh">Refresh</button>
      <a class="gs-btn gs-btn--sm gs-btn--dark" href="#/queue">Queue</a>`,
    crossLink: { label: 'Admin portal', href: '../../admin-ui/public/index.html' },
    children: page.render()
  });

  bindStaffShell(app, {
    onLogout: () => {
      endSession();
      session = null;
      toast('Signed out of the manager portal.', 'info');
      history.replaceState(null, '', location.pathname);
      render();
    }
  });

  app.querySelector('[data-action="refresh"]')?.addEventListener('click', () => {
    render();
    toast('Refreshed from local demo data.', 'info');
  });

  page.mount?.(app, { session, refresh: render });
}

window.addEventListener('hashchange', render);

if (!location.hash) history.replaceState(null, '', '#/dashboard');
render();
