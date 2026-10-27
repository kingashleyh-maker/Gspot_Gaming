import { escapeHtml, formatDateTime, roleBadge } from '../../../shared/js/format.js';
import { toast } from '../../../shared/components/toast.js';
import { adminService } from '../services/admin-service.js';
import { openStaffCreator } from '../components/staff-editor.js';

export const meta = { id: 'users', label: 'User & Staff Management', title: 'User & Staff Role Management' };

export function render() {
  const members = adminService.staff();
  const session = adminService.session();

  return `
    <section class="gs-page-head">
      <div>
        <p class="gs-eyebrow">ACCESS CONTROL</p>
        <h2>Staff accounts and roles</h2>
        <p>Promote managers to admin, pause accounts, and add new staff logins. Changes are recorded in the audit trail.</p>
      </div>
      <div class="gs-head-actions">
        <button type="button" class="gs-btn gs-btn--primary" data-add-staff>Add staff account</button>
      </div>
    </section>

    <div class="gs-stat-grid">
      <article class="gs-stat gs-stat--red">
        <p class="gs-stat__label">Admins</p>
        <p class="gs-stat__value">${members.filter(member => member.role === 'Admin').length}</p>
        <p class="gs-stat__meta">Full system access</p>
      </article>
      <article class="gs-stat gs-stat--blue">
        <p class="gs-stat__label">Managers</p>
        <p class="gs-stat__value">${members.filter(member => member.role === 'Manager').length}</p>
        <p class="gs-stat__meta">Operations access</p>
      </article>
      <article class="gs-stat">
        <p class="gs-stat__label">Suspended</p>
        <p class="gs-stat__value">${members.filter(member => member.active === false).length}</p>
        <p class="gs-stat__meta">Cannot sign in</p>
      </article>
    </div>

    <section class="gs-card gs-card--flush">
      <div class="gs-table-wrap">
        <table class="gs-table">
          <thead>
            <tr><th>Staff</th><th>Role</th><th>Status</th><th>Created</th><th class="gs-num">Actions</th></tr>
          </thead>
          <tbody>
            ${members
              .map(member => {
                const isSelf = session && member.id === session.staffId;
                return `
                <tr>
                  <td>
                    <div class="gs-table__product">
                      <div>
                        <strong>${escapeHtml(member.name)}${isSelf ? ' (you)' : ''}</strong>
                        <small>${escapeHtml(member.staffId)} · ${escapeHtml(member.email)}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${
                      isSelf
                        ? roleBadge(member.role)
                        : `<select class="gs-select" data-role-select="${escapeHtml(member.id)}" style="max-width:150px;">
                            <option value="Manager" ${member.role === 'Manager' ? 'selected' : ''}>Manager</option>
                            <option value="Admin" ${member.role === 'Admin' ? 'selected' : ''}>Admin</option>
                          </select>`
                    }
                  </td>
                  <td>
                    <span class="gs-badge ${member.active === false ? 'gs-badge--red' : 'gs-badge--green'}">
                      ${member.active === false ? 'Suspended' : 'Active'}
                    </span>
                  </td>
                  <td class="gs-hint">${escapeHtml(formatDateTime(member.createdAt))}</td>
                  <td class="gs-row-actions">
                    ${
                      isSelf
                        ? '<span class="gs-hint">Current session</span>'
                        : `<button type="button" class="gs-btn gs-btn--sm ${member.active === false ? '' : 'gs-btn--danger'}" data-toggle="${escapeHtml(member.id)}" data-next="${member.active === false ? 'active' : 'inactive'}">
                            ${member.active === false ? 'Reactivate' : 'Suspend'}
                          </button>`
                    }
                  </td>
                </tr>`;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    </section>

    <p class="gs-hint" style="margin-top:14px;">
      Role gates are enforced in the shared demo store: managers can run tickets and inventory, but only admins can change roles, settings, or staff accounts.
    </p>`;
}

export function mount(root, ctx) {
  root.querySelector('[data-add-staff]')?.addEventListener('click', () => {
    openStaffCreator(ctx.session, ctx.refresh);
  });

  root.querySelectorAll('[data-role-select]').forEach(select => {
    select.addEventListener('change', () => {
      try {
        adminService.updateRole(select.dataset.roleSelect, select.value, ctx.session);
        toast(`Role updated to ${select.value}.`);
        ctx.refresh();
      } catch (error) {
        toast(error.message, 'error');
        ctx.refresh();
      }
    });
  });

  root.querySelectorAll('[data-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      try {
        const active = button.dataset.next === 'active';
        adminService.setActive(button.dataset.toggle, active, ctx.session);
        toast(active ? 'Account reactivated.' : 'Account suspended.');
        ctx.refresh();
      } catch (error) {
        toast(error.message, 'error');
        ctx.refresh();
      }
    });
  });
}
