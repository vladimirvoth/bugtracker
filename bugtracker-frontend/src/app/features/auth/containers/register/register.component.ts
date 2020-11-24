import { filter, map } from 'rxjs/operators';

import { Component, Optional } from '@angular/core';
import { LayoutComponent } from '@core/containers/layout/layout.component';
import { Store } from '@ngrx/store';

import { RegisterForm } from '../../models/form';
import { checkEmailExists, flush, register } from '../../store/auth.actions';
import * as fromAuth from '../../store/auth.reducer';
import {
    selectEmailExistsState, selectLoadingState, selectStepState
} from '../../store/auth.selector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = new RegisterForm();

  loading$ = this.store.select(selectLoadingState);
  emailExists$ = this.store.select(selectEmailExistsState);
  step$ = this.store.select(selectStepState);

  constructor(
    private store: Store<fromAuth.State>,
    @Optional() private layout: LayoutComponent
  ) {
    this.layout.pageType = 'C';

    // this.emailExists$.pipe(filter((emailExists) => emailExists)).subscribe(() =>
    //   setTimeout(() => {
    //     this.store.dispatch(flush());
    //   }, 1000)
    // );
  }

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

    // this.form.reset();
  }

  ngOnDestroy() {
    this.layout.resetPageType();
  }
}
