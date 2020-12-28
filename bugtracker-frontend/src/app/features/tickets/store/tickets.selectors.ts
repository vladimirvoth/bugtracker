import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTickets from './tickets.reducer';

export const selectTicketsState = createFeatureSelector<fromTickets.TicketsState>(
  fromTickets.ticketsFeatureKey
);

export const selectTickets = createSelector(
  selectTicketsState,
  (state: fromTickets.TicketsState) => state
);

export const selectLoading = createSelector(
  selectTicketsState,
  (state) => state.loading
);
