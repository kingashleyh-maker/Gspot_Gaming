import { escapeHtml, money, TICKET_STATUS } from '../../../shared/js/format.js';
import { managerService } from '../services/manager-service.js';

export const meta = { id: 'reports', label: 'Reports', title: 'Operations Reports' };

export function render() {
  const summary = managerService.stats();
  const tickets = managerService.tickets();
  const parts = managerService.parts();
  const services = managerService.services();

  const statusRows = Object.entries(TICKET_STATUS).map(([status, meta]) => ({
    status,
    label: meta.label,
    count: tickets.filter(ticket => ticket.status === status).length
  }));
  const maxCount = Math.max(1, ...statusRows.map(row => row.count));

  const pendingQuotes = tickets.reduce(
    (sum, ticket) => sum + managerService.pendingQuotesTotal(ticket),
    0
  );
  const inventoryValue = parts.reduce((sum, part) => sum + part.price * part.stock, 0);
  const partsRevenue = tickets
    .filter(ticket => ticket.kind === 'parts' && ['ready', 'completed'].includes(ticket.status))
    .reduce((sum, ticket) => sum + managerService.ticketTotal(ticket), 0);
  const serviceRevenue = tickets
    .filter(ticket => ticket.kind === 'service' && ['ready', 'completed'].includes(ticket.status))
    .reduce((sum, ticket) => sum + managerService.ticketTotal(ticket), 0);

  return `
    <section class="gs-page-head">
      <div>
        <p class="gs-eyebrow">REPORTING</p>
        <h2>Operations snapshot</h2>
        <p>Calculated from the demo data stored in this browser.</p>
      </div>
    </section>

    <div class="gs-stat-grid">
      <article class="gs-stat gs-stat--green">
        <p class="gs-stat__label">Collected revenue</p>
        <p class="gs-stat__value" style="font-size:24px;">${escapeHtml(money(summary.revenue))}</p>
        <p class="gs-stat__meta">Ready + completed tickets</p>
      </article>
      <article class="gs-stat gs-stat--amber">
        <p class="gs-stat__label">Quotes awaiting approval</p>
        <p class="gs-stat__value" style="font-size:24px;">${escapeHtml(money(pendingQuotes))}</p>
        <p class="gs-stat__meta">Not yet added to final totals</p>
      </article>
      <article class="gs-stat gs-stat--blue">
        <p class="gs-stat__label">Inventory value</p>
        <p class="gs-stat__value" style="font-size:24px;">${escapeHtml(money(inventoryValue))}</p>
        <p class="gs-stat__meta">${parts.length} parts on hand</p>
      </article>
      <article class="gs-stat">
        <p class="gs-stat__label">Active catalog</p>
        <p class="gs-stat__value">${services.filter(service => service.active).length}/${services.length}</p>
        <p class="gs-stat__meta">Services bookable online</p>
      </article>
    </div>

    <div class="gs-two-col">
      <section class="gs-card">
        <header class="gs-card__head"><h3>Tickets by status</h3></header>
        <div class="gs-card__body">
          ${statusRows
            .map(
              row => `
              <div class="gs-bar-row">
                <span>${escapeHtml(row.label)}</span>
                <div class="gs-bar"><div class="gs-bar__fill" style="width:${Math.round((row.count / maxCount) * 100)}%"></div></div>
                <span class="gs-bar__value">${row.count}</span>
              </div>`
            )
            .join('')}
        </div>
      </section>

      <section class="gs-card">
        <header class="gs-card__head"><h3>Revenue mix</h3></header>
        <div class="gs-card__body">
          <div class="gs-bar-row">
            <span>Parts</span>
            <div class="gs-bar"><div class="gs-bar__fill" style="width:${
              summary.revenue ? Math.round((partsRevenue / summary.revenue) * 100) : 0
            }%"></div></div>
            <span class="gs-bar__value">${escapeHtml(money(partsRevenue))}</span>
          </div>
          <div class="gs-bar-row">
            <span>Services</span>
            <div class="gs-bar"><div class="gs-bar__fill" style="width:${
              summary.revenue ? Math.round((serviceRevenue / summary.revenue) * 100) : 0
            }%"></div></div>
            <span class="gs-bar__value">${escapeHtml(money(serviceRevenue))}</span>
          </div>
          <p class="gs-hint" style="margin-top:16px;">
            ${summary.completed} completed tickets · ${summary.ready} ready for pickup · ${summary.lowStock.length} low-stock parts.
          </p>
        </div>
      </section>
    </div>`;
}
