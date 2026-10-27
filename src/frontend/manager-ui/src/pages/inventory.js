import { asset, escapeHtml, money } from '../../../shared/js/format.js';
import { openPartEditor } from '../../../shared/components/catalog-editors.js';
import { toast } from '../../../shared/components/toast.js';
import { managerService } from '../services/manager-service.js';

export const meta = { id: 'inventory', label: 'Catalog & Inventory', title: 'Catalog & Inventory' };

function stockBadge(part, threshold) {
  if (part.stock === 0) return '<span class="gs-badge gs-badge--red">Out of stock</span>';
  if (part.stock <= threshold) return '<span class="gs-badge gs-badge--amber">Low stock</span>';
  return '<span class="gs-badge gs-badge--green">In stock</span>';
}

export function render() {
  const parts = managerService.parts();
  const settings = managerService.settings();
  const lowCount = parts.filter(part => part.stock <= settings.lowStockThreshold).length;

  return `
    <section class="gs-page-head">
      <div>
        <p class="gs-eyebrow">INVENTORY</p>
        <h2>Parts stock & pricing</h2>
        <p>Stock changes are saved immediately and recorded in the admin audit trail.</p>
      </div>
      <div class="gs-head-actions">
        <span class="gs-badge ${lowCount ? 'gs-badge--amber' : 'gs-badge--green'}">${lowCount} low-stock items</span>
      </div>
    </section>

    <div class="gs-toolbar">
      <input class="gs-input gs-search" data-search placeholder="Search parts, SKU, or category">
      <span class="gs-hint">${parts.length} parts · low-stock threshold ${settings.lowStockThreshold}</span>
    </div>

    <section class="gs-card gs-card--flush">
      <div class="gs-table-wrap">
        <table class="gs-table">
          <thead>
            <tr><th>Part</th><th>Category</th><th class="gs-num">Price</th><th>Stock</th><th>Availability</th><th></th></tr>
          </thead>
          <tbody>
            ${parts
              .map(
                part => `
                <tr data-part-row data-search="${escapeHtml(
                  `${part.name} ${part.sku} ${part.category}`.toLowerCase()
                )}">
                  <td>
                    <div class="gs-table__product">
                      <img class="gs-thumb" src="${asset(part.image)}" alt="">
                      <div><strong>${escapeHtml(part.name)}</strong><small>${escapeHtml(part.sku)}</small></div>
                    </div>
                  </td>
                  <td>${escapeHtml(part.category)}</td>
                  <td class="gs-num">${escapeHtml(money(part.price))}</td>
                  <td>
                    <div class="gs-stock">
                      <button type="button" data-stock="-1" data-id="${escapeHtml(part.id)}" aria-label="Decrease stock">−</button>
                      <span class="gs-stock__value ${part.stock <= settings.lowStockThreshold ? 'gs-low' : ''}">${part.stock}</span>
                      <button type="button" data-stock="1" data-id="${escapeHtml(part.id)}" aria-label="Increase stock">+</button>
                    </div>
                  </td>
                  <td>${stockBadge(part, settings.lowStockThreshold)}</td>
                  <td class="gs-row-actions">
                    <button type="button" class="gs-btn gs-btn--sm" data-edit="${escapeHtml(part.id)}">Edit</button>
                  </td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

export function mount(root, ctx) {
  const search = root.querySelector('[data-search]');
  search?.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    root.querySelectorAll('[data-part-row]').forEach(row => {
      row.hidden = query && !row.dataset.search.includes(query);
    });
  });

  root.querySelectorAll('[data-stock]').forEach(button => {
    button.addEventListener('click', () => {
      try {
        managerService.adjustStock(button.dataset.id, Number(button.dataset.stock), ctx.session);
        toast('Stock updated and audit log recorded.');
        ctx.refresh();
      } catch (error) {
        toast(error.message, 'error');
      }
    });
  });

  root.querySelectorAll('[data-edit]').forEach(button => {
    button.addEventListener('click', () => {
      const part = managerService.parts().find(item => item.id === button.dataset.edit);
      if (part) openPartEditor(part, ctx.session, ctx.refresh);
    });
  });
}
