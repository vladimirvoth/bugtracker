import { createReducer, on } from '@ngrx/store';

import { User } from './user';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  user: User;
  loading: boolean;
}

export interface State {
  [userFeatureKey]: UserState;
}

export const initialState: UserState = {
  user: null,
  loading: false
};

const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.loadedUser, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  on(UserActions.flush, (state) => ({
    ...state,
    user: null,
    loading: false
  }))
);

export function reducer(state, action) {
  return userReducer(state, action);
}
