import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
    <div class="navbar navbar-default">
    <button type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" class="navbar-toggle">
      <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span>
      <span class="icon-bar"></span><span class="icon-bar"></span>
    </button>
      <div class="navbar-header">
        <a class="navbar-brand" routerLink="/">{{ title }}</a>
      </div>
      <div id="bs-example-navbar-collapse-1" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
        <li>
          <a routerLink="/home" routerLinkActive="active">Home</a>
        </li>
        <li>
          <a routerLink="/picam-view" *ngIf="authService.authenticated" routerLinkActive="active">Camera View</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a *ngIf="!authService.authenticated" (click)="authService.login()">Log In</a>
        </li>
        <li>
          <a (click)="authService.logout()" *ngIf="authService.authenticated">Log Out</a>
        </li>
      </ul>
      </div>
      </div>
      <div class="col-sm-12">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `.navbar-right { margin-right: 0px !important}`
  ]
})
export class AppComponent {
  title = 'Picamera View';

  constructor(public authService: AuthService) {}
}
