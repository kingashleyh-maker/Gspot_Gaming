import { asset, escapeHtml, money } from '../../../shared/js/format.js';
import { openServiceEditor } from '../../../shared/components/catalog-editors.js';
import { managerService } from '../services/manager-service.js';

export const meta = { id: 'services', label: 'Services', title: 'Services Management' };

export function render() {
  const services = managerService.services();

  return `
    <section class="gs-page-head">
      <div>
        <p class="gs-eyebrow">SERVICES</p>
        <h2>Service catalog</h2>
        <p>Keep prices, durations, and descriptions aligned with what the shop can deliver.</p>
      </div>
      <div class="gs-head-actions">
        <span class="gs-badge gs-badge--outline">${services.length} services</span>
      </div>
    </section>

    <section class="gs-card gs-card--flush">
      <div class="gs-table-wrap">
        <table class="gs-table">
          <thead>
            <tr><th>Service</th><th class="gs-num">Price</th><th class="gs-num">Duration</th><th>Availability</th><th></th></tr>
          </thead>
          <tbody>
            ${services
              .map(
                service => `
                <tr>
                  <td>
                    <div class="gs-table__product">
                      <img class="gs-thumb" src="${asset(service.image)}" alt="">
                      <div>
                        <strong>${escapeHtml(service.name)}</strong>
                        <small>${escapeHtml(service.description)}</small>
                      </div>
                    </div>
                  </td>
                  <td class="gs-num">${escapeHtml(money(service.price))}</td>
                  <td class="gs-num">${service.duration} min</td>
                  <td>${
                    service.active
                      ? '<span class="gs-badge gs-badge--green">Bookable</span>'
                      : '<span class="gs-badge gs-badge--gray">Hidden</span>'
                  }</td>
                  <td class="gs-row-actions">
                    <button type="button" class="gs-btn gs-btn--sm" data-edit="${escapeHtml(service.id)}">Edit</button>
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
  root.querySelectorAll('[data-edit]').forEach(button => {
    button.addEventListener('click', () => {
      const service = managerService.services().find(item => item.id === button.dataset.edit);
      if (service) openServiceEditor(service, ctx.session, ctx.refresh);
    });
  });
}
