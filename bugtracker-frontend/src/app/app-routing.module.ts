import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataPrivacyComponent } from '@core/containers/data-privacy/data-privacy.component';
import { HomeComponent } from '@core/containers/home/home.component';
import { ImprintComponent } from '@core/containers/imprint/imprint.component';
import { LayoutComponent } from '@core/containers/layout/layout.component';
import { LegalComponent } from '@core/containers/legal/legal.component';
import { AuthGuard } from '@features/auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./features/tickets/tickets.module').then(
            (m) => m.TicketsModule
          ),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'legal',
    component: LegalComponent
  },
  {
    path: 'data-privacy',
    component: DataPrivacyComponent
  },
  {
    path: 'imprint',
    component: ImprintComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
