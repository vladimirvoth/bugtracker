import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromState from '../index';

export const selectUserState = createFeatureSelector<fromState.CoreState>(
  fromState.coreFeatureKey
);

export const selectUserSate = createSelector(
  selectUserState,
  (state) => state.user.user
);

export const selectLoadingState = createSelector(
  selectUserState,
  (state) => state.user.loading
);
