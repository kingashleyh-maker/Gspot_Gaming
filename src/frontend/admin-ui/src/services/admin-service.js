import * as store from '../../../shared/js/store.js';

export const adminService = {
  session: store.getSession,
  canAdmin(session = store.getSession()) {
    return Boolean(session && session.role === 'Admin');
  },

  stats: store.stats,
  tickets: store.listTickets,
  ticketTotal: store.ticketTotal,

  staff: store.listStaff,
  createStaff: store.createStaff,
  updateRole: store.updateStaffRole,
  setActive: store.setStaffActive,

  parts: store.listParts,
  services: store.listServices,
  updatePart: store.updatePart,
  updateService: store.updateService,

  settings: store.getSettings,
  updateSettings: store.updateSettings,

  auditLogs: store.listAuditLogs,
  resetDemo: store.resetDemo
};
