import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromState from '../index';

export const selectUserState = createFeatureSelector<fromState.CoreState>(
  fromState.coreFeatureKey
);

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user.user
);

export const selectLoading = createSelector(
  selectUserState,
  (state) => state.user.loading
);
