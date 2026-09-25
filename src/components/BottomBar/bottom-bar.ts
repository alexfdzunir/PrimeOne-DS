import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Slider } from 'primeng/slider';
import { Tooltip } from 'primeng/tooltip';

/**
 * Document viewer bar (PDF viewer). `paginator` shows page, words, status and zoom;
 * `editor` renders `items` as a formatting toolbar (use `separator: true` for dividers).
 */
@Component({
  selector: 'prime-one-bottom-bar',
  imports: [FormsModule, NgTemplateOutlet, Button, Slider, Tooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="po-bottombar" role="toolbar" [attr.aria-label]="type() === 'editor' ? 'Herramientas de edición' : 'Barra del documento'">
      @if (type() === 'paginator') {
        <div class="po-bottombar__status">
          <span>Página <span class="po-bottombar__pill">{{ page() }}</span> de {{ totalPages() }}</span>
          @if (words() !== undefined) {
            <span><span class="po-bottombar__pill">{{ words() }}</span> palabras</span>
          }
          @for (status of statuses(); track status) {
            <span>{{ status }}</span>
          }
        </div>
        <span class="po-bottombar__spacer"></span>
        <ng-container [ngTemplateOutlet]="tools" />
        <div class="po-bottombar__zoom">
          <p-button icon="ph ph-minus" severity="secondary" text rounded ariaLabel="Reducir zoom" (onClick)="setZoom(zoom() - zoomStep())" />
          <p-slider class="po-bottombar__slider" [ngModel]="zoom()" (ngModelChange)="setZoom($event)" [min]="minZoom()" [max]="maxZoom()" ariaLabel="Zoom" />
          <p-button icon="ph ph-plus" severity="secondary" text rounded ariaLabel="Aumentar zoom" (onClick)="setZoom(zoom() + zoomStep())" />
          <span class="po-bottombar__percent">{{ zoom() }}%</span>
        </div>
      } @else {
        <ng-container [ngTemplateOutlet]="tools" />
      }
    </div>

    <ng-template #tools>
      @for (item of items(); track $index) {
        @if (item.separator) {
          <span class="po-bottombar__divider" role="separator"></span>
        } @else {
          <p-button
            [icon]="item.icon"
            [label]="item.icon ? undefined : item.label"
            [ariaLabel]="item.label"
            [pTooltip]="item.icon ? item.label : undefined"
            tooltipPosition="top"
            [disabled]="!!item.disabled"
            severity="secondary"
            text
            rounded
            (onClick)="run(item, $event)"
          />
        }
      }
    </ng-template>
  `,
  styles: `
    :host { display: block; container: po-bottombar / inline-size; }
    .po-bottombar {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 0.5rem 1rem;
      background: var(--p-content-background);
      border-top: 1px solid var(--p-content-border-color);
      color: var(--p-text-color);
      font-size: 0.75rem;
      font-weight: 500;
      overflow-x: auto;
    }
    .po-bottombar__pill {
      display: inline-grid;
      place-items: center;
      min-width: 1.5rem;
      padding: 0 0.5rem;
      border-radius: var(--p-border-radius-xs);
      background: var(--p-text-color);
      color: var(--p-content-background);
      font-weight: 600;
    }
    .po-bottombar__spacer { flex: 1; }
    .po-bottombar__divider { align-self: stretch; width: 1px; background: var(--p-content-border-color); }
    .po-bottombar__status { display: flex; align-items: center; gap: 2rem; }
    .po-bottombar__zoom { display: flex; align-items: center; gap: 0.5rem; }
    .po-bottombar__slider { width: 6rem; margin-inline: 0.5rem; }
    .po-bottombar__percent { min-width: 3rem; text-align: right; font-variant-numeric: tabular-nums; }
    /* Narrow containers: the items wrap and the zoom takes a full row with a flexible slider */
    @container po-bottombar (max-width: 640px) {
      .po-bottombar { flex-wrap: wrap; row-gap: 0.25rem; overflow-x: visible; }
      .po-bottombar__spacer { display: none; }
      .po-bottombar__zoom { flex: 1 0 100%; }
      .po-bottombar__slider { flex: 1; width: auto; }
    }
  `,
})
export class PrimeOneBottomBar {
  readonly type = input<'paginator' | 'editor'>('paginator');
  /** Actions (paginator) or formatting tools (editor). */
  readonly items = input<MenuItem[]>([]);
  readonly page = input(1);
  readonly totalPages = input(1);
  readonly words = input<number>();
  readonly statuses = input<string[]>([]);
  readonly zoom = model(100);
  readonly minZoom = input(10);
  readonly maxZoom = input(200);
  readonly zoomStep = input(10);

  protected setZoom(value: number): void {
    this.zoom.set(Math.min(this.maxZoom(), Math.max(this.minZoom(), Math.round(value))));
  }

  protected run(item: MenuItem, event: Event): void {
    item.command?.({ originalEvent: event, item });
  }
}
