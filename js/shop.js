/*
 * Customer shop: service menu, parts catalog, booking form and pickup cart.
 * All records are written to the same demo store the manager dashboard reads,
 * so new bookings appear in the shop queue.
 */
import { findUser, getCustomerSession } from '../js/auth.js';
import { loadOps, recordAudit, saveOps } from '../js/staff-auth.js';
import { PART_CATEGORIES, PARTS, SERVICES } from '../data/catalog.js';
import { escapeHtml, formatDateTime, peso, toast } from '../js/navigation.js';
import { renderQr } from '../js/qr.js';

const CART_KEY = 'gspot.cart.v1';
const STATUS = {
  pending: { label: 'Pending', badge: 'pending' },
  'in-progress': { label: 'In service', badge: 'progress' },
  ready: { label: 'Ready for pickup', badge: 'ready' },
  completed: { label: 'Completed', badge: 'done' }
};
const TIME_SLOTS = [];
for (let minutes = 8 * 60; minutes <= 17 * 60 + 30; minutes += 30) {
  const hours = Math.floor(minutes / 60);
  const hourLabel = ((hours + 11) % 12) + 1;
  TIME_SLOTS.push(`${hourLabel}:${String(minutes % 60).padStart(2, '0')} ${hours < 12 ? 'AM' : 'PM'}`);
}

const session = getCustomerSession();

if (!session) {
  location.replace('customer-login.html');
} else {
  start(session);
}

function start(customer) {
  document.body.classList.add('is-authed');

  const user = findUser(customer.email);
  let cart = readCart();
  let activeTab = 'services';

  const $ = id => document.getElementById(id);
  const serviceGrid = $('service-grid');
  const partGrid = $('part-grid');
  const partSearch = $('part-search');
  const partCategory = $('part-category');
  const partEmpty = $('part-empty');
  const partHint = $('part-hint');
  const serviceSelect = $('book-service');
  const bookingForm = $('booking-form');
  const bookError = $('book-error');
  const cartLayer = $('cart-layer');
  const cartItems = $('cart-items');
  const cartEmpty = $('cart-empty');
  const cartForm = $('cart-form');
  const cartError = $('cart-error');
  const cartTotal = $('cart-total');
  const ordersList = $('orders-list');
  const ordersEmpty = $('orders-empty');
  const qrLayer = $('qr-layer');

  document.querySelectorAll('[data-customer-name]').forEach(node => {
    node.textContent = customer.name;
  });
  document.querySelectorAll('[data-customer-phone]').forEach(node => {
    node.textContent = user?.phone || 'No phone on file';
  });

  const todayISO = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  for (const select of [$('book-time'), $('pickup-time')]) {
    select.innerHTML = TIME_SLOTS.map(slot => `<option>${slot}</option>`).join('');
    select.value = '9:00 AM';
  }

  for (const input of [$('book-date'), $('pickup-date')]) {
    input.min = todayISO();
    input.value = todayISO();
  }

  $('pickup-name').value = customer.name;
  $('book-phone').value = user?.phone || '';
  $('pickup-phone').value = user?.phone || '';

  serviceSelect.innerHTML = SERVICES.map(
    service => `<option value="${service.id}">${escapeHtml(service.name)} — ${peso(service.price)} · ${service.duration} min</option>`
  ).join('');

  partCategory.insertAdjacentHTML(
    'beforeend',
    PART_CATEGORIES.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('')
  );

  renderServices();
  renderParts();
  renderCart();
  renderStatus();
  updateBookingSummary();

  const initialTab = ['services', 'parts', 'book', 'orders'].includes(location.hash.slice(1))
    ? location.hash.slice(1)
    : 'services';
  showTab(initialTab);

  /* ---------- Services ---------- */

  function renderServices() {
    $('service-count').textContent = `${SERVICES.length} services`;
    serviceGrid.innerHTML = SERVICES.map((service, index) => `
      <article class="service-card">
        <div class="service-card__media">
          <img src="../assets/images/${service.image}" alt="${escapeHtml(service.name)}" loading="lazy">
          <span class="service-card__tag">Service ${String(index + 1).padStart(2, '0')}</span>
          <div class="service-card__caption">
            <h3>${escapeHtml(service.name)}</h3>
            <span class="service-card__duration">${service.duration} min</span>
          </div>
        </div>
        <div class="service-card__body">
          <p>${escapeHtml(service.description)}</p>
          <div class="service-card__foot">
            <strong class="service-card__price">${peso(service.price)}</strong>
            <button type="button" class="btn btn--quiet btn--sm" data-book-service="${service.id}">Book</button>
          </div>
        </div>
      </article>`).join('');
  }

  serviceGrid.addEventListener('click', event => {
    const button = event.target.closest('[data-book-service]');
    if (!button) return;
    serviceSelect.value = button.dataset.bookService;
    updateBookingSummary();
    showTab('book', { scroll: true });
  });

  /* ---------- Parts ---------- */

  function renderParts() {
    const query = partSearch.value.trim().toLowerCase();
    const category = partCategory.value;
    const ops = loadOps();
    const bySku = new Map(ops.inventory.map(part => [part.sku, part]));
    const threshold = ops.settings.lowStockThreshold;
    const paused = !ops.settings.bookingOpen;
    const inCart = new Map(cart.map(item => [item.sku, item.qty]));

    const visible = PARTS.filter(part => {
      const matchesCategory = category === 'all' || part.category === category;
      const haystack = `${part.name} ${part.sku} ${part.category}`.toLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    });

    $('part-count').textContent = `${visible.length} part${visible.length === 1 ? '' : 's'}`;
    partHint.textContent = ops.settings.bookingOpen ? 'Pickup only' : 'Orders paused';
    partEmpty.hidden = visible.length > 0;

    partGrid.innerHTML = visible.map(part => {
      const record = bySku.get(part.sku);
      const stock = record ? record.stock : part.stock;
      const price = record ? record.price : part.price;
      const reserved = inCart.get(part.sku) || 0;
      const out = stock <= 0;
      const maxed = reserved >= stock;
      const flag = out
        ? '<span class="part-card__flag">Out of stock</span>'
        : reserved
          ? `<span class="part-card__flag part-card__flag--cart">${reserved} in cart</span>`
          : '';
      const stockBadge = out
        ? '<span class="badge badge--low">Out of stock</span>'
        : stock <= threshold
          ? `<span class="badge badge--low">${stock} low</span>`
          : `<span class="badge badge--ok">${stock} in stock</span>`;

      return `
        <article class="part-card">
          <div class="part-card__media">
            <img src="../assets/images/${part.image}" alt="${escapeHtml(part.name)}" loading="lazy">
            ${flag}
          </div>
          <div class="part-card__body">
            <div class="part-card__meta">
              <span>${escapeHtml(part.sku)}</span>
              <span>${escapeHtml(part.category)}</span>
            </div>
            <h3>${escapeHtml(part.name)}</h3>
            <div class="part-card__stock">
              <strong class="part-card__price">${peso(price)}</strong>
              ${stockBadge}
            </div>
            <button type="button" class="btn btn--primary btn--sm" data-add-part="${part.sku}"
              ${paused || out || maxed ? 'disabled' : ''}>
              ${paused ? 'Orders paused' : out ? 'Out of stock' : maxed ? 'Max in cart' : 'Add to cart'}
            </button>
          </div>
        </article>`;
    }).join('');
  }

  partGrid.addEventListener('click', event => {
    const button = event.target.closest('[data-add-part]');
    if (!button) return;
    addToCart(button.dataset.addPart);
  });

  partSearch.addEventListener('input', renderParts);
  partCategory.addEventListener('change', renderParts);

  function addToCart(sku) {
    const ops = loadOps();
    if (!ops.settings.bookingOpen) {
      toast('Orders are paused right now.');
      return;
    }
    const part = ops.inventory.find(item => item.sku === sku);
    if (!part) return;
    const line = cart.find(item => item.sku === sku);
    const quantity = line ? line.qty : 0;
    if (quantity >= part.stock) {
      toast('No more stock available to reserve.');
      return;
    }
    if (line) {
      line.qty += 1;
    } else {
      cart.push({ sku, qty: 1 });
    }
    writeCart();
    renderParts();
    renderCart();
    toast(`${part.name} added to cart.`, 'success');
  }

  /* ---------- Booking ---------- */

  function updateBookingSummary() {
    const service = SERVICES.find(item => item.id === serviceSelect.value) || SERVICES[0];
    $('book-summary-name').textContent = service.name;
    $('book-summary-desc').textContent = service.description;
    $('book-summary-duration').textContent = `${service.duration} min`;
    $('book-summary-price').textContent = peso(service.price);
  }

  serviceSelect.addEventListener('change', updateBookingSummary);

  function showBookError(message) {
    bookError.textContent = message;
  }

  bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    showBookError('');

    const ops = loadOps();
    if (!ops.settings.bookingOpen) {
      showBookError('Bookings are paused right now. Call the shop to arrange a visit.');
      return;
    }

    const service = SERVICES.find(item => item.id === serviceSelect.value);
    const vehicle = $('book-vehicle').value.trim();
    const plate = $('book-plate').value.trim().toUpperCase();
    const date = $('book-date').value;
    const time = $('book-time').value;
    const phone = $('book-phone').value.trim();
    const notes = $('book-notes').value.trim();

    if (!service) return showBookError('Choose a service.');
    if (!vehicle) return showBookError('Tell us the vehicle make and model.');
    if (!plate) return showBookError('Enter the plate number.');
    if (!date || date < todayISO()) return showBookError('Choose a date from today onward.');
    if (!time) return showBookError('Choose a time slot.');
    if (phone.replace(/\D/g, '').length < 10) {
      return showBookError('Enter a contact number with at least 10 digits.');
    }

    const now = new Date().toISOString();
    const booking = {
      id: `b${Date.now()}`,
      number: nextNumber(ops),
      customer: customer.name,
      customerEmail: customer.email,
      phone,
      kind: 'Service booking',
      vehicle: `${vehicle} · ${plate}`,
      items: [{ name: service.name, qty: 1, price: service.price }],
      status: 'pending',
      note: `Appointment ${dateLabel(date)} at ${time}${notes ? ` · ${notes}` : ''}`,
      createdAt: now,
      updatedAt: now
    };

    ops.bookings.unshift(booking);
    saveOps(ops);
    recordAudit(customer, 'Service booking', `${booking.number} · ${service.name}`);

    bookingForm.reset();
    $('book-date').min = todayISO();
    $('book-date').value = todayISO();
    $('book-time').value = '9:00 AM';
    $('book-phone').value = user?.phone || '';
    updateBookingSummary();

    renderOrders();
    showTab('orders', { scroll: true });
    openQr(booking);
    toast(`${booking.number} requested for ${dateLabel(date)} at ${time}.`, 'success');
  });

  /* ---------- Cart ---------- */

  function renderCart() {
    const ops = loadOps();
    const bySku = new Map(ops.inventory.map(part => [part.sku, part]));
    cart = cart.filter(item => bySku.has(item.sku));
    writeCart();

    const total = cart.reduce((sum, item) => {
      const part = bySku.get(item.sku);
      return sum + part.price * item.qty;
    }, 0);

    cartItems.innerHTML = cart.map(item => {
      const part = bySku.get(item.sku);
      const catalog = PARTS.find(entry => entry.sku === item.sku);
      const qty = item.qty;
      return `
        <div class="cart-item">
          <img src="../assets/images/${catalog ? catalog.image : 'image-22.jpg'}" alt="" loading="lazy">
          <div>
            <h4>${escapeHtml(part.name)}</h4>
            <div class="cart-item__meta">${escapeHtml(part.sku)} · ${peso(part.price)} each</div>
            <div class="cart-qty">
              <button type="button" data-cart-dec="${part.sku}" aria-label="Remove one ${escapeHtml(part.name)}" ${qty <= 1 ? 'disabled' : ''}>−</button>
              <output>${qty}</output>
              <button type="button" data-cart-inc="${part.sku}" aria-label="Add one ${escapeHtml(part.name)}" ${qty >= part.stock ? 'disabled' : ''}>+</button>
              <button type="button" class="cart-remove" data-cart-remove="${part.sku}">Remove</button>
            </div>
          </div>
          <strong class="cart-item__price">${peso(part.price * qty)}</strong>
        </div>`;
    }).join('');

    cartTotal.textContent = peso(total);
    cartEmpty.hidden = cart.length > 0;
    cartForm.hidden = cart.length === 0;
    document.querySelectorAll('[data-cart-count]').forEach(node => {
      node.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    });
    $('cart-hint').textContent = ops.settings.bookingOpen
      ? 'Reserve now and pay when you collect the parts. Pickup only — no delivery.'
      : 'Orders are paused right now. Call the shop at (02) 8123-4789 to arrange pickup.';
    $('cart-submit').disabled = !cart.length || !ops.settings.bookingOpen;
  }

  cartItems.addEventListener('click', event => {
    const button = event.target.closest('[data-cart-inc], [data-cart-dec], [data-cart-remove]');
    if (!button) return;
    const sku = button.dataset.cartInc || button.dataset.cartDec || button.dataset.cartRemove;
    const line = cart.find(item => item.sku === sku);
    if (!line) return;

    if (button.dataset.cartRemove) {
      cart = cart.filter(item => item.sku !== sku);
    } else if (button.dataset.cartInc) {
      const part = loadOps().inventory.find(item => item.sku === sku);
      if (part && line.qty >= part.stock) {
        toast('That is all the stock available.');
        return;
      }
      line.qty += 1;
    } else if (line.qty <= 1) {
      cart = cart.filter(item => item.sku !== sku);
    } else {
      line.qty -= 1;
    }

    writeCart();
    renderCart();
    renderParts();
  });

  $('cart-form').addEventListener('submit', event => {
    event.preventDefault();
    cartError.textContent = '';

    const ops = loadOps();
    if (!ops.settings.bookingOpen) {
      cartError.textContent = 'Orders are paused right now. Call the shop to arrange pickup.';
      return;
    }
    if (!cart.length) {
      cartError.textContent = 'Your cart is empty.';
      return;
    }

    const phone = $('pickup-phone').value.trim();
    const date = $('pickup-date').value;
    const time = $('pickup-time').value;
    const vehicle = $('pickup-vehicle').value.trim();
    const notes = $('pickup-note').value.trim();

    if (phone.replace(/\D/g, '').length < 10) {
      cartError.textContent = 'Enter a phone number with at least 10 digits.';
      return;
    }
    if (!date || date < todayISO()) {
      cartError.textContent = 'Choose a pickup date from today onward.';
      return;
    }
    if (!time) {
      cartError.textContent = 'Choose a pickup time.';
      return;
    }

    const lines = [];
    for (const item of cart) {
      const part = ops.inventory.find(entry => entry.sku === item.sku);
      if (!part) {
        cart = cart.filter(entry => entry.sku !== item.sku);
        writeCart();
        renderCart();
        cartError.textContent = 'A part in your cart is no longer available. Review the cart.';
        return;
      }
      if (item.qty > part.stock) {
        cartError.textContent = `${part.name} only has ${part.stock} left. Lower the quantity.`;
        return;
      }
      lines.push({ part, qty: item.qty });
    }

    const total = lines.reduce((sum, line) => sum + line.part.price * line.qty, 0);
    const now = new Date().toISOString();
    const booking = {
      id: `b${Date.now()}`,
      number: nextNumber(ops),
      customer: customer.name,
      customerEmail: customer.email,
      phone,
      kind: 'Parts order',
      vehicle: vehicle || 'Counter pickup · no vehicle',
      items: lines.map(line => ({ name: line.part.name, qty: line.qty, price: line.part.price })),
      status: 'pending',
      note: `Pickup ${dateLabel(date)} at ${time}${notes ? ` · ${notes}` : ''}`,
      createdAt: now,
      updatedAt: now
    };

    ops.bookings.unshift(booking);
    lines.forEach(line => {
      line.part.stock = Math.max(0, line.part.stock - line.qty);
    });
    saveOps(ops);
    recordAudit(customer, 'Parts order', `${booking.number} · ${lines.length} line${lines.length === 1 ? '' : 's'} · ${peso(total)}`);

    cart = [];
    writeCart();
    renderCart();
    renderParts();
    renderOrders();
    closeCart();
    showTab('orders', { scroll: true });
    openQr(booking);
    toast(`${booking.number} reserved for pickup on ${dateLabel(date)}.`, 'success');
  });

  /* ---------- Orders ---------- */

  function renderOrders() {
    const ops = loadOps();
    const email = customer.email.toLowerCase();
    const mine = ops.bookings.filter(booking => {
      if (booking.customerEmail) return booking.customerEmail.toLowerCase() === email;
      return booking.customer === customer.name;
    });

    ordersEmpty.hidden = mine.length > 0;
    ordersList.innerHTML = mine.map(booking => {
      const status = STATUS[booking.status] || STATUS.pending;
      const total = booking.items.reduce((sum, item) => sum + item.price * item.qty, 0);
      return `
        <article class="order-card">
          <div class="order-card__head">
            <strong>${escapeHtml(booking.number)}</strong>
            <span class="badge badge--${status.badge}">${status.label}</span>
          </div>
          <div class="order-card__meta">${escapeHtml(booking.kind)} · ${formatDateTime(booking.createdAt)}</div>
          <ul>
            ${booking.items.map(item => `<li><span>${item.qty}× ${escapeHtml(item.name)}</span><span>${peso(item.price * item.qty)}</span></li>`).join('')}
          </ul>
          <div class="order-card__foot">
            <span>${escapeHtml(booking.vehicle)}</span>
            <strong>${peso(total)}</strong>
          </div>
          <p class="order-card__note">${escapeHtml(booking.note)}</p>
          <button type="button" class="btn btn--quiet btn--sm btn--block" data-qr-order="${booking.id}">
            Show pickup QR
          </button>
        </article>`;
    }).join('');
  }

  $('orders-refresh').addEventListener('click', renderOrders);

  ordersList.addEventListener('click', event => {
    const button = event.target.closest('[data-qr-order]');
    if (!button) return;
    const booking = loadOps().bookings.find(item => item.id === button.dataset.qrOrder);
    if (booking) openQr(booking);
  });

  /* ---------- Chrome ---------- */

  function renderStatus() {
    const ops = loadOps();
    const open = ops.settings.bookingOpen;
    const state = $('shop-state');
    state.textContent = open ? 'Bookings open' : 'Bookings paused';
    state.className = `badge ${open ? 'badge--ok' : 'badge--off'}`;
    $('booking-paused').hidden = open;
    $('book-submit').disabled = !open;
    $('cart-submit').disabled = !open || !cart.length;
    partHint.textContent = open ? 'Pickup only' : 'Orders paused';
  }

  function showTab(name, { scroll = false } = {}) {
    if (!['services', 'parts', 'book', 'orders'].includes(name)) name = 'services';
    activeTab = name;
    document.querySelectorAll('[data-shop-tab]').forEach(button => {
      button.classList.toggle('is-active', button.dataset.shopTab === name);
      button.setAttribute('aria-selected', String(button.dataset.shopTab === name));
    });
    document.querySelectorAll('[data-panel]').forEach(panel => {
      panel.hidden = panel.dataset.panel !== name;
    });

    if (name === 'parts') renderParts();
    if (name === 'orders') renderOrders();
    if (name === 'book') {
      renderStatus();
      updateBookingSummary();
    }

    try {
      history.replaceState({}, '', `${location.pathname}${location.search}#${name}`);
    } catch {
      /* ignore */
    }

    if (scroll) {
      document.querySelector('.shop-bar').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  document.querySelectorAll('[data-shop-tab]').forEach(button => {
    button.addEventListener('click', () => showTab(button.dataset.shopTab, { scroll: true }));
  });

  /* ---------- Pickup pass ---------- */

  let lastQrFocus = null;
  let openQrId = null;

  function paintQr(booking) {
    $('qr-title').textContent = booking.number;
    $('qr-kind').textContent = booking.kind;
    $('qr-total').textContent = peso(booking.items.reduce((sum, item) => sum + item.price * item.qty, 0));
    renderQr($('qr-code'), booking);
  }

  function openQr(booking) {
    openQrId = booking.id;
    paintQr(booking);
    lastQrFocus = document.activeElement;
    qrLayer.hidden = false;
    document.body.classList.add('qr-open');
    qrLayer.querySelector('.qr-dialog__close').focus();
  }

  function closeQr() {
    if (qrLayer.hidden) return;
    qrLayer.hidden = true;
    document.body.classList.remove('qr-open');
    openQrId = null;
    if (lastQrFocus && typeof lastQrFocus.focus === 'function') lastQrFocus.focus();
  }

  qrLayer.querySelectorAll('[data-qr-close]').forEach(node => {
    node.addEventListener('click', closeQr);
  });

  /* ---------- Cart drawer ---------- */

  let lastFocus = null;

  function openCart() {
    lastFocus = document.activeElement;
    renderCart();
    cartLayer.hidden = false;
    document.body.classList.add('cart-open');
    cartLayer.querySelector('.cart-drawer__close').focus();
  }

  function closeCart() {
    if (cartLayer.hidden) return;
    cartLayer.hidden = true;
    document.body.classList.remove('cart-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  document.querySelector('[data-cart-open]').addEventListener('click', openCart);
  document.querySelectorAll('[data-cart-close]').forEach(node => {
    node.addEventListener('click', closeCart);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeQr();
    closeCart();
  });

  window.addEventListener('storage', event => {
    if (event.key && event.key.startsWith('gspot.ops.')) {
      renderStatus();
      renderParts();
      renderCart();
      if (activeTab === 'orders') renderOrders();
      if (!qrLayer.hidden && openQrId) {
        const booking = loadOps().bookings.find(item => item.id === openQrId);
        if (booking) paintQr(booking);
      }
    }
  });

  /* ---------- Helpers ---------- */

  function readCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CART_KEY));
      if (parsed && parsed.email === customer.email && Array.isArray(parsed.items)) {
        return parsed.items.filter(item => item && typeof item.sku === 'string' && Number.isFinite(item.qty));
      }
    } catch {
      /* ignore */
    }
    return [];
  }

  function writeCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify({ email: customer.email, items: cart }));
    } catch {
      /* ignore */
    }
  }

  function nextNumber(ops) {
    const highest = ops.bookings.reduce((max, booking) => {
      const match = /^B-(\d+)$/.exec(booking.number || '');
      return match ? Math.max(max, Number(match[1])) : max;
    }, 1040);
    return `B-${highest + 1}`;
  }

  function dateLabel(iso) {
    const date = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString('en-PH', { weekday: 'short', month: 'short', day: 'numeric' });
  }
}
