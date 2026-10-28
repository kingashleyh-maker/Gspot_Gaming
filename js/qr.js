/*
 * Offline pickup-pass QR codes. The encoder is qrcode-generator (MIT),
 * loaded as a classic script from js/vendor/qrcode.js before this module.
 */
const STATUS_LABELS = {
  pending: 'Pending',
  'in-progress': 'In service',
  ready: 'Ready for pickup',
  completed: 'Completed'
};

export function orderPayload(booking) {
  const total = booking.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const status = STATUS_LABELS[booking.status] || 'Pending';
  return [
    'GSPOT PICKUP PASS (DEMO)',
    booking.number,
    booking.kind,
    `NAME: ${booking.customer}`,
    `PHONE: ${booking.phone}`,
    `VEHICLE: ${booking.vehicle}`,
    `TOTAL: PHP ${total.toLocaleString('en-PH')}`,
    `DETAILS: ${String(booking.note).replace(/\s+/g, ' ')}`,
    `STATUS: ${status}`
  ]
    .join('\n')
    .replace(/[^\x20-\x7e\n]/g, '-');
}

export function renderQr(target, booking) {
  const qr = window.qrcode(0, 'M');
  qr.addData(orderPayload(booking), 'Byte');
  qr.make();
  target.innerHTML = qr.createSvgTag({
    cellSize: 4,
    margin: 8,
    alt: `Pickup pass for ${booking.number}`
  });
}
