import { asset, escapeHtml, money } from '../../../shared/js/format.js';
import { openPartEditor, openServiceEditor } from '../../../shared/components/catalog-editors.js';
import { adminService } from '../services/admin-service.js';

export const meta = { id: 'catalog', label: 'Master Catalog', title: 'Master Catalog Oversight' };

function stockBadge(part, threshold) {
  if (part.stock === 0) return '<span class="gs-badge gs-badge--red">Out of stock</span>';
  if (part.stock <= threshold) return `<span class="gs-badge gs-badge--amber">Low · ${part.stock}</span>`;
  return `<span class="gs-badge gs-badge--green">${part.stock} in stock</span>`;
}

export function render() {
  const parts = adminService.parts();
  const services = adminService.services();
  const settings = adminService.settings();
  const inventoryValue = parts.reduce((sum, part) => sum + part.stock * part.price, 0);

  return `
    <section class="gs-page-head">
      <div>
        <p class="gs-eyebrow">CATALOG</p>
        <h2>Every part and service in one view</h2>
        <p>Admins can review and correct the master catalog. Managers edit the same local data from their portal.</p>
      </div>
      <div class="gs-head-actions">
        <span class="gs-badge gs-badge--outline">Inventory value ${escapeHtml(money(inventoryValue))}</span>
      </div>
    </section>

    <div class="gs-toolbar">
      <input class="gs-input gs-search" type="search" placeholder="Search parts, SKUs, services…" data-catalog-search>
      <span class="gs-hint" data-catalog-count>${parts.length + services.length} records</span>
    </div>

    <div class="gs-two-col">
      <section class="gs-card gs-card--flush">
        <header class="gs-card__head">
          <h3>Parts (${parts.length})</h3>
          <span class="gs-badge gs-badge--outline">${parts.filter(part => part.active !== false).length} visible</span>
        </header>
        <div class="gs-table-wrap">
          <table class="gs-table" style="min-width:560px;">
            <thead><tr><th>Part</th><th class="gs-num">Price</th><th>Stock</th><th></th></tr></thead>
            <tbody>
              ${parts
                .map(
                  part => `
                  <tr data-catalog-row data-search="${escapeHtml(
                    `${part.name} ${part.sku} ${part.category}`.toLowerCase()
                  )}">
                    <td>
                      <div class="gs-table__product">
                        <img class="gs-thumb" src="${asset(part.image)}" alt="">
                        <div>
                          <strong>${escapeHtml(part.name)}</strong>
                          <small>${escapeHtml(part.sku)} · ${escapeHtml(part.category)}${part.active === false ? ' · hidden' : ''}</small>
                        </div>
                      </div>
                    </td>
                    <td class="gs-num">${escapeHtml(money(part.price))}</td>
                    <td>${stockBadge(part, settings.lowStockThreshold)}</td>
                    <td class="gs-row-actions">
                      <button type="button" class="gs-btn gs-btn--sm" data-edit-part="${escapeHtml(part.id)}">Edit</button>
                    </td>
                  </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </section>

      <section class="gs-card gs-card--flush">
        <header class="gs-card__head">
          <h3>Services (${services.length})</h3>
          <span class="gs-badge gs-badge--outline">${services.filter(service => service.active !== false).length} bookable</span>
        </header>
        <div class="gs-table-wrap">
          <table class="gs-table" style="min-width:520px;">
            <thead><tr><th>Service</th><th class="gs-num">Price</th><th class="gs-num">Duration</th><th></th></tr></thead>
            <tbody>
              ${services
                .map(
                  service => `
                  <tr data-catalog-row data-search="${escapeHtml(
                    `${service.name} ${service.description}`.toLowerCase()
                  )}">
                    <td>
                      <div class="gs-table__product">
                        <img class="gs-thumb" src="${asset(service.image)}" alt="">
                        <div>
                          <strong>${escapeHtml(service.name)}</strong>
                          <small>${service.active === false ? 'Hidden from booking' : 'Bookable online'}</small>
                        </div>
                      </div>
                    </td>
                    <td class="gs-num">${escapeHtml(money(service.price))}</td>
                    <td class="gs-num">${service.duration}m</td>
                    <td class="gs-row-actions">
                      <button type="button" class="gs-btn gs-btn--sm" data-edit-service="${escapeHtml(service.id)}">Edit</button>
                    </td>
                  </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <div class="gs-empty" data-catalog-empty hidden><strong>No matches</strong>Try a different search term.</div>
    <p class="gs-hint" style="margin-top:14px;">Photo upload is not wired to a file store in this demo; images reference files in <span class="gs-mono">shared/assets/images</span>.</p>`;
}

export function mount(root, ctx) {
  const search = root.querySelector('[data-catalog-search]');
  const rows = [...root.querySelectorAll('[data-catalog-row]')];
  const empty = root.querySelector('[data-catalog-empty]');
  const count = root.querySelector('[data-catalog-count]');

  search?.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    rows.forEach(row => {
      const match = !query || row.dataset.search.includes(query);
      row.hidden = !match;
      if (match) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
    if (count) count.textContent = `${visible} of ${rows.length} records`;
  });

  root.querySelectorAll('[data-edit-part]').forEach(button => {
    button.addEventListener('click', () => {
      const part = adminService.parts().find(item => item.id === button.dataset.editPart);
      if (part) openPartEditor(part, ctx.session, ctx.refresh);
    });
  });

  root.querySelectorAll('[data-edit-service]').forEach(button => {
    button.addEventListener('click', () => {
      const service = adminService.services().find(item => item.id === button.dataset.editService);
      if (service) openServiceEditor(service, ctx.session, ctx.refresh);
    });
  });
}
