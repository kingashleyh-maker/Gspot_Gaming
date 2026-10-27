import { escapeHtml, initials, roleBadge, todayLabel } from '../js/format.js';
import { qs } from '../js/dom.js';

export function staffShell({
  session,
  appLabel,
  appTitle,
  nav,
  active,
  pageTitle,
  actions = '',
  crossLink = null,
  children
}) {
  const navMarkup = nav
    .map(
      item => `
      <a class="gs-nav-link ${active === item.id ? 'is-active' : ''}" href="#/${item.id}">
        <span>${escapeHtml(item.label)}</span>
        ${item.count != null ? `<em>${escapeHtml(item.count)}</em>` : ''}
      </a>`
    )
    .join('');

  return `
  <div class="gs-staff-shell">
    <aside class="gs-sidebar">
      <a class="gs-sidebar__brand" href="../../index.html">
        <span class="gs-brand-mark">G</span>
        <span><strong>G SPOT</strong><small>AUTOMOTIVE CENTER</small></span>
      </a>
      <p class="gs-sidebar__app">${escapeHtml(appLabel)}</p>
      <nav class="gs-sidebar__nav" aria-label="${escapeHtml(appTitle)} navigation">${navMarkup}</nav>
      <div class="gs-sidebar__foot">
        <div class="gs-sidebar__user">
          <span class="gs-avatar">${escapeHtml(initials(session.name))}</span>
          <div>
            <strong>${escapeHtml(session.name)}</strong>
            ${roleBadge(session.role)}
          </div>
        </div>
        <div class="gs-sidebar__links">
          <a href="../../index.html">Portal selection</a>
          <a href="../../customer-ui/public/index.html">Customer portal</a>
          ${crossLink ? `<a href="${crossLink.href}">${escapeHtml(crossLink.label)}</a>` : ''}
        </div>
        <button type="button" class="gs-btn gs-btn--ghost gs-btn--block" data-action="logout">Sign out</button>
        <p class="gs-sidebar__demo">LOCAL DEMO · DATA STAYS IN THIS BROWSER</p>
      </div>
    </aside>
    <div class="gs-staff-main">
      <header class="gs-topbar">
        <div>
          <p class="gs-topbar__eyebrow">${escapeHtml(appTitle)}</p>
          <h1>${escapeHtml(pageTitle)}</h1>
        </div>
        <div class="gs-topbar__meta">
          <span>${escapeHtml(todayLabel())}</span>
          ${actions}
        </div>
      </header>
      <main class="gs-main">${children}</main>
    </div>
  </div>`;
}

export function bindStaffShell(root, { onLogout }) {
  qs('[data-action="logout"]', root)?.addEventListener('click', onLogout);
}
