import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAuth0({
      domain: 'dev-d6vsbzol3qj52svl.us.auth0.com',
      clientId: 'T4eOnSqeNICOOOswmLdD9fPBjHfnb6Bp',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ]
}).catch(err => console.error(err));


