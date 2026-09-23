import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Avatar } from 'primeng/avatar';

/**
 * Conversation bubble between people. `left` = received, `right` = sent.
 * Consecutive messages from the same author use `grouped` to hide avatar and name.
 */
@Component({
  selector: 'prime-one-chat-message',
  imports: [Avatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.po-chat--right]': "orientation() === 'right'",
    '[class.po-chat--mobile]': 'mobile()',
  },
  template: `
    @if (orientation() === 'left' && showAvatar()) {
      <p-avatar
        class="po-chat__avatar"
        [class.po-chat__avatar--hidden]="grouped()"
        [image]="avatar()"
        [label]="avatar() ? undefined : author()?.charAt(0)"
        shape="circle"
      />
    }
    <div class="po-chat__body">
      @if (!grouped() && (showName() || showTime())) {
        <div class="po-chat__meta">
          @if (showName() && author() && orientation() === 'left') {
            <span>{{ author() }}</span>
          }
          @if (showTime() && time()) {
            <time>{{ time() }}</time>
          }
        </div>
      }
      <div class="po-chat__bubble"><ng-content /></div>
    </div>
  `,
  styles: `
    :host { display: flex; align-items: flex-end; gap: 0.5rem; max-width: 100%; }
    :host(.po-chat--right) { justify-content: flex-end; }
    .po-chat__avatar--hidden { visibility: hidden; }
    .po-chat__body { display: flex; flex-direction: column; gap: 0.25rem; max-width: min(36rem, 80%); }
    :host(.po-chat--right) .po-chat__body { align-items: flex-end; }
    .po-chat__meta { display: flex; gap: 0.5rem; color: var(--p-text-muted-color); font-size: 0.75rem; }
    .po-chat__bubble {
      padding: 0.5rem 0.75rem;
      border-radius: var(--p-content-border-radius);
      background: var(--p-content-hover-background);
      color: var(--p-text-color);
      font-size: 1rem;
      line-height: 1.5rem;
      overflow-wrap: anywhere;
    }
    :host(.po-chat--right) .po-chat__bubble { background: var(--p-highlight-background); }
    :host(.po-chat--mobile) .po-chat__bubble { font-size: 0.875rem; line-height: 1.25rem; }
  `,
})
export class PrimeOneChatMessage {
  readonly orientation = input<'left' | 'right'>('left');
  readonly author = input<string>();
  readonly avatar = input<string>();
  readonly time = input<string>();
  readonly showAvatar = input(true);
  readonly showName = input(true);
  readonly showTime = input(true);
  /** Follows a message of the same author (Figma "Group"). */
  readonly grouped = input(false);
  readonly mobile = input(false);
}
