import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { VideoService } from './services/VideoService.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-d6vsbzol3qj52svl.us.auth0.com',
      clientId: 'T4eOnSqeNICOOOswmLdD9fPBjHfnb6Bp',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: '674619453e33a55db465a9e7',
        scope: 'openid profile email offline_access',
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    }),
    VideoService
  ]
};



