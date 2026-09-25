import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, type ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { ExplorerState } from '../explorer-state';
import { cloneableArgs, type FrameMessage, type RenderMessage } from '../frame/frame-protocol';

/** Iframe that renders the selected story at the real device width (see `FrameRootComponent`). */
@Component({
  selector: 'po-story-frame',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<iframe #iframe src="./?frame=1" [title]="'Vista previa de ' + state.selected().title" [style.height.px]="height()"></iframe>`,
  styles: `
    :host { display: block; }
    iframe { display: block; width: 100%; border: 0; background: var(--p-content-background); }
  `,
})
export class StoryFrameComponent {
  /** Minimum height in px (stage height or the story's own height). */
  readonly minHeight = input(240);

  protected readonly state = inject(ExplorerState);
  private readonly iframe = viewChild.required<ElementRef<HTMLIFrameElement>>('iframe');
  private readonly ready = signal(false);
  private readonly contentHeight = signal(0);
  protected readonly height = computed(() => Math.max(this.contentHeight(), this.minHeight()));

  constructor() {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== this.iframe().nativeElement.contentWindow) return;
      const data = event.data as FrameMessage | undefined;
      if (data?.source !== 'po-frame') return;
      if (data.type === 'ready') this.ready.set(true);
      else if (data.type === 'size') this.contentHeight.set(data.height);
      else if (data.type === 'event') this.state.logEvent(data.name, data.payload);
      else if (data.type === 'tokens') this.state.tokens.set(data.tokens);
    };
    window.addEventListener('message', onMessage);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('message', onMessage));

    effect(() => {
      const message: RenderMessage = {
        source: 'po-explorer',
        type: 'render',
        id: this.state.selected().id,
        args: cloneableArgs(this.state.args()),
        theme: this.state.theme(),
        scheme: this.state.scheme(),
      };
      if (this.ready()) this.iframe().nativeElement.contentWindow?.postMessage(message, location.origin);
    });
  }
}
