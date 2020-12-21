import { Action, createReducer, on } from '@ngrx/store';

import { Ticket } from '../models/ticket';
import * as TicketsActions from './tickets.actions';

export const ticketsFeatureKey = 'tickets';

export interface TicketsState {
  tickets: Ticket[];
  loading: boolean;
}
export interface State {
  [ticketsFeatureKey]: TicketsState;
}

export const initialState: TicketsState = {
  tickets: [],
  loading: false
};

export const ticketsReducer = createReducer(
  initialState,
  on(TicketsActions.createTicket, (state: TicketsState) => ({
    ...state,
    loading: true
  })),
  on(TicketsActions.createTicketSuccess, (state: TicketsState, { ticket }) => ({
    ...state,
    tickets: [...state.tickets, ticket],
    loading: false
  })),
  on(TicketsActions.getTicket, (state: TicketsState) => ({
    ...state,
    loading: true
  })),
  on(TicketsActions.getTicketSuccess, (state: TicketsState, { ticket }) => ({
    ...state,
    tickets: [...state.tickets, ticket],
    loading: false
  })),
  on(TicketsActions.flush, (state: TicketsState) => ({
    ...state,
    tickets: [],
    loading: false
  }))
);

export function reducer(state: TicketsState | undefined, action: Action): any {
  return ticketsReducer(state, action);
}
