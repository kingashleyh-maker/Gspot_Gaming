import { openModal } from '../../../shared/components/modal.js';
import { toast } from '../../../shared/components/toast.js';
import {
  escapeHtml,
  formatDateTime,
  kindBadge,
  money,
  statusBadge,
  TICKET_STATUS
} from '../../../shared/js/format.js';
import { managerService } from '../services/manager-service.js';

export function openTicketModal(ticketId, session, onChanged) {
  const ticket = managerService.ticket(ticketId);
  if (!ticket) {
    toast('Ticket not found.', 'error');
    return;
  }

  const vehicle = ticket.vehicle ?? {};
  const items = ticket.items ?? [];
  const quotes = ticket.quotes ?? [];
  const total = managerService.ticketTotal(ticket);
  const pending = managerService.pendingQuotesTotal(ticket);

  const statusOptions = Object.entries(TICKET_STATUS)
    .map(
      ([value, meta]) =>
        `<option value="${value}" ${ticket.status === value ? 'selected' : ''}>${escapeHtml(meta.label)}</option>`
    )
    .join('');

  const quoteRows = quotes.length
    ? quotes
        .map(
          quote => `
          <div class="gs-quote">
            <div>
              <strong>${escapeHtml(quote.description)}</strong>
              <small>${quote.approved ? 'Approved by customer · added to final total' : 'Awaiting customer approval'}</small>
            </div>
            <div class="gs-quote__side">
              <span class="gs-mono">${money(quote.amount)}</span>
              ${
                quote.approved
                  ? '<span class="gs-badge gs-badge--green">Approved</span>'
                  : `<button type="button" class="gs-btn gs-btn--sm" data-approve="${escapeHtml(quote.id)}">Mark approved</button>`
              }
            </div>
          </div>`
        )
        .join('')
    : '<p class="gs-muted gs-small">No additional quotes for this ticket.</p>';

  openModal({
    title: ticket.number,
    eyebrow: `${ticket.kind === 'parts' ? 'PARTS ORDER' : 'SERVICE BOOKING'} · ${ticket.status.toUpperCase()}`,
    wide: true,
    body: `
      <div class="gs-detail-grid">
        <div><p class="gs-detail__label">Customer</p><p class="gs-detail__value">${escapeHtml(ticket.customer)}</p></div>
        <div><p class="gs-detail__label">Phone</p><p class="gs-detail__value">${escapeHtml(ticket.phone || '—')}</p></div>
        <div><p class="gs-detail__label">Vehicle</p><p class="gs-detail__value">${escapeHtml(
          `${vehicle.year ?? ''} ${vehicle.make ?? ''} ${vehicle.model ?? ''}`.trim() || '—'
        )}</p></div>
        <div><p class="gs-detail__label">Plate</p><p class="gs-detail__value gs-mono">${escapeHtml(vehicle.plate || '—')}</p></div>
        <div><p class="gs-detail__label">Opened</p><p class="gs-detail__value">${formatDateTime(ticket.createdAt)}</p></div>
        <div><p class="gs-detail__label">Type</p><p class="gs-detail__value">${kindBadge(ticket.kind)}</p></div>
      </div>

      <p class="gs-section-title">Work items</p>
      <div class="gs-table-wrap">
        <table class="gs-table">
          <thead><tr><th>Item</th><th class="gs-num">Qty</th><th class="gs-num">Price</th><th class="gs-num">Subtotal</th></tr></thead>
          <tbody>
            ${items
              .map(
                item => `
                <tr>
                  <td>${escapeHtml(item.name)}</td>
                  <td class="gs-num">${item.qty}</td>
                  <td class="gs-num">${money(item.price)}</td>
                  <td class="gs-num">${money(item.price * item.qty)}</td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <p class="gs-section-title">Additional quote · needs customer approval</p>
      <div class="gs-quote-list">${quoteRows}</div>
      <form data-quote-form style="display:grid; grid-template-columns:minmax(0,1fr) 130px auto; gap:8px; margin-top:10px;">
        <input class="gs-input" name="description" placeholder="Additional issue or part" required>
        <input class="gs-input" name="amount" type="number" min="1" step="1" placeholder="Amount" required>
        <button class="gs-btn" type="submit">Add quote</button>
      </form>
      <p class="gs-hint" style="margin-top:8px;">Quotes affect the final billed total only after approval.</p>

      <p class="gs-section-title">Ticket status</p>
      <select class="gs-select" data-status>${statusOptions}</select>

      <div class="gs-card" style="margin-top:16px;">
        <div class="gs-card__body" style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
          <div><p class="gs-detail__label">Final billed total</p><p class="gs-detail__value gs-mono" style="font-size:18px;">${money(total)}</p></div>
          <div><p class="gs-detail__label">Pending approval</p><p class="gs-detail__value gs-mono">${money(pending)}</p></div>
          <div><p class="gs-detail__label">Current status</p><p class="gs-detail__value">${statusBadge(ticket.status)}</p></div>
        </div>
      </div>
      ${
        ticket.note
          ? `<p class="gs-section-title">Customer note</p><p class="gs-muted gs-small">${escapeHtml(ticket.note)}</p>`
          : ''
      }`,
    footer: '<button type="button" class="gs-btn" data-close>Close</button>',
    onMount(root, close) {
      root.querySelector('[data-close]').addEventListener('click', close);

      root.querySelector('[data-status]').addEventListener('change', event => {
        try {
          managerService.updateStatus(ticket.id, event.target.value, session);
          toast('Ticket status updated.');
          close();
          onChanged?.();
        } catch (error) {
          toast(error.message, 'error');
        }
      });

      root.querySelectorAll('[data-approve]').forEach(button => {
        button.addEventListener('click', () => {
          try {
            managerService.approveQuote(ticket.id, button.dataset.approve, true, session);
            toast('Quote marked as customer-approved.');
            close();
            onChanged?.();
          } catch (error) {
            toast(error.message, 'error');
          }
        });
      });

      root.querySelector('[data-quote-form]').addEventListener('submit', event => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        try {
          managerService.addQuote(
            ticket.id,
            { description: data.get('description'), amount: data.get('amount') },
            session
          );
          toast('Quote sent for customer approval.');
          close();
          onChanged?.();
        } catch (error) {
          toast(error.message, 'error');
        }
      });
    }
  });
}
