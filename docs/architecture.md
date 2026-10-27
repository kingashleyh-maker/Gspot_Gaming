# Architecture

G Spot Automotive Center is organized as one frontend workspace with three isolated
role interfaces and a shared layer. There is **no backend in this build**; the staff
portals persist to a versioned local demo store.

## 1. Runtime model

```text
src/frontend/index.html                 portal selection
        │
        ├── customer-ui  (compiled kiosk, classic scripts, own legacy demo state)
        │
        ├── manager-ui   (ES modules, hash router, Manager/Admin session)
        │        └── imports shared/{components,js,styles,assets}
        │
        └── admin-ui     (ES modules, hash router, Admin-only session)
                 └── imports shared/{components,js,styles,assets}
                          │
                          └── shared/js/store.js
                                localStorage: gspot:demo:v2, gspot:session
```

- The customer kiosk is the supplied compiled bundle, kept working with minimal edits.
- Manager and admin are independent apps that share components, styles, formatting, and
  the demo store. They do not import anything from `customer-ui`.
- The store is the single data boundary. Swapping it for API clients later does not
  require rewriting pages.

## 2. Directory map

```text
Gspot_Gaming/
├─ src/frontend/
│  ├─ index.html
│  ├─ customer-ui/
│  │  ├─ public/index.html
│  │  └─ src/
│  │     ├─ css/profile.css
│  │     └─ js/
│  │        ├─ app.js                compiled kiosk
│  │        ├─ backend.js            legacy Supabase auth helper (inactive)
│  │        ├─ backend-config.js     empty Supabase URL/key placeholders
│  │        ├─ profile.js
│  │        └─ ui.js
│  ├─ manager-ui/
│  │  ├─ package.json
│  │  ├─ public/index.html
│  │  └─ src/
│  │     ├─ main.js
│  │     ├─ components/ticket-modal.js
│  │     ├─ pages/{dashboard,queue,inventory,services,reports}.js
│  │     └─ services/manager-service.js
│  ├─ admin-ui/
│  │  ├─ package.json
│  │  ├─ public/index.html
│  │  └─ src/
│  │     ├─ main.js
│  │     ├─ components/staff-editor.js
│  │     ├─ pages/{dashboard,users,catalog,audit,settings}.js
│  │     └─ services/admin-service.js
│  └─ shared/
│     ├─ api/README.md
│     ├─ assets/{images,fonts}
│     ├─ components/
│     │  ├─ catalog-editors.js       part/service edit modals
│     │  ├─ modal.js                 openModal + confirmDialog
│     │  ├─ staff-login.js           role-aware login form
│     │  ├─ staff-shell.js           sidebar/topbar shell
│     │  └─ toast.js
│     ├─ js/
│     │  ├─ dom.js                   qs/qsa/on/render/debounce
│     │  ├─ format.js                escaping, money, dates, badges
│     │  └─ store.js                 demo data + role guards
│     └─ styles/
│        ├─ styles.css               compiled kiosk stylesheet
│        └─ app.css                  portal/staff design system
├─ tools/serve.mjs
├─ docs/
│  ├─ architecture.md
│  └─ legacy/supabase/
├─ package.json
└─ README.md
```

Asset counts: 38 images, 14 webfonts, all under `shared/assets`.

## 3. Migration mapping

| Original path | New path | Notes |
| --- | --- | --- |
| `index.html` | `src/frontend/customer-ui/public/index.html` | Kiosk entry; stylesheet/script paths updated |
| `css/styles.css` | `src/frontend/shared/styles/styles.css` | Font URLs still resolve under `shared/` |
| `css/profile.css` | `src/frontend/customer-ui/src/css/profile.css` | Customer-only styles |
| `js/app.js` | `src/frontend/customer-ui/src/js/app.js` | Image paths rewritten to `../../shared/assets/images/`; manager login view + staff portal link added |
| `js/backend-config.js` | `src/frontend/customer-ui/src/js/backend-config.js` | Legacy, empty config |
| `js/backend.js` | `src/frontend/customer-ui/src/js/backend.js` | Legacy Supabase auth helper |
| `js/profile.js` | `src/frontend/customer-ui/src/js/profile.js` | Unchanged behavior |
| `js/ui.js` | `src/frontend/customer-ui/src/js/ui.js` | Demo-notice dismiss |
| `assets/fonts/*` | `src/frontend/shared/assets/fonts/*` | Shared by kiosk and staff portals |
| `assets/images/*` | `src/frontend/shared/assets/images/*` | Shared by all portals |
| `backend/SETUP.md` | `docs/legacy/supabase/SETUP.md` | Archived; not part of runtime |
| `backend/supabase-setup.sql` | `docs/legacy/supabase/supabase-setup.sql` | Archived schema/seed |
| — | `src/frontend/index.html` | New portal selection landing page |
| — | `src/frontend/manager-ui/**` | New Manager app |
| — | `src/frontend/admin-ui/**` | New Admin app |
| — | `src/frontend/shared/{components,js,api}` | New shared layer |
| — | `tools/serve.mjs` | New static server |

Moves were performed with `git mv` where the source existed, preserving history.

## 4. Portal routes

Hash routing keeps every app deployable as a static site. A future server-rendered
version can map these to path routes without changing page modules.

### Manager

| Hash route | Page | Suggested live path |
| --- | --- | --- |
| `#/dashboard` | Dashboard overview | `/manager/dashboard` |
| `#/queue` | Ticket & order queue | `/manager/queue` |
| `#/inventory` | Catalog & inventory | `/manager/inventory` |
| `#/services` | Services management | `/manager/services` |
| `#/reports` | Reports | `/manager/reports` |

### Admin

| Hash route | Page | Suggested live path |
| --- | --- | --- |
| `#/dashboard` | System analytics | `/admin/dashboard` |
| `#/users` | User & staff management | `/admin/users` |
| `#/catalog` | Master catalog oversight | `/admin/catalog` |
| `#/audit` | Audit trail | `/admin/audit` |
| `#/settings` | System settings | `/admin/settings` |

### Shared page contract

Each page module exports:

```js
export const meta = { id: 'queue', label: 'Ticket & Order Queue', title: 'Ticket & Order Queue' };
export function render() { /* returns HTML string */ }
export function mount(root, ctx) { /* optional bindings; ctx = { session, refresh } */ }
```

`main.js` owns the session gate, the shell, hash navigation, and refresh. Pages never
read `location.hash` directly.

## 5. Role gates

Three layers cooperate, all client-side in this demo:

1. **Entry gate** — `renderStaffLogin` checks the account role before creating a session.
   Manager portal allows `Manager` and `Admin`; admin portal allows `Admin`.
2. **App gate** — each `main.js` re-checks the stored session role on every render and
   shows a role-mismatch screen with a sign-out action.
3. **Store gate** — every mutating function calls `requireRole`:
   - Manager and Admin: ticket status, quotes, part/service price and stock.
   - Admin only: staff create/role/suspension and system settings.

These gates are UX guardrails, not security. Production requires server-side
authorization on every endpoint.

## 6. Demo data model

`shared/js/store.js` owns `gspot:demo:v2` and `gspot:session`.

| Collection | Key fields |
| --- | --- |
| `settings` | shopName, currency, taxRate, lowStockThreshold, bookingOpen |
| `staff` | id, name, email, staffId, password (demo), role, active, createdAt |
| `parts` | id, sku, name, category, price, stock, image, active |
| `services` | id, name, description, price, duration (minutes), image, active |
| `tickets` | id, number, kind, status, customer, phone, vehicle, items[], quotes[], note, createdAt, updatedAt |
| `auditLogs` | id, at, actor, action, entity, entityId, details |

Totals are derived, never stored: `itemsTotal + approvedQuotesTotal`. Pending quotes are
reported separately and never affect the billed total.

Every mutation appends an audit entry (capped at 200) and dispatches
`gspot:store-changed`. Storage is versioned; a mismatched version reseeds automatically.
`readStore` tolerates unavailable storage and falls back to an in-memory seed copy.

### Store API groups

- Session: `authenticate`, `startSession`, `getSession`, `endSession`, `requireRole`
- Tickets: `listTickets`, `getTicket`, totals helpers, `updateTicketStatus`,
  `addTicketQuote`, `setQuoteApproved`
- Catalog: `listParts`, `updatePart`, `adjustStock`, `listServices`, `updateService`
- Admin: `listStaff`, `createStaff`, `updateStaffRole`, `setStaffActive`,
  `listAuditLogs`, `getSettings`, `updateSettings`, `stats`, `resetDemo`

Role services wrap these functions so pages depend on `managerService` /
`adminService`, not on storage details.

## 7. Design system

Defined in `shared/styles/app.css` on top of the kiosk palette:

- Red `#E60000` / `#C80000`, ink `#111111` / `#1A1A1A`
- Page `#f7f7f5`, surface white, line `#e2e2df`, muted `#666662`
- Square corners, condensed display type, mono eyebrows and numerics
- Components: portal cards, login split layout, staff shell, stats, tables, tabs,
  badges, buttons, fields, modal, toasts, progress bars, portal chip
- Responsive at 960px and 640px; reduced-motion respected by the kiosk login animation

## 8. Proposed backend contract (not implemented)

When a backend is added, keep the store function names and replace the implementation.
The following conventions keep role boundaries visible in the URL.

### Naming

- Base: `/api`
- Role prefix: `/api/customer`, `/api/manager`, `/api/admin`
- Auth: `/api/auth/login`, `/api/auth/logout`, `/api/auth/refresh`, `/api/auth/me`
- Resources are plural nouns; state changes are sub-resources or explicit actions only
  when a PATCH is ambiguous (`/quotes/:id/approve`).
- Errors: `{ "error": { "code": "STOCK_CONFLICT", "message": "..." } }`
- Lists: `?status=&page=&pageSize=`, responses `{ items, page, pageSize, total }`

### Endpoints by role

| Method | Endpoint | Roles |
| --- | --- | --- |
| POST | `/api/auth/login` | public |
| POST | `/api/auth/logout` | any session |
| GET | `/api/customer/catalog/parts` | Customer, public read |
| GET | `/api/customer/catalog/services` | Customer, public read |
| POST | `/api/customer/orders` | Customer |
| POST | `/api/customer/bookings` | Customer |
| GET | `/api/customer/tickets` | Customer (own only) |
| POST | `/api/customer/tickets/:id/quotes/:quoteId/approve` | Customer (own ticket) |
| GET | `/api/manager/tickets` | Manager, Admin |
| PATCH | `/api/manager/tickets/:id/status` | Manager, Admin |
| POST | `/api/manager/tickets/:id/quotes` | Manager, Admin |
| PATCH | `/api/manager/parts/:id` | Manager, Admin |
| PATCH | `/api/manager/services/:id` | Manager, Admin |
| GET | `/api/admin/analytics` | Admin |
| GET/POST | `/api/admin/staff` | Admin |
| PATCH | `/api/admin/staff/:id/role` | Admin |
| PATCH | `/api/admin/staff/:id/access` | Admin |
| GET/PATCH | `/api/admin/settings` | Admin |
| GET | `/api/admin/audit` | Admin |

In ASP.NET Core these map to `[Authorize(Roles = "Manager,Admin")]` and
`[Authorize(Roles = "Admin")]`; in Node, use the same middleware checks.

### Server-side invariants

- Price and stock are looked up server-side by item id; never trust client totals.
- Stock decrement and ticket creation run in one transaction with a stock check.
- Quote approval is allowed only for the ticket owner and only once.
- Deny status transitions outside Pending → Confirmed → In Service → Ready → Completed
  (or Cancelled), unless an admin override is explicitly allowed.
- Hash passwords with bcrypt/argon2; never store or log demo passwords.
- Keep service keys and database credentials in environment secrets, never in the repo.
- Record the audit entry in the same transaction as the mutation.

## 9. Adding a page

1. Create `manager-ui/src/pages/<name>.js` (or admin) exporting `meta`, `render`, and
   optional `mount`.
2. Import it in that app's `main.js`, add it to `PAGES`, and add a nav item.
3. Add any data access through the existing role service; extend the store and service
   when a new mutation is needed.
4. Use `escapeHtml` for every dynamic value in template strings.
5. Run `node --check` (or the editor's parser) and verify with the static server.

## 10. Legacy notes

- `customer-ui/src/js/app.js` is compiled from React. The manager login view, its staff
  link, and the full-staff-portal anchor live inside that bundle and are edited directly
  in the compiled call structure.
- The Supabase helpers and setup files are retained for reference only. They are not
  loaded by the manager or admin apps, and `backend-config.js` ships with empty values.
- The customer kiosk's catalog and orders are independent of the staff demo store. A
  future integration should point the kiosk at the shared data layer before treating
  manager edits as storefront changes.
