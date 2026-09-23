import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { Tooltip } from 'primeng/tooltip';
import { ExplorerState } from '../explorer-state';
import { THEMES } from '../model';
import { UnirLogoComponent } from './unir-logo.component';

/** Global bar: column toggles, brand, theme and colour scheme. */
@Component({
  selector: 'po-navbar',
  imports: [FormsModule, Button, SelectButton, Tooltip, UnirLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="po-navbar__start">
      <p-button
        icon="ph ph-sidebar-simple"
        variant="text"
        severity="secondary"
        [rounded]="true"
        [ariaLabel]="state.catalogOpen() ? 'Ocultar catálogo' : 'Mostrar catálogo'"
        [pTooltip]="state.catalogOpen() ? 'Ocultar catálogo' : 'Mostrar catálogo'"
        tooltipPosition="bottom"
        [attr.aria-pressed]="state.catalogOpen()"
        (onClick)="state.catalogOpen.set(!state.catalogOpen())"
      />
      <a class="po-navbar__brand" href="./" aria-label="PrimeOne Design System, inicio">
        <po-unir-logo />
        <span class="po-navbar__divider" aria-hidden="true"></span>
        <span class="po-navbar__title"><strong>PrimeOne</strong> Design System</span>
      </a>
    </div>

    <div class="po-navbar__end">
      <p-selectbutton
        [options]="themes"
        optionLabel="label"
        optionValue="id"
        size="small"
        [allowEmpty]="false"
        ariaLabel="Tema"
        [ngModel]="state.theme()"
        (ngModelChange)="state.theme.set($event)"
      />
      <p-button
        [icon]="state.scheme() === 'dark' ? 'ph ph-sun' : 'ph ph-moon'"
        variant="text"
        severity="secondary"
        [rounded]="true"
        [ariaLabel]="state.scheme() === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'"
        [pTooltip]="state.scheme() === 'dark' ? 'Modo claro' : 'Modo oscuro'"
        tooltipPosition="bottom"
        (onClick)="state.scheme.set(state.scheme() === 'dark' ? 'light' : 'dark')"
      />
      <a
        class="po-navbar__link"
        href="https://github.com/alexfdzunir/PrimeOne-DS"
        target="_blank"
        rel="noopener"
        aria-label="Repositorio en GitHub"
        pTooltip="Repositorio"
        tooltipPosition="bottom"
      >
        <i class="ph ph-github-logo"></i>
      </a>
      <span class="po-navbar__divider" aria-hidden="true"></span>
      <p-button
        icon="ph ph-sliders-horizontal"
        variant="text"
        severity="secondary"
        [rounded]="true"
        [ariaLabel]="state.panelOpen() ? 'Ocultar panel de control' : 'Mostrar panel de control'"
        [pTooltip]="state.panelOpen() ? 'Ocultar panel de control' : 'Mostrar panel de control'"
        tooltipPosition="bottom"
        [attr.aria-pressed]="state.panelOpen()"
        (onClick)="state.panelOpen.set(!state.panelOpen())"
      />
    </div>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      height: var(--po-navbar-height);
      padding: 0 12px;
      border-bottom: 1px solid var(--p-content-border-color);
      background: var(--p-content-background);
    }

    .po-navbar__start,
    .po-navbar__end {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    .po-navbar__brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      padding: 4px 8px;
      border-radius: var(--po-radius-sm);
      color: var(--p-text-color);
      text-decoration: none;
    }

    .po-navbar__title {
      font-size: 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .po-navbar__title strong {
      font-weight: 700;
    }

    .po-navbar__divider {
      width: 1px;
      height: 24px;
      background: var(--p-content-border-color);
    }

    /* Same icon size (20px) and hit area (40px, the p-button icon-only width) for every navbar action. */
    :host ::ng-deep .p-button-icon {
      font-size: 1.25rem;
    }

    .po-navbar__link {
      display: grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      color: var(--p-text-muted-color);
      font-size: 1.25rem;
      text-decoration: none;
      transition: background 150ms ease, color 150ms ease;
    }

    .po-navbar__link:hover {
      background: var(--p-content-hover-background);
      color: var(--p-text-color);
    }

    a:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: 2px;
    }

    @media (max-width: 900px) {
      .po-navbar__title,
      .po-navbar__brand .po-navbar__divider {
        display: none;
      }
    }
  `,
})
export class NavbarComponent {
  protected readonly state = inject(ExplorerState);
  protected readonly themes = THEMES;
}
