# G Spot Automotive Center

Multi-role automotive service and parts ordering UI: a customer kiosk, a manager portal,
and an admin portal, sharing one design system and one local demo data layer.

This build is **frontend only**. There is no API, database, or payment processor. See
[Mock vs live](#mock-vs-live) for exactly what is real inside the browser.

## Portals

| Portal | Entry page | Audience |
| --- | --- | --- |
| Portal selection | `src/frontend/index.html` | Landing switch between customer and staff |
| Customer | `src/frontend/customer-ui/public/index.html` | Public storefront and kiosk |
| Manager | `src/frontend/manager-ui/public/index.html` | Manager and Admin accounts |
| Admin | `src/frontend/admin-ui/public/index.html` | Admin accounts only |

## Quick start

### Option 1 — local Node server (recommended)

Requires Node.js 18 or newer.

```bash
npm run dev
```

Then open:

- Portal selection — <http://localhost:5178/src/frontend/>
- Customer kiosk — <http://localhost:5178/src/frontend/customer-ui/public/>
- Manager portal — <http://localhost:5178/src/frontend/manager-ui/public/>
- Admin portal — <http://localhost:5178/src/frontend/admin-ui/public/>

`PORT=8080 npm run dev` changes the port. The server serves the repository root with
no caching, so relative asset and module paths resolve the same way they would on a
static host.

### Option 2 — VS Code Live Server

1. Open the repository root in VS Code (`File → Open Folder`).
2. Install the **Live Server** extension if needed.
3. Right-click `src/frontend/index.html` and choose **Open with Live Server**.
4. Use the links on the landing page to reach each portal.

The manager and admin portals are ES-module apps, so they must be served over HTTP.
Opening their `index.html` directly from disk will not run the scripts. The customer
kiosk uses classic scripts and can also be opened directly.

## Demo accounts

| Name | Staff ID | Email | Password | Role |
| --- | --- | --- | --- | --- |
| Admin | `admin` | `admin@gspot.com` | `admin0000` | Admin |
| Sarah Chen | `sarah.chen` | `sarah.chen@gspot.com` | `sarah2345` | Manager |
| Ana Martinez | `ana.martinez` | `ana.martinez@gspot.com` | `ana4567` | Manager |
| Marco Reyes | `marco.reyes` | `marco.reyes@gspot.com` | `marco8899` | Manager |

The manager and admin login screens list these accounts and can fill the form for you.
The customer kiosk keeps its own demo customer login; staff credentials do not sign in
as customers and customer accounts cannot enter the staff portals.

## What works

### Customer portal

- Existing kiosk storefront: 36 parts, 20 services, category shortcuts, search, cart badge,
  service booking with vehicle details, parts checkout with installation add-on, payment
  modal (card, Dragonpay, discount card preview), purchase history and profile screens.
- Customer login is the default view in the account modal. **Manager & Staff Login →**
  switches the modal to the manager view; **← Back to Customer Login** returns.
- The manager view hides customer registration and social sign-in, and links to the full
  staff portal.
- A **Portal switch →** chip at the bottom-right returns to the landing page.
- Back navigation preserves cart and checkout drafts, as in the original demo.

### Manager portal

- **Dashboard** — today's bookings, open tickets, low-stock alerts, collected revenue,
  latest tickets.
- **Ticket & Order Queue** — status filters, full ticket inspection, customer and vehicle
  details, work items, additional issue/fee quotes, status updates.
  Quotes affect the final billed total only after they are marked approved.
- **Catalog & Inventory** — search, stock adjustments, price/stock/visibility editing.
- **Services** — price, duration, description, and bookability editing.
- **Reports** — revenue, quotes awaiting approval, inventory value, ticket status mix.

Statuses: Pending → Confirmed → In Service → Ready for Pickup → Completed, plus Cancelled.

### Admin portal

- **System Analytics** — revenue, average ticket, open tickets, catalog size, ticket
  pipeline, revenue mix, inventory value, recent system activity.
- **User & Staff Management** — create staff accounts, change Manager/Admin roles,
  suspend or reactivate accounts. The current admin cannot demote or suspend themselves.
- **Master Catalog** — combined parts and services view with search and the same editors.
- **Audit Trail** — every store mutation with actor, action, entity, and details.
- **System Settings** — shop name, currency, tax rate, low-stock threshold, booking pause
  switch, and a full demo-data reset.

## Project structure

```text
Gspot_Gaming/
├─ src/frontend/
│  ├─ index.html                     Portal selection landing page
│  ├─ customer-ui/
│  │  ├─ public/index.html           Kiosk entry
│  │  └─ src/
│  │     ├─ css/profile.css
│  │     └─ js/                      Compiled kiosk app + legacy demo scripts
│  ├─ manager-ui/
│  │  ├─ public/index.html           Manager entry
│  │  ├─ package.json
│  │  └─ src/
│  │     ├─ main.js                  Session gate + hash router
│  │     ├─ pages/                   dashboard, queue, inventory, services, reports
│  │     ├─ components/ticket-modal.js
│  │     └─ services/manager-service.js
│  ├─ admin-ui/
│  │  ├─ public/index.html           Admin entry
│  │  ├─ package.json
│  │  └─ src/
│  │     ├─ main.js
│  │     ├─ pages/                   dashboard, users, catalog, audit, settings
│  │     ├─ components/staff-editor.js
│  │     └─ services/admin-service.js
│  └─ shared/
│     ├─ assets/images/              38 catalog and brand images
│     ├─ assets/fonts/               14 local webfonts
│     ├─ api/README.md               Placeholder for future API clients
│     ├─ components/                 Shell, login, modal, toast, catalog editors
│     ├─ js/                         store, formatting, DOM helpers
│     └─ styles/
│        ├─ styles.css               Original compiled kiosk stylesheet
│        └─ app.css                  Staff/portal design system
├─ tools/serve.mjs                   Dependency-free static server
├─ docs/
│  ├─ architecture.md                Structure, routes, migration, API conventions
│  └─ legacy/supabase/               Previous optional Supabase setup (inactive)
├─ package.json
└─ README.md
```

## Local demo data

The staff portals share one versioned state in `localStorage`:

- `gspot:demo:v2` — settings, staff, parts, services, tickets, audit log
- `gspot:session` — signed-in staff member

Every mutation writes an audit entry and broadcasts a `gspot:store-changed` event, so
manager and admin screens stay consistent across tabs. Reset everything from
**Admin → System Settings → Reset demo data**.

Seeded content: 36 parts, 20 services, 4 tickets, 4 staff accounts, and 3 audit entries.
The staff catalog mirrors the customer kiosk's 36/20 demo catalog.

The compiled customer kiosk keeps its own legacy demo state (customer accounts, cart,
orders). It is **not** connected to the staff store, so staff catalog or ticket changes
do not appear in the kiosk until the storefront is wired to the shared data layer.

## Publishing to GitHub

The repository root is already a Git repository. To publish a copy:

```bash
git add .
git commit -m "Restructure G Spot into customer, manager, and admin portals"
git branch -M main
git remote add origin https://github.com/<your-account>/<your-repo>.git
git push -u origin main
```

Do not commit secrets. This build has no `.env` file and no real credentials; the demo
passwords in `shared/js/store.js` are sample data only and must be replaced when a
backend is added. GitHub Pages can host the site because every path is relative — publish
from the repository root and open `/src/frontend/` in the deployed URL.

## Database connection guide (future)

There is no database in this build. The staff store is `localStorage`, seeded from
`shared/js/store.js`; the customer kiosk keeps its own legacy demo state.

When a backend is added (MySQL + Node/PHP, or Supabase/Postgres):

1. Create a `database/` folder with versioned SQL migrations and a seed script.
2. Mirror the collections in `store.js`: staff, parts, services, tickets, ticket quotes,
   audit logs, and settings. Derive totals instead of storing them.
3. Put the connection string in the server environment, for example
   `DATABASE_URL=mysql://user:password@host:3306/gspot` or Supabase project URL plus a
   **service-role key kept only on the server**.
4. Hash passwords with bcrypt/argon2 and enforce unique staff email and staff ID.
5. Validate price, stock, discount, and quote amounts on the server for every order.
6. Replace the store with API clients under `shared/api/`, following
   [docs/architecture.md](docs/architecture.md#8-proposed-backend-contract-not-implemented).

Never place a database password or service-role key in frontend JavaScript.

## Mock vs live

| Area | Status | Notes |
| --- | --- | --- |
| Storefront browsing, cart, booking forms | Live (local) | Runs entirely in the browser |
| Staff role gates | UX only | Enforced in UI and `store.js`, not security |
| Staff sessions | Mock | `localStorage`, no password hashing |
| Ticket, quote, stock, catalog, staff edits | Live (local) | Persist in this browser and feed the audit log |
| Payments | Mock | No gateway, no card data leaves the page |
| Photo upload | Mock | Catalog images are bundled files in `shared/assets` |
| Supabase connector | Inactive | Legacy scripts remain; no project is configured |
| Backend API / database | Not included | Endpoint conventions are documented for a later build |

Client-side authorization is never sufficient for production. Before going live, add
server-side sessions or JWT roles, bcrypt password hashing, server-validated prices and
stock, and secret management.

## Design system

- Red: `#E60000` primary, `#C80000` hover/dark
- Black: `#111111`, `#1A1A1A`
- Neutrals: `#f7f7f5` page, `#e2e2df` lines, `#666662` muted text
- White surfaces with square corners, condensed headings, mono labels
- Status tones: amber (pending), blue (confirmed/in service), green (ready), gray
  (completed), red (cancelled)

## Documentation

- [docs/architecture.md](docs/architecture.md) — directory map, migration table, portal
  routes, data model, and proposed API naming conventions.
- [docs/legacy/supabase/SETUP.md](docs/legacy/supabase/SETUP.md) — the earlier optional
  Supabase configuration. Not required by this build.

## Source limitations

`customer-ui/src/js/app.js` is the supplied **compiled** React bundle, not original JSX.
Component-level changes there are made by editing the compiled calls (the manager login
view and portal link were added this way). The manager and admin portals are new,
dependency-free ES-module applications built against the shared layer, so they remain
readable and editable without a build step.

Sample prices and stock are illustrative. Confirm fitment, pricing, and tax rules before
any real use.
