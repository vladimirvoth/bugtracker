import { Component, OnInit, Optional } from '@angular/core';
import { LayoutComponent } from '@core/containers/layout/layout.component';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-social-auth-callback',
  template: `<ng-container></ng-container>`,
  styleUrls: ['./social-auth-callback.component.scss']
})
export class SocialAuthCallbackComponent implements OnInit {
  constructor(@Optional() private layout: LayoutComponent) {
    this.layout.pageType = 'D';
  }

  ngOnInit(): void {
    const token = this.getJWTCookie();

    if (token) {
      this.migrateJWTtoken(token);
      window.location.href = `${environment.baseUrl}/dashboard`;
    }
  }

  getJWTCookie() {
    const name = 'JWT=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  migrateJWTtoken(token) {
    localStorage.setItem('token', JSON.stringify(token));
    document.cookie = 'JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  ngOnDestroy() {
    this.layout.resetPageType();
  }
}
