/*
 * Demo accounts and seeded shop data for the G Spot site.
 * Everything here is fake and lives only in this browser. Passwords are plain
 * text on purpose so the demo can log in; never reuse a real password.
 */

import { PARTS } from './catalog.js';

const STOCK_OVERRIDES = {
  'BRK-006': 7,
  'BRK-008': 6,
  'BAT-010': 9,
  'ENG-016': 4,
  'SUS-017': 11
};

export const DEMO_USERS = [
  {
    id: 'c1',
    role: 'Customer',
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    phone: '+63 920 555 0138',
    password: 'demo1234',
    active: true,
    createdAt: '2026-02-03T09:12:00.000Z'
  },
  {
    id: 'c2',
    role: 'Customer',
    name: 'James Kowalski',
    email: 'james.kowalski@example.com',
    phone: '+63 917 555 0141',
    password: 'demo1234',
    active: true,
    createdAt: '2026-03-18T02:40:00.000Z'
  },
  {
    id: 'c3',
    role: 'Customer',
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    phone: '+63 918 555 0140',
    password: 'demo1234',
    active: true,
    createdAt: '2026-05-06T06:05:00.000Z'
  },
  {
    id: 'c4',
    role: 'Customer',
    name: 'Carlos Reyes',
    email: 'carlos.reyes@example.com',
    phone: '+63 919 555 0139',
    password: 'demo1234',
    active: true,
    createdAt: '2026-06-22T08:30:00.000Z'
  },
  {
    id: 'm1',
    role: 'Manager',
    name: 'Sarah Chen',
    email: 'sarah.chen@gspotauto.ph',
    phone: '+63 917 555 0102',
    password: 'manager123',
    active: true,
    createdAt: '2026-01-12T01:00:00.000Z'
  },
  {
    id: 'm2',
    role: 'Manager',
    name: 'Marco Reyes',
    email: 'marco.reyes@gspotauto.ph',
    phone: '+63 917 555 0117',
    password: 'manager123',
    active: true,
    createdAt: '2026-04-02T03:15:00.000Z'
  },
  {
    id: 'a1',
    role: 'Admin',
    name: 'Ana Villanueva',
    email: 'admin@gspotauto.ph',
    phone: '+63 917 555 0100',
    password: 'admin123',
    active: true,
    createdAt: '2026-01-08T00:30:00.000Z'
  }
];

export const DEMO_BOOKINGS = [
  {
    id: 'b1049',
    number: 'B-1049',
    customer: 'Ravi Patel',
    phone: '+63 921 555 0164',
    kind: 'Service',
    vehicle: '2021 Toyota Innova · NCR 5510',
    items: [{ name: 'Brake Repair', qty: 1, price: 3500 }],
    status: 'completed',
    note: 'Picked up at 4:10 PM.',
    createdAt: '2026-10-26T02:10:00.000Z',
    updatedAt: '2026-10-26T08:10:00.000Z'
  },
  {
    id: 'b1048',
    number: 'B-1048',
    customer: 'Grace Tan',
    phone: '+63 917 555 0122',
    kind: 'Parts order',
    vehicle: '2019 Nissan Navara · NCR 2288',
    items: [{ name: 'Engine Oil 5W-30', qty: 2, price: 850 }],
    status: 'ready',
    note: 'Counter pickup, paid in cash.',
    createdAt: '2026-10-27T00:20:00.000Z',
    updatedAt: '2026-10-27T01:05:00.000Z'
  },
  {
    id: 'b1047',
    number: 'B-1047',
    customer: 'James Kowalski',
    phone: '+63 917 555 0141',
    kind: 'Service',
    vehicle: '2019 Toyota Camry · ABC 1234',
    items: [{ name: 'Air Conditioning Service', qty: 1, price: 2500 }],
    status: 'in-progress',
    note: 'Customer waiting in the lounge.',
    createdAt: '2026-10-27T00:40:00.000Z',
    updatedAt: '2026-10-27T01:15:00.000Z'
  },
  {
    id: 'b1046',
    number: 'B-1046',
    customer: 'Daniel Lim',
    phone: '+63 918 555 0198',
    kind: 'Parts order',
    vehicle: '2020 Mazda 3 · NCR 7741',
    items: [{ name: 'Oil Filter', qty: 1, price: 320 }],
    status: 'pending',
    note: 'Waiting for stock confirmation.',
    createdAt: '2026-10-27T01:00:00.000Z',
    updatedAt: '2026-10-27T01:00:00.000Z'
  },
  {
    id: 'b1045',
    number: 'B-1045',
    customer: 'Elena Cruz',
    phone: '+63 920 555 0177',
    kind: 'Service',
    vehicle: '2022 Mitsubishi Montero · NCR 9032',
    items: [{ name: 'Tire Rotation', qty: 1, price: 400 }],
    status: 'pending',
    note: 'Booked for 11:00 AM slot.',
    createdAt: '2026-10-27T01:10:00.000Z',
    updatedAt: '2026-10-27T01:10:00.000Z'
  },
  {
    id: 'b1044',
    number: 'B-1044',
    customer: 'Maria Santos',
    phone: '+63 920 555 0138',
    kind: 'Service',
    vehicle: '2018 Toyota Vios · QLD 7788',
    items: [{ name: 'Battery Check', qty: 1, price: 350 }],
    status: 'completed',
    note: 'Battery replaced; warranty card issued.',
    createdAt: '2026-10-25T23:30:00.000Z',
    updatedAt: '2026-10-26T00:15:00.000Z'
  },
  {
    id: 'b1043',
    number: 'B-1043',
    customer: 'Carlos Reyes',
    phone: '+63 919 555 0139',
    kind: 'Parts order',
    vehicle: '2020 Ford Ranger · NCR 4521',
    items: [{ name: 'Brake Pads — Front', qty: 1, price: 2200 }],
    status: 'ready',
    note: 'For pickup at counter 2.',
    createdAt: '2026-10-26T23:20:00.000Z',
    updatedAt: '2026-10-27T01:05:00.000Z'
  },
  {
    id: 'b1042',
    number: 'B-1042',
    customer: 'Priya Nair',
    phone: '+63 918 555 0140',
    kind: 'Service',
    vehicle: '2021 Honda Civic · XYZ 8890',
    items: [{ name: 'Brake Inspection', qty: 1, price: 500 }],
    status: 'in-progress',
    note: 'Squeaking reported on the front brakes.',
    createdAt: '2026-10-27T00:55:00.000Z',
    updatedAt: '2026-10-27T01:20:00.000Z'
  },
  {
    id: 'b1041',
    number: 'B-1041',
    customer: 'Noel Bautista',
    phone: '+63 921 555 0186',
    kind: 'Service',
    vehicle: '2017 Hyundai Accent · NCR 6604',
    items: [{ name: 'Oil Change', qty: 1, price: 850 }],
    status: 'pending',
    note: 'Walk-in; waiting for a free bay.',
    createdAt: '2026-10-27T01:30:00.000Z',
    updatedAt: '2026-10-27T01:30:00.000Z'
  }
];

export const DEMO_INVENTORY = PARTS.map(part => ({
  id: part.id,
  sku: part.sku,
  name: part.name,
  category: part.category,
  price: part.price,
  stock: STOCK_OVERRIDES[part.sku] ?? part.stock
}));

export const DEMO_AUDIT = [
  {
    id: 'a5',
    at: '2026-10-27T01:05:00.000Z',
    actor: { name: 'Sarah Chen', role: 'Manager' },
    action: 'Booking status',
    details: 'B-1043 pending → ready for pickup'
  },
  {
    id: 'a4',
    at: '2026-10-27T00:50:00.000Z',
    actor: { name: 'Sarah Chen', role: 'Manager' },
    action: 'Stock received',
    details: 'FLD-001 Engine Oil 5W-30 +12 units'
  },
  {
    id: 'a3',
    at: '2026-10-26T08:10:00.000Z',
    actor: { name: 'Marco Reyes', role: 'Manager' },
    action: 'Booking closed',
    details: 'B-1049 marked as picked up'
  },
  {
    id: 'a2',
    at: '2026-10-26T02:35:00.000Z',
    actor: { name: 'Ana Villanueva', role: 'Admin' },
    action: 'Account deactivated',
    details: 'Customer account of testing@example.com'
  },
  {
    id: 'a1',
    at: '2026-10-24T00:05:00.000Z',
    actor: { name: 'Ana Villanueva', role: 'Admin' },
    action: 'Settings updated',
    details: 'Low-stock alert threshold set to 10'
  }
];

export const DEMO_SETTINGS = {
  shopName: 'G Spot Automotive Center',
  lowStockThreshold: 10,
  bookingOpen: true
};
