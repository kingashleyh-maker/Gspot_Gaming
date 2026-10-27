import { escapeHtml } from '../js/format.js';

export function openModal({ title, eyebrow = '', body, footer = '', wide = false, onMount }) {
  const backdrop = document.createElement('div');
  backdrop.className = 'gs-modal-backdrop';
  backdrop.innerHTML = `
    <div class="gs-modal ${wide ? 'gs-modal--wide' : ''}" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
      <header class="gs-modal__head">
        <div>
          <p class="gs-modal__eyebrow">${escapeHtml(eyebrow)}</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
        <button type="button" class="gs-modal__close" aria-label="Close dialog">×</button>
      </header>
      <div class="gs-modal__body">${body}</div>
      ${footer ? `<footer class="gs-modal__foot">${footer}</footer>` : ''}
    </div>`;

  const close = () => {
    document.removeEventListener('keydown', onKey);
    document.body.classList.remove('gs-modal-open');
    backdrop.remove();
  };
  const onKey = event => {
    if (event.key === 'Escape') close();
  };

  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) close();
  });
  backdrop.querySelector('.gs-modal__close').addEventListener('click', close);
  document.addEventListener('keydown', onKey);
  document.body.classList.add('gs-modal-open');
  document.body.appendChild(backdrop);
  onMount?.(backdrop, close);

  return { element: backdrop, close };
}

export function confirmDialog({ title, message, confirmLabel = 'Confirm', danger = false }) {
  return new Promise(resolve => {
    openModal({
      title,
      eyebrow: 'PLEASE CONFIRM',
      body: `<p class="gs-muted">${escapeHtml(message)}</p>`,
      footer: `
        <button type="button" class="gs-btn" data-cancel>Cancel</button>
        <button type="button" class="gs-btn ${danger ? 'gs-btn--danger' : 'gs-btn--primary'}" data-confirm>${escapeHtml(confirmLabel)}</button>`,
      onMount(root, close) {
        root.querySelector('[data-cancel]').addEventListener('click', () => {
          close();
          resolve(false);
        });
        root.querySelector('[data-confirm]').addEventListener('click', () => {
          close();
          resolve(true);
        });
      }
    });
  });
}
