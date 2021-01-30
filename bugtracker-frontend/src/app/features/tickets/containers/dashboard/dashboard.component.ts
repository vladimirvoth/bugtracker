import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Component } from '@angular/core';
import {
    CreateTicketModalComponent
} from '@features/tickets/containers/create-ticket-modal/create-ticket-modal.component';
import { loadTickets } from '@features/tickets/store/tickets.actions';
import * as fromTickets from '@features/tickets/store/tickets.reducer';
import { selectAllTickets, selectLoading } from '@features/tickets/store/tickets.selectors';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  bsModalRef: BsModalRef;
  faPlus = faPlus;

  tickets$ = this.store.select(selectAllTickets);
  loading$ = this.store.select(selectLoading);

  constructor(
    private modalService: BsModalService,
    private store: Store<fromTickets.State>
  ) {}

  ngOnInit() {
    this.store.dispatch(loadTickets());
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(CreateTicketModalComponent);
  }
}
