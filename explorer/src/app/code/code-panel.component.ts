import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, output, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { ExplorerState } from '../explorer-state';
import { htmlSnippet, tsSnippet } from '../snippet';
import { CodeViewComponent } from './code-view.component';
import { linesToText } from './tokens';

type TabId = 'html' | 'ts';

const TAB_KEY = 'po-explorer.code-tab';
const HEIGHT_KEY = 'po-explorer.code-height';
const MIN_HEIGHT = 260;
const MAX_RATIO = 0.55;
const DEFAULT_HEIGHT = 320;
const KEY_STEP = 24;

/** Bottom panel of the stage with the component code (HTML template and TypeScript), resizable. */
@Component({
  selector: 'po-code-panel',
  imports: [Button, CodeViewComponent],
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
        @for (tab of tabs; track tab.id) {
          <button
            type="button"
            role="tab"
            class="po-code__tab"
            [class.po-code__tab--active]="tab.id === active()"
            [attr.aria-selected]="tab.id === active()"
            [attr.aria-controls]="'po-code-' + tab.id"
            (click)="select(tab.id)"
          >
            <i [class]="tab.icon" aria-hidden="true"></i>
            {{ tab.label }}
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
    <po-code-view
      role="tabpanel"
      [id]="'po-code-' + active()"
      [lines]="lines()"
      [label]="active() === 'html' ? 'Plantilla HTML' : 'Componente TypeScript'"
    />
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
  protected readonly tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'html', label: 'HTML', icon: 'ph ph-file-html' },
    { id: 'ts', label: 'TypeScript', icon: 'ph ph-file-ts' },
  ];
  protected readonly minHeight = MIN_HEIGHT;
  protected readonly active = signal<TabId>(read(TAB_KEY) === 'ts' ? 'ts' : 'html');
  protected readonly height = signal(Number(read(HEIGHT_KEY)) || DEFAULT_HEIGHT);
  protected readonly maxHeight = signal(MIN_HEIGHT);
  protected readonly copied = signal(false);

  protected readonly lines = computed(() =>
    this.active() === 'html'
      ? htmlSnippet(this.state.selected(), this.state.rendered(), this.state.args())
      : tsSnippet(this.state.selected()),
  );

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private copyTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.copyTimer));
    afterNextRender(() => this.resize(this.height()));
  }

  protected select(tab: TabId): void {
    this.active.set(tab);
    write(TAB_KEY, tab);
  }

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(linesToText(this.lines()));
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
