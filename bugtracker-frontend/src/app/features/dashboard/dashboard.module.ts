import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsEffects } from '@features/tickets/store/tickets.effects';
import * as fromTickets from '@features/tickets/store/tickets.reducer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DashboardComponent } from './containers/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    StoreModule.forFeature(fromTickets.ticketsFeatureKey, fromTickets.reducer),
    EffectsModule.forFeature([TicketsEffects])
  ]
})
export class DashboardModule {}
