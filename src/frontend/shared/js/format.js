// Presentation helpers shared by every G Spot UI.
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

export function money(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

export function formatDateTime(value) {
  if (!value) return '—';
  return new Date(value).toLocaleString('en-PH', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

export function timeAgo(value) {
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function todayLabel() {
  return new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}

export function asset(file) {
  return `../../shared/assets/images/${file}`;
}

export const TICKET_STATUS = {
  pending: { label: 'Pending', tone: 'amber' },
  confirmed: { label: 'Confirmed', tone: 'blue' },
  'in-progress': { label: 'In Service', tone: 'blue' },
  ready: { label: 'Ready for Pickup', tone: 'green' },
  completed: { label: 'Completed', tone: 'gray' },
  cancelled: { label: 'Cancelled', tone: 'red' }
};

export function statusBadge(status) {
  const meta = TICKET_STATUS[status] ?? { label: status, tone: 'gray' };
  return `<span class="gs-badge gs-badge--${meta.tone}">${escapeHtml(meta.label)}</span>`;
}

export function kindBadge(kind) {
  return `<span class="gs-badge gs-badge--outline">${kind === 'parts' ? 'PARTS' : 'SERVICE'}</span>`;
}

export function roleBadge(role) {
  const tone = role === 'Admin' ? 'red' : 'blue';
  return `<span class="gs-badge gs-badge--${tone}">${escapeHtml(role)}</span>`;
}

export function initials(name) {
  return String(name ?? '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('');
}
