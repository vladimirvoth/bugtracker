import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectStep = createSelector(
  selectAuthState,
  (state) => state.step
);

export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);
