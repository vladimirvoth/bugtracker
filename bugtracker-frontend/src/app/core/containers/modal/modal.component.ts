import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Component } from '@angular/core';

import { ModalContentComponent } from '../../components/modal-content/modal-content.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };

    this.bsModalRef = this.modalService.show(ModalContentComponent, {
      initialState
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
