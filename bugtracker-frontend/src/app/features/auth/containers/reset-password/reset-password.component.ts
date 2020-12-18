import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ResetPasswordForm } from '../../models/form';
import { resetPassword } from '../../store/auth.actions';
import * as fromAuth from '../../store/auth.reducer';
import { selectLoading } from '../../store/auth.selectors';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form = new ResetPasswordForm();

  loading$ = this.store.select(selectLoading);

  constructor(private store: Store<fromAuth.State>) {}

  resetPassword() {
    this.store.dispatch(resetPassword({ email: this.form.email }));
  }
}
