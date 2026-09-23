import { ChangeDetectionStrategy, Component, type ComponentRef, effect, input, signal, untracked, ViewContainerRef, viewChild } from '@angular/core';
import type { RenderedStory } from './model';

let storySeq = 0;

/**
 * Renders a story template with the real components (JIT). The component is recreated only
 * when the template or the imports change; otherwise the new props are applied in place, so the
 * component keeps its internal state while the controls change.
 */
@Component({
  selector: 'po-story-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container #outlet />
    @if (error(); as message) {
      <div class="po-story-host__error" role="alert">
        <i class="ph ph-warning"></i>
        <pre>{{ message }}</pre>
      </div>
    }
  `,
  styles: `
    :host { display: block; }
    .po-story-host__error {
      display: flex;
      gap: 0.75rem;
      padding: 1rem;
      border: 1px solid var(--p-red-500);
      border-radius: var(--p-content-border-radius);
      color: var(--p-red-500);
    }
    .po-story-host__error pre { margin: 0; white-space: pre-wrap; font: inherit; }
  `,
})
export class StoryHostComponent {
  readonly story = input.required<RenderedStory>();
  protected readonly error = signal<string | null>(null);

  private readonly outlet = viewChild.required('outlet', { read: ViewContainerRef });
  private ref?: ComponentRef<Record<string, unknown>>;
  private lastTemplate?: string;
  private lastImports?: unknown[];

  constructor() {
    effect(() => {
      const story = this.story();
      untracked(() => this.render(story));
    });
  }

  private render(story: RenderedStory): void {
    if (this.ref && story.template === this.lastTemplate && story.imports === this.lastImports) {
      Object.assign(this.ref.instance, story.props);
      this.ref.changeDetectorRef.detectChanges();
      return;
    }
    this.ref?.destroy();
    this.ref = undefined;
    this.error.set(null);
    try {
      // Called as a function (not as `@Component`) so the AOT compiler ignores it and the JIT compiler builds it.
      const type = Component({
        selector: 'po-story',
        // Unique host attribute: every story component shares the selector, so Angular would warn about ID collisions (NG0912).
        host: { 'data-po-story': String(++storySeq) },
        template: story.template,
        imports: story.imports as never,
        providers: story.providers as never,
      })(class StoryComponent {});
      this.ref = this.outlet().createComponent(type) as ComponentRef<Record<string, unknown>>;
      Object.assign(this.ref.instance, story.props);
      this.ref.changeDetectorRef.detectChanges();
      this.lastTemplate = story.template;
      this.lastImports = story.imports;
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : String(error));
    }
  }
}
