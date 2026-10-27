// Dismiss the offline demo notice without an inline HTML event handler.
const dismissNoticeButton = document.querySelector('[data-dismiss-notice]');

dismissNoticeButton?.addEventListener('click', () => {
  document.getElementById('demo-notice')?.remove();
});
