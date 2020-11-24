import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  step: number;
  loading: boolean;
}

export interface State {
  [authFeatureKey]: AuthState;
}

export const initialState: AuthState = {
  step: 0,
  loading: false
};

const authReducer = createReducer<AuthState>(
  initialState,
  on(AuthActions.checkEmailExists, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.checkEmailExistsSuccess, (state) => ({
    ...state,
    step: 1,
    loading: false
  })),
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.authSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(AuthActions.resetPassword, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.resetPasswordSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(AuthActions.logout, (state) => ({
    ...state
  })),
  on(AuthActions.flush, (state) => ({
    ...state,
    step: 0,
    loading: false
  }))
);

export function reducer(state, action) {
  return authReducer(state, action);
}
