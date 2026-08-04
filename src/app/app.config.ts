import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enables fine-grained, signal-based change detection without Zone.js overhead
    provideZonelessChangeDetection(),

    // Connects URL pathways and maps route params directly into component inputs
    provideRouter(routes, withComponentInputBinding()),

    // Configures global HTTP client infrastructure for API communication
    provideHttpClient(), // ✅ no withXhr
  ],
};
