import { createReducer, on } from '@ngrx/store';

import * as ToastsActions from './toasts.actions';

export const toastsKey = 'toasts';

export interface ToastsState {
  toasts: Array<{}>;
}

export interface State {
  [toastsKey]: ToastsState;
}

export const initialState: ToastsState = {
  toasts: []
};

const toastsReducer = createReducer<ToastsState>(initialState);

export function reducer(state, action) {
  return toastsReducer(state, action);
}
