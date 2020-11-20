import { Component, Optional } from '@angular/core';
import { LayoutComponent } from '@core/containers/layout/layout.component';
import { Store } from '@ngrx/store';

import { LoginForm } from '../../models/form';
import { login } from '../../store/auth.actions';
import * as fromAuth from '../../store/auth.reducer';
import { selectLoadingState } from '../../store/auth.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new LoginForm();

  loading$ = this.store.select(selectLoadingState);

  constructor(
    private store: Store<fromAuth.State>,
    @Optional() private layout: LayoutComponent
  ) {
    this.layout.pageType = 'B';
  }

  emailAuth() {
    this.store.dispatch(
      login({ email: this.form.email, password: this.form.password })
    );
  }

  ngOnDestroy() {
    this.layout.resetPageType();
  }
}
