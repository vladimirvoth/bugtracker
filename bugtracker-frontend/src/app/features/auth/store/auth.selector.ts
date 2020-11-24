import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectStepState = createSelector(
  selectAuthState,
  (state) => state.step
);

export const selectLoadingState = createSelector(
  selectAuthState,
  (state) => state.loading
);
