import { createReducer } from '@ngrx/store';

export const toastsFeatureKey = 'toasts';

export interface ToastsState {
  toasts: Array<{}>;
}

export interface State {
  [toastsFeatureKey]: ToastsState;
}

export const initialState: ToastsState = {
  toasts: []
};

const toastsReducer = createReducer<ToastsState>(initialState);

export function reducer(state, action) {
  return toastsReducer(state, action);
}
