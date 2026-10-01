import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, effect, ElementRef, inject, output, signal, untracked } from '@angular/core';
import { Button } from 'primeng/button';
import { ExplorerState } from '../explorer-state';
import type { BoxMeasure } from '../model';
import { htmlSnippet, tsSnippet } from '../snippet';
import { formatCss } from './format-css';
import { tokenizeTs } from './format-ts';
import { CodeViewComponent } from './code-view.component';
import { MeasureViewComponent } from './measure-view.component';
import { TokensViewComponent } from './tokens-view.component';
import { linesToText } from './tokens';

type TabId = 'html' | 'ts' | 'css' | 'js' | 'tokens' | 'measure';

const TAB_DEFS: Record<TabId, { label: string; icon: string; panel: string }> = {
  html: { label: 'HTML', icon: 'ph ph-file-html', panel: 'Plantilla HTML' },
  ts: { label: 'TypeScript', icon: 'ph ph-file-ts', panel: 'Componente TypeScript' },
  css: { label: 'CSS', icon: 'ph ph-file-css', panel: 'Estilos CSS' },
  js: { label: 'JS', icon: 'ph ph-file-js', panel: 'JavaScript' },
  tokens: { label: 'Tokens', icon: 'ph ph-swatches', panel: 'Tokens' },
  measure: { label: 'Medidas', icon: 'ph ph-ruler', panel: 'Medidas' },
};

const TAB_KEY = 'po-explorer.code-tab';
const HEIGHT_KEY = 'po-explorer.code-height';
const MIN_HEIGHT = 260;
const MAX_RATIO = 0.55;
const DEFAULT_HEIGHT = 320;
const KEY_STEP = 24;

/** Bottom panel of the stage with the component code (HTML template and TypeScript) and its design tokens, resizable. */
@Component({
  selector: 'po-code-panel',
  imports: [Button, CodeViewComponent, MeasureViewComponent, TokensViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.height.px]': 'height()' },
  template: `
    <div
      class="po-code__resize"
      role="separator"
      aria-orientation="horizontal"
      aria-label="Cambiar la altura del panel de código"
      [attr.aria-valuenow]="height()"
      [attr.aria-valuemin]="minHeight"
      [attr.aria-valuemax]="maxHeight()"
      tabindex="0"
      (pointerdown)="startResize($event)"
      (keydown)="resizeWithKeys($event)"
    ></div>
    <header class="po-code__bar">
      <div class="po-code__tabs" role="tablist" aria-label="Lenguaje del código">
        @for (tab of tabs(); track tab.id) {
          <button
            type="button"
            role="tab"
            class="po-code__tab"
            [class.po-code__tab--active]="tab.id === current()"
            [attr.aria-selected]="tab.id === current()"
            [attr.aria-controls]="'po-code-' + tab.id"
            (click)="select(tab.id)"
          >
            <i [class]="tab.icon" aria-hidden="true"></i>
            {{ tab.label }}
            @if (tab.id === 'tokens' && state.tokens().length) {
              <span class="po-code__count">{{ state.tokens().length }}</span>
            }
          </button>
        }
      </div>
      <div class="po-code__actions">
        <p-button
          [label]="copied() ? 'Copiado' : 'Copiar'"
          [icon]="copied() ? 'ph ph-check' : 'ph ph-copy'"
          variant="text"
          severity="secondary"
          size="small"
          (onClick)="copy()"
        />
        <p-button
          icon="ph ph-x"
          variant="text"
          severity="secondary"
          size="small"
          [rounded]="true"
          ariaLabel="Cerrar el código"
          (onClick)="closed.emit()"
        />
      </div>
    </header>
    @if (current() === 'tokens') {
      <po-tokens-view role="tabpanel" id="po-code-tokens" [tokens]="state.tokens()" />
    } @else if (current() === 'measure') {
      <po-measure-view role="tabpanel" id="po-code-measure" />
    } @else {
      <po-code-view
        role="tabpanel"
        [id]="'po-code-' + current()"
        [lines]="lines()"
        [label]="panelLabel()"
      />
    }
  `,
  styles: `
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 0 0 auto;
      min-height: min(260px, 55%);
      max-height: 55%;
      border-top: 1px solid var(--p-content-border-color);
      background: var(--p-content-background);
    }

    .po-code__resize {
      position: absolute;
      top: -4px;
      left: 0;
      right: 0;
      height: 8px;
      cursor: row-resize;
      z-index: 1;
    }

    .po-code__resize::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 50%;
      width: 40px;
      height: 4px;
      margin-left: -20px;
      border-radius: 2px;
      background: var(--p-content-border-color);
      transition: background 150ms ease;
    }

    .po-code__resize:hover::after,
    .po-code__resize:focus-visible::after {
      background: var(--p-primary-color);
    }

    .po-code__resize:focus-visible {
      outline: none;
    }

    .po-code__bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex: 0 0 auto;
      padding: 6px 8px 0 16px;
      border-bottom: 1px solid var(--p-content-border-color);
    }

    .po-code__tabs {
      display: flex;
      gap: 4px;
    }

    .po-code__tab {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: -1px;
      padding: 8px 12px;
      border: 0;
      border-bottom: 2px solid transparent;
      background: none;
      color: var(--p-text-muted-color);
      font: inherit;
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      transition: color 150ms ease, border-color 150ms ease;
    }

    .po-code__tab:hover {
      color: var(--p-text-color);
    }

    .po-code__count {
      padding: 0 6px;
      border-radius: 999px;
      background: var(--po-surface-3);
      color: var(--p-text-muted-color);
      font-size: 0.6875rem;
      font-variant-numeric: tabular-nums;
    }

    .po-code__tab--active {
      border-bottom-color: var(--p-primary-color);
      color: var(--p-primary-color);
    }

    .po-code__tab:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: -2px;
      border-radius: 4px;
    }

    .po-code__actions {
      display: flex;
      align-items: center;
      gap: 4px;
      padding-bottom: 6px;
    }

    po-code-view {
      flex: 1 1 auto;
    }
  `,
})
export class CodePanelComponent {
  readonly closed = output<void>();

  protected readonly state = inject(ExplorerState);
  /** PrimeOne: HTML and TypeScript. AEM Portales: HTML, CSS and, when the component has behaviour, JS. */
  protected readonly tabs = computed(() => {
    const entry = this.state.selected();
    // Pages are compositions of modules: only their HTML
    const ids: TabId[] = entry.category === 'aem-pages' ? ['html'] : entry.ds === 'aem' ? ['html', 'css', ...(entry.sources?.js ? (['js'] as const) : []), 'tokens', 'measure'] : ['html', 'ts', 'tokens', 'measure'];
    return ids.map((id) => ({ id, ...TAB_DEFS[id] }));
  });
  protected readonly minHeight = MIN_HEIGHT;
  protected readonly active = signal<TabId>((Object.keys(TAB_DEFS) as TabId[]).find((tab) => tab === read(TAB_KEY)) ?? 'html');
  /** The chosen tab when the component has it (TypeScript is PrimeOne only, CSS and JS AEM only), HTML otherwise. */
  protected readonly current = computed<TabId>(() => (this.tabs().some((tab) => tab.id === this.active()) ? this.active() : 'html'));
  protected readonly panelLabel = computed(() => TAB_DEFS[this.current()].panel);
  protected readonly height = signal(Number(read(HEIGHT_KEY)) || DEFAULT_HEIGHT);
  protected readonly maxHeight = signal(MIN_HEIGHT);
  protected readonly copied = signal(false);

  protected readonly lines = computed(() => {
    const entry = this.state.selected();
    switch (this.current()) {
      case 'ts':
        return tsSnippet(entry);
      case 'css':
        return formatCss(entry.sources?.css ?? '');
      case 'js':
        return (entry.sources?.js ?? '').split('\n').map(tokenizeTs);
      default:
        return htmlSnippet(entry, this.state.rendered(), this.state.args());
    }
  });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private copyTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    // The measure overlay lives on the stage only while the Medidas tab is open
    effect(() => {
      const enabled = this.current() === 'measure';
      untracked(() => this.state.inspect.update((inspect) => ({ ...inspect, enabled })));
    });
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.copyTimer);
      this.state.inspect.update((inspect) => ({ ...inspect, enabled: false }));
    });
    afterNextRender(() => this.resize(this.height()));
  }

  protected select(tab: TabId): void {
    this.active.set(tab);
    write(TAB_KEY, tab);
  }

  protected async copy(): Promise<void> {
    try {
      const text =
        this.current() === 'tokens'
          ? this.state.tokens().map((t) => `${t.name}: ${t.value}`).join('\n')
          : this.current() === 'measure'
            ? measureText(this.state.measure()?.box ?? null)
            : linesToText(this.lines());
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    this.copied.set(true);
    clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => this.copied.set(false), 1500);
  }

  protected startResize(event: PointerEvent): void {
    event.preventDefault();
    const handle = event.target as HTMLElement;
    const startY = event.clientY;
    const startHeight = this.height();
    handle.setPointerCapture(event.pointerId);
    const move = (e: PointerEvent) => this.resize(startHeight + (startY - e.clientY));
    const stop = () => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', stop);
      handle.removeEventListener('pointercancel', stop);
      write(HEIGHT_KEY, String(this.height()));
    };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', stop);
    handle.addEventListener('pointercancel', stop);
  }

  protected resizeWithKeys(event: KeyboardEvent): void {
    const delta = event.key === 'ArrowUp' ? KEY_STEP : event.key === 'ArrowDown' ? -KEY_STEP : 0;
    if (!delta) return;
    event.preventDefault();
    this.resize(this.height() + delta);
    write(HEIGHT_KEY, String(this.height()));
  }

  /** Keeps the height between 260px and 55% of the stage column. */
  private resize(height: number): void {
    const available = this.host.nativeElement.parentElement?.clientHeight ?? window.innerHeight;
    const max = Math.max(MIN_HEIGHT, Math.round(available * MAX_RATIO));
    this.maxHeight.set(max);
    this.height.set(Math.round(Math.min(Math.max(height, MIN_HEIGHT), max)));
  }
}

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable: the preference is just not remembered.
  }
}

/** Plain text of the measured box for the Copy button. */
function measureText(box: BoxMeasure | null): string {
  if (!box) return '';
  const sides = (values: number[]) => values.map((v) => `${v}px`).join(' ');
  return [
    `${box.label}: ${box.width} × ${box.height}px (contenido ${box.content[0]} × ${box.content[1]}px)`,
    `padding: ${sides(box.padding)}`,
    `border: ${sides(box.border)}`,
    `border-radius: ${sides(box.radius)}`,
    `margin: ${sides(box.margin)}`,
    `gap: ${box.gap[0]}px ${box.gap[1]}px`,
    `font: ${box.font.weight} ${box.font.size}px/${box.font.lineHeight} ${box.font.family}`,
  ].join('\n');
}
