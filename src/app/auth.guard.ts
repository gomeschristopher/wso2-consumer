import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = (route, state) => {

  const oAuthService = inject(OAuthService);
  const router = inject(Router);

  console.log(oAuthService.hasValidAccessToken())

  if (oAuthService.hasValidAccessToken()) {
    return true;
  } else {
    // Redirect to login if not authenticated
    router.navigate(['/']);
    return false;
  }
};