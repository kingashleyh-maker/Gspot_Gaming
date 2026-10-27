/*
 * Offline demo data layer. Every role UI talks to this store instead of a server
 * so the interfaces stay functional without a backend. Passwords are demo-only;
 * replace this module with the real API client when the backend is introduced.
 */
const STORAGE_KEY = 'gspot:demo:v2';
const SESSION_KEY = 'gspot:session';

const hoursAgo = hours => new Date(Date.now() - hours * 3600 * 1000).toISOString();

function seedState() {
  return {
    version: 2,
    settings: {
      shopName: 'G Spot Automotive Center',
      currency: 'PHP',
      taxRate: 12,
      lowStockThreshold: 10,
      bookingOpen: true
    },
    staff: [
      {
        id: 'sp6',
        name: 'Admin',
        email: 'admin@gspot.com',
        staffId: 'admin',
        password: 'admin0000',
        role: 'Admin',
        active: true,
        createdAt: '2026-01-08T08:00:00.000Z'
      },
      {
        id: 'sp2',
        name: 'Sarah Chen',
        email: 'sarah.chen@gspot.com',
        staffId: 'sarah.chen',
        password: 'sarah2345',
        role: 'Manager',
        active: true,
        createdAt: '2026-02-14T08:00:00.000Z'
      },
      {
        id: 'sp4',
        name: 'Ana Martinez',
        email: 'ana.martinez@gspot.com',
        staffId: 'ana.martinez',
        password: 'ana4567',
        role: 'Manager',
        active: true,
        createdAt: '2026-03-02T08:00:00.000Z'
      },
      {
        id: 'sp5',
        name: 'Marco Reyes',
        email: 'marco.reyes@gspot.com',
        staffId: 'marco.reyes',
        password: 'marco8899',
        role: 'Manager',
        active: true,
        createdAt: '2026-05-19T08:00:00.000Z'
      }
    ],
    parts: [
      {"id": "p1", "sku": "FLD-001", "name": "Engine Oil 5W-30", "category": "Fluids", "price":850, "stock":48, "image": "image-22.jpg", "active":true},
      {"id": "p2", "sku": "FLT-002", "name": "Oil Filter", "category": "Filters", "price":320, "stock":62, "image": "image-10.jpg", "active":true},
      {"id": "p3", "sku": "FLT-003", "name": "Air Filter", "category": "Filters", "price":650, "stock":35, "image": "image-11.jpg", "active":true},
      {"id": "p4", "sku": "FLT-004", "name": "Fuel Filter", "category": "Filters", "price":480, "stock":28, "image": "image-12.jpg", "active":true},
      {"id": "p5", "sku": "ENG-005", "name": "Spark Plugs ×4", "category": "Engine", "price":1200, "stock":20, "image": "image-01.jpg", "active":true},
      {"id": "p6", "sku": "BRK-006", "name": "Brake Pads — Front", "category": "Brakes", "price":2200, "stock":18, "image": "image-04.jpg", "active":true},
      {"id": "p7", "sku": "BRK-007", "name": "Brake Pads — Rear", "category": "Brakes", "price":1900, "stock":15, "image": "image-05.jpg", "active":true},
      {"id": "p8", "sku": "BRK-008", "name": "Brake Discs / Rotors", "category": "Brakes", "price":3800, "stock":10, "image": "image-06.jpg", "active":true},
      {"id": "p9", "sku": "BRK-009", "name": "Brake Fluid DOT 4", "category": "Brakes", "price":380, "stock":40, "image": "image-07.jpg", "active":true},
      {"id": "p10", "sku": "BAT-010", "name": "Car Battery 12V 60Ah", "category": "Batteries", "price":4500, "stock":12, "image": "image-09.jpg", "active":true},
      {"id": "p11", "sku": "TIR-011", "name": "Tire — All-Season", "category": "Tires", "price":3200, "stock":24, "image": "image-08.jpg", "active":true},
      {"id": "p12", "sku": "ACC-012", "name": "Wiper Blades — Pair", "category": "Accessories", "price":650, "stock":30, "image": "image-20.jpg", "active":true},
      {"id": "p13", "sku": "FLD-013", "name": "Coolant / Antifreeze", "category": "Fluids", "price":420, "stock":55, "image": "image-19.jpg", "active":true},
      {"id": "p14", "sku": "FLD-014", "name": "Transmission Fluid ATF", "category": "Fluids", "price":750, "stock":32, "image": "image-21.jpg", "active":true},
      {"id": "p15", "sku": "ENG-015", "name": "Serpentine Drive Belt", "category": "Engine", "price":1100, "stock":14, "image": "image-02.jpg", "active":true},
      {"id": "p16", "sku": "ENG-016", "name": "Timing Belt Kit", "category": "Engine", "price":4200, "stock":8, "image": "image-03.jpg", "active":true},
      {"id": "p17", "sku": "SUS-017", "name": "Shock Absorbers — Pair", "category": "Suspension", "price":5500, "stock":10, "image": "image-14.jpg", "active":true},
      {"id": "p18", "sku": "SUS-018", "name": "Suspension Bushings Set", "category": "Suspension", "price":1800, "stock":16, "image": "image-18.jpg", "active":true},
      {"id": "p19", "sku": "SUS-019", "name": "Wheel Bearing Assembly", "category": "Suspension", "price":2400, "stock":12, "image": "image-17.jpg", "active":true},
      {"id": "p20", "sku": "LGT-020", "name": "Headlight Bulbs — Pair", "category": "Lights", "price":580, "stock":38, "image": "image-16.jpg", "active":true},
      {"id": "p21", "sku": "LGT-021", "name": "Fuses Assortment Box", "category": "Lights", "price":150, "stock":50, "image": "image-23.jpg", "active":true},
      {"id": "p22", "sku": "FLT-022", "name": "Cabin Air Filter", "category": "Filters", "price":550, "stock":40, "image": "image-13.jpg", "active":true},
      {"id": "p23", "sku": "FLD-023", "name": "Power Steering Fluid", "category": "Fluids", "price":320, "stock":44, "image": "image-24.jpg", "active":true},
      {"id": "p24", "sku": "LGT-024", "name": "LED Turn Signal Bulbs ×2", "category": "Lights", "price":480, "stock":25, "image": "image-15.jpg", "active":true},
      {"id": "p25", "sku": "FLD-025", "name": "Engine Oil 10W-40 — 4 L", "category": "Fluids", "price":780, "stock":30, "image": "image-22.jpg", "active":true},
      {"id": "p26", "sku": "FLT-026", "name": "Oil Filter — Compact Car", "category": "Filters", "price":280, "stock":42, "image": "image-10.jpg", "active":true},
      {"id": "p27", "sku": "FLT-027", "name": "Engine Air Filter — Compact Car", "category": "Filters", "price":520, "stock":26, "image": "image-11.jpg", "active":true},
      {"id": "p28", "sku": "FLT-028", "name": "Fuel Filter — Diesel", "category": "Filters", "price":650, "stock":20, "image": "image-12.jpg", "active":true},
      {"id": "p29", "sku": "ENG-029", "name": "Spark Plugs — Standard Set of 4", "category": "Engine", "price":680, "stock":32, "image": "image-01.jpg", "active":true},
      {"id": "p30", "sku": "BRK-030", "name": "Brake Pads — Front Economy", "category": "Brakes", "price":1650, "stock":22, "image": "image-04.jpg", "active":true},
      {"id": "p31", "sku": "BRK-031", "name": "Brake Pads — Rear Premium", "category": "Brakes", "price":2450, "stock":16, "image": "image-05.jpg", "active":true},
      {"id": "p32", "sku": "BRK-032", "name": "Brake Rotor — Single", "category": "Brakes", "price":1950, "stock":14, "image": "image-06.jpg", "active":true},
      {"id": "p33", "sku": "BRK-033", "name": "Brake Fluid DOT 4 — 1 L", "category": "Brakes", "price":650, "stock":35, "image": "image-07.jpg", "active":true},
      {"id": "p34", "sku": "BAT-034", "name": "Car Battery 12V 45Ah", "category": "Batteries", "price":3800, "stock":15, "image": "image-09.jpg", "active":true},
      {"id": "p35", "sku": "TIR-035", "name": "Touring Tire — Standard", "category": "Tires", "price":3600, "stock":24, "image": "image-08.jpg", "active":true},
      {"id": "p36", "sku": "ACC-036", "name": "Wiper Blades — Compact Pair", "category": "Accessories", "price":480, "stock":38, "image": "image-20.jpg", "active":true}
    ],
    services: [
      {"id": "s1", "name": "Oil Change", "description": "Full synthetic or conventional oil change with filter replacement", "price":850, "duration":45, "image": "image-25.jpg", "active":true},
      {"id": "s2", "name": "Brake Inspection", "description": "Complete brake system inspection including pads, rotors and brake lines", "price":500, "duration":30, "image": "image-33.jpg", "active":true},
      {"id": "s3", "name": "Brake Repair", "description": "Full brake repair including pad replacement and rotor resurfacing", "price":3500, "duration":90, "image": "image-32.jpg", "active":true},
      {"id": "s4", "name": "Tire Replacement", "description": "Remove and replace up to 4 tires including wheel balancing", "price":4500, "duration":60, "image": "image-26.jpg", "active":true},
      {"id": "s5", "name": "Tire Rotation", "description": "Rotate all four tires to ensure even tread wear and longer tire life", "price":400, "duration":20, "image": "image-27.jpg", "active":true},
      {"id": "s6", "name": "Battery Check", "description": "Battery load test, terminal cleaning and charging system inspection", "price":350, "duration":15, "image": "image-28.jpg", "active":true},
      {"id": "s7", "name": "Battery Replacement", "description": "Supply and fit a new OEM-spec 12V battery with 1-year warranty", "price":5500, "duration":30, "image": "image-29.jpg", "active":true},
      {"id": "s8", "name": "Engine Check", "description": "Full OBD-II engine diagnostic scan with printed condition report", "price":1000, "duration":45, "image": "image-34.jpg", "active":true},
      {"id": "s9", "name": "Air Conditioning Service", "description": "AC system inspection, refrigerant recharge and leak detection", "price":2500, "duration":90, "image": "image-31.jpg", "active":true},
      {"id": "s10", "name": "General Vehicle Inspection", "description": "Comprehensive 50-point vehicle health check with full condition report", "price":1200, "duration":60, "image": "image-30.jpg", "active":true},
      {"id": "s11", "name": "Oil and Filter Service — Premium", "description": "Premium synthetic oil service with an oil filter replacement.", "price":1450, "duration":45, "image": "image-25.jpg", "active":true},
      {"id": "s12", "name": "Brake Fluid Replacement", "description": "Drain and replace brake fluid and bleed the brake system.", "price":950, "duration":45, "image": "image-33.jpg", "active":true},
      {"id": "s13", "name": "Brake Pad Installation", "description": "Install replacement brake pads and inspect braking operation. Parts charged separately.", "price":1200, "duration":60, "image": "image-32.jpg", "active":true},
      {"id": "s14", "name": "Wheel Balancing", "description": "Balance four wheels to help reduce vibration.", "price":650, "duration":40, "image": "image-26.jpg", "active":true},
      {"id": "s15", "name": "Tire Puncture Repair", "description": "Inspect and repair an eligible tread puncture.", "price":250, "duration":30, "image": "image-27.jpg", "active":true},
      {"id": "s16", "name": "Battery Terminal Cleaning", "description": "Clean terminals and inspect battery cable connections.", "price":250, "duration":20, "image": "image-28.jpg", "active":true},
      {"id": "s17", "name": "Charging System Test", "description": "Check battery voltage and alternator charging performance.", "price":450, "duration":30, "image": "image-29.jpg", "active":true},
      {"id": "s18", "name": "Check Engine Light Scan", "description": "Read stored diagnostic codes and explain scan results.", "price":650, "duration":30, "image": "image-34.jpg", "active":true},
      {"id": "s19", "name": "AC Performance Check", "description": "Check vent temperature and inspect air conditioning operation.", "price":750, "duration":40, "image": "image-31.jpg", "active":true},
      {"id": "s20", "name": "Pre-Trip Safety Inspection", "description": "Inspect tires, lights, fluids and visible safety components before a trip.", "price":900, "duration":45, "image": "image-30.jpg", "active":true}
    ],
    tickets: [
      {
        id: 't1',
        number: 'SVC-2026-0041',
        kind: 'service',
        customer: 'James Kowalski',
        phone: '+63 917 555 0141',
        vehicle: { make: 'Toyota', model: 'Camry', year: 2019, plate: 'ABC 1234' },
        items: [{ name: 'Oil Change', qty: 1, price: 850 }],
        quotes: [],
        status: 'in-progress',
        note: 'Customer waiting in lounge.',
        createdAt: hoursAgo(1),
        updatedAt: hoursAgo(0.4)
      },
      {
        id: 't2',
        number: 'SVC-2026-0040',
        kind: 'service',
        customer: 'Priya Nair',
        phone: '+63 918 555 0140',
        vehicle: { make: 'Honda', model: 'Civic', year: 2021, plate: 'XYZ 8890' },
        items: [{ name: 'Brake Inspection', qty: 1, price: 500 }],
        quotes: [{ id: 'q1', description: 'Brake fluid flush', amount: 1200, approved: false }],
        status: 'pending',
        note: 'Squeaking reported on front brakes.',
        createdAt: hoursAgo(0.5),
        updatedAt: hoursAgo(0.5)
      },
      {
        id: 't3',
        number: 'PRT-2026-0039',
        kind: 'parts',
        customer: 'Carlos Reyes',
        phone: '+63 919 555 0139',
        vehicle: { make: 'Ford', model: 'Ranger', year: 2020, plate: 'NCR 4521' },
        items: [{ name: 'Brake Pads — Front', qty: 1, price: 2200 }],
        quotes: [],
        status: 'ready',
        note: 'For pickup at counter 2.',
        createdAt: hoursAgo(2),
        updatedAt: hoursAgo(0.2)
      },
      {
        id: 't4',
        number: 'SVC-2026-0038',
        kind: 'service',
        customer: 'Maria Santos',
        phone: '+63 920 555 0138',
        vehicle: { make: 'Toyota', model: 'Vios', year: 2018, plate: 'QLD 7788' },
        items: [{ name: 'Battery Check', qty: 1, price: 350 }],
        quotes: [],
        status: 'completed',
        note: 'Battery replaced; warranty card issued.',
        createdAt: hoursAgo(26),
        updatedAt: hoursAgo(24)
      }
    ],
    auditLogs: [
      {
        id: 'a1',
        at: hoursAgo(0.2),
        actor: { id: 'sp2', name: 'Sarah Chen', role: 'Manager' },
        action: 'ticket.status',
        entity: 'ticket',
        entityId: 'PRT-2026-0039',
        details: 'In Service → Ready for Pickup'
      },
      {
        id: 'a2',
        at: hoursAgo(0.4),
        actor: { id: 'sp2', name: 'Sarah Chen', role: 'Manager' },
        action: 'ticket.status',
        entity: 'ticket',
        entityId: 'SVC-2026-0041',
        details: 'Confirmed → In Service'
      },
      {
        id: 'a3',
        at: hoursAgo(3),
        actor: { id: 'sp6', name: 'Admin', role: 'Admin' },
        action: 'inventory.update',
        entity: 'part',
        entityId: 'BRK-008',
        details: 'Stock 12 → 10'
      }
    ]
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 2) {
      const seeded = seedState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return parsed;
  } catch {
    const seeded = seedState();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    } catch {
      /* storage can be unavailable in private modes */
    }
    return seeded;
  }
}

function writeStore(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent('gspot:store-changed'));
}

function pushAudit(state, actor, action, entity, entityId, details) {
  state.auditLogs.unshift({
    id: `a-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
    at: new Date().toISOString(),
    actor: { id: actor.id, name: actor.name, role: actor.role },
    action,
    entity,
    entityId,
    details
  });
  state.auditLogs = state.auditLogs.slice(0, 200);
}

function actorOf(session) {
  if (!session) return { id: 'system', name: 'System', role: 'System' };
  return { id: session.staffId, name: session.name, role: session.role };
}

export function requireRole(session, roles) {
  if (!session || !roles.includes(session.role)) {
    throw new Error('You do not have permission to perform this action.');
  }
  return session;
}

export function authenticate(identifier, password) {
  const key = String(identifier ?? '').trim().toLowerCase();
  if (!key || !password) return null;
  return (
    readStore().staff.find(
      member =>
        member.active !== false &&
        (member.staffId.toLowerCase() === key || member.email.toLowerCase() === key) &&
        member.password === password
    ) ?? null
  );
}

export function startSession(staff) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ staffId: staff.id, name: staff.name, email: staff.email, role: staff.role })
  );
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function endSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function listTickets() {
  return clone(readStore().tickets).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getTicket(id) {
  return clone(readStore().tickets.find(ticket => ticket.id === id) ?? null);
}

export function itemsTotal(ticket) {
  return (ticket.items ?? []).reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function approvedQuotesTotal(ticket) {
  return (ticket.quotes ?? []).filter(quote => quote.approved).reduce((sum, quote) => sum + quote.amount, 0);
}

export function pendingQuotesTotal(ticket) {
  return (ticket.quotes ?? []).filter(quote => !quote.approved).reduce((sum, quote) => sum + quote.amount, 0);
}

export function ticketTotal(ticket) {
  return itemsTotal(ticket) + approvedQuotesTotal(ticket);
}

export function updateTicketStatus(ticketId, status, session) {
  requireRole(session, ['Manager', 'Admin']);
  const state = readStore();
  const ticket = state.tickets.find(item => item.id === ticketId);
  if (!ticket) throw new Error('Ticket not found.');
  const allowed = ['pending', 'confirmed', 'in-progress', 'ready', 'completed', 'cancelled'];
  if (!allowed.includes(status)) throw new Error('Unknown ticket status.');
  const previous = ticket.status;
  ticket.status = status;
  ticket.updatedAt = new Date().toISOString();
  pushAudit(state, actorOf(session), 'ticket.status', 'ticket', ticket.number, `${previous} → ${status}`);
  writeStore(state);
  return clone(ticket);
}

export function addTicketQuote(ticketId, { description, amount }, session) {
  requireRole(session, ['Manager', 'Admin']);
  const state = readStore();
  const ticket = state.tickets.find(item => item.id === ticketId);
  if (!ticket) throw new Error('Ticket not found.');
  const cleanDescription = String(description ?? '').trim();
  const cleanAmount = Number(amount);
  if (!cleanDescription) throw new Error('Describe the additional issue or part.');
  if (!Number.isFinite(cleanAmount) || cleanAmount <= 0) throw new Error('Enter a valid quote amount.');
  ticket.quotes.push({
    id: `q-${Date.now()}`,
    description: cleanDescription,
    amount: Math.round(cleanAmount),
    approved: false
  });
  ticket.updatedAt = new Date().toISOString();
  pushAudit(state, actorOf(session), 'ticket.quote', 'ticket', ticket.number, `Quote added: ${cleanDescription}`);
  writeStore(state);
  return clone(ticket);
}

export function setQuoteApproved(ticketId, quoteId, approved, session) {
  requireRole(session, ['Manager', 'Admin']);
  const state = readStore();
  const ticket = state.tickets.find(item => item.id === ticketId);
  if (!ticket) throw new Error('Ticket not found.');
  const quote = ticket.quotes.find(item => item.id === quoteId);
  if (!quote) throw new Error('Quote not found.');
  quote.approved = Boolean(approved);
  ticket.updatedAt = new Date().toISOString();
  pushAudit(
    state,
    actorOf(session),
    'ticket.quote',
    'ticket',
    ticket.number,
    `${quote.description} ${approved ? 'approved by customer' : 'returned to pending'}`
  );
  writeStore(state);
  return clone(ticket);
}

export function listParts() {
  return clone(readStore().parts);
}

export function updatePart(partId, patch, session) {
  requireRole(session, ['Manager', 'Admin']);
  const state = readStore();
  const part = state.parts.find(item => item.id === partId);
  if (!part) throw new Error('Part not found.');
  const nextPrice = Number(patch.price ?? part.price);
  const nextStock = Number(patch.stock ?? part.stock);
  if (!Number.isFinite(nextPrice) || nextPrice < 0) throw new Error('Enter a valid price.');
  if (!Number.isInteger(nextStock) || nextStock < 0) throw new Error('Stock must be a whole number.');
  const changes = [];
  if (patch.name && patch.name !== part.name) changes.push(`name: ${part.name} → ${patch.name}`);
  if (Math.round(nextPrice) !== part.price) changes.push(`price: ${part.price} → ${Math.round(nextPrice)}`);
  if (nextStock !== part.stock) changes.push(`stock: ${part.stock} → ${nextStock}`);
  if (patch.category && patch.category !== part.category) changes.push(`category: ${part.category} → ${patch.category}`);
  part.name = String(patch.name ?? part.name).trim();
  part.category = String(patch.category ?? part.category).trim();
  part.price = Math.round(nextPrice);
  part.stock = nextStock;
  if (typeof patch.active === 'boolean') part.active = patch.active;
  pushAudit(state, actorOf(session), 'inventory.update', 'part', part.sku, changes.join(', ') || 'No changes');
  writeStore(state);
  return clone(part);
}

export function adjustStock(partId, delta, session) {
  const part = readStore().parts.find(item => item.id === partId);
  if (!part) throw new Error('Part not found.');
  const nextStock = Math.max(0, part.stock + Number(delta));
  return updatePart(partId, { stock: nextStock }, session);
}

export function listServices() {
  return clone(readStore().services);
}

export function updateService(serviceId, patch, session) {
  requireRole(session, ['Manager', 'Admin']);
  const state = readStore();
  const service = state.services.find(item => item.id === serviceId);
  if (!service) throw new Error('Service not found.');
  const nextPrice = Number(patch.price ?? service.price);
  const nextDuration = Number(patch.duration ?? service.duration);
  if (!Number.isFinite(nextPrice) || nextPrice < 0) throw new Error('Enter a valid price.');
  if (!Number.isInteger(nextDuration) || nextDuration < 0) throw new Error('Duration must be whole minutes.');
  const changes = [];
  if (patch.name && patch.name !== service.name) changes.push(`name: ${service.name} → ${patch.name}`);
  if (Math.round(nextPrice) !== service.price) changes.push(`price: ${service.price} → ${Math.round(nextPrice)}`);
  if (nextDuration !== service.duration) changes.push(`duration: ${service.duration} → ${nextDuration}m`);
  service.name = String(patch.name ?? service.name).trim();
  service.description = String(patch.description ?? service.description).trim();
  service.price = Math.round(nextPrice);
  service.duration = nextDuration;
  if (typeof patch.active === 'boolean') service.active = patch.active;
  pushAudit(state, actorOf(session), 'service.update', 'service', service.id, changes.join(', ') || 'No changes');
  writeStore(state);
  return clone(service);
}

export function listStaff() {
  return clone(readStore().staff);
}

export function createStaff(payload, session) {
  requireRole(session, ['Admin']);
  const state = readStore();
  const name = String(payload.name ?? '').trim();
  const email = String(payload.email ?? '').trim().toLowerCase();
  const staffId = String(payload.staffId ?? '').trim().toLowerCase();
  const password = String(payload.password ?? '');
  const role = payload.role === 'Admin' ? 'Admin' : 'Manager';
  if (!name || !email.includes('@') || !staffId) throw new Error('Name, email and staff ID are required.');
  if (password.length < 8) throw new Error('Use at least 8 characters for the demo password.');
  if (state.staff.some(member => member.email.toLowerCase() === email || member.staffId.toLowerCase() === staffId)) {
    throw new Error('A staff account with that email or staff ID already exists.');
  }
  const member = {
    id: `sp-${Date.now()}`,
    name,
    email,
    staffId,
    password,
    role,
    active: true,
    createdAt: new Date().toISOString()
  };
  state.staff.push(member);
  pushAudit(state, actorOf(session), 'staff.create', 'staff', staffId, `${name} added as ${role}`);
  writeStore(state);
  return clone(member);
}

export function updateStaffRole(memberId, role, session) {
  requireRole(session, ['Admin']);
  if (memberId === session.staffId) throw new Error('You cannot change your own role.');
  if (!['Manager', 'Admin'].includes(role)) throw new Error('Unknown role.');
  const state = readStore();
  const member = state.staff.find(item => item.id === memberId);
  if (!member) throw new Error('Staff member not found.');
  const previous = member.role;
  member.role = role;
  pushAudit(state, actorOf(session), 'staff.role', 'staff', member.staffId, `${previous} → ${role}`);
  writeStore(state);
  return clone(member);
}

export function setStaffActive(memberId, active, session) {
  requireRole(session, ['Admin']);
  if (memberId === session.staffId) throw new Error('You cannot deactivate your own account.');
  const state = readStore();
  const member = state.staff.find(item => item.id === memberId);
  if (!member) throw new Error('Staff member not found.');
  member.active = Boolean(active);
  pushAudit(
    state,
    actorOf(session),
    'staff.access',
    'staff',
    member.staffId,
    active ? 'Account reactivated' : 'Account deactivated'
  );
  writeStore(state);
  return clone(member);
}

export function listAuditLogs() {
  return clone(readStore().auditLogs);
}

export function getSettings() {
  return clone(readStore().settings);
}

export function updateSettings(patch, session) {
  requireRole(session, ['Admin']);
  const state = readStore();
  const settings = state.settings;
  const taxRate = Number(patch.taxRate ?? settings.taxRate);
  const lowStockThreshold = Number(patch.lowStockThreshold ?? settings.lowStockThreshold);
  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) throw new Error('Tax rate must be 0–100.');
  if (!Number.isInteger(lowStockThreshold) || lowStockThreshold < 0) throw new Error('Low-stock threshold must be a whole number.');
  settings.shopName = String(patch.shopName ?? settings.shopName).trim() || settings.shopName;
  settings.currency = String(patch.currency ?? settings.currency).trim() || settings.currency;
  settings.taxRate = taxRate;
  settings.lowStockThreshold = lowStockThreshold;
  if (typeof patch.bookingOpen === 'boolean') settings.bookingOpen = patch.bookingOpen;
  pushAudit(state, actorOf(session), 'settings.update', 'settings', 'system', 'System settings updated');
  writeStore(state);
  return clone(settings);
}

export function stats() {
  const state = readStore();
  const today = new Date().toDateString();
  const tickets = state.tickets;
  const revenue = tickets
    .filter(ticket => ['ready', 'completed'].includes(ticket.status))
    .reduce((sum, ticket) => sum + ticketTotal(ticket), 0);
  return {
    tickets: tickets.length,
    todayTickets: tickets.filter(ticket => new Date(ticket.createdAt).toDateString() === today).length,
    pending: tickets.filter(ticket => ticket.status === 'pending').length,
    active: tickets.filter(ticket => ['confirmed', 'in-progress'].includes(ticket.status)).length,
    ready: tickets.filter(ticket => ticket.status === 'ready').length,
    completed: tickets.filter(ticket => ticket.status === 'completed').length,
    revenue,
    lowStock: state.parts.filter(part => part.stock <= state.settings.lowStockThreshold),
    outOfStock: state.parts.filter(part => part.stock === 0).length,
    staff: state.staff.length,
    admins: state.staff.filter(member => member.role === 'Admin').length,
    managers: state.staff.filter(member => member.role === 'Manager').length,
    audit: state.auditLogs.length
  };
}

export function resetDemo() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('gspot:store-changed'));
}

export const DEMO_ACCOUNTS = [
  { label: 'Admin', identifier: 'admin', password: 'admin0000', role: 'Admin' },
  { label: 'Manager', identifier: 'sarah.chen', password: 'sarah2345', role: 'Manager' },
  { label: 'Manager', identifier: 'ana.martinez', password: 'ana4567', role: 'Manager' }
];
