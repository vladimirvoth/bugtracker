import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {
    CreateTicketModalComponent
} from './containers/create-ticket-modal/create-ticket-modal.component';
import { UpdateTicketComponent } from './containers/update-ticket/update-ticket.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full'
  },
  {
    path: 'update',
    component: UpdateTicketComponent
  }
];

@NgModule({
  declarations: [UpdateTicketComponent, CreateTicketModalComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule]
})
export class TicketsModule {}
