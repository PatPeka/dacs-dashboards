import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { bearerInterceptor } from './app/core/api/bearer.interceptor';

bootstrapApplication(AppComponent, { providers: [provideHttpClient(withInterceptors([bearerInterceptor]))] })
  .catch(error => console.error('Application bootstrap failed', error));
