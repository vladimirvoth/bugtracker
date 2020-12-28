import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { Ticket } from '../models/ticket';
import * as TicketsActions from './tickets.actions';

export const ticketsFeatureKey = 'tickets';

export interface TicketsState extends EntityState<Ticket> {
  loading: boolean;
}

export const adapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>({
  selectId: (ticket) => ticket._id
});

export const initialState: TicketsState = adapter.getInitialState({
  loading: false
});

export interface State {
  [ticketsFeatureKey]: TicketsState;
}

export const ticketsReducer = createReducer(
  initialState,
  on(TicketsActions.createTicket, (state: TicketsState) => ({
    ...state,
    loading: true
  })),
  on(TicketsActions.createTicketSuccess, (state, { ticket }) => {
    return adapter.addOne(ticket, { ...state, loading: false });
  }),
  on(TicketsActions.getTicket, (state: TicketsState) => ({
    ...state,
    loading: true
  })),
  on(TicketsActions.getTicketSuccess, (state: TicketsState, { ticket }) => {
    return adapter.addOne(ticket, { ...state, loading: false });
  }),
  on(TicketsActions.flush, (state: TicketsState) => {
    return adapter.removeAll({ ...state, loading: false });
  })
);

export function reducer(state: TicketsState | undefined, action: Action): any {
  return ticketsReducer(state, action);
}
