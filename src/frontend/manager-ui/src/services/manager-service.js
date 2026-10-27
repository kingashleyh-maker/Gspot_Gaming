import * as store from '../../../shared/js/store.js';

const MANAGER_ROLES = ['Manager', 'Admin'];

export const managerService = {
  session: store.getSession,
  stats: store.stats,
  settings: store.getSettings,

  tickets: store.listTickets,
  ticket: store.getTicket,
  updateStatus: (ticketId, status, session) => store.updateTicketStatus(ticketId, status, session),
  addQuote: (ticketId, payload, session) => store.addTicketQuote(ticketId, payload, session),
  approveQuote: (ticketId, quoteId, approved, session) =>
    store.setQuoteApproved(ticketId, quoteId, approved, session),
  itemsTotal: store.itemsTotal,
  approvedQuotesTotal: store.approvedQuotesTotal,
  pendingQuotesTotal: store.pendingQuotesTotal,
  ticketTotal: store.ticketTotal,

  parts: store.listParts,
  updatePart: store.updatePart,
  adjustStock: store.adjustStock,

  services: store.listServices,
  updateService: store.updateService,

  canManage(session = store.getSession()) {
    return Boolean(session && MANAGER_ROLES.includes(session.role));
  }
};
