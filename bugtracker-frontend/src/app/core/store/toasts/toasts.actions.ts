import { createAction, props } from '@ngrx/store';

export const addErrorToast = createAction(
  '[Toast] Error',
  props<{ headline: string; message?: string; option?: {} }>()
);

export const addSuccessToast = createAction(
  '[Toast] Success',
  props<{ headline: string; message?: string; option?: {} }>()
);
