import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import {
    CreateTicketModalComponent
} from '../../tickets/containers/create-ticket-modal/create-ticket-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  bsModalRef: BsModalRef;
  faPlus = faPlus;

  constructor(private modalService: BsModalService) {}

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(CreateTicketModalComponent);
  }
}
