import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { errorsInterceptor } from './shared/inerceptors/errors/errors.interceptor';
import { provideRouter, RouterModule, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { loaderInterceptor } from './shared/inerceptors/loader/loader.interceptor';
import { headerInterceptor } from './shared/inerceptors/header/header.interceptor';



export const appConfig: ApplicationConfig = {
providers: [
  provideHttpClient(withFetch(),withInterceptors([errorsInterceptor , loaderInterceptor , headerInterceptor])),
  provideRouter(routes,withViewTransitions() ,
  withInMemoryScrolling({scrollPositionRestoration: 'enabled'})),
    
     provideClientHydration(),
     importProvidersFrom(RouterModule , BrowserAnimationsModule ,NgxSpinnerService),provideToastr()]
};
