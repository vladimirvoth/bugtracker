import { Component } from '@angular/core';
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent {
  faFacebook = faFacebook;
  faGithub = faGithub;

  constructor() {}

  githubAuth() {
    window.location.href = `${environment.apiUrl}/auth/github`;
  }

  facebookAuth() {
    window.location.href = `${environment.apiUrl}/auth/facebook`;
  }
}
