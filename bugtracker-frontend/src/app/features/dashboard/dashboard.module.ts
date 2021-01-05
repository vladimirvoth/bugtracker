import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsModule } from '@features/tickets/tickets.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardComponent } from './containers/dashboard.component';
import { ChartWidgetComponent } from './components/chart-widget/chart-widget.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [DashboardComponent, ChartWidgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    TicketsModule
  ]
})
export class DashboardModule {}
