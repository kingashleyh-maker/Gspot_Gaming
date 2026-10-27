import { escapeHtml, formatDateTime } from '../../../shared/js/format.js';
import { adminService } from '../services/admin-service.js';

export const meta = { id: 'audit', label: 'Audit Trail', title: 'System Audit Trail' };

const ACTION_LABELS = {
  'ticket.status': 'Ticket status',
  'ticket.quote': 'Ticket quote',
  'inventory.update': 'Inventory',
  'service.update': 'Service',
  'staff.create': 'Staff created',
  'staff.role': 'Role change',
  'staff.access': 'Access change',
  'settings.update': 'Settings'
};

export function render() {
  const logs = adminService.auditLogs();
  const entities = [...new Set(logs.map(log => log.entity))].sort();

  return `
    <section class="gs-page-head">
      <div>
        <p class="gs-eyebrow">GOVERNANCE</p>
        <h2>Every change, in order</h2>
        <p>Audit entries are appended by the shared store whenever a ticket, catalog item, staff account, or setting changes.</p>
      </div>
      <div class="gs-head-actions">
        <span class="gs-badge gs-badge--outline">${logs.length} events</span>
      </div>
    </section>

    <div class="gs-toolbar">
      <input class="gs-input gs-search" type="search" placeholder="Search actor, ticket, details…" data-audit-search>
      <select class="gs-select" data-audit-entity style="max-width:190px;">
        <option value="">All entities</option>
        ${entities.map(entity => `<option value="${escapeHtml(entity)}">${escapeHtml(entity)}</option>`).join('')}
      </select>
    </div>

    <section class="gs-card gs-card--flush">
      <div class="gs-table-wrap">
        <table class="gs-table">
          <thead><tr><th>When</th><th>Actor</th><th>Action</th><th>Entity</th><th>Details</th></tr></thead>
          <tbody>
            ${logs
              .map(
                log => `
                <tr data-audit-row data-entity="${escapeHtml(log.entity)}" data-search="${escapeHtml(
                  `${log.actor.name} ${log.actor.role} ${log.action} ${log.entityId} ${log.details}`.toLowerCase()
                )}">
                  <td class="gs-hint" style="white-space:nowrap;">${escapeHtml(formatDateTime(log.at))}</td>
                  <td>
                    <strong>${escapeHtml(log.actor.name)}</strong>
                    <div class="gs-hint">${escapeHtml(log.actor.role)}</div>
                  </td>
                  <td><span class="gs-badge gs-badge--gray">${escapeHtml(ACTION_LABELS[log.action] ?? log.action)}</span></td>
                  <td>
                    <span class="gs-audit-entity">${escapeHtml(log.entity)}</span>
                    <div class="gs-hint">${escapeHtml(log.entityId)}</div>
                  </td>
                  <td class="gs-audit-details">${escapeHtml(log.details)}</td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>

    <div class="gs-empty" data-audit-empty hidden><strong>No events match</strong>Clear the filters to see the full trail.</div>`;
}

export function mount(root) {
  const search = root.querySelector('[data-audit-search]');
  const entity = root.querySelector('[data-audit-entity]');
  const rows = [...root.querySelectorAll('[data-audit-row]')];
  const empty = root.querySelector('[data-audit-empty]');

  const apply = () => {
    const query = search.value.trim().toLowerCase();
    const entityValue = entity.value;
    let visible = 0;
    rows.forEach(row => {
      const match =
        (!entityValue || row.dataset.entity === entityValue) &&
        (!query || row.dataset.search.includes(query));
      row.hidden = !match;
      if (match) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  };

  search?.addEventListener('input', apply);
  entity?.addEventListener('change', apply);
}
