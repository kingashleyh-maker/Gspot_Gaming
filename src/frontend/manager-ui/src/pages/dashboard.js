import { escapeHtml, money, statusBadge, timeAgo } from '../../../shared/js/format.js';
import { managerService } from '../services/manager-service.js';

export const meta = { id: 'dashboard', label: 'Dashboard', title: 'Dashboard Overview' };

export function render() {
  const summary = managerService.stats();
  const settings = managerService.settings();
  const tickets = managerService.tickets().slice(0, 5);

  return `
    <section class="gs-page-head">
      <div>
        <p class="gs-eyebrow">OPERATIONS</p>
        <h2>Today at a glance</h2>
        <p>Ticket movement, stock health, and revenue for the shop.</p>
      </div>
      <div class="gs-head-actions">
        <a class="gs-btn gs-btn--dark" href="#/queue">Open ticket queue →</a>
      </div>
    </section>

    <div class="gs-stat-grid">
      <article class="gs-stat gs-stat--red">
        <p class="gs-stat__label">Today's bookings</p>
        <p class="gs-stat__value">${summary.todayTickets}</p>
        <p class="gs-stat__meta">New tickets opened today</p>
      </article>
      <article class="gs-stat gs-stat--amber">
        <p class="gs-stat__label">Open tickets</p>
        <p class="gs-stat__value">${summary.pending + summary.active}</p>
        <p class="gs-stat__meta">${summary.pending} pending · ${summary.active} in service</p>
      </article>
      <article class="gs-stat gs-stat--blue">
        <p class="gs-stat__label">Low stock alerts</p>
        <p class="gs-stat__value">${summary.lowStock.length}</p>
        <p class="gs-stat__meta">At or below ${settings.lowStockThreshold} units</p>
      </article>
      <article class="gs-stat gs-stat--green">
        <p class="gs-stat__label">Collected revenue</p>
        <p class="gs-stat__value" style="font-size:24px;">${escapeHtml(money(summary.revenue))}</p>
        <p class="gs-stat__meta">Ready and completed tickets</p>
      </article>
    </div>

    <div class="gs-two-col">
      <section class="gs-card">
        <header class="gs-card__head">
          <h3>Stock alerts</h3>
          <a class="gs-btn gs-btn--sm" href="#/inventory">Manage inventory</a>
        </header>
        <div class="gs-card__body" style="display:grid; gap:8px;">
          ${
            summary.lowStock.length
              ? summary.lowStock
                  .slice(0, 5)
                  .map(
                    part => `
                    <div class="gs-quote">
                      <div>
                        <strong>${escapeHtml(part.name)}</strong>
                        <small>${escapeHtml(part.sku)} · ${escapeHtml(part.category)}</small>
                      </div>
                      <div class="gs-quote__side">
                        <span class="gs-badge ${part.stock === 0 ? 'gs-badge--red' : 'gs-badge--amber'}">${part.stock} left</span>
                        <a class="gs-btn gs-btn--sm" href="#/inventory">Adjust</a>
                      </div>
                    </div>`
                  )
                  .join('')
              : '<p class="gs-muted gs-small">All parts are above the low-stock threshold.</p>'
          }
        </div>
      </section>

      <section class="gs-card gs-card--flush">
        <header class="gs-card__head">
          <h3>Latest tickets</h3>
          <a class="gs-btn gs-btn--sm" href="#/queue">View all</a>
        </header>
        <div class="gs-table-wrap">
          <table class="gs-table">
            <thead>
              <tr><th>Ticket</th><th>Customer</th><th>Status</th><th class="gs-num">Total</th></tr>
            </thead>
            <tbody>
              ${tickets
                .map(
                  ticket => `
                  <tr>
                    <td>
                      <strong class="gs-mono">${escapeHtml(ticket.number)}</strong>
                      <div class="gs-hint">${escapeHtml(timeAgo(ticket.updatedAt))}</div>
                    </td>
                    <td>${escapeHtml(ticket.customer)}</td>
                    <td>${statusBadge(ticket.status)}</td>
                    <td class="gs-num">${escapeHtml(money(managerService.ticketTotal(ticket)))}</td>
                  </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <p class="gs-hint" style="margin-top:16px;">
      Booking is ${settings.bookingOpen ? 'open' : 'paused'} · Shop: ${escapeHtml(settings.shopName)} ·
      Data is stored locally in this browser.
    </p>`;
}
