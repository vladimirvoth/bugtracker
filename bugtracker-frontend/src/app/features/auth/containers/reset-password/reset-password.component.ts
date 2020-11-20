import { Component, Optional } from '@angular/core';
import { LayoutComponent } from '@core/containers/layout/layout.component';
import { Store } from '@ngrx/store';

import { ResetPasswordForm } from '../../models/form';
import { resetPassword } from '../../store/auth.actions';
import * as fromAuth from '../../store/auth.reducer';
import { selectLoadingState } from '../../store/auth.selector';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form = new ResetPasswordForm();

  loading$ = this.store.select(selectLoadingState);

  constructor(
    private store: Store<fromAuth.State>,
    @Optional() private layout: LayoutComponent
  ) {
    this.layout.pageType = 'B';
  }

  resetPassword() {
    this.store.dispatch(resetPassword({ email: this.form.email }));
  }
}
