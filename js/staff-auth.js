/*
 * Staff sign-in and the shared shop data store for the demo dashboards.
 * Role checks run in the browser only; they are a convenient demo, not a
 * security boundary.
 */
import { DEMO_AUDIT, DEMO_BOOKINGS, DEMO_INVENTORY, DEMO_SETTINGS } from '../data/sample-users.js';
import { loadUsers } from './auth.js';

const STAFF_SESSION_KEY = 'gspot.staff.v1';
const OPS_KEY = 'gspot.ops.v2';
const STAFF_ROLES = ['Manager', 'Admin'];

export function getStaffSession() {
  try {
    const raw = localStorage.getItem(STAFF_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session && STAFF_ROLES.includes(session.role) ? session : null;
  } catch {
    return null;
  }
}

export function staffLogin(email, password) {
  const cleanEmail = String(email || '').trim();
  if (!cleanEmail || !password) {
    return { ok: false, error: 'Enter your work email and password.' };
  }
  const user = loadUsers().find(
    account => account.email.toLowerCase() === cleanEmail.toLowerCase()
  );
  if (!user || !STAFF_ROLES.includes(user.role)) {
    return { ok: false, error: 'No staff account matches that email.' };
  }
  if (!user.active) {
    return { ok: false, error: 'This staff account is deactivated.' };
  }
  if (user.password !== password) {
    return { ok: false, error: 'Incorrect password. Try again.' };
  }
  const session = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    at: new Date().toISOString()
  };
  try {
    localStorage.setItem(STAFF_SESSION_KEY, JSON.stringify(session));
  } catch {
    /* ignore storage failures */
  }
  return { ok: true, user, session };
}

export function staffLogout() {
  try {
    localStorage.removeItem(STAFF_SESSION_KEY);
  } catch {
    /* ignore storage failures */
  }
}

/*
 * Page guard: sends signed-out visitors to the staff login page and signed-in
 * staff to the dashboard that matches their role. Returns the session or null
 * (the caller must stop when null).
 */
export function requireStaff(role) {
  const session = getStaffSession();
  if (!session) {
    location.replace('staff-login.html');
    return null;
  }
  if (session.role !== role) {
    location.replace(session.role === 'Admin' ? 'admin.html' : 'manager.html');
    return null;
  }
  return session;
}

function seedOps() {
  return {
    version: 2,
    settings: { ...DEMO_SETTINGS },
    bookings: DEMO_BOOKINGS.map(booking => ({ ...booking, items: booking.items.map(item => ({ ...item })) })),
    inventory: DEMO_INVENTORY.map(part => ({ ...part })),
    audit: DEMO_AUDIT.map(entry => ({ ...entry, actor: { ...entry.actor } }))
  };
}

export function loadOps() {
  try {
    const raw = localStorage.getItem(OPS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.bookings) && Array.isArray(parsed.inventory)) {
        return {
          ...seedOps(),
          ...parsed,
          settings: { ...DEMO_SETTINGS, ...(parsed.settings || {}) }
        };
      }
    }
  } catch {
    /* corrupted storage falls back to the seed */
  }
  return saveOps(seedOps());
}

export function saveOps(ops) {
  try {
    localStorage.setItem(OPS_KEY, JSON.stringify(ops));
  } catch {
    /* ignore storage failures */
  }
  return ops;
}

export function recordAudit(actor, action, details) {
  const ops = loadOps();
  ops.audit.unshift({
    id: `a${Date.now()}`,
    at: new Date().toISOString(),
    actor: { name: actor.name, role: actor.role },
    action,
    details
  });
  ops.audit = ops.audit.slice(0, 50);
  saveOps(ops);
}

export function resetDemoOps() {
  try {
    localStorage.removeItem(OPS_KEY);
    localStorage.removeItem(STAFF_SESSION_KEY);
  } catch {
    /* ignore storage failures */
  }
}
