/*
 * Customer accounts for the offline demo. Accounts and the active session live
 * in localStorage, so this is a UI demonstration, not real authentication.
 */
import { DEMO_USERS } from '../data/sample-users.js';

const USERS_KEY = 'gspot.users.v1';
const SESSION_KEY = 'gspot.session.v1';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* corrupted storage falls back to the seed */
  }
  return saveUsers(DEMO_USERS.map(user => ({ ...user })));
}

export function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* private mode: keep the in-memory copy only */
  }
  return users;
}

export function findUser(email) {
  const target = String(email || '').trim().toLowerCase();
  if (!target) return null;
  return loadUsers().find(user => user.email.toLowerCase() === target) || null;
}

function startSession(user) {
  const session = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    at: new Date().toISOString()
  };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* ignore storage failures */
  }
  return session;
}

export function getCustomerSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session && session.role === 'Customer' ? session : null;
  } catch {
    return null;
  }
}

export function loginCustomer(email, password) {
  const cleanEmail = String(email || '').trim();
  if (!cleanEmail || !password) {
    return { ok: false, error: 'Enter your email and password.' };
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return { ok: false, error: 'Enter a valid email address.' };
  }
  const user = findUser(cleanEmail);
  if (!user || user.role !== 'Customer') {
    return { ok: false, error: 'No customer account matches that email.' };
  }
  if (!user.active) {
    return { ok: false, error: 'This account is deactivated. Ask at the shop counter.' };
  }
  if (user.password !== password) {
    return { ok: false, error: 'Incorrect password. Try again.' };
  }
  startSession(user);
  return { ok: true, user };
}

export function registerCustomer({ name, email, phone, password, confirmPassword }) {
  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanPhone = String(phone || '').trim();

  if (cleanName.length < 2) return { ok: false, error: 'Enter your full name.' };
  if (!EMAIL_RE.test(cleanEmail)) return { ok: false, error: 'Enter a valid email address.' };
  if (cleanPhone.replace(/\D/g, '').length < 10) {
    return { ok: false, error: 'Enter a phone number with at least 10 digits.' };
  }
  if (String(password || '').length < 8) {
    return { ok: false, error: 'Use a password of at least 8 characters.' };
  }
  if (password !== confirmPassword) {
    return { ok: false, error: 'The two passwords do not match.' };
  }

  const users = loadUsers();
  if (users.some(user => user.email.toLowerCase() === cleanEmail)) {
    return { ok: false, error: 'An account with that email already exists. Try signing in.' };
  }

  const user = {
    id: `c${Date.now()}`,
    role: 'Customer',
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    password: String(password),
    active: true,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  saveUsers(users);
  startSession(user);
  return { ok: true, user };
}

export function logoutCustomer() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore storage failures */
  }
}

export function resetDemoUsers() {
  try {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('gspot.cart.v1');
  } catch {
    /* ignore storage failures */
  }
}
