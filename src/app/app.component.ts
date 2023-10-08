import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sb';
  user: User | null = null; // Initialize user as null

  constructor (
    private router: Router,
    public AuthenticationService: AuthenticationService
  ) {
    // Subscribe to currentUser$ observable and update user when the authentication state changes
    this.AuthenticationService.currentUser$.subscribe((user) => {
      this.user = user;
      console.log('this.user: ', this.user);
    });
  }

  onLoginClick(event: any) {
    this.router.navigate(['/login']);
  }

  logout() {
    this.AuthenticationService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
