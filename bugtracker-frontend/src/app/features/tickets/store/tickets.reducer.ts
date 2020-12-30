import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { Ticket } from '../models/ticket';
import * as TicketsActions from './tickets.actions';

export const ticketsFeatureKey = 'tickets';

export interface TicketsState extends EntityState<Ticket> {
  selectedTicketId: string | null;
  loading: boolean;
}

export const adapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>({
  selectId: (ticket) => ticket._id
});

export const initialState: TicketsState = adapter.getInitialState({
  selectedTicketId: null,
  loading: false
});

export interface State extends EntityState<Ticket> {
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
    return adapter.addOne(ticket, {
      ...state,
      selectedTicketId: ticket._id,
      loading: false
    });
  }),
  on(TicketsActions.updateTicket, (state: TicketsState) => ({
    ...state,
    loading: true
  })),
  on(TicketsActions.updateTicketSuccess, (state: TicketsState) => ({
    ...state,
    loading: false
  })),
  on(TicketsActions.flush, (state: TicketsState) => {
    return adapter.removeAll({ ...state, loading: false });
  })
);

export function reducer(state: TicketsState | undefined, action: Action): any {
  return ticketsReducer(state, action);
}

export const getSelectedTicketId = (state: State) =>
  state[ticketsFeatureKey].selectedTicketId;

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
