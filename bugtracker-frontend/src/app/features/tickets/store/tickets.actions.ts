import { createAction, props } from '@ngrx/store';

import { Ticket } from '../models/ticket';

export const createTicket = createAction(
  '[Tickets] Create Ticket',
  props<{ ticket: Ticket }>()
);

export const createTicketSuccess = createAction(
  '[Tickets] Create Ticket Success',
  props<{ ticket: Ticket }>()
);

export const getTicket = createAction(
  '[Tickets] Get Ticket',
  props<{ id: string }>()
);

export const getTicketSuccess = createAction(
  '[Tickets] Get Ticket Success',
  props<{ ticket: Ticket }>()
);

export const updateTicket = createAction(
  '[Tickets] Update Ticket',
  props<{ id: string; value: string | number; property: string }>()
);

export const updateTicketSuccess = createAction(
  '[Tickets] Update Ticket Success',
  props<{ ticket: Ticket }>()
);

export const flush = createAction('[Tickets] Flush');
