import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oauth2-angular';

  constructor(private oAuthService: OAuthService,
    private http: HttpClient) {}

  login() {
    this.oAuthService.initLoginFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
  }

  get username() {
    var claims: any = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims.username;
  }

  fetchUserData() {
    this.http.get('https://localhost:9443/scim2/Me')
      .subscribe(response => {
        console.log(response)
      }, err => {
        console.log(err)
      });
  }
}
