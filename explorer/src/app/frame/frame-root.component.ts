import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { usePreset } from '@primeuix/themes';
import { PrimeOneEstudiantes, PrimeOneFoundations, PrimeOneProdi } from '../../../../src/theme/presets';
import { describe } from '../explorer-state';
import { collectTokens } from './collect-tokens';
import type { ComponentEntry, RenderedStory } from '../model';
import { buildRegistry } from '../registry';
import { StoryHostComponent } from '../story-host.component';
import type { FrameMessage, RenderMessage } from './frame-protocol';

const PRESETS = { estudiantes: PrimeOneEstudiantes, prodi: PrimeOneProdi, foundations: PrimeOneFoundations };

type Outgoing = FrameMessage extends infer M ? (M extends unknown ? Omit<M, 'source'> : never) : never;

function post(message: Outgoing): void {
  window.parent.postMessage({ source: 'po-frame', ...message }, location.origin);
}

/**
 * Root of the preview iframe: renders only the story that the explorer asks for, with the real
 * viewport width, and reports its height and the story events back to the explorer.
 */
@Component({
  selector: 'po-root',
  imports: [StoryHostComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'po-frame',
    '[class.po-frame--padded]': "layout() === 'padded'",
    '[class.po-frame--centered]': "layout() === 'centered'",
  },
  template: `
    @if (story(); as story) {
      <po-story-host [story]="story" />
    }
  `,
  styles: `
    :host { display: block; min-width: 0; }
    :host(.po-frame--padded), :host(.po-frame--centered) { padding: 24px; }
    :host(.po-frame--centered) { display: flex; align-items: center; justify-content: center; }
    @media (max-width: 599px) {
      :host(.po-frame--padded), :host(.po-frame--centered) { padding: 16px; }
    }
  `,
})
export class FrameRootComponent {
  private readonly entries = buildRegistry();
  private readonly request = signal<RenderMessage | null>(null);
  private readonly entry = computed<ComponentEntry | undefined>(() => {
    const request = this.request();
    return request ? this.entries.find((entry) => entry.id === request.id) : undefined;
  });
  private readonly handlers = computed(() =>
    Object.fromEntries(
      (this.entry()?.events ?? []).map((event) => [event.name, (payload: unknown) => post({ type: 'event', name: event.name, payload: describe(payload) })]),
    ),
  );

  protected readonly layout = computed(() => this.entry()?.layout ?? 'padded');
  protected readonly story = computed<RenderedStory | null>(() => {
    const request = this.request();
    const entry = this.entry();
    return request && entry ? entry.render(request.args, this.handlers()) : null;
  });

  private tokensTimer?: ReturnType<typeof setTimeout>;
  private lastTokens = '';

  constructor() {
    const destroyRef = inject(DestroyRef);
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== window.parent) return;
      const data = event.data as RenderMessage | undefined;
      if (data?.source === 'po-explorer' && data.type === 'render') this.request.set(data);
    };
    window.addEventListener('message', onMessage);
    destroyRef.onDestroy(() => window.removeEventListener('message', onMessage));

    effect(() => {
      const request = this.request();
      if (!request) return;
      usePreset(PRESETS[request.theme]);
      document.documentElement.classList.toggle('po-dark', request.scheme === 'dark');
      this.scheduleTokens();
    });

    afterNextRender(() => {
      let last = -1;
      let scheduled = false;
      // Height of the document, overlays appended to <body> included, so the explorer sizes the iframe
      const report = () => {
        scheduled = false;
        const height = Math.ceil(document.documentElement.scrollHeight);
        if (height !== last) {
          last = height;
          post({ type: 'size', height });
        }
      };
      const schedule = () => {
        if (!scheduled) {
          scheduled = true;
          requestAnimationFrame(report);
        }
      };
      const resize = new ResizeObserver(schedule);
      resize.observe(document.body);
      const mutations = new MutationObserver(() => {
        schedule();
        this.scheduleTokens();
      });
      mutations.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
      destroyRef.onDestroy(() => {
        resize.disconnect();
        mutations.disconnect();
        clearTimeout(this.tokensTimer);
      });
      post({ type: 'ready' });
    });
  }

  /** Tokens in use, once the render (overlays and theme included) has settled; only sent when they change. */
  private scheduleTokens(): void {
    clearTimeout(this.tokensTimer);
    this.tokensTimer = setTimeout(() => {
      const tokens = collectTokens();
      const key = JSON.stringify(tokens);
      if (key === this.lastTokens) return;
      this.lastTokens = key;
      post({ type: 'tokens', tokens });
    }, 400);
  }
}
