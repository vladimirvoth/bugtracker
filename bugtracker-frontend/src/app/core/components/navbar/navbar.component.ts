import { Subject } from 'rxjs';

import { Component } from '@angular/core';
import { logout } from '@features/auth/store/auth.actions';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { loadUser } from '../../store/user/user.actions';
import * as fromUser from '../../store/user/user.reducer';
import { selectLoading, selectUser } from '../../store/user/user.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  faAngleRight = faAngleRight;

  protected componentDestroyed$ = new Subject<void>();

  loading$ = this.store.select(selectLoading);
  user$ = this.store.select(selectUser);

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
