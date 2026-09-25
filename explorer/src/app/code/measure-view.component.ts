import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ExplorerState } from '../explorer-state';

const fmt = (n: number) => String(Math.round(n * 100) / 100);

/**
 * Medidas tab: the elements of the rendered component (the measured one is outlined on the stage) and its box
 * model as in Figma (margin, border with corner radii, padding and content), plus size, layout and type.
 */
@Component({
  selector: 'po-measure-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="po-measure__list po-scroll" aria-label="Elementos del componente">
      @for (el of elements(); track el.index) {
        <button
          type="button"
          class="po-measure__item"
          [class.po-measure__item--active]="el.index === selected()"
          [style.padding-inline-start.px]="12 + el.depth * 12"
          [attr.aria-current]="el.index === selected() ? 'true' : null"
          (click)="select(el.index)"
          (mouseenter)="hover(el.index)"
          (mouseleave)="hover(null)"
          (focus)="hover(el.index)"
          (blur)="hover(null)"
        >
          {{ el.label }}
        </button>
      } @empty {
        <p class="po-measure__empty">Sin elementos que medir.</p>
      }
    </nav>

    @if (box(); as b) {
      <section class="po-measure__detail po-scroll" aria-label="Medidas del elemento">
        <header class="po-measure__head">
          <code>{{ b.label }}</code>
          <span class="po-measure__size">{{ f(b.width) }} × {{ f(b.height) }}</span>
        </header>

        <div class="po-bm" role="img" [attr.aria-label]="summary()">
          <span class="po-bm__label">Margen</span>
          <span class="po-bm__v po-bm__t">{{ side(b.margin[0]) }}</span>
          <span class="po-bm__v po-bm__l">{{ side(b.margin[3]) }}</span>
          <div class="po-bm__border">
            <span class="po-bm__label">Borde</span>
            @for (corner of corners; track corner.class; let i = $index) {
              <span class="po-bm__radius" [class]="'po-bm__radius ' + corner.class" [title]="'Radio ' + corner.name">{{ f(b.radius[i]) }}</span>
            }
            <span class="po-bm__v po-bm__t">{{ side(b.border[0]) }}</span>
            <span class="po-bm__v po-bm__l">{{ side(b.border[3]) }}</span>
            <div class="po-bm__padding">
              <span class="po-bm__label">Padding</span>
              <span class="po-bm__v po-bm__t po-bm__chip">{{ side(b.padding[0]) }}</span>
              <span class="po-bm__v po-bm__l po-bm__chip">{{ side(b.padding[3]) }}</span>
              <div class="po-bm__content">{{ f(b.content[0]) }} × {{ f(b.content[1]) }}</div>
              <span class="po-bm__v po-bm__r po-bm__chip">{{ side(b.padding[1]) }}</span>
              <span class="po-bm__v po-bm__b po-bm__chip">{{ side(b.padding[2]) }}</span>
            </div>
            <span class="po-bm__v po-bm__r">{{ side(b.border[1]) }}</span>
            <span class="po-bm__v po-bm__b">{{ side(b.border[2]) }}</span>
          </div>
          <span class="po-bm__v po-bm__r">{{ side(b.margin[1]) }}</span>
          <span class="po-bm__v po-bm__b">{{ side(b.margin[2]) }}</span>
          <span class="po-bm__sizing">{{ b.boxSizing }}</span>
        </div>

        <dl class="po-measure__facts">
          <div><dt>Tamaño</dt><dd>{{ f(b.width) }} × {{ f(b.height) }} px</dd></div>
          <div><dt>Contenido</dt><dd>{{ f(b.content[0]) }} × {{ f(b.content[1]) }} px</dd></div>
          <div><dt>Padding</dt><dd>{{ sides(b.padding) }}</dd></div>
          <div><dt>Radio</dt><dd>{{ sides(b.radius) }}</dd></div>
          <div><dt>Layout</dt><dd>{{ layout() }}</dd></div>
          <div><dt>Gap</dt><dd>{{ gap() }}</dd></div>
          <div><dt>Tipografía</dt><dd>{{ b.font.family }} · {{ f(b.font.size) }} / {{ b.font.lineHeight }} · {{ b.font.weight }}</dd></div>
          <div><dt>Hijos</dt><dd>{{ b.children }}</dd></div>
        </dl>
      </section>
    }
  `,
  styles: `
    :host { display: flex; min-height: 0; background: var(--p-content-background); }
    .po-measure__list {
      flex: 0 0 240px;
      padding: 8px 0;
      border-right: 1px solid var(--p-content-border-color);
    }
    .po-measure__item {
      display: block;
      width: 100%;
      overflow: hidden;
      padding: 4px 12px;
      border: 0;
      background: transparent;
      color: var(--p-text-muted-color);
      font-family: var(--po-font-mono);
      font-size: 0.75rem;
      text-align: start;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    .po-measure__item:hover { background: var(--p-content-hover-background); color: var(--p-text-color); }
    .po-measure__item--active, .po-measure__item--active:hover {
      background: color-mix(in srgb, var(--p-primary-color) 12%, transparent);
      color: var(--p-primary-color);
      font-weight: 600;
    }
    .po-measure__item:focus-visible { outline: 2px solid var(--p-focus-ring-color); outline-offset: -2px; }
    .po-measure__empty { margin: 0; padding: 12px 16px; color: var(--p-text-muted-color); }

    .po-measure__detail { flex: 1; min-width: 0; padding: 16px 20px 20px; }
    .po-measure__head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
    .po-measure__head code { font-family: var(--po-font-mono); font-size: 0.8125rem; }
    .po-measure__size { color: var(--p-text-muted-color); font-size: 0.8125rem; font-variant-numeric: tabular-nums; }

    /* Box model: each layer is a 3x3 grid (top, left, inner, right, bottom) */
    .po-bm, .po-bm__border, .po-bm__padding {
      position: relative;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) 40px;
      grid-template-rows: 34px auto 34px;
      align-items: center;
      justify-items: center;
    }
    .po-bm {
      max-width: 560px;
      margin: 0 auto 20px;
      padding: 0;
      border: 1px dashed var(--p-content-border-color);
      border-radius: 10px;
      background: var(--po-surface-2);
    }
    .po-bm__border {
      grid-area: 2 / 2;
      width: 100%;
      border: 1.5px solid var(--p-text-muted-color);
      border-radius: 8px;
      background: var(--p-content-background);
    }
    .po-bm__padding {
      grid-area: 2 / 2;
      width: 100%;
      border-radius: 6px;
      background: color-mix(in srgb, #3b82f6 16%, var(--p-content-background));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, #3b82f6 45%, transparent);
    }
    .po-bm__content {
      grid-area: 2 / 2;
      min-width: 110px;
      padding: 10px 14px;
      border: 1.5px dashed var(--p-text-muted-color);
      border-radius: 4px;
      font-variant-numeric: tabular-nums;
      text-align: center;
    }
    .po-bm__label {
      position: absolute;
      top: 8px;
      left: 12px;
      color: var(--p-text-muted-color);
      font-size: 0.75rem;
    }
    .po-bm__v { font-size: 0.8125rem; font-variant-numeric: tabular-nums; }
    .po-bm__t { grid-area: 1 / 2; }
    .po-bm__l { grid-area: 2 / 1; }
    .po-bm__r { grid-area: 2 / 3; }
    .po-bm__b { grid-area: 3 / 2; }
    .po-bm__chip {
      min-width: 26px;
      padding: 2px 6px;
      border-radius: 6px;
      background: var(--p-content-background);
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
      text-align: center;
    }
    .po-bm__radius {
      position: absolute;
      min-width: 24px;
      padding: 1px 5px;
      border: 1px solid var(--p-content-border-color);
      border-radius: 6px;
      background: var(--po-surface-2);
      color: var(--p-text-muted-color);
      font-size: 0.6875rem;
      text-align: center;
    }
    .po-bm__radius--tl { top: -10px; left: -10px; }
    .po-bm__radius--tr { top: -10px; right: -10px; }
    .po-bm__radius--br { bottom: -10px; right: -10px; }
    .po-bm__radius--bl { bottom: -10px; left: -10px; }
    .po-bm__sizing {
      position: absolute;
      right: 12px;
      bottom: 6px;
      color: var(--p-text-muted-color);
      font-size: 0.6875rem;
    }

    .po-measure__facts {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px 24px;
      max-width: 560px;
      margin: 0 auto;
    }
    .po-measure__facts div { display: flex; justify-content: space-between; gap: 12px; padding: 4px 0; border-bottom: 1px solid var(--p-content-border-color); }
    .po-measure__facts dt { color: var(--p-text-muted-color); font-size: 0.75rem; }
    .po-measure__facts dd { margin: 0; font-size: 0.75rem; font-variant-numeric: tabular-nums; text-align: end; }

    @media (max-width: 767.98px) {
      :host { flex-direction: column; }
      .po-measure__list { flex: 0 0 auto; max-height: 120px; border-right: 0; border-bottom: 1px solid var(--p-content-border-color); }
    }
  `,
})
export class MeasureViewComponent {
  protected readonly state = inject(ExplorerState);
  protected readonly corners = [
    { class: 'po-bm__radius--tl', name: 'superior izquierdo' },
    { class: 'po-bm__radius--tr', name: 'superior derecho' },
    { class: 'po-bm__radius--br', name: 'inferior derecho' },
    { class: 'po-bm__radius--bl', name: 'inferior izquierdo' },
  ];
  protected readonly elements = computed(() => this.state.measure()?.elements ?? []);
  protected readonly selected = computed(() => this.state.measure()?.selected ?? 0);
  protected readonly box = computed(() => this.state.measure()?.box ?? null);
  protected readonly layout = computed(() => {
    const b = this.box();
    if (!b) return '';
    return b.display.includes('flex') ? `${b.display} · ${b.direction.startsWith('column') ? 'columna' : 'fila'}` : b.display;
  });
  protected readonly gap = computed(() => {
    const b = this.box();
    if (!b) return '';
    const [row, column] = b.gap;
    return row === column ? `${fmt(row)} px` : `${fmt(row)} px fila · ${fmt(column)} px columna`;
  });
  protected readonly summary = computed(() => {
    const b = this.box();
    return b ? `Caja de ${fmt(b.width)} por ${fmt(b.height)} píxeles; padding ${this.sides(b.padding)}; borde ${this.sides(b.border)}` : '';
  });

  protected f(n: number): string {
    return fmt(n);
  }

  protected side(n: number): string {
    return n ? fmt(n) : '–';
  }

  /** CSS shorthand order, collapsed when the sides repeat. */
  protected sides(values: number[]): string {
    const [t, r, b, l] = values.map(fmt);
    if (t === r && r === b && b === l) return `${t} px`;
    if (t === b && r === l) return `${t} ${r} px`;
    return `${t} ${r} ${b} ${l} px`;
  }

  protected select(index: number): void {
    this.state.inspect.update((inspect) => ({ ...inspect, index, hover: null }));
  }

  protected hover(index: number | null): void {
    this.state.inspect.update((inspect) => ({ ...inspect, hover: index }));
  }
}
