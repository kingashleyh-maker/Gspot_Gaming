import {
  escapeHtml,
  kindBadge,
  money,
  statusBadge,
  timeAgo,
  TICKET_STATUS
} from '../../../shared/js/format.js';
import { managerService } from '../services/manager-service.js';
import { openTicketModal } from '../components/ticket-modal.js';

export const meta = { id: 'queue', label: 'Ticket & Order Queue', title: 'Ticket & Order Queue' };

let activeFilter = 'all';

function ticketsForFilter(tickets) {
  return activeFilter === 'all' ? tickets : tickets.filter(ticket => ticket.status === activeFilter);
}

export function render() {
  const tickets = managerService.tickets();
  const visible = ticketsForFilter(tickets);
  const tabs = [
    { id: 'all', label: 'All', count: tickets.length },
    ...Object.entries(TICKET_STATUS).map(([id, meta]) => ({
      id,
      label: meta.label,
      count: tickets.filter(ticket => ticket.status === id).length
    }))
  ];

  return `
    <section class="gs-page-head">
      <div>
        <p class="gs-eyebrow">QUEUE</p>
        <h2>Incoming parts orders & service bookings</h2>
        <p>Inspect a ticket to update its status or send an additional quote for customer approval.</p>
      </div>
      <div class="gs-head-actions">
        <span class="gs-badge gs-badge--outline">${visible.length} shown</span>
      </div>
    </section>

    <div class="gs-tabs" role="tablist">
      ${tabs
        .map(
          tab => `
          <button type="button" class="gs-tab ${activeFilter === tab.id ? 'is-active' : ''}" data-filter="${tab.id}">
            ${escapeHtml(tab.label)} (${tab.count})
          </button>`
        )
        .join('')}
    </div>

    <section class="gs-card gs-card--flush">
      ${
        visible.length
          ? `<div class="gs-table-wrap">
              <table class="gs-table">
                <thead>
                  <tr><th>Ticket</th><th>Customer & vehicle</th><th>Type</th><th>Status</th><th class="gs-num">Total</th><th>Updated</th><th></th></tr>
                </thead>
                <tbody>
                  ${visible
                    .map(ticket => {
                      const vehicle = ticket.vehicle ?? {};
                      return `
                      <tr>
                        <td><strong class="gs-mono">${escapeHtml(ticket.number)}</strong></td>
                        <td>
                          <strong>${escapeHtml(ticket.customer)}</strong>
                          <div class="gs-hint">${escapeHtml(
                            `${vehicle.year ?? ''} ${vehicle.make ?? ''} ${vehicle.model ?? ''} · ${vehicle.plate ?? ''}`.trim()
                          )}</div>
                        </td>
                        <td>${kindBadge(ticket.kind)}</td>
                        <td>${statusBadge(ticket.status)}</td>
                        <td class="gs-num">${escapeHtml(money(managerService.ticketTotal(ticket)))}</td>
                        <td class="gs-hint">${escapeHtml(timeAgo(ticket.updatedAt))}</td>
                        <td class="gs-row-actions">
                          <button type="button" class="gs-btn gs-btn--sm" data-ticket="${escapeHtml(ticket.id)}">Inspect</button>
                        </td>
                      </tr>`;
                    })
                    .join('')}
                </tbody>
              </table>
            </div>`
          : `<div class="gs-empty"><strong>No tickets in this view</strong>Try another status filter.</div>`
      }
    </section>`;
}

export function mount(root, ctx) {
  root.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      ctx.refresh();
    });
  });

  root.querySelectorAll('[data-ticket]').forEach(button => {
    button.addEventListener('click', () => {
      openTicketModal(button.dataset.ticket, ctx.session, ctx.refresh);
    });
  });
}
