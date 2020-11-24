import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { addErrorToast } from '@core/store/toasts/toasts.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  checkEmailExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkEmailExists),
      exhaustMap((payload) =>
        this.authService.emailExists(payload.email).pipe(
          map((resp) =>
            AuthActions.checkEmailExistsSuccess({
              emailExists: resp.emailExists
            })
          ),
          catchError((error) =>
            of(
              addErrorToast({
                headline: 'Sorry! Something went wrong failed',
                message: error.error.msg
              }),
              AuthActions.flush()
            )
          )
        )
      )
    )
  );

  checkEmailExistsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.checkEmailExistsSuccess),
        // timeout(10000),
        map(() => AuthActions.flush())
        // tap(() => {
        // console.log('na hier');
        // setTimeout(() => {
        // AuthActions.flush();
        // }, 3000);
        // })
      )
    // { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap((payload) =>
        this.authService
          .register(payload.username, payload.email, payload.password)
          .pipe(
            map(() =>
              AuthActions.login({
                email: payload.email,
                password: payload.password
              })
            ),
            catchError((error) =>
              of(
                addErrorToast({
                  headline: 'Sorry! Registration failed',
                  message: error.error.msg
                }),
                AuthActions.flush()
              )
            )
          )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((payload) =>
        this.authService.login(payload.email, payload.password).pipe(
          map((userAuth) => AuthActions.authSuccess({ userAuth })),
          catchError((error) =>
            of(
              addErrorToast({
                headline: 'Sorry! Login failed',
                message: error.error.msg
              }),
              AuthActions.flush()
            )
          )
        )
      )
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap((payload) => {
          this.authService.authSuccess(payload.userAuth.token);
        })
      ),
    { dispatch: false }
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      exhaustMap((payload) =>
        this.authService.resetPassword(payload.email).pipe(
          map((response) =>
            AuthActions.resetPasswordSuccess({ success: response.success })
          ),
          catchError((error) =>
            of(
              addErrorToast({
                headline: 'Sorry! Reset Password failed',
                message: error.error.msg
              }),
              AuthActions.flush()
            )
          )
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
