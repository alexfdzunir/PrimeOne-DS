import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';

/**
 * Section header: back action, title, subtitle with optional section switcher and a main action.
 */
@Component({
  selector: 'prime-one-topbar',
  imports: [Button, Menu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.po-topbar--mobile]': 'mobile()',
    '[class.po-topbar--contrast]': 'contrast()',
  },
  template: `
    @if (showBack()) {
      <button type="button" class="po-topbar__back" aria-label="Volver" (click)="back.emit()">
        <i class="ph-bold ph-arrow-left" aria-hidden="true"></i>
      </button>
    }
    <div class="po-topbar__text">
      <h2 class="po-topbar__title">{{ heading() }}</h2>
      @if (subtitle()) {
        <div class="po-topbar__subtitle">
          <span>{{ subtitle() }}</span>
          @if (sections().length) {
            <p-button
              icon="ph ph-caret-up-down"
              size="small"
              text
              rounded
              ariaLabel="Cambiar de sección"
              aria-haspopup="menu"
              (onClick)="menu.toggle($event)"
            />
            <p-menu #menu [model]="sections()" [popup]="true" appendTo="body" />
          }
        </div>
      }
    </div>
    @if (actionLabel() || actionIcon()) {
      <p-button
        class="po-topbar__action"
        [label]="actionLabel()"
        [icon]="actionIcon()"
        [ariaLabel]="actionLabel() ?? 'Acción'"
        [size]="mobile() ? 'small' : undefined"
        (onClick)="action.emit()"
      />
    }
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 1rem;
      border-radius: var(--p-content-border-radius);
      background: var(--p-content-hover-background);
      color: var(--p-text-color);
    }
    :host(.po-topbar--contrast) { background: var(--p-primary-color); color: var(--p-primary-contrast-color); }
    /* Figma _topbar-button: 30px outlined circle with ArrowLeft bold 16px. */
    .po-topbar__back {
      display: grid;
      place-items: center;
      flex: 0 0 30px;
      width: 30px;
      height: 30px;
      padding: 0;
      border: 1px solid var(--p-primary-color);
      border-radius: 50%;
      background: transparent;
      color: var(--p-primary-color);
      font-size: 16px;
      cursor: pointer;
      transition: background var(--p-transition-duration, 0.2s), color var(--p-transition-duration, 0.2s), border-color var(--p-transition-duration, 0.2s);
    }
    .po-topbar__back:hover { background: var(--p-content-hover-background); }
    .po-topbar__back:active { background: var(--p-primary-color); color: var(--p-primary-contrast-color); }
    .po-topbar__back:focus-visible { outline: 1px solid var(--p-focus-ring-color); outline-offset: 2px; }
    :host(.po-topbar--contrast) .po-topbar__back { border-color: var(--p-primary-contrast-color); color: var(--p-primary-contrast-color); }
    :host(.po-topbar--contrast) .po-topbar__back:hover { background: var(--p-primary-900); border-color: var(--p-primary-900); }
    :host(.po-topbar--contrast) .po-topbar__back:active { background: var(--p-primary-950); border-color: var(--p-primary-950); }
    :host(.po-topbar--mobile) { border-radius: 0; }
    .po-topbar__text { flex: 1; min-width: 0; }
    .po-topbar__title { margin: 0; font-size: 1.25rem; font-weight: 500; line-height: 1.75rem; }
    :host(.po-topbar--mobile) .po-topbar__title { font-size: 1rem; font-weight: 600; }
    .po-topbar__subtitle { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; }
  `,
})
export class PrimeOneTopbar {
  readonly heading = input.required<string>();
  readonly subtitle = input<string>();
  /** Sections for the subtitle switcher (Figma "Open"). */
  readonly sections = input<MenuItem[]>([]);
  readonly showBack = input(true);
  readonly actionLabel = input<string>();
  readonly actionIcon = input<string>();
  readonly mobile = input(false);
  readonly contrast = input(false);

  readonly back = output<void>();
  readonly action = output<void>();
}
