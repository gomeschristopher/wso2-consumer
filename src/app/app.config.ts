import { ApplicationConfig, BrowserModule } from "@angular/platform-browser";
import { OAuthService, AuthConfig, OAuthModule } from 'angular-oauth2-oidc';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom } from "@angular/core";
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from "./auth.guard";

export const authConfig: AuthConfig = {
  issuer: 'https://localhost:9443/oauth2/token',
  redirectUri: 'http://localhost:4200',
  clientId: '8FzpfZJ5Fmme1CuGGVl51AF5D5Ya',
  responseType: 'code',
  scope: 'openid profile email internal_login',
  strictDiscoveryDocumentValidation: false
};

const routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
];

function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => {
    oauthService.configure(authConfig);
    return oauthService.loadDiscoveryDocumentAndTryLogin().then(() => { });
  };
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(BrowserModule, OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: ['https://localhost:9443'],
                sendAccessToken: true
            }
        })),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeOAuth,
            deps: [OAuthService],
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ]
}