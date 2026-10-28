# G Spot Automotive Center

A static, frontend-only website for a Metro Manila auto service shop: a landing page,
customer account flows, a parts-and-service shop with booking and pickup cart, staff
sign-in, and working Manager and Admin demo dashboards. All data stays in the browser.
There is no API, database, or payment processor, and parts orders are **pickup only** —
there is no shipping or delivery.

## Pages

| Page | Entry | Audience |
| --- | --- | --- |
| Home | `index.html` | Public landing page with links to every flow |
| Customer login | `pages/customer-login.html` | Demo customers |
| Create account | `pages/register.html` | New demo customers |
| Forgot password | `pages/forgot-password.html` | Simulated reset, no email sent |
| Customer shop | `pages/shop.html` | Services, parts, booking, cart and orders |
| Staff sign-in | `pages/staff-login.html` | Manager and Admin demo accounts |
| Manager dashboard | `pages/manager.html` | Booking queue, stock, shop status |
| Admin dashboard | `pages/admin.html` | Accounts, audit trail, settings |

The staff sign-in page routes by role: Managers land on `manager.html`, Admins on
`admin.html`. Opening a dashboard without a matching session redirects to sign-in.
Customers sign in through the customer pages and land in the shop; opening the shop
without a customer session redirects to customer sign-in.

## Quick start with VS Code Live Server

The pages are static, but they use ES modules, so they must be opened over HTTP. Use the
**Live Server** extension by Ritwick Dey; no batch file or Node server is needed.

1. Install **Live Server** (`ritwickdey.LiveServer`) from the VS Code Extensions view.
   This workspace recommends it in `.vscode/extensions.json`.
2. Open the `Gspot` folder as the VS Code workspace, not just a single file.
3. In the Explorer, right-click the entry page for the interface you want and choose
   **Open with Live Server**. The page opens at `http://127.0.0.1:5500/...` in your
   default browser; Edge and Brave both work.

### Entry points

| Interface | Right-click this file → Open with Live Server | Notes |
| --- | --- | --- |
| Current customer site | `index.html` | Home page with links to sign-in and the shop |
| Current shop | `pages/customer-login.html` or `pages/shop.html` | The shop redirects to customer sign-in without a session |
| Current Manager portal | `pages/staff-login.html` → `pages/manager.html` | Sign in with a Manager demo account |
| Current Admin portal | `pages/staff-login.html` → `pages/admin.html` | Sign in with the Admin demo account |
| Earlier customer interface | `src/frontend/customer-ui/public/index.html` | Preserved storefront with its own legacy demo data |
| Earlier Manager interface | `src/frontend/manager-ui/public/index.html` | Shows its own staff sign-in when signed out |
| Earlier Admin interface | `src/frontend/admin-ui/public/index.html` | Shows its own staff sign-in when signed out |

**Ports and sessions:** with the project root open as one workspace, Live Server serves
every entry from the same port (5500 by default), so customer and staff pages can be open
side by side at different paths. A second VS Code window or workspace will be offered
another port. `localStorage` is scoped to the origin **and** port, so use the same origin
when you want the current shop and dashboards to share demo data.

## Demo accounts

Everything below is sample data. Passwords are stored in plain text in `localStorage`
for the demo, and the sign-in pages display the credentials on purpose.

### Customers

| Name | Email | Password |
| --- | --- | --- |
| Maria Santos | `maria.santos@example.com` | `demo1234` |
| James Kowalski | `james.kowalski@example.com` | `demo1234` |
| Priya Nair | `priya.nair@example.com` | `demo1234` |
| Carlos Reyes | `carlos.reyes@example.com` | `demo1234` |

### Staff

| Name | Email | Password | Role |
| --- | --- | --- | --- |
| Sarah Chen | `sarah.chen@gspotauto.ph` | `manager123` | Manager |
| Marco Reyes | `marco.reyes@gspotauto.ph` | `manager123` | Manager |
| Ana Villanueva | `admin@gspotauto.ph` | `admin123` | Admin |

Staff credentials cannot sign in as customers, and customer accounts cannot open either
dashboard. These checks run in the browser and are not real security.

## What works

### Home

- Hero with customer sign-in and account-creation links.
- Access cards for customer, manager, and admin entry.
- Demo notice, shop details, and the shared header/footer injected by `js/navigation.js`.

### Customer flows

- **Login** validates email and password, starts a session, and opens the shop.
- **Register** validates name, email, phone (10+ digits), password length, matching
  confirmation, and duplicate email, then signs the new customer in and opens the shop.
- **Forgot password** simulates a reset request and shows the address it would email.
- Signing out clears the customer session.

### Customer shop

- **Services** — 20 services with photos, durations and prices, matching the earlier
  storefront. **Book** preselects the service and opens the booking form.
- **Book service** — service, vehicle and plate, date from today onward, a 30-minute
  time slot, contact number and notes. The request is written to the manager queue as a
  Pending booking.
- **Parts** — 36 parts with search and category filter. Add to cart is limited by the
  manager's current stock count.
- **Cart and pickup** — quantity controls, a pickup date and time, phone and optional
  note. Placing the order creates a Pending Parts order in the queue and reserves
  (deducts) the stock. There is no payment or delivery step; pay at the counter.
- **My orders** — this account's service bookings and parts orders with live statuses
  from the manager queue. Seeded demo bookings are matched by name when they have no
  email attached.
- **Pickup pass** — a QR pass opens automatically after a booking or parts checkout and
  stays available from **My orders**. It encodes the booking number, customer, vehicle,
  items or appointment, total and status, and is generated offline. Show it at the
  counter; it is a demo reference, not a payment receipt.
- If an Admin pauses bookings under **Settings**, new bookings, part reservations and
  checkout are disabled until it is switched back on.

### Staff sign-in

- One interface for Managers and Admins.
- Accepts work email and password, checks the role and active flag, routes to the
  matching dashboard, and warns that browser-side checks are not secure.
- Signing out of a dashboard returns to this page.

### Manager dashboard

- Overview stats: open bookings, in service, ready for pickup, and low-stock items.
- **Queue** filters by status and advances bookings: Pending → In service → Ready →
  Picked up. Each change is written to the audit trail.
- **Inventory** lists all 36 parts and adjusts stock with −/+ controls. Items at or
  below the low-stock threshold are flagged, and stats update immediately. These counts
  drive the customer shop, so bookings and cart reservations show up here.
- **QR** on any queue row opens the same pickup pass the customer sees, so staff can
  match or scan it at collection.
- The queue, stats and inventory refresh automatically when a customer books or checks
  out in another tab of the same browser.

### Admin dashboard

- Account counts for customers, staff, and active accounts.
- **Accounts** search and role filter, plus activate/deactivate. Admins cannot
  deactivate their own account.
- **Audit trail** shows the latest 50 actions with actor, role, time, and details,
  including Manager actions from the same browser.
- **Settings** edits shop name, low-stock threshold, and the booking-open switch.
- **Reset demo data** clears customer accounts, bookings, inventory, audit, and sessions,
  then reloads the seeded demo data on the next sign-in.

## Project structure

```text
Gspot/
├─ index.html                        Home / landing page
├─ pages/
│  ├─ customer-login.html
│  ├─ register.html
│  ├─ forgot-password.html
│  ├─ shop.html
│  ├─ staff-login.html
│  ├─ manager.html
│  └─ admin.html
├─ css/
│  ├─ main.css                       Shared tokens, chrome, forms, dashboard styles
│  └─ pages/
│     ├─ customer-login.css
│     ├─ shop.css
│     └─ staff-login.css
├─ js/
│  ├─ navigation.js                  Header/footer, mobile menu, toasts, helpers
│  ├─ auth.js                        Customer accounts and session
│  ├─ shop.js                        Services, parts, bookings, cart and orders
│  ├─ qr.js                          Pickup-pass payload and QR SVG rendering
│  ├─ vendor/qrcode.js               qrcode-generator 1.4.4 (MIT), offline
│  └─ staff-auth.js                  Staff session, role guards, ops data, audit
├─ data/
│  ├─ catalog.js                     20 services and 36 parts with images and prices
│  └─ sample-users.js                Seeded accounts, bookings, inventory, audit, settings
├─ assets/
│  ├─ images/                        Catalog, workshop and service-bay photos
│  ├─ icons/                         Favicon
│  └─ fonts/                         Local Barlow, Outfit, and JetBrains Mono files
├─ .vscode/
│  ├─ extensions.json                Recommends the Live Server extension
│  └─ settings.json                  Live Server host and port
├─ src/frontend/                     Earlier multi-portal build, preserved for reference
├─ docs/                             Earlier architecture notes and legacy Supabase setup
└─ package.json
```

## Local demo data

`localStorage` keys, all versioned:

- `gspot.users.v1` — customer and staff accounts
- `gspot.session.v1` — customer session
- `gspot.staff.v1` — staff session
- `gspot.cart.v1` — the signed-in customer's pickup cart
- `gspot.ops.v2` — bookings, inventory, audit trail, and settings

The seeded content is 7 accounts, 9 bookings, 36 inventory items, 5 audit entries, and
the default settings in `data/sample-users.js`. Reset everything from
**Admin → Reset demo data**; this also clears the cart.

The older `src/frontend/` interfaces keep their own independent demo state and are not
linked from the current pages above. `src/frontend/index.html` now redirects to the current
home page; open the preserved pages by their own URLs (see Entry points) if you need them.

## Mock vs live

| Area | Status | Notes |
| --- | --- | --- |
| Preview server | Live Server | Serves static HTML/CSS/JS; adds no API, database, auth or payment processing |
| Sign-in, registration, sessions | Mock | Browser `localStorage`, plain-text demo passwords |
| Role checks and redirects | UX only | Not secure; anyone can edit browser state |
| Service bookings and parts carts | Live (local) | Write queue records and reserve stock in this browser |
| Booking status, stock, accounts, settings | Live (local) | Persist in this browser and feed the audit trail |
| Pickup-pass QR codes | Live (local) | Generated in the browser by the bundled encoder; encodes demo order data |
| Password reset | Mock | Shows a confirmation panel; sends no email |
| Payments and delivery | Not included | Pickup only, no payment flow |
| Backend API / database | Not included | Not planned in this build |

Client-side checks are never enough for a production shop. A real build needs server-side
sessions, password hashing, server-validated prices and stock, and secrets kept off the
browser. Never place a database password or service-role key in frontend JavaScript.

## Design system

- Red `#cc0000` accent, ink `#171717`, lines `#e2e2df`, dark `#0d0d0d`
- Barlow Condensed display headings, Outfit body text, JetBrains Mono labels
- White surfaces, square corners, condensed uppercase headings
- Status tones: amber (pending), blue (in service), green (ready), gray (picked up)

Sample prices and stock are illustrative. Confirm fitment, pricing, and tax rules before
any real use.
