import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { addErrorToast } from '@core/store/toasts/toasts.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UserActions from './user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      exhaustMap(() =>
        this.userService.getUser().pipe(
          map((resp) => UserActions.loadedUser({ user: resp })),
          catchError((error) =>
            of(
              addErrorToast({
                headline: 'Oops, sorry! Something went wrong.',
                message: error.error.msg
              }),
              UserActions.flush()
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
