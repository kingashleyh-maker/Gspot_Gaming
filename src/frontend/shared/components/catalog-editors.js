import { openModal } from './modal.js';
import { toast } from './toast.js';
import { asset, escapeHtml, money } from '../js/format.js';
import { updatePart, updateService } from '../js/store.js';

export function openPartEditor(part, session, onSaved) {
  openModal({
    title: part.name,
    eyebrow: `EDIT PART · ${part.sku}`,
    body: `
      <form data-part-form class="gs-form-grid">
        <div style="grid-column: 1 / -1; display:flex; align-items:center; gap:12px;">
          <img class="gs-thumb" src="${asset(part.image)}" alt="">
          <p class="gs-hint" style="margin:0;">Photo files live in <span class="gs-mono">shared/assets/images</span>.</p>
        </div>
        <label class="gs-field" style="grid-column: 1 / -1;">
          <span class="gs-label">Part name</span>
          <input class="gs-input" name="name" value="${escapeHtml(part.name)}" required>
        </label>
        <label class="gs-field">
          <span class="gs-label">Category</span>
          <input class="gs-input" name="category" value="${escapeHtml(part.category)}" required>
        </label>
        <label class="gs-field">
          <span class="gs-label">Price (PHP)</span>
          <input class="gs-input" name="price" type="number" min="0" step="1" value="${part.price}" required>
        </label>
        <label class="gs-field">
          <span class="gs-label">Stock on hand</span>
          <input class="gs-input" name="stock" type="number" min="0" step="1" value="${part.stock}" required>
        </label>
        <label class="gs-switch" style="align-self:end;">
          <input type="checkbox" name="active" ${part.active ? 'checked' : ''}> Visible in catalog
        </label>
      </form>`,
    footer: `
      <button type="button" class="gs-btn" data-cancel>Cancel</button>
      <button type="button" class="gs-btn gs-btn--primary" data-save>Save part</button>`,
    onMount(root, close) {
      const form = root.querySelector('[data-part-form]');
      root.querySelector('[data-cancel]').addEventListener('click', close);
      root.querySelector('[data-save]').addEventListener('click', event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        try {
          updatePart(
            part.id,
            {
              name: data.get('name'),
              category: data.get('category'),
              price: data.get('price'),
              stock: data.get('stock'),
              active: data.get('active') === 'on'
            },
            session
          );
          toast('Part updated.');
          close();
          onSaved?.();
        } catch (error) {
          toast(error.message, 'error');
        }
      });
    }
  });
}

export function openServiceEditor(service, session, onSaved) {
  openModal({
    title: service.name,
    eyebrow: 'EDIT SERVICE',
    body: `
      <form data-service-form class="gs-form-grid">
        <div style="grid-column: 1 / -1; display:flex; align-items:center; gap:12px;">
          <img class="gs-thumb" src="${asset(service.image)}" alt="">
          <span class="gs-badge gs-badge--gray">${escapeHtml(money(service.price))}</span>
        </div>
        <label class="gs-field" style="grid-column: 1 / -1;">
          <span class="gs-label">Service name</span>
          <input class="gs-input" name="name" value="${escapeHtml(service.name)}" required>
        </label>
        <label class="gs-field" style="grid-column: 1 / -1;">
          <span class="gs-label">Description</span>
          <textarea class="gs-textarea" name="description" required>${escapeHtml(service.description)}</textarea>
        </label>
        <label class="gs-field">
          <span class="gs-label">Price (PHP)</span>
          <input class="gs-input" name="price" type="number" min="0" step="1" value="${service.price}" required>
        </label>
        <label class="gs-field">
          <span class="gs-label">Duration (minutes)</span>
          <input class="gs-input" name="duration" type="number" min="0" step="1" value="${service.duration}" required>
        </label>
        <label class="gs-switch" style="grid-column: 1 / -1;">
          <input type="checkbox" name="active" ${service.active ? 'checked' : ''}> Bookable online
        </label>
      </form>`,
    footer: `
      <button type="button" class="gs-btn" data-cancel>Cancel</button>
      <button type="button" class="gs-btn gs-btn--primary" data-save>Save service</button>`,
    onMount(root, close) {
      const form = root.querySelector('[data-service-form]');
      root.querySelector('[data-cancel]').addEventListener('click', close);
      root.querySelector('[data-save]').addEventListener('click', event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        try {
          updateService(
            service.id,
            {
              name: data.get('name'),
              description: data.get('description'),
              price: data.get('price'),
              duration: data.get('duration'),
              active: data.get('active') === 'on'
            },
            session
          );
          toast('Service updated.');
          close();
          onSaved?.();
        } catch (error) {
          toast(error.message, 'error');
        }
      });
    }
  });
}
