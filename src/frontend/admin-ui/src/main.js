import { endSession, getSession, stats } from '../../shared/js/store.js';
import { staffShell, bindStaffShell } from '../../shared/components/staff-shell.js';
import { renderStaffLogin } from '../../shared/components/staff-login.js';
import { toast } from '../../shared/components/toast.js';

import * as dashboard from './pages/dashboard.js';
import * as users from './pages/users.js';
import * as catalog from './pages/catalog.js';
import * as audit from './pages/audit.js';
import * as settings from './pages/settings.js';

const ALLOWED_ROLES = ['Admin'];
const PAGES = [dashboard, users, catalog, audit, settings];
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
          <p class="gs-eyebrow">ADMIN PORTAL</p>
          <h1>Administrator access only</h1>
          <p>Manager accounts can run the shop floor from the manager portal, but system settings and role changes are admin-only.</p>
        </div>
        <p class="gs-login-hero__foot">G SPOT © 2026 · OFFLINE DEMO</p>
      </div>
    </section>
    <section class="gs-login-panel">
      <div class="gs-login-card">
        <p class="gs-eyebrow">ROLE MISMATCH</p>
        <h2>Switch account</h2>
        <p class="gs-muted">You are signed in as <strong>${session ? `${session.name} (${session.role})` : 'a guest'}</strong>. Sign out and use an admin account to continue.</p>
        <button class="gs-btn gs-btn--primary gs-btn--block" type="button" data-action="switch-account">Sign out and switch</button>
        <a class="gs-login-back" href="../../manager-ui/public/index.html">← Go to manager portal</a>
      </div>
    </section>
  </div>`;
}

function renderLogin() {
  renderStaffLogin(app, {
    appLabel: 'ADMIN PORTAL',
    title: 'System control',
    subtitle: 'Analytics, staff roles, master catalog oversight, settings and the full audit trail.',
    allowRoles: ALLOWED_ROLES,
    bullets: [
      'Role and staff account management',
      'Master catalog and inventory review',
      'System settings and audit log'
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
    { id: 'dashboard', label: 'System Analytics' },
    { id: 'users', label: 'User & Staff Management', count: summary.staff },
    { id: 'catalog', label: 'Master Catalog' },
    { id: 'audit', label: 'Audit Trail', count: summary.audit },
    { id: 'settings', label: 'System Settings' }
  ];

  app.innerHTML = staffShell({
    session,
    appLabel: 'ADMIN PORTAL',
    appTitle: 'G Spot Administration',
    nav,
    active: page.meta.id,
    pageTitle: page.meta.title,
    actions: `
      <button type="button" class="gs-btn gs-btn--sm" data-action="refresh">Refresh</button>
      <a class="gs-btn gs-btn--sm gs-btn--dark" href="../../manager-ui/public/index.html">Manager portal</a>`,
    crossLink: { label: 'Manager portal', href: '../../manager-ui/public/index.html' },
    children: page.render()
  });

  bindStaffShell(app, {
    onLogout: () => {
      endSession();
      session = null;
      toast('Signed out of the admin portal.', 'info');
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
