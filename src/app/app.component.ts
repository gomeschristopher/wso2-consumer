import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent {
  title = 'wso2-consumer';

  constructor(private oAuthService: OAuthService,
    private http: HttpClient) { }

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

  get givenName() {
    var claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
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
