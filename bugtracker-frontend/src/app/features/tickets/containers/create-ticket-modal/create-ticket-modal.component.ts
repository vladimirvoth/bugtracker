import { BsModalRef } from 'ngx-bootstrap/modal';

import { Component } from '@angular/core';

import { ticketForm } from '../../models/form';

@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrls: ['./create-ticket-modal.component.scss']
})
export class CreateTicketModalComponent {
  closeBtnName: string;
  ticketForm = ticketForm;

  constructor(public bsModalRef: BsModalRef) {}

  onSubmit() {
    console.log(this.ticketForm.value);
  }
}
