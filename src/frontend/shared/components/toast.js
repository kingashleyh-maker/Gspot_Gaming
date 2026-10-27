import { escapeHtml } from '../js/format.js';

export function toast(message, tone = 'success') {
  let stack = document.querySelector('.gs-toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'gs-toast-stack';
    document.body.appendChild(stack);
  }
  const node = document.createElement('div');
  node.className = `gs-toast gs-toast--${tone}`;
  node.innerHTML = `<span class="gs-toast__dot" aria-hidden="true"></span><span>${escapeHtml(message)}</span>`;
  stack.appendChild(node);
  window.setTimeout(() => {
    node.classList.add('is-leaving');
    window.setTimeout(() => node.remove(), 220);
  }, 3200);
}
