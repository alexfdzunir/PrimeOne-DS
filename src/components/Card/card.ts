import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { uniqueId } from '../shared/value-accessor';

/** Figma sets: card-content, card-expandable, card-product, card-horizontal and card-horizontal-full. */
export type CardType = 'default' | 'expandable' | 'product' | 'horizontal' | 'horizontal-full';
export type CardSize = 'm' | 's';
export type CardBackground = 'white' | 'grey';
export type CardTagSeverity = 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast';

export interface CardTag {
  value: string;
  /** Empty = primary. */
  severity?: CardTagSeverity;
}

export interface CardItem {
  label: string;
  /** Phosphor class, e.g. `ph ph-clock`. */
  icon?: string;
}

/**
 * DS card family on top of `p-card`. Every block is shown only when it has data, like the Figma booleans.
 * Horizontal cards switch to their narrow layout with container queries (below 520px).
 */
@Component({
  selector: 'prime-one-card',
  imports: [Avatar, Button, Card, Tag],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'po-card',
    '[attr.data-type]': 'type()',
    '[class.po-card--s]': "size() === 's'",
    '[class.po-card--grey]': "background() === 'grey'",
    '[class.po-card--interactive]': 'interactive() && !disabled()',
    '[class.po-card--disabled]': 'disabled()',
    '[attr.tabindex]': 'interactive() && !disabled() ? 0 : null',
    '[attr.role]': "interactive() ? 'group' : null",
    '[attr.aria-label]': 'interactive() ? (heading() ?? null) : null',
    '[attr.aria-disabled]': 'disabled() || null',
    '(click)': 'onClick($event)',
    '(keydown.enter)': 'onKey($event)',
    '(keydown.space)': 'onKey($event)',
  },
  template: `
    <p-card class="po-card__surface">
      <div class="po-card__layout">
        @if (image() && hasCover()) {
          <div class="po-card__cover">
            <img [src]="image()" [alt]="imageAlt()" />
          </div>
        }
        <div class="po-card__body">
          <div class="po-card__main">
            @if (hasHeader()) {
              <div class="po-card__header">
                <div class="po-card__identity">
                  @if (avatar(); as label) {
                    <p-avatar class="po-card__avatar" [label]="label" />
                  }
                  @if (icon(); as iconClass) {
                    <i class="po-card__icon" [class]="iconClass" aria-hidden="true"></i>
                  }
                  @if (heading() || subtitle()) {
                    <div class="po-card__heading">
                      @if (heading(); as text) {
                        <p class="po-card__title">{{ text }}</p>
                      }
                      @if (subtitle(); as text) {
                        <p class="po-card__subtitle">{{ text }}</p>
                      }
                    </div>
                  }
                </div>
                @if (tag(); as value) {
                  <p-tag class="po-card__tag" [value]="value" [severity]="tagSeverity()" />
                }
                @if (iconRight(); as iconClass) {
                  <i class="po-card__icon" [class]="iconClass" aria-hidden="true"></i>
                }
                @if (type() === 'expandable') {
                  <button
                    type="button"
                    class="po-card__toggle"
                    [attr.aria-expanded]="expanded()"
                    [attr.aria-controls]="contentId"
                    [attr.aria-label]="expanded() ? 'Contraer' : 'Expandir'"
                    [disabled]="disabled()"
                    (click)="expanded.set(!expanded())"
                  >
                    <i [class]="expanded() ? 'ph ph-caret-up' : 'ph ph-caret-down'" aria-hidden="true"></i>
                  </button>
                }
              </div>
            }
            @if (showContent() && hasContent()) {
              <div class="po-card__content" [id]="contentId">
                @if (text(); as value) {
                  <p class="po-card__text">{{ value }}</p>
                }
                @if (bullets().length) {
                  <ul class="po-card__bullets">
                    @for (bullet of bullets(); track $index) {
                      <li>{{ bullet }}</li>
                    }
                  </ul>
                }
                @if (metric(); as value) {
                  <p class="po-card__metric">
                    <span class="po-card__metric-value">{{ value }}</span>
                    @if (metricUnit(); as unit) {
                      <span class="po-card__metric-unit">{{ unit }}</span>
                    }
                  </p>
                }
                @if (tags().length) {
                  <div class="po-card__tags">
                    @for (item of tags(); track $index) {
                      <p-tag [value]="item.value" [severity]="item.severity" />
                    }
                  </div>
                }
              </div>
            }
          </div>

          @if (showContent()) {
            <div class="po-card__slot"><ng-content /></div>

            @if (items().length) {
              <ul class="po-card__items">
                @for (item of items(); track $index) {
                  <li class="po-card__item">
                    @if (item.icon) {
                      <i [class]="item.icon" aria-hidden="true"></i>
                    }
                    {{ item.label }}
                  </li>
                }
              </ul>
            }

            @if (author() || captions().length) {
              <div class="po-card__caption">
                @if (author(); as name) {
                  <span class="po-card__author">{{ name }}</span>
                }
                @for (caption of captions(); track $index) {
                  <span>{{ caption }}</span>
                }
              </div>
            }

            @if (hasFooter()) {
              <div class="po-card__footer">
                @if (linkLabel(); as label) {
                  <p-button
                    class="po-card__link"
                    [label]="label"
                    icon="ph ph-arrow-right"
                    iconPos="right"
                    [link]="true"
                    [disabled]="disabled()"
                    (onClick)="linkClick.emit($event)"
                  />
                }
                @if (labelCaption() || labelValues().length) {
                  <div class="po-card__label">
                    @if (labelCaption(); as caption) {
                      <span class="po-card__label-caption">{{ caption }}</span>
                    }
                    <span class="po-card__label-values">
                      @for (value of labelValues(); track $index) {
                        <span>{{ value }}</span>
                      }
                    </span>
                  </div>
                }
                @if (pages() > 0) {
                  <div class="po-card__pager">
                    <span class="po-card__pager-text">{{ page() }} de {{ pages() }}</span>
                    <p-button
                      icon="ph ph-caret-left"
                      variant="text"
                      size="small"
                      ariaLabel="Anterior"
                      [disabled]="disabled() || page() <= 1"
                      (onClick)="goTo(page() - 1)"
                    />
                    <p-button
                      icon="ph ph-caret-right"
                      variant="text"
                      size="small"
                      ariaLabel="Siguiente"
                      [disabled]="disabled() || page() >= pages()"
                      (onClick)="goTo(page() + 1)"
                    />
                  </div>
                }
              </div>
            }
          }
        </div>
      </div>
    </p-card>
  `,
  styles: `
    :host {
      --po-card-bg: var(--p-content-background);
      --po-card-border: var(--p-content-border-color);
      --po-card-padding: 16px;
      --po-card-main-gap: 16px;
      --po-card-icon: 24px;
      display: block;
      container: po-card / inline-size;
      color: var(--p-text-color);
      border-radius: var(--p-border-radius-lg);
      outline: none;
    }
    :host(.po-card--s) {
      --po-card-padding: 12px;
      --po-card-main-gap: 8px;
      --po-card-icon: 16px;
    }
    :host(.po-card--grey) { --po-card-bg: var(--p-content-hover-background); }
    :host(.po-card--interactive) { cursor: pointer; }
    :host(.po-card--interactive:hover) {
      --po-card-bg: var(--p-content-hover-background);
      --po-card-border: var(--p-primary-color);
    }
    :host(.po-card--interactive:focus-visible) {
      --po-card-border: var(--p-primary-color);
      outline: var(--p-focus-ring-width) var(--p-focus-ring-style) var(--p-focus-ring-color);
      outline-offset: var(--p-focus-ring-offset);
    }
    :host(.po-card--disabled) {
      --po-card-bg: var(--p-form-field-disabled-background);
      --po-card-border: var(--p-form-field-disabled-color);
      opacity: 0.4;
      pointer-events: none;
    }

    .po-card__surface {
      --p-card-background: var(--po-card-bg);
      --p-card-border-radius: var(--p-border-radius-lg);
      --p-card-shadow: none;
      --p-card-body-padding: var(--po-card-padding);
      --p-card-body-gap: 0;
      border: 0.5px solid var(--po-card-border);
      transition: background-color 150ms ease, border-color 150ms ease;
    }

    .po-card__layout { display: flex; flex-direction: column; gap: 16px; }
    :host([data-type='horizontal']) .po-card__layout,
    :host([data-type='horizontal-full']) .po-card__layout { flex-direction: row; }

    .po-card__cover {
      flex: 0 0 180px;
      overflow: hidden;
      border-radius: var(--p-border-radius-lg);
      background: var(--p-content-hover-background);
    }
    :host([data-type='horizontal']) .po-card__cover,
    :host([data-type='horizontal-full']) .po-card__cover { flex-basis: 300px; min-height: 180px; }
    .po-card__cover img { display: block; width: 100%; height: 100%; object-fit: cover; }

    .po-card__body { display: flex; flex: 1 1 auto; flex-direction: column; gap: 16px; min-width: 0; }
    .po-card__main { display: flex; flex-direction: column; gap: var(--po-card-main-gap); }
    .po-card__main:empty { display: none; }

    .po-card__header { display: flex; align-items: flex-start; gap: 16px; }
    :host(:not([data-type='default'])) .po-card__header { gap: 8px; align-items: center; }
    .po-card__identity { display: flex; flex: 1 1 auto; align-items: flex-start; gap: 8px; min-width: 0; }
    .po-card__heading { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
    .po-card__icon { flex: 0 0 auto; font-size: var(--po-card-icon); line-height: 1; color: var(--p-primary-color); }
    .po-card__title { margin: 0; font-size: 1.125rem; line-height: 1.375rem; font-weight: 600; overflow-wrap: anywhere; }
    .po-card__subtitle { margin: 0; font-size: 0.75rem; line-height: 1rem; color: var(--p-text-muted-color); }
    :host(.po-card--s) .po-card__title { font-size: 0.875rem; line-height: 1.125rem; }
    .po-card__tag { flex: 0 0 auto; }

    .po-card__toggle {
      display: grid;
      flex: 0 0 auto;
      place-items: center;
      padding: 0;
      border: 0;
      border-radius: var(--p-border-radius-sm);
      background: none;
      color: var(--p-primary-color);
      font-size: var(--po-card-icon);
      cursor: pointer;
    }
    .po-card__toggle:focus-visible {
      outline: var(--p-focus-ring-width) var(--p-focus-ring-style) var(--p-focus-ring-color);
      outline-offset: var(--p-focus-ring-offset);
    }

    .po-card__content { display: flex; flex-direction: column; gap: 16px; }
    .po-card__text { margin: 0; font-size: 1rem; line-height: 1.25rem; }
    :host(.po-card--s) .po-card__text { font-size: 0.75rem; line-height: 1rem; }
    .po-card__bullets { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; list-style: none; }
    .po-card__bullets li { display: flex; align-items: center; gap: 8px; font-size: 1rem; line-height: 1.25rem; }
    .po-card__bullets li::before {
      content: '';
      flex: 0 0 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--p-primary-color);
    }
    :host(.po-card--s) .po-card__bullets li { font-size: 0.875rem; line-height: 1rem; }
    .po-card__metric { display: flex; align-items: baseline; gap: 8px; margin: 0; }
    .po-card__metric-value { flex: 1 1 auto; font-size: 1.375rem; line-height: 1.625rem; font-weight: 600; }
    .po-card__metric-unit { font-size: 1rem; line-height: 1.25rem; color: var(--p-text-muted-color); }
    :host(.po-card--s) .po-card__metric-unit { font-size: 0.875rem; }
    .po-card__tags { display: flex; flex-wrap: wrap; gap: 8px; }

    .po-card__slot:empty { display: none; }

    .po-card__items { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 0; padding: 0; list-style: none; }
    .po-card__item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 600;
      color: var(--p-tag-secondary-color, var(--p-text-muted-color));
    }
    .po-card__item i { font-size: 1rem; }
    .po-card__item + .po-card__item::before {
      content: '';
      width: 1px;
      height: 11px;
      margin-right: 4px;
      background: var(--p-content-border-color);
    }

    .po-card__caption {
      display: grid;
      grid-auto-columns: minmax(0, 1fr);
      grid-auto-flow: column;
      gap: 4px;
      padding-top: 8px;
      border-top: 1px solid var(--p-content-border-color);
      font-size: 0.75rem;
      line-height: 1rem;
      color: var(--p-text-muted-color);
    }
    .po-card__author { color: var(--p-text-color); }

    .po-card__footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid var(--p-content-border-color);
    }
    .po-card__link { --p-button-padding-x: 0; --p-button-padding-y: 0; --p-button-label-font-weight: 500; }
    .po-card__label { display: flex; flex-direction: column; gap: 4px; }
    .po-card__label-caption { font-size: 0.625rem; line-height: 0.75rem; font-weight: 500; color: var(--p-text-muted-color); }
    .po-card__label-values { display: flex; gap: 4px; font-size: 1rem; line-height: 1.25rem; font-weight: 600; }
    .po-card__pager { display: flex; align-items: center; gap: 4px; }
    .po-card__pager-text { margin-right: 4px; font-size: 0.625rem; font-weight: 500; color: var(--p-text-muted-color); }

    @container po-card (max-width: 520px) {
      :host([data-type='horizontal']) .po-card__layout { flex-direction: column; }
      :host([data-type='horizontal']) .po-card__cover { flex: 0 0 180px; min-height: 0; }
      :host([data-type='horizontal-full']) .po-card__cover { flex-basis: 82px; }
    }
  `,
})
export class PrimeOneCard {
  readonly type = input<CardType>('default');
  readonly size = input<CardSize>('m');
  readonly background = input<CardBackground>('white');
  readonly disabled = input(false);
  /** Hover and focus states; the card emits `cardClick`. */
  readonly interactive = input(false);

  /** Label of the avatar (Figma "Avatar"). */
  readonly avatar = input<string>();
  /** Left icon, Phosphor class (Figma "Icon Left" / "Show Icon"). */
  readonly icon = input<string>();
  /** Card title. */
  readonly heading = input<string>();
  readonly subtitle = input<string>();
  readonly tag = input<string>();
  readonly tagSeverity = input<CardTagSeverity | undefined>();
  /** Right icon, Phosphor class (Figma "Icon Right"). */
  readonly iconRight = input<string>();
  /** Content visibility of the expandable card. */
  readonly expanded = model(false);

  /** Description (Figma "Show Text"). */
  readonly text = input<string>();
  readonly bullets = input<string[]>([]);
  /** Figure of the metric row (Figma "Show Number"). */
  readonly metric = input<string>();
  readonly metricUnit = input<string>();
  /** Tags row. */
  readonly tags = input<CardTag[]>([]);
  /** Items row with icon and separators. */
  readonly items = input<CardItem[]>([]);
  /** Labels of the caption row (dates, metadata). */
  readonly captions = input<string[]>([]);
  /** Author at the start of the caption row (product and horizontal cards). */
  readonly author = input<string>();

  /** Footer link with arrow (Figma "Show Button"). */
  readonly linkLabel = input<string>();
  /** Small caption over the footer values (Figma "Show Label"). */
  readonly labelCaption = input<string>();
  readonly labelValues = input<string[]>([]);
  /** Current page of the footer paginator (1-based). */
  readonly page = model(1);
  /** Total pages; the paginator shows when it is above 0. */
  readonly pages = input(0);

  /** Cover image for product and horizontal cards. */
  readonly image = input<string>();
  readonly imageAlt = input('');

  readonly cardClick = output<Event>();
  readonly linkClick = output<Event>();

  protected readonly contentId = uniqueId('po-card-content');

  protected readonly hasCover = computed(() => ['product', 'horizontal', 'horizontal-full'].includes(this.type()));
  protected readonly hasHeader = computed(
    () => !!(this.avatar() || this.icon() || this.heading() || this.subtitle() || this.tag() || this.iconRight()) || this.type() === 'expandable',
  );
  protected readonly showContent = computed(() => this.type() !== 'expandable' || this.expanded());
  protected readonly hasContent = computed(() => !!(this.text() || this.bullets().length || this.metric() || this.tags().length));
  protected readonly hasFooter = computed(() => !!(this.linkLabel() || this.labelCaption() || this.labelValues().length || this.pages() > 0));

  protected goTo(page: number): void {
    this.page.set(Math.min(Math.max(page, 1), this.pages()));
  }

  protected onClick(event: MouseEvent): void {
    if (!this.interactive() || this.disabled()) return;
    // Clicks on the card's own controls (link, paginator, toggle) do not activate the card.
    if ((event.target as Element).closest('button, a, input')) return;
    this.cardClick.emit(event);
  }

  protected onKey(event: Event): void {
    if (!this.interactive() || this.disabled() || event.target !== event.currentTarget) return;
    event.preventDefault();
    this.cardClick.emit(event);
  }
}
