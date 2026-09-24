import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Tooltip } from 'primeng/tooltip';
import { ExplorerState } from '../explorer-state';
import { THEMES } from '../model';
import { UnirLogoComponent } from './unir-logo.component';

/** Global bar: column toggles, brand, theme and colour scheme. */
@Component({
  selector: 'po-navbar',
  imports: [FormsModule, Button, Select, SelectButton, Tooltip, UnirLogoComponent],
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
      <a class="po-navbar__brand" href="./" aria-label="PrimeOne Design System, inicio" (click)="goHome($event)">
        <po-unir-logo />
        <span class="po-navbar__divider" aria-hidden="true"></span>
        <span class="po-navbar__title"><strong>PrimeOne</strong> Design System</span>
      </a>
    </div>

    <div class="po-navbar__end">
      <p-selectbutton
        class="po-navbar__themes"
        [options]="themes"
        optionLabel="label"
        optionValue="id"
        size="small"
        [allowEmpty]="false"
        ariaLabel="Tema"
        [ngModel]="state.theme()"
        (ngModelChange)="state.theme.set($event)"
      />
      <p-select
        class="po-navbar__themes-compact"
        [options]="themes"
        optionLabel="label"
        optionValue="id"
        size="small"
        ariaLabel="Tema"
        appendTo="body"
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
      @if (state.view().kind === 'component') {
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
      }
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

    /* The title truncates first, so the actions never leave the window */
    .po-navbar__end {
      flex: none;
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
      min-width: 0;
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

    /* The explorer chrome keeps 40px actions whatever size the DS gives its buttons */
    :host ::ng-deep .p-button-icon-only {
      width: 2.5rem;
      height: 2.5rem;
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

    .po-navbar__themes-compact {
      display: none;
    }

    @media (max-width: 900px) {
      .po-navbar__title,
      .po-navbar__brand .po-navbar__divider {
        display: none;
      }
    }

    /* Mobile (same breakpoint as MOBILE_QUERY in explorer-state.ts): the theme becomes a dropdown,
       the only item that gives way on the narrowest phones */
    @media (max-width: 767.98px) {
      :host {
        gap: 8px;
        padding: 0 8px;
      }

      .po-navbar__start,
      .po-navbar__end {
        gap: 4px;
      }

      .po-navbar__start {
        flex: none;
      }

      .po-navbar__end {
        flex: 0 1 auto;
      }

      .po-navbar__brand {
        padding: 4px;
      }

      .po-navbar__themes {
        display: none;
      }

      .po-navbar__themes-compact {
        display: inline-flex;
        flex: 0 1 9rem;
        min-width: 0;
      }

      :host ::ng-deep .po-navbar__themes-compact .p-select-dropdown {
        width: 2rem;
      }
    }

    /* Small phones: the UNIR wordmark without the tagline (76 of the 166 logo units, 47.5px at 20px high) */
    @media (max-width: 519.98px) {
      .po-navbar__link,
      .po-navbar__end > .po-navbar__divider {
        display: none;
      }

      .po-navbar__brand {
        padding: 4px 2px;
      }

      .po-navbar__brand po-unir-logo {
        width: 48px;
        height: 20px;
        overflow: hidden;
      }
    }
  `,
})
export class NavbarComponent {
  protected readonly state = inject(ExplorerState);
  protected readonly themes = THEMES;

  /** In-app navigation; a modified click still opens the home in a new tab. */
  protected goHome(event: MouseEvent): void {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    this.state.goHome();
  }
}
