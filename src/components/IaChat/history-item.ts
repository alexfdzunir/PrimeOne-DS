import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * Entry of the assistant conversation history.
 */
@Component({
  selector: 'prime-one-history-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="po-history" [class.po-history--active]="active()" [attr.aria-current]="active() ? 'true' : null" (click)="select.emit()">
      <span class="po-history__label">{{ label() }}</span>
      @if (time()) {
        <span class="po-history__time">{{ time() }}</span>
      }
    </button>
  `,
  styles: `
    :host { display: block; }
    .po-history {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      padding: 0.75rem;
      border: 0;
      border-bottom: 1px solid var(--p-content-border-color);
      border-radius: 0;
      background: none;
      color: var(--p-text-color);
      font: inherit;
      text-align: start;
      cursor: pointer;
    }
    .po-history:hover { border-bottom-color: transparent; border-radius: var(--p-border-radius-md); background: var(--p-content-hover-background); }
    .po-history--active { border-bottom-color: transparent; border-radius: var(--p-border-radius-md); background: var(--p-highlight-background); }
    .po-history:focus-visible { outline: 1px solid var(--p-focus-ring-color); outline-offset: -1px; }
    .po-history__label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .po-history__time { flex: none; color: var(--p-text-muted-color); font-size: 0.875rem; }
  `,
})
export class PrimeOneHistoryItem {
  readonly label = input.required<string>();
  readonly time = input<string>();
  readonly active = input(false);

  readonly select = output<void>();
}
