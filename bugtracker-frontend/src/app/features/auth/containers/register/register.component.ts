import { Component, Optional } from '@angular/core';
import { LayoutComponent } from '@core/containers/layout/layout.component';
import { Store } from '@ngrx/store';

import { RegisterForm } from '../../models/form';
import { register } from '../../store/auth.actions';
import * as fromAuth from '../../store/auth.reducer';
import { selectLoadingState } from '../../store/auth.selector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  step = 1;
  form = new RegisterForm();

  loading$ = this.store.select(selectLoadingState);

  constructor(
    private store: Store<fromAuth.State>,
    @Optional() private layout: LayoutComponent
  ) {
    this.layout.pageType = 'C';
  }

  changeStep(step) {
    this.step = step;
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

  ngOnDestroy() {
    this.layout.resetPageType();
  }
}
