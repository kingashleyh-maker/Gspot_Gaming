# API clients (reserved)

No backend is included in this build. The single data boundary for the staff portals is
[`../js/store.js`](../js/store.js), which reads and writes a versioned demo state in
`localStorage`.

When a backend is introduced:

1. Add one module per domain here, for example `auth-client.js`, `catalog-client.js`,
   `tickets-client.js`, and `admin-client.js`.
2. Keep the exported function names identical to the store functions they replace
   (`listTickets`, `updateTicketStatus`, `updatePart`, `updateSettings`, ...).
3. Point the role services (`manager-ui/src/services`, `admin-ui/src/services`) at the
   clients instead of `store.js`.
4. Move role checks to the server. The client-side `requireRole` guard is for UX only.

See `docs/architecture.md` for the proposed endpoint naming conventions.
