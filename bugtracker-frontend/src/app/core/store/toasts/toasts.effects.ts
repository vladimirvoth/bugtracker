import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ToatsActions from './toasts.actions';

@Injectable()
export class ToastsEffects {
  addErrorToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToatsActions.addErrorToast),
        tap((payload) => {
          this.toast.error(payload.message, payload.headline);
        })
      ),
    { dispatch: false }
  );

  addSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToatsActions.addSuccessToast),
        tap((payload) => {
          this.toast.success(payload.message, payload.headline);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private toast: ToastrService) {}
}
