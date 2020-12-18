import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { addErrorToast } from '@core/store/toasts/toasts.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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

  constructor(
    private actions$: Actions,
    private ticketsService: TicketsService
  ) {}
}
