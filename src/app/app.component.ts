import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthenticationService} from './shared/authentication.service';

@Component({
  selector: 'bs-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getLabel(): string {
    return this.isLoggedIn() ? "Logout" : "Login";
  }
}
