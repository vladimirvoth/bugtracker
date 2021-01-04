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
  on(TicketsActions.loadTickets, (state: TicketsState) => ({
    ...state,
    loading: true
  })),
  on(TicketsActions.loadTicketsSuccess, (state: TicketsState, { tickets }) => {
    return adapter.upsertMany(tickets, { ...state, loading: false });
  }),
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
    return adapter.upsertOne(ticket, {
      ...state,
      selectedTicketId: ticket._id,
      loading: false
    });
  }),
  on(TicketsActions.updateTicket, (state: TicketsState) => ({
    ...state,
    loading: true
  })),
  on(TicketsActions.updateTicketSuccess, (state: TicketsState, { ticket }) => {
    return adapter.updateOne(
      { id: ticket._id, changes: ticket },
      { ...state, loading: false }
    );
  }),
  on(TicketsActions.createComment, (state: TicketsState) => ({
    ...state,
    loading: true
  })),
  on(TicketsActions.createCommentSuccess, (state: TicketsState, { ticket }) => {
    return adapter.updateOne(
      { id: ticket._id, changes: ticket },
      { ...state, loading: false }
    );
  }),
  on(TicketsActions.updateComment, (state: TicketsState) => ({
    ...state,
    loading: true
  })),
  on(TicketsActions.updateCommentSuccess, (state: TicketsState, { ticket }) => {
    return adapter.updateOne(
      { id: ticket._id, changes: ticket },
      { ...state, loading: false }
    );
  }),
  on(TicketsActions.removeComment, (state: TicketsState) => ({
    ...state,
    loading: true
  })),
  on(TicketsActions.removeCommentSuccess, (state: TicketsState, { ticket }) => {
    return adapter.updateOne(
      { id: ticket._id, changes: ticket },
      { ...state, loading: false }
    );
  }),
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
