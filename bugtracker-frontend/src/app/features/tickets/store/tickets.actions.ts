import { createAction, props } from '@ngrx/store';

import { Ticket } from '../models/ticket';

export const loadTickets = createAction('[Tickets] Load Tickets');

export const loadTicketsSuccess = createAction(
  '[Tickets] Load Tickets Success',
  props<{ tickets: Array<Ticket> }>()
);

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

export const createComment = createAction(
  '[Tickets] Create Comment',
  props<{ id: string; comment: string }>()
);

export const createCommentSuccess = createAction(
  '[Tickets] Create Comment Success',
  props<{ ticket: Ticket }>()
);

export const updateComment = createAction(
  '[Tickets] Update Comment',
  props<{ id: string; commentId: string; comment: string }>()
);

export const updateCommentSuccess = createAction(
  '[Tickets] Update Comment Success',
  props<{ ticket: Ticket }>()
);

export const removeComment = createAction(
  '[Tickets] Remove Comment',
  props<{ id: string; commentId: string }>()
);

export const removeCommentSuccess = createAction(
  '[Tickets] Remove Comment Success',
  props<{ ticket: Ticket }>()
);

export const flush = createAction('[Tickets] Flush');
