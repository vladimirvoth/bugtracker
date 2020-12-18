import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import {
    CreateTicketModalComponent
} from './containers/create-ticket-modal/create-ticket-modal.component';
import { UpdateTicketComponent } from './containers/update-ticket/update-ticket.component';
import { TicketsEffects } from './store/tickets.effects';
import * as fromTickets from './store/tickets.reducer';
import { TicketsService } from './store/tickets.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateTicketModalComponent
  },
  {
    path: 'update',
    component: UpdateTicketComponent
  }
];

@NgModule({
  declarations: [UpdateTicketComponent, CreateTicketModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularEditorModule,
    StoreModule.forFeature(fromTickets.ticketsFeatureKey, fromTickets.reducer),
    EffectsModule.forFeature([TicketsEffects])
  ],
  providers: [TicketsService]
})
export class TicketsModule {}
