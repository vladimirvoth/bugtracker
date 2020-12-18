import { BsModalRef } from 'ngx-bootstrap/modal';

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { editorConfig } from '../../../../../assets/config/config.angular-editor';
import { ticketForm } from '../../models/form';
import { priorities, types } from '../../models/ticket';
import { createTicket } from '../../store/tickets.actions';
import * as fromTickets from '../../store/tickets.reducer';
import { selectLoading } from '../../store/tickets.selectors';

@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrls: ['./create-ticket-modal.component.scss']
})
export class CreateTicketModalComponent {
  closeBtnName: string;
  ticketForm = ticketForm;
  editorConfig = editorConfig;
  types = types;
  priorities = priorities;

  loading$ = this.store.select(selectLoading);

  constructor(
    public bsModalRef: BsModalRef,
    private store: Store<fromTickets.State>
  ) {}

  changeSelect(event, formControl) {
    this.ticketForm.get(formControl).setValue(event.target.value);
  }

  onSubmit() {
    this.store.dispatch(createTicket({ ticket: this.ticketForm.value }));
  }
}
