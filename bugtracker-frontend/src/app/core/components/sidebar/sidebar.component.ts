import { Subject } from 'rxjs';

import { Component, ElementRef, HostListener } from '@angular/core';
import { logout } from '@features/auth/store/auth.actions';
import { faCog, faHome, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { loadUser } from '../../store/user/user.actions';
import * as fromUser from '../../store/user/user.reducer';
import { selectLoading, selectUser } from '../../store/user/user.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @HostListener('document:click', ['$event.target']) onClick(target) {
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside && this.isOpen) {
      this.toggle();
    }
  }

  faHome = faHome;
  faQuestion = faQuestion;
  faCog = faCog;
  isOpen = false;

  protected componentDestroyed$ = new Subject<void>();

  loading$ = this.store.select(selectLoading);
  user$ = this.store.select(selectUser);

  constructor(
    private store: Store<fromUser.State>,
    private elementRef: ElementRef
  ) {
    if (localStorage.getItem('token') !== null) {
      this.store.dispatch(loadUser());
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  logout(event) {
    event.preventDefault();

    this.store.dispatch(logout());
  }
}
