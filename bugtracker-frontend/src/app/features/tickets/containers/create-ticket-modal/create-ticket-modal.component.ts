import { BsModalRef } from 'ngx-bootstrap/modal';

import { Component, OnInit } from '@angular/core';

import { ticketForm } from '../../models/form';

@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrls: ['./create-ticket-modal.component.scss']
})
export class CreateTicketModalComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];
  ticketForm = ticketForm;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.list.push('PROFIT!!!');
  }

  onSubmit() {
    console.log(this.ticketForm.value);
  }
}
