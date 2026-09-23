// The stories are rendered from template strings at runtime, so the JIT compiler must be present.
import '@angular/compiler';
import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { PrimeOneEstudiantes } from '../../src/theme/presets';
import { AppComponent } from './app/app.component';
import { isFrameMode } from './app/frame/frame-protocol';
import { FrameRootComponent } from './app/frame/frame-root.component';

// `?frame=1`: the preview iframe of the stage, which only renders the selected story
const frame = isFrameMode();
if (frame) document.documentElement.classList.add('po-frame-doc');

bootstrapApplication(frame ? FrameRootComponent : AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    providePrimeNG({ theme: { preset: PrimeOneEstudiantes, options: { darkModeSelector: '.po-dark' } } }),
    MessageService,
    ConfirmationService,
  ],
}).catch((error: unknown) => console.error(error));
