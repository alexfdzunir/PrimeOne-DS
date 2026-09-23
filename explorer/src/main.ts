// The stories are rendered from template strings at runtime, so the JIT compiler must be present.
import '@angular/compiler';
import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { PrimeOneEstudiantes } from '../../src/theme/presets';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    providePrimeNG({ theme: { preset: PrimeOneEstudiantes, options: { darkModeSelector: '.po-dark' } } }),
    MessageService,
    ConfirmationService,
  ],
}).catch((error: unknown) => console.error(error));
