import { createAction, props } from '@ngrx/store';

import { User } from './user';

export const loadUser = createAction('[User] Load ');

export const loadedUser = createAction(
  '[User] Loaded ',
  props<{ user: User }>()
);

export const flush = createAction('[User] Flush');
