import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { ConfigService } from './core/config/config.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiInterceptor])
    ),
    provideAnimations(),
    
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => () => config.loadConfig(),
      deps: [ConfigService],
      multi: true
    }
  ]
};