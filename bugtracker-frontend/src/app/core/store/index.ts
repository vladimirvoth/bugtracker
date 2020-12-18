import { ActionReducerMap } from '@ngrx/store';

import * as fromToasts from './toasts/toasts.reducer';
import * as fromUser from './user/user.reducer';

export const coreFeatureKey = 'core';

export interface CoreState {
  [fromUser.userFeatureKey]: fromUser.UserState;
  [fromToasts.toastsFeatureKey]: fromToasts.ToastsState;
}

export const reducers: ActionReducerMap<CoreState> = {
  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromToasts.toastsFeatureKey]: fromToasts.reducer
};
