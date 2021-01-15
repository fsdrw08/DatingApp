import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model: any = {};
  jwtHelper = new JwtHelperService();

  constructor(public authService: AuthService, private alertifyService: AlertifyService,
    private router: Router) { }

  login() {
    this.authService.loggin(this.model).subscribe(
      next => {
        this.alertifyService.success('logged in success');
      },
      error => {
        this.alertifyService.error(error);
      },
      () => {
        this.router.navigate(['/members']);
      }

    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertifyService.message('logged out');
    this.router.navigate(['/home'])
  }
}
