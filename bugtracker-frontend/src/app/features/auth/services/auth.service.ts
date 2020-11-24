import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { User, UserAuth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  get loggedIn() {
    return localStorage.getItem('token') !== null;
  }

  emailExists(email: string) {
    return this.http.post(`${environment.baseUrl}/auth/email`, {
      email
    });
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/auth/register`, {
      username,
      email,
      password
    });
  }

  login(email: string, password: string): Observable<UserAuth> {
    return this.http.post<UserAuth>(`${environment.baseUrl}/auth/login`, {
      email,
      password
    });
  }

  authSuccess(token) {
    localStorage.setItem('token', JSON.stringify(token));
    this.router.navigate(['/dashboard']);
  }

  resetPassword(email: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(
      `${environment.baseUrl}/auth/reset-password`,
      {
        email
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
