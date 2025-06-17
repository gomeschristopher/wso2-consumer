import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export const authConfig: AuthConfig = {
  issuer: 'https://localhost:9443/oauth2/token',
  redirectUri: 'http://localhost:4200',
  clientId: '8FzpfZJ5Fmme1CuGGVl51AF5D5Ya',
  responseType: 'code',
  scope: 'openid profile email internal_login',
  strictDiscoveryDocumentValidation: false
};

function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => {
    oauthService.configure(authConfig);
    return oauthService.loadDiscoveryDocumentAndTryLogin().then(() => { });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://localhost:9443'],
        sendAccessToken: true
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeOAuth,
      deps: [OAuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
