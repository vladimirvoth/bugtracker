import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = JSON.parse(localStorage.getItem('token'));

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
    }

    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', token)
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
