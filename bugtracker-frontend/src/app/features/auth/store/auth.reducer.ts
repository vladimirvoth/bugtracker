import { createReducer, on } from '@ngrx/store';

import { User } from '../models/auth';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  loading: boolean;
}

export interface State {
  [authFeatureKey]: AuthState;
}

export const initialState: AuthState = {
  loading: false
};

const authReducer = createReducer<AuthState>(
  initialState,
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
    loading: false
  }))
);

export function reducer(state, action) {
  return authReducer(state, action);
}
