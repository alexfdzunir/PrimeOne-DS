import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

export interface ActionButtonItem {
  /** Phosphor class, e.g. `ph ph-copy`. */
  icon: string;
  /** Accessible name and tooltip. */
  label: string;
  id?: string;
}

/**
 * Row of icon actions with tooltips (e.g. under an assistant answer: copy, like, regenerate).
 */
@Component({
  selector: 'prime-one-action-buttons',
  imports: [Button, Tooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (action of actions(); track action.id ?? action.label) {
      <p-button
        [icon]="action.icon"
        [ariaLabel]="action.label"
        [pTooltip]="action.label"
        [tooltipPosition]="tooltipPosition()"
        severity="secondary"
        size="small"
        text
        rounded
        (onClick)="actionClick.emit(action)"
      />
    }
  `,
  styles: `
    :host { display: inline-flex; align-items: center; gap: 0.25rem; }
  `,
})
export class PrimeOneActionButtons {
  readonly actions = input<ActionButtonItem[]>([]);
  readonly tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('bottom');

  readonly actionClick = output<ActionButtonItem>();
}
