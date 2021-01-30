import { ChartsModule } from 'ng2-charts';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ChartWidgetComponent } from './components/chart-widget/chart-widget.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { TicketsListComponent } from './components/tickets-list/tickets-list.component';
import { CommentsListComponent } from './containers/comments-list/comments-list.component';
import {
    CreateTicketModalComponent
} from './containers/create-ticket-modal/create-ticket-modal.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { UpdateTicketComponent } from './containers/update-ticket/update-ticket.component';
import { CommentsControlService } from './services/comments-control.service';
import { TicketsService } from './services/tickets.service';
import { TicketsEffects } from './store/tickets.effects';
import * as fromTickets from './store/tickets.reducer';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
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
    CommentItemComponent,
    DashboardComponent,
    ChartWidgetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature(fromTickets.ticketsFeatureKey, fromTickets.reducer),
    EffectsModule.forFeature([TicketsEffects]),
    CoreModule,
    PaginationModule.forRoot(),
    FontAwesomeModule,
    ChartsModule
  ],
  exports: [TicketsListComponent],
  providers: [TicketsService, CommentsControlService]
})
export class TicketsModule {}
