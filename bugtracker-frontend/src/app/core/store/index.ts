import { ActionReducerMap } from '@ngrx/store';

import * as fromToasts from './toasts/toasts.reducer';
import * as fromUser from './user/user.reducer';

export const coreFeatureKey = 'core';

export interface CoreState {
  [fromUser.userKey]: fromUser.UserState;
  [fromToasts.toastsKey]: fromToasts.ToastsState;
}

export const reducers: ActionReducerMap<CoreState> = {
  [fromUser.userKey]: fromUser.reducer,
  [fromToasts.toastsKey]: fromToasts.reducer
};
