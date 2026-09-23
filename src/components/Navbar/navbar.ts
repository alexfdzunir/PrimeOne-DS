import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { OverlayBadge } from 'primeng/overlaybadge';

export interface NavbarAction {
  icon: string;
  label: string;
  id?: string;
  /** Counter shown on the icon (e.g. notifications). */
  badge?: string | number;
}

/**
 * Application bar: menu toggle, brand, section title and right-hand actions.
 * Project extra content with the `navbarEnd` attribute.
 */
@Component({
  selector: 'prime-one-navbar',
  imports: [NgTemplateOutlet, OverlayBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'banner',
    '[class.po-navbar--contrast]': 'contrast()',
    '[class.po-navbar--mobile]': 'mobile()',
  },
  template: `
    @if (showMenuButton()) {
      <button type="button" class="po-navbar__icon" aria-label="Abrir menú" (click)="menuToggle.emit()">
        <i class="ph ph-list" aria-hidden="true"></i>
      </button>
    }
    @if (logo(); as src) {
      <img class="po-navbar__logo" [src]="src" [alt]="logoAlt()" />
    }
    @if (heading() && !mobile()) {
      <span class="po-navbar__divider" aria-hidden="true"></span>
      <h1 class="po-navbar__title">{{ heading() }}</h1>
    }
    <span class="po-navbar__spacer"></span>
    @for (item of actions(); track item.id ?? item.label) {
      @if (item.badge !== undefined) {
        <p-overlay-badge [value]="item.badge" severity="danger" badgeSize="small">
          <ng-container [ngTemplateOutlet]="action" [ngTemplateOutletContext]="{ $implicit: item }" />
        </p-overlay-badge>
      } @else {
        <ng-container [ngTemplateOutlet]="action" [ngTemplateOutletContext]="{ $implicit: item }" />
      }
    }
    <ng-content select="[navbarEnd]" />

    <ng-template #action let-item>
      <button type="button" class="po-navbar__icon" [attr.aria-label]="item.label" (click)="actionClick.emit(item)">
        <i [class]="item.icon" aria-hidden="true"></i>
      </button>
    </ng-template>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 1rem;
      min-height: 3.5rem;
      padding: 0.5rem 1.5rem;
      background: var(--p-content-hover-background);
      color: var(--p-text-color);
    }
    :host(.po-navbar--contrast) { background: var(--p-primary-color); color: var(--p-primary-contrast-color); }
    :host(.po-navbar--mobile) { gap: 0.5rem; padding-inline: 1rem; }
    .po-navbar__icon {
      display: grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border: 0;
      border-radius: 50%;
      background: none;
      color: inherit;
      font-size: 1.25rem;
      cursor: pointer;
    }
    .po-navbar__icon:hover { background: color-mix(in srgb, currentColor 10%, transparent); }
    .po-navbar__icon:focus-visible { outline: 1px solid currentColor; outline-offset: 2px; }
    .po-navbar__logo { height: 2rem; }
    .po-navbar__divider { align-self: stretch; width: 1px; background: currentColor; opacity: 0.4; }
    .po-navbar__title { margin: 0; font-size: 1rem; font-weight: 500; }
    .po-navbar__spacer { flex: 1; }
  `,
})
export class PrimeOneNavbar {
  readonly heading = input<string>();
  /** Brand image URL (UNIR, Qualentum...). */
  readonly logo = input<string>();
  readonly logoAlt = input('Logotipo');
  readonly actions = input<NavbarAction[]>([]);
  readonly showMenuButton = input(true);
  readonly contrast = input(false);
  readonly mobile = input(false);

  readonly menuToggle = output<void>();
  readonly actionClick = output<NavbarAction>();
}
