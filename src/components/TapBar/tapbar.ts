import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

export interface TapbarItem {
  value: string;
  label: string;
  /** Phosphor icon name without weight prefix, e.g. `house`. The active item uses the fill weight. */
  icon: string;
}

/**
 * Mobile bottom navigation. `active` holds the value of the selected item.
 */
@Component({
  selector: 'prime-one-tapbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'navigation', 'aria-label': 'Navegación principal' },
  template: `
    @for (item of items(); track item.value) {
      <button
        type="button"
        class="po-tapbar__item"
        [class.po-tapbar__item--active]="item.value === active()"
        [attr.aria-current]="item.value === active() ? 'page' : null"
        [attr.aria-label]="showLabels() ? null : item.label"
        (click)="active.set(item.value)"
      >
        <i [class]="(item.value === active() ? 'ph-fill ph-' : 'ph ph-') + item.icon" aria-hidden="true"></i>
        @if (showLabels()) {
          <span>{{ item.label }}</span>
        }
      </button>
    }
  `,
  styles: `
    :host {
      display: flex;
      justify-content: space-around;
      padding: 0.5rem 0.75rem;
      background: var(--p-content-background);
      box-shadow: 0 -2px 12px rgb(0 0 0 / 8%);
    }
    .po-tapbar__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      min-width: 4rem;
      padding: 0.5rem 0.25rem;
      border: 0;
      border-bottom: 2px solid transparent;
      background: none;
      color: var(--p-text-color);
      font: inherit;
      font-size: 0.75rem;
      cursor: pointer;
    }
    .po-tapbar__item i { flex: 0 0 auto; font-size: 1.5rem; }
    .po-tapbar__item--active { color: var(--p-primary-color); border-bottom-color: var(--p-primary-color); }
    .po-tapbar__item:focus-visible { outline: 1px solid var(--p-focus-ring-color); outline-offset: 2px; }
  `,
})
export class PrimeOneTapbar {
  readonly items = input<TapbarItem[]>([]);
  readonly active = model<string>();
  /** Figma "Text". */
  readonly showLabels = input(true);
}
