import { createAction, props } from '@ngrx/store';

export const addErrorToast = createAction(
  '[Toast] Error',
  props<{ message: string; headline: string; option?: {} }>()
);

export const addSuccessToast = createAction(
  '[Toast] Success',
  props<{ message: string; headline: string; option?: {} }>()
);
