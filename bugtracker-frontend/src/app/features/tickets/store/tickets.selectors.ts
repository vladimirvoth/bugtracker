import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTickets from './tickets.reducer';

export const selectTicketsState = createFeatureSelector<fromTickets.TicketsState>(
  fromTickets.ticketsFeatureKey
);

export const selectAllTickets = createSelector(
  selectTicketsState,
  fromTickets.selectAll
);

export const selectTicketEntities = createSelector(
  selectTicketsState,
  fromTickets.selectEntities
);

export const selectCurrentTicket = createSelector(
  selectTicketEntities,
  fromTickets.getSelectedTicketId,
  (ticketEntities, ticketId) => ticketEntities[ticketId]
);

export const selectLoading = createSelector(
  selectTicketsState,
  (state) => state.loading
);
