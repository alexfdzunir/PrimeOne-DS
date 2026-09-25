import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ActionButtonItem, PrimeOneActionButtons } from '../ActionButton/action-buttons';

export const CHAT_IA_ACTIONS: ActionButtonItem[] = [
  { id: 'copy', icon: 'ph ph-copy', label: 'Copiar' },
  { id: 'like', icon: 'ph ph-thumbs-up', label: 'Me gusta' },
  { id: 'dislike', icon: 'ph ph-thumbs-down', label: 'No me gusta' },
  { id: 'regenerate', icon: 'ph ph-arrows-clockwise', label: 'Regenerar' },
  { id: 'share', icon: 'ph ph-share-network', label: 'Compartir' },
];

/**
 * Assistant conversation turn: the assistant answer (`left`) is plain text with an optional
 * action bar; the user prompt (`right`) is a bubble.
 */
@Component({
  selector: 'prime-one-chat-ia-message',
  imports: [PrimeOneActionButtons],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.po-chatia--right]': "orientation() === 'right'",
    '[class.po-chatia--mobile]': 'mobile()',
  },
  template: `
    <div class="po-chatia__content"><ng-content /></div>
    @if (showActions()) {
      <prime-one-action-buttons [actions]="actions()" (actionClick)="actionClick.emit($event)" />
    }
  `,
  styles: `
    :host { display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; }
    :host(.po-chatia--right) { align-items: flex-end; }
    .po-chatia__content { max-width: min(40rem, 90%); color: var(--p-text-color); font-size: 1rem; line-height: 1.375rem; overflow-wrap: anywhere; }
    :host(.po-chatia--right) .po-chatia__content {
      padding: 0.375rem 0.5rem 0.375rem 0.75rem;
      line-height: 1.625rem;
      border-radius: var(--p-content-border-radius);
      background: var(--p-highlight-focus-background);
    }
    :host(.po-chatia--mobile) .po-chatia__content { line-height: 1.375rem; }
  `,
})
export class PrimeOneChatIaMessage {
  readonly orientation = input<'left' | 'right'>('left');
  /** Figma "Actionbar". */
  readonly showActions = input(false);
  readonly actions = input<ActionButtonItem[]>(CHAT_IA_ACTIONS);
  readonly mobile = input(false);

  readonly actionClick = output<ActionButtonItem>();
}
