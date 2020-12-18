import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { RegisterForm } from '../../models/form';
import { checkEmailExists, register } from '../../store/auth.actions';
import * as fromAuth from '../../store/auth.reducer';
import { selectLoading, selectStep } from '../../store/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = new RegisterForm();

  loading$ = this.store.select(selectLoading);
  step$ = this.store.select(selectStep);

  constructor(private store: Store<fromAuth.State>) {}

  continue() {
    this.store.dispatch(checkEmailExists({ email: this.form.email }));
  }

  register() {
    this.store.dispatch(
      register({
        email: this.form.email,
        password: this.form.password,
        username: this.form.username
      })
    );
  }
}
