import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthEffects } from '@features/auth/store/auth.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './containers/home/home.component';
import { LayoutComponent } from './containers/layout/layout.component';
import * as CoreState from './store/index';
import { ToastsEffects } from './store/toasts/toasts.effects';
import { UserEffects } from './store/user/user.effects';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, LayoutComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    StoreModule.forFeature(CoreState.coreFeatureKey, CoreState.reducers),
    EffectsModule.forFeature([ToastsEffects, UserEffects, AuthEffects]),
    RouterModule
  ],
  exports: [LayoutComponent]
})
export class CoreModule {}
