import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> | boolean {
    if (!this.authService.loggedIn) {
      this.authService.logout();

      return false;
    }
    return true;
  }
}
