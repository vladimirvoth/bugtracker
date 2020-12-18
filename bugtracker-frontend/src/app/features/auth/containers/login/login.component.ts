import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoginForm } from '../../models/form';
import { login } from '../../store/auth.actions';
import * as fromAuth from '../../store/auth.reducer';
import { selectLoading } from '../../store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new LoginForm();

  loading$ = this.store.select(selectLoading);

  constructor(private store: Store<fromAuth.State>) {}

  emailAuth() {
    this.store.dispatch(
      login({ email: this.form.email, password: this.form.password })
    );
  }
}
