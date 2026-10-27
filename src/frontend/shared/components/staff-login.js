import { authenticate, listStaff, startSession } from '../js/store.js';
import { escapeHtml, roleBadge } from '../js/format.js';

export function renderStaffLogin(root, options) {
  const {
    appLabel,
    title,
    subtitle,
    allowRoles = ['Manager', 'Admin'],
    bullets = [],
    backHref = '../../index.html',
    onSuccess
  } = options;

  const demoMembers = listStaff().filter(
    member => member.active !== false && allowRoles.includes(member.role)
  );

  root.innerHTML = `
  <div class="gs-login-page">
    <section class="gs-login-hero">
      <div class="gs-login-hero__overlay">
        <a class="gs-login-brand" href="${backHref}">
          <span class="gs-brand-mark">G</span>
          <span><strong>G SPOT</strong><small>AUTOMOTIVE CENTER</small></span>
        </a>
        <div class="gs-login-hero__copy">
          <p class="gs-eyebrow">${escapeHtml(appLabel)}</p>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(subtitle)}</p>
          <ul>${bullets.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
        <p class="gs-login-hero__foot">G SPOT © 2026 · OFFLINE DEMO</p>
      </div>
    </section>
    <section class="gs-login-panel">
      <div class="gs-login-card">
        <p class="gs-eyebrow">STAFF ACCESS</p>
        <h2>Sign in</h2>
        <p class="gs-muted">Use your work email or staff ID. Customer accounts cannot sign in here.</p>
        <form data-login-form novalidate>
          <label class="gs-field">
            <span class="gs-label">Work email or staff ID</span>
            <input class="gs-input" name="identifier" autocomplete="username" placeholder="sarah.chen" required>
          </label>
          <label class="gs-field">
            <span class="gs-label">Password</span>
            <input class="gs-input" type="password" name="password" autocomplete="current-password" placeholder="••••••••" required>
          </label>
          <p class="gs-form-error" data-login-error hidden></p>
          <button class="gs-btn gs-btn--primary gs-btn--block" type="submit">Sign in →</button>
        </form>
        <div class="gs-demo-box">
          <p class="gs-demo-box__title">DEMO ACCOUNTS</p>
          ${demoMembers
            .map(
              member => `
            <button type="button" class="gs-demo-row" data-demo-fill data-identifier="${escapeHtml(member.staffId)}" data-password="${escapeHtml(member.password)}">
              <span><strong>${escapeHtml(member.staffId)}</strong><small>${escapeHtml(member.password)}</small></span>
              ${roleBadge(member.role)}
            </button>`
            )
            .join('')}
          <p class="gs-demo-box__note">Demo only — credentials live in this browser.</p>
        </div>
        <a class="gs-login-back" href="${backHref}">← Back to portal selection</a>
      </div>
    </section>
  </div>`;

  const form = root.querySelector('[data-login-form]');
  const errorBox = root.querySelector('[data-login-error]');
  const showError = message => {
    errorBox.textContent = message;
    errorBox.hidden = false;
  };

  form.addEventListener('submit', event => {
    event.preventDefault();
    errorBox.hidden = true;
    const data = new FormData(form);
    const member = authenticate(data.get('identifier'), data.get('password'));

    if (!member) {
      showError('Incorrect credentials. Pick a demo account below to fill the form.');
      return;
    }
    if (!allowRoles.includes(member.role)) {
      showError(`This is a ${member.role} account. Use the ${member.role} portal instead.`);
      return;
    }
    startSession(member);
    onSuccess(member);
  });

  root.querySelectorAll('[data-demo-fill]').forEach(button => {
    button.addEventListener('click', () => {
      form.elements.identifier.value = button.dataset.identifier;
      form.elements.password.value = button.dataset.password;
      errorBox.hidden = true;
      form.querySelector('button[type="submit"]').focus();
    });
  });
}
