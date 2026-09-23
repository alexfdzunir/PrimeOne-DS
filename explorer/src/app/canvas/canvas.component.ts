import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, effect, type ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { Tooltip } from 'primeng/tooltip';
import { ExplorerState } from '../explorer-state';
import { CATEGORIES, VIEWPORTS } from '../model';
import { CodePanelComponent } from '../code/code-panel.component';
import { StoryHostComponent } from '../story-host.component';

const CODE_PANEL_KEY = 'po-explorer.code';

/** Stage of the selected component: header with tools, live render at the chosen width and copyable code. */
@Component({
  selector: 'po-canvas',
  imports: [FormsModule, Button, SelectButton, Tooltip, StoryHostComponent, CodePanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="po-canvas__bar">
      <div class="po-canvas__heading">
        <span class="po-eyebrow">{{ categoryLabel() }}</span>
        <div class="po-canvas__title">
          <h1>{{ state.selected().title }}</h1>
          @if (state.selected().figmaUrl) {
            <p-button
              icon="ph ph-figma-logo"
              variant="text"
              severity="secondary"
              [rounded]="true"
              size="small"
              ariaLabel="Abrir en Figma"
              pTooltip="Abrir en Figma"
              tooltipPosition="bottom"
              (onClick)="openFigma()"
            />
          }
        </div>
      </div>
      <div class="po-canvas__tools">
        <p-selectbutton
          [options]="viewports"
          optionValue="id"
          size="small"
          [allowEmpty]="false"
          ariaLabel="Ancho del lienzo"
          [ngModel]="state.viewport()"
          (ngModelChange)="state.viewport.set($event)"
        >
          <ng-template #item let-item>
            <i [class]="item.icon" [pTooltip]="item.label" tooltipPosition="bottom" [attr.aria-label]="item.label"></i>
          </ng-template>
        </p-selectbutton>
        <p-button
          label="Código"
          icon="ph ph-code"
          variant="text"
          severity="secondary"
          size="small"
          [pTooltip]="showCode() ? 'Ocultar código' : 'Ver código'"
          tooltipPosition="bottom"
          [attr.aria-pressed]="showCode()"
          (onClick)="toggleCode()"
        />
      </div>
    </header>

    @if (description().length) {
      <p class="po-canvas__description po-muted">
        @for (part of description(); track $index) {
          @if (part.code) {
            <code>{{ part.text }}</code>
          } @else {
            {{ part.text }}
          }
        }
      </p>
    }

    <section class="po-canvas__stage po-scroll" #stage>
      <div
        class="po-canvas__frame"
        [class.po-canvas__frame--padded]="layout() === 'padded'"
        [class.po-canvas__frame--centered]="layout() === 'centered'"
        [style.width]="frameWidth()"
        [style.min-height]="minHeight()"
        #frame
      >
        <span class="po-canvas__width">{{ measuredWidth() }} px</span>
        <po-story-host [story]="state.rendered()" />
      </div>
    </section>

    @if (showCode()) {
      <po-code-panel (closed)="toggleCode()" />
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      height: 100%;
      background: var(--p-content-background);
    }

    .po-canvas__bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex: 0 0 var(--po-bar-height);
      padding: 0 24px;
      border-bottom: 1px solid var(--p-content-border-color);
    }

    .po-canvas__heading {
      display: flex;
      flex-direction: column;
      min-width: 0;
      line-height: 1.2;
    }

    .po-canvas__title {
      display: flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
    }

    .po-canvas__title h1 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .po-canvas__tools {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 0 0 auto;
    }

    .po-canvas__tools i {
      display: block;
      font-size: 1.125rem;
      line-height: 1;
    }

    .po-canvas__description {
      margin: 0;
      padding: 12px 24px;
      border-bottom: 1px solid var(--p-content-border-color);
      background: var(--po-surface-2);
    }

    .po-canvas__description code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.8125rem;
    }

    .po-canvas__description code {
      padding: 1px 5px;
      border-radius: 4px;
      background: var(--po-surface-3);
      color: var(--p-text-color);
    }

    .po-canvas__stage {
      flex: 1 1 auto;
      padding: 24px;
      background-color: var(--po-surface-2);
      background-image: radial-gradient(var(--po-stage-dot) 1px, transparent 1px);
      background-size: 20px 20px;
    }

    .po-canvas__frame {
      position: relative;
      max-width: 100%;
      margin: 0 auto;
      border: 1px solid var(--p-content-border-color);
      border-radius: var(--po-radius);
      background: var(--p-content-background);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px -12px rgba(0, 0, 0, 0.12);
      transition: width 200ms ease;
    }

    .po-canvas__frame--padded {
      padding: 24px;
    }

    .po-canvas__frame--centered {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .po-canvas__width {
      position: absolute;
      top: -20px;
      right: 0;
      font-size: 0.6875rem;
      font-variant-numeric: tabular-nums;
      color: var(--p-text-muted-color);
    }

    :host ::ng-deep :focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: 2px;
    }
  `,
})
export class CanvasComponent {
  protected readonly state = inject(ExplorerState);
  protected readonly viewports = VIEWPORTS;

  protected readonly showCode = signal(readCodePanel());
  protected readonly measuredWidth = signal(0);

  protected readonly layout = computed(() => this.state.selected().layout);
  protected readonly minHeight = computed(() => this.state.selected().height ?? '240px');
  protected readonly categoryLabel = computed(() => CATEGORIES.find((c) => c.id === this.state.selected().category)?.label ?? '');
  protected readonly frameWidth = computed(() => {
    const width = VIEWPORTS.find((v) => v.id === this.state.viewport())?.width;
    return width ? `${width}px` : 'min(100%, 1200px)';
  });
  /** Description split so the backtick fragments render as inline code. */
  protected readonly description = computed(() =>
    (this.state.selected().description ?? '')
      .split('`')
      .map((text, i) => ({ text, code: i % 2 === 1 }))
      .filter((part) => part.text.length > 0),
  );

  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');
  private readonly frame = viewChild.required<ElementRef<HTMLElement>>('frame');

  constructor() {
    const destroyRef = inject(DestroyRef);
    effect(() => {
      this.state.selectedId();
      this.stage().nativeElement.scrollTop = 0;
    });
    afterNextRender(() => {
      const observer = new ResizeObserver((entries) => this.measuredWidth.set(Math.round(entries[0].contentRect.width)));
      observer.observe(this.frame().nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected openFigma(): void {
    const url = this.state.selected().figmaUrl;
    if (url) window.open(url, '_blank', 'noopener');
  }

  protected toggleCode(): void {
    this.showCode.update((open) => !open);
    try {
      localStorage.setItem(CODE_PANEL_KEY, String(this.showCode()));
    } catch {
      // Storage may be unavailable; the panel state is only a convenience.
    }
  }
}

function readCodePanel(): boolean {
  try {
    return localStorage.getItem(CODE_PANEL_KEY) === 'true';
  } catch {
    return false;
  }
}
