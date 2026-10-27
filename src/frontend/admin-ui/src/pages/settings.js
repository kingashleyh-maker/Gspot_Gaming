import { escapeHtml } from '../../../shared/js/format.js';
import { confirmDialog } from '../../../shared/components/modal.js';
import { toast } from '../../../shared/components/toast.js';
import { adminService } from '../services/admin-service.js';

export const meta = { id: 'settings', label: 'System Settings', title: 'System Settings' };

export function render() {
  const settings = adminService.settings();

  return `
    <section class="gs-page-head">
      <div>
        <p class="gs-eyebrow">CONFIGURATION</p>
        <h2>Shop-wide settings</h2>
        <p>Thresholds here drive low-stock alerts in the manager portal. Booking can be paused without taking the storefront down.</p>
      </div>
    </section>

    <div class="gs-two-col">
      <section class="gs-card">
        <header class="gs-card__head"><h3>Storefront & operations</h3></header>
        <div class="gs-card__body">
          <form data-settings-form class="gs-form-grid" novalidate>
            <label class="gs-field" style="grid-column: 1 / -1;">
              <span class="gs-label">Shop name</span>
              <input class="gs-input" name="shopName" value="${escapeHtml(settings.shopName)}" required>
            </label>
            <label class="gs-field">
              <span class="gs-label">Currency</span>
              <input class="gs-input" name="currency" value="${escapeHtml(settings.currency)}" required>
            </label>
            <label class="gs-field">
              <span class="gs-label">Tax rate (%)</span>
              <input class="gs-input" name="taxRate" type="number" min="0" max="100" step="0.1" value="${settings.taxRate}" required>
            </label>
            <label class="gs-field">
              <span class="gs-label">Low-stock threshold (units)</span>
              <input class="gs-input" name="lowStockThreshold" type="number" min="0" step="1" value="${settings.lowStockThreshold}" required>
            </label>
            <label class="gs-switch" style="align-self:end;">
              <input type="checkbox" name="bookingOpen" ${settings.bookingOpen ? 'checked' : ''}> Accept new bookings
            </label>
            <div style="grid-column: 1 / -1; display:flex; gap:8px; flex-wrap:wrap;">
              <button type="submit" class="gs-btn gs-btn--primary">Save settings</button>
              <a class="gs-btn" href="#/dashboard">Back to analytics</a>
            </div>
          </form>
        </div>
      </section>

      <div style="display:grid; gap:18px; align-content:start;">
        <section class="gs-card">
          <header class="gs-card__head"><h3>Live vs mock</h3></header>
          <div class="gs-card__body" style="display:grid; gap:8px;">
            <div class="gs-quote">
              <div><strong>Mock — current build</strong><small>Accounts, tickets, catalog and audit trail live in browser localStorage</small></div>
              <span class="gs-badge gs-badge--amber">Demo</span>
            </div>
            <div class="gs-quote">
              <div><strong>Live — future backend</strong><small>JWT roles, bcrypt hashing, server-side price and stock checks, shared database</small></div>
              <span class="gs-badge gs-badge--outline">Planned</span>
            </div>
            <p class="gs-hint" style="margin:0;">Replace <span class="gs-mono">shared/js/store.js</span> with API clients when the backend is added.</p>
          </div>
        </section>

        <section class="gs-card" style="border-top:3px solid #b50000;">
          <header class="gs-card__head"><h3>Reset demo data</h3></header>
          <div class="gs-card__body">
            <p class="gs-muted gs-small" style="margin-top:0;">Clears local staff changes, ticket updates, catalog edits and audit entries, then reseeds the original demo dataset.</p>
            <button type="button" class="gs-btn gs-btn--danger" data-reset-demo>Reset all demo data</button>
          </div>
        </section>
      </div>
    </div>`;
}

export function mount(root, ctx) {
  root.querySelector('[data-settings-form]')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    try {
      adminService.updateSettings(
        {
          shopName: data.get('shopName'),
          currency: data.get('currency'),
          taxRate: data.get('taxRate'),
          lowStockThreshold: data.get('lowStockThreshold'),
          bookingOpen: data.get('bookingOpen') === 'on'
        },
        ctx.session
      );
      toast('System settings saved.');
      ctx.refresh();
    } catch (error) {
      toast(error.message, 'error');
    }
  });

  root.querySelector('[data-reset-demo]')?.addEventListener('click', async () => {
    const confirmed = await confirmDialog({
      title: 'Reset demo data?',
      message: 'This clears every local change and restores the seeded staff, tickets, catalog, and audit log.',
      confirmLabel: 'Reset demo data',
      danger: true
    });
    if (!confirmed) return;
    adminService.resetDemo();
    toast('Demo data reset to its seeded state.', 'info');
    ctx.refresh();
  });
}
