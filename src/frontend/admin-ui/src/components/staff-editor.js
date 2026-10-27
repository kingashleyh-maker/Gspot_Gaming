import { openModal } from '../../../shared/components/modal.js';
import { toast } from '../../../shared/components/toast.js';
import { adminService } from '../services/admin-service.js';

export function openStaffCreator(session, onCreated) {
  openModal({
    title: 'Add staff account',
    eyebrow: 'ROLE & STAFF MANAGEMENT',
    body: `
      <form data-staff-form class="gs-form-grid">
        <label class="gs-field" style="grid-column: 1 / -1;">
          <span class="gs-label">Full name</span>
          <input class="gs-input" name="name" placeholder="Juan Dela Cruz" required>
        </label>
        <label class="gs-field">
          <span class="gs-label">Work email</span>
          <input class="gs-input" name="email" type="email" placeholder="juan.dela.cruz@gspot.com" required>
        </label>
        <label class="gs-field">
          <span class="gs-label">Staff ID</span>
          <input class="gs-input" name="staffId" placeholder="juan.dela.cruz" required>
        </label>
        <label class="gs-field">
          <span class="gs-label">Role</span>
          <select class="gs-select" name="role">
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <label class="gs-field">
          <span class="gs-label">Demo password</span>
          <input class="gs-input" name="password" type="password" minlength="8" placeholder="At least 8 characters" required>
        </label>
      </form>
      <p class="gs-hint" style="margin-top:10px;">Demo only — this account is stored in this browser, not a real identity provider.</p>`,
    footer: `
      <button type="button" class="gs-btn" data-cancel>Cancel</button>
      <button type="button" class="gs-btn gs-btn--primary" data-save>Create account</button>`,
    onMount(root, close) {
      const form = root.querySelector('[data-staff-form]');
      root.querySelector('[data-cancel]').addEventListener('click', close);
      root.querySelector('[data-save]').addEventListener('click', () => {
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        try {
          const member = adminService.createStaff(
            {
              name: data.get('name'),
              email: data.get('email'),
              staffId: data.get('staffId'),
              role: data.get('role'),
              password: data.get('password')
            },
            session
          );
          toast(`${member.name} added as ${member.role}.`);
          close();
          onCreated?.();
        } catch (error) {
          toast(error.message, 'error');
        }
      });
    }
  });
}
