import { escapeHtml, money, timeAgo, TICKET_STATUS } from '../../../shared/js/format.js';
import { adminService } from '../services/admin-service.js';

export const meta = { id: 'dashboard', label: 'Analytics', title: 'System Analytics' };

const BAR_TONES = {
  amber: '#d99a00',
  blue: '#2f5fd0',
  green: '#1f8a4c',
  gray: '#8a8a84',
  red: '#b50000'
};

export function render() {
  const summary = adminService.stats();
  const settings = adminService.settings();
  const tickets = adminService.tickets();
  const parts = adminService.parts();
  const services = adminService.services();
  const logs = adminService.auditLogs().slice(0, 6);

  const settled = tickets.filter(ticket => ['ready', 'completed'].includes(ticket.status));
  const averageTicket = settled.length ? summary.revenue / settled.length : 0;
  const inventoryValue = parts.reduce((sum, part) => sum + part.stock * part.price, 0);
  const partsRevenue = settled.reduce(
    (sum, ticket) => sum + (ticket.kind === 'parts' ? adminService.ticketTotal(ticket) : 0),
    0
  );
  const serviceRevenue = Math.max(0, summary.revenue - partsRevenue);

  const pipeline = Object.entries(TICKET_STATUS).map(([id, info]) => ({
    id,
    label: info.label,
    tone: info.tone,
    count: tickets.filter(ticket => ticket.status === id).length
  }));
  const peak = Math.max(1, ...pipeline.map(item => item.count));
  const revenuePeak = Math.max(1, partsRevenue, serviceRevenue);

  return `
    <section class="gs-page-head">
      <div>
        <p class="gs-eyebrow">SYSTEM OVERVIEW</p>
        <h2>Store health at a glance</h2>
        <p>Revenue, ticket flow, catalog size and staff activity across every portal.</p>
      </div>
      <div class="gs-head-actions">
        <a class="gs-btn" href="#/audit">Audit trail</a>
        <a class="gs-btn gs-btn--dark" href="#/users">Manage staff</a>
      </div>
    </section>

    <div class="gs-stat-grid">
      <article class="gs-stat gs-stat--red">
        <p class="gs-stat__label">Collected revenue</p>
        <p class="gs-stat__value" style="font-size:24px;">${escapeHtml(money(summary.revenue))}</p>
        <p class="gs-stat__meta">${summary.ready + summary.completed} settled tickets</p>
      </article>
      <article class="gs-stat gs-stat--blue">
        <p class="gs-stat__label">Average ticket</p>
        <p class="gs-stat__value" style="font-size:24px;">${escapeHtml(money(averageTicket))}</p>
        <p class="gs-stat__meta">Ready and completed tickets</p>
      </article>
      <article class="gs-stat gs-stat--amber">
        <p class="gs-stat__label">Open tickets</p>
        <p class="gs-stat__value">${summary.pending + summary.active}</p>
        <p class="gs-stat__meta">${summary.pending} pending · ${summary.active} in progress</p>
      </article>
      <article class="gs-stat gs-stat--green">
        <p class="gs-stat__label">Catalog size</p>
        <p class="gs-stat__value">${parts.length + services.length}</p>
        <p class="gs-stat__meta">${parts.length} parts · ${services.length} services</p>
      </article>
    </div>

    <div class="gs-two-col">
      <section class="gs-card">
        <header class="gs-card__head">
          <h3>Ticket pipeline</h3>
          <span class="gs-badge gs-badge--outline">${tickets.length} total</span>
        </header>
        <div class="gs-card__body">
          ${pipeline
            .map(
              item => `
              <div class="gs-bar-row">
                <span>${escapeHtml(item.label)}</span>
                <div class="gs-bar"><div class="gs-bar__fill" style="width:${Math.round((item.count / peak) * 100)}%; background:${BAR_TONES[item.tone]}"></div></div>
                <span class="gs-bar__value">${item.count}</span>
              </div>`
            )
            .join('')}
        </div>
      </section>

      <section class="gs-card">
        <header class="gs-card__head">
          <h3>Revenue & inventory</h3>
          <a class="gs-btn gs-btn--sm" href="#/catalog">Catalog</a>
        </header>
        <div class="gs-card__body">
          <div class="gs-bar-row">
            <span>Parts</span>
            <div class="gs-bar"><div class="gs-bar__fill" style="width:${Math.round((partsRevenue / revenuePeak) * 100)}%"></div></div>
            <span class="gs-bar__value">${escapeHtml(money(partsRevenue))}</span>
          </div>
          <div class="gs-bar-row">
            <span>Services</span>
            <div class="gs-bar"><div class="gs-bar__fill" style="width:${Math.round((serviceRevenue / revenuePeak) * 100)}%"></div></div>
            <span class="gs-bar__value">${escapeHtml(money(serviceRevenue))}</span>
          </div>
          <div class="gs-detail-grid" style="margin-top:18px;">
            <div><p class="gs-detail__label">Inventory value</p><p class="gs-detail__value gs-mono">${escapeHtml(money(inventoryValue))}</p></div>
            <div><p class="gs-detail__label">Low stock</p><p class="gs-detail__value">${summary.lowStock.length} parts</p></div>
            <div><p class="gs-detail__label">Out of stock</p><p class="gs-detail__value">${summary.outOfStock} parts</p></div>
            <div><p class="gs-detail__label">Low-stock threshold</p><p class="gs-detail__value">${settings.lowStockThreshold} units</p></div>
          </div>
        </div>
      </section>
    </div>

    <section class="gs-card" style="margin-top:18px;">
      <header class="gs-card__head">
        <h3>Recent system activity</h3>
        <a class="gs-btn gs-btn--sm" href="#/audit">Full audit trail</a>
      </header>
      <div class="gs-card__body" style="display:grid; gap:8px;">
        ${
          logs.length
            ? logs
                .map(
                  log => `
                  <div class="gs-quote">
                    <div>
                      <strong>${escapeHtml(log.actor.name)} · ${escapeHtml(log.action)}</strong>
                      <small>${escapeHtml(log.details)} · ${escapeHtml(log.entityId)}</small>
                    </div>
                    <div class="gs-quote__side">
                      <span class="gs-hint">${escapeHtml(timeAgo(log.at))}</span>
                    </div>
                  </div>`
                )
                .join('')
            : '<p class="gs-muted gs-small">No activity recorded yet.</p>'
        }
      </div>
    </section>

    <div class="gs-two-col" style="margin-top:18px;">
      <section class="gs-card">
        <header class="gs-card__head"><h3>Staff accounts</h3><a class="gs-btn gs-btn--sm" href="#/users">Manage</a></header>
        <div class="gs-card__body">
          <div class="gs-detail-grid">
            <div><p class="gs-detail__label">Admins</p><p class="gs-detail__value">${summary.admins}</p></div>
            <div><p class="gs-detail__label">Managers</p><p class="gs-detail__value">${summary.managers}</p></div>
            <div><p class="gs-detail__label">Total staff</p><p class="gs-detail__value">${summary.staff}</p></div>
            <div><p class="gs-detail__label">Audit events</p><p class="gs-detail__value">${summary.audit}</p></div>
          </div>
        </div>
      </section>

      <section class="gs-card">
        <header class="gs-card__head"><h3>System settings</h3><a class="gs-btn gs-btn--sm" href="#/settings">Edit</a></header>
        <div class="gs-card__body">
          <div class="gs-detail-grid">
            <div><p class="gs-detail__label">Shop</p><p class="gs-detail__value">${escapeHtml(settings.shopName)}</p></div>
            <div><p class="gs-detail__label">Booking</p><p class="gs-detail__value">${settings.bookingOpen ? 'Open' : 'Paused'}</p></div>
            <div><p class="gs-detail__label">Tax rate</p><p class="gs-detail__value">${settings.taxRate}%</p></div>
            <div><p class="gs-detail__label">Currency</p><p class="gs-detail__value">${escapeHtml(settings.currency)}</p></div>
          </div>
          <p class="gs-hint" style="margin-top:14px;">All values come from local demo storage in this browser.</p>
        </div>
      </section>
    </div>`;
}
