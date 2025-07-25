import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
private http = inject(HttpClient);

  constructor(private oAuthService : OAuthService) {
    const token = this.oAuthService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('https://localhost:9443/scim2/Me', { headers })
      .subscribe(response => {
        console.log('User Info:', response);
      });
  }
}
