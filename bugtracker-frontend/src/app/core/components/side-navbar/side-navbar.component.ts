import { Subject } from 'rxjs';

import { Component } from '@angular/core';
import { logout } from '@features/auth/store/auth.actions';
import { faCog, faHome, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { loadUser } from '../../store/user/user.actions';
import * as fromUser from '../../store/user/user.reducer';
import { selectLoadingState, selectUserSate } from '../../store/user/user.selector';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent {
  faHome = faHome;
  faQuestion = faQuestion;
  faCog = faCog;

  protected componentDestroyed$ = new Subject<void>();

  loading$ = this.store.select(selectLoadingState);
  user$ = this.store.select(selectUserSate);

  constructor(private store: Store<fromUser.State>) {
    if (localStorage.getItem('token') !== null) {
      this.store.dispatch(loadUser());
    }
  }

  logout(event) {
    event.preventDefault();

    this.store.dispatch(logout());
  }
}
