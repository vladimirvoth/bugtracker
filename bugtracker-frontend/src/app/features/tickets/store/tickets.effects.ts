import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { addErrorToast } from '@core/store/toasts/toasts.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { environment } from '../../../../environments/environment';
import * as TicketsActions from './tickets.actions';
import { TicketsService } from './tickets.service';

@Injectable()
export class TicketsEffects {
  createTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.createTicket),
      exhaustMap((payload) =>
        this.ticketsService.createTicket(payload.ticket).pipe(
          map((ticket) => TicketsActions.createTicketSuccess({ ticket })),
          catchError((error) =>
            of(
              addErrorToast({
                headline: error.error.msg
              }),
              TicketsActions.flush()
            )
          )
        )
      )
    )
  );

  createTicketSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TicketsActions.createTicketSuccess),
        tap((payload) => {
          window.location.href = `${environment.baseUrl}/dashboard/tickets/update/${payload.ticket._id}`;
        })
      ),
    { dispatch: false }
  );

  getTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.getTicket),
      exhaustMap((payload) =>
        this.ticketsService.getTicket(payload.id).pipe(
          map((ticket) => TicketsActions.getTicketSuccess({ ticket })),
          catchError((error) =>
            of(
              addErrorToast({
                headline: error.error.msg
              }),
              TicketsActions.flush()
            )
          )
        )
      )
    )
  );

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.updateTicket),
      exhaustMap((payload) =>
        this.ticketsService
          .updateTicket(payload.id, payload.value, payload.property)
          .pipe(
            map((ticket) => TicketsActions.updateTicketSuccess({ ticket })),
            catchError((error) =>
              of(
                addErrorToast({
                  headline: error.error.msg
                }),
                TicketsActions.flush()
              )
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ticketsService: TicketsService
  ) {}
}
