import { createAction, props } from '@ngrx/store';

import { User, UserAuth } from '../models/auth';

export const register = createAction(
  '[Auth] Register',
  props<{ username: string; email: string; password: string }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{ userAuth: UserAuth }>()
);

export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ email: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success',
  props<{ success: boolean }>()
);

export const logout = createAction('[Auth] Auth Logout');

export const flush = createAction('[Auth] Flush');
