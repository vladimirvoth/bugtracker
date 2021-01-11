import { PaginationModule } from 'ngx-bootstrap/pagination';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { CommentsListComponent } from './containers/comments-list/comments-list.component';
import {
    CreateTicketModalComponent
} from './containers/create-ticket-modal/create-ticket-modal.component';
import { TicketsListComponent } from './containers/tickets-list/tickets-list.component';
import { UpdateTicketComponent } from './containers/update-ticket/update-ticket.component';
import { CommentsControlService } from './services/comments-control.service';
import { TicketsService } from './services/tickets.service';
import { TicketsEffects } from './store/tickets.effects';
import * as fromTickets from './store/tickets.reducer';

const routes: Routes = [
  {
    path: ':id',
    component: UpdateTicketComponent
  }
];

@NgModule({
  declarations: [
    UpdateTicketComponent,
    CreateTicketModalComponent,
    CommentsListComponent,
    TicketsListComponent,
    CommentItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularEditorModule,
    StoreModule.forFeature(fromTickets.ticketsFeatureKey, fromTickets.reducer),
    EffectsModule.forFeature([TicketsEffects]),
    CoreModule,
    PaginationModule.forRoot(),
    FontAwesomeModule
  ],
  exports: [TicketsListComponent],
  providers: [TicketsService, CommentsControlService]
})
export class TicketsModule {}
