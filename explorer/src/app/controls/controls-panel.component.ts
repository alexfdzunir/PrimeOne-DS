import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ColorPicker } from 'primeng/colorpicker';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Tooltip } from 'primeng/tooltip';
import { ExplorerState } from '../explorer-state';
import type { ControlDef } from '../model';

/** Stands for "component default" in the segmented controls (an `undefined` option value is not selectable). */
const DEFAULT_OPTION = '__po-default__';

interface Option {
  label: string;
  value: unknown;
}

/** Right column: presets, one row per input of the selected component and the event log. */
@Component({
  selector: 'po-controls-panel',
  imports: [DatePipe, FormsModule, Button, ColorPicker, InputNumber, InputText, Select, SelectButton, ToggleSwitch, Tooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="po-panel po-scroll">
      <header class="po-panel__header">
        <div class="po-panel__heading">
          <p class="po-eyebrow">Panel de control</p>
          <h2 class="po-panel__title">{{ state.selected().title }}</h2>
        </div>
        <p-button
          label="Restablecer"
          icon="ph ph-arrow-counter-clockwise"
          variant="text"
          size="small"
          [disabled]="!state.dirty()"
          (onClick)="state.reset()"
        />
      </header>

      @if (state.selected().presets.length > 1) {
        <section class="po-section">
          <p class="po-eyebrow">Variantes</p>
          <div class="po-chips">
            @for (preset of state.selected().presets; track preset.id) {
              <button
                type="button"
                class="po-chip"
                [class.po-chip--active]="preset.id === state.presetId()"
                [attr.aria-pressed]="preset.id === state.presetId()"
                (click)="state.applyPreset(preset.id)"
              >
                {{ preset.name }}
              </button>
            }
          </div>
        </section>
      }

      <section class="po-section">
        <p class="po-eyebrow">Propiedades</p>
        @if (state.selected().controls.length === 0) {
          <p class="po-muted po-empty">Este componente no tiene propiedades configurables.</p>
        }
        @for (control of state.selected().controls; track control.name) {
          <div class="po-control">
            <div class="po-control__label">
              <span class="po-control__name">
                {{ control.name }}
                @if (control.description) {
                  <i
                    class="ph ph-info po-control__info"
                    tabindex="0"
                    role="img"
                    [attr.aria-label]="control.description"
                    [pTooltip]="control.description"
                    tooltipPosition="left"
                    tooltipEvent="both"
                  ></i>
                }
              </span>
              @if (control.defaultSummary) {
                <span class="po-control__default po-muted">Por defecto: {{ control.defaultSummary }}</span>
              }
            </div>

            <div class="po-control__field">
              @switch (control.kind) {
                @case ('boolean') {
                  <p-toggleswitch
                    [ngModel]="booleanValue(control)"
                    (ngModelChange)="state.setArg(control.name, $event)"
                    [ariaLabel]="control.name"
                  />
                }
                @case ('inline-radio') {
                  <p-selectbutton
                    size="small"
                    [options]="radioOptions(control)"
                    optionLabel="label"
                    optionValue="value"
                    [allowEmpty]="false"
                    [ngModel]="radioValue(control)"
                    (ngModelChange)="setRadio(control, $event)"
                  />
                }
                @case ('select') {
                  <div class="po-control__field--select">
                    <p-select
                      size="small"
                      [fluid]="true"
                      [showClear]="true"
                      placeholder="Por defecto"
                      [options]="selectOptions(control)"
                      optionLabel="label"
                      optionValue="value"
                      [ngModel]="state.args()[control.name]"
                      (ngModelChange)="state.setArg(control.name, $event ?? undefined)"
                    />
                  </div>
                }
                @case ('number') {
                  <div class="po-control__field--number">
                    <p-inputnumber
                      size="small"
                      [fluid]="true"
                      [showButtons]="true"
                      buttonLayout="horizontal"
                      incrementButtonIcon="ph ph-plus"
                      decrementButtonIcon="ph ph-minus"
                      [ngModel]="numberValue(control)"
                      (ngModelChange)="state.setArg(control.name, $event ?? undefined)"
                    />
                  </div>
                }
                @case ('color') {
                  <div class="po-control__color">
                    <p-colorpicker [ngModel]="colorValue(control)" (ngModelChange)="state.setArg(control.name, $event)" />
                    <input
                      pInputText
                      pSize="small"
                      class="po-control__hex"
                      spellcheck="false"
                      [value]="textValue(control)"
                      (change)="onText(control, $event)"
                    />
                  </div>
                }
                @default {
                  <input
                    pInputText
                    pSize="small"
                    class="po-control__text"
                    [value]="textValue(control)"
                    [placeholder]="control.defaultSummary ?? ''"
                    (input)="onText(control, $event)"
                  />
                }
              }
            </div>
          </div>
        }
      </section>

      @if (state.selected().events.length > 0) {
        <section class="po-section">
          <div class="po-section__bar">
            <p class="po-eyebrow">Eventos</p>
            @if (state.events().length > 0) {
              <p-button icon="ph ph-broom" variant="text" size="small" [rounded]="true" ariaLabel="Limpiar eventos" (onClick)="state.clearEvents()" />
            }
          </div>
          <ul class="po-events">
            @for (event of state.selected().events; track event.name) {
              <li class="po-events__item">
                <span class="po-events__name">{{ event.name }}</span>
                <span class="po-events__count" [class.po-events__count--active]="(counts().get(event.name) ?? 0) > 0">
                  {{ counts().get(event.name) ?? 0 }}
                </span>
              </li>
            }
          </ul>
          @if (recent().length > 0) {
            <ol class="po-feed">
              @for (record of recent(); track record.id) {
                <li class="po-feed__item" [class.po-feed__item--new]="$first">
                  <span class="po-feed__name">{{ record.name }}</span>
                  <span class="po-feed__time po-muted">{{ record.time | date: 'HH:mm:ss' }}</span>
                  @if (record.payload) {
                    <span class="po-feed__payload po-muted" [title]="record.payload">{{ record.payload }}</span>
                  }
                </li>
              }
            </ol>
          } @else {
            <p class="po-muted po-empty">Interactúa con el componente para ver sus eventos.</p>
          }
        </section>
      }
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      background: var(--po-surface-2);
      border-left: 1px solid var(--p-content-border-color);
    }

    .po-panel {
      flex: 1;
      min-height: 0;
    }

    .po-panel__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 16px;
      border-bottom: 1px solid var(--p-content-border-color);
    }

    .po-panel__heading {
      min-width: 0;
    }

    .po-panel__title {
      margin: 4px 0 0;
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .po-eyebrow {
      margin: 0;
    }

    .po-section {
      padding: 16px;
      border-bottom: 1px solid var(--p-content-border-color);
    }

    .po-section:last-child {
      border-bottom: 0;
    }

    .po-section__bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 1.75rem;
    }

    .po-empty {
      margin: 12px 0 0;
      font-size: 0.8125rem;
    }

    /* Presets */
    .po-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }

    .po-chip {
      padding: 4px 12px;
      border: 1px solid var(--p-content-border-color);
      border-radius: 999px;
      background: transparent;
      color: var(--p-text-color);
      font: inherit;
      font-size: 0.8125rem;
      font-weight: 500;
      line-height: 1.5;
      cursor: pointer;
      transition:
        background-color 150ms,
        border-color 150ms,
        color 150ms;
    }

    .po-chip:hover {
      background: var(--po-surface-3);
    }

    .po-chip:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: 2px;
    }

    .po-chip--active,
    .po-chip--active:hover {
      border-color: var(--p-primary-color);
      background: var(--p-primary-color);
      color: var(--p-primary-contrast-color);
    }

    /* Properties */
    .po-control {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--p-content-border-color);
    }

    .po-control:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    .po-control__label {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      flex: 1 1 8rem;
    }

    .po-control__name {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8125rem;
      font-weight: 500;
      word-break: break-word;
    }

    .po-control__info {
      color: var(--p-text-muted-color);
      font-size: 0.9375rem;
      cursor: help;
      border-radius: 50%;
      transition: color 150ms;
    }

    .po-control__info:hover {
      color: var(--p-text-color);
    }

    .po-control__info:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: 2px;
    }

    .po-control__default {
      font-size: 0.75rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .po-control__field {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-left: auto;
      max-width: 100%;
    }

    .po-control__field--select {
      width: 10rem;
    }

    .po-control__field--number {
      width: 9.5rem;
    }

    .po-control__text {
      width: 10rem;
    }

    .po-control__color {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .po-control__hex {
      width: 6rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }

    /* Events */
    .po-events {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 12px 0 0;
      padding: 0;
      list-style: none;
    }

    .po-events__item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 2px 8px 2px 10px;
      border: 1px solid var(--p-content-border-color);
      border-radius: 999px;
      font-size: 0.75rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }

    .po-events__count {
      min-width: 1.25rem;
      padding: 0 5px;
      border-radius: 999px;
      background: var(--po-surface-3);
      color: var(--p-text-muted-color);
      font-family: inherit;
      font-size: 0.6875rem;
      font-weight: 600;
      line-height: 1.25rem;
      text-align: center;
      transition:
        background-color 150ms,
        color 150ms;
    }

    .po-events__count--active {
      background: var(--p-primary-color);
      color: var(--p-primary-contrast-color);
    }

    .po-feed {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 12px 0 0;
      padding: 0;
      list-style: none;
    }

    .po-feed__item {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 0 8px;
      padding: 8px 10px;
      border-radius: var(--po-radius-sm);
      background: var(--po-surface-3);
      font-size: 0.75rem;
    }

    .po-feed__item--new {
      animation: po-feed-in 150ms ease-out;
    }

    .po-feed__name {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .po-feed__time {
      font-variant-numeric: tabular-nums;
    }

    .po-feed__payload {
      grid-column: 1 / -1;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @keyframes po-feed-in {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .po-feed__item--new {
        animation: none;
      }
    }
  `,
})
export class ControlsPanelComponent {
  protected readonly state = inject(ExplorerState);

  /** Number of logged records per event name. */
  protected readonly counts = computed(() => {
    const counts = new Map<string, number>();
    for (const record of this.state.events()) counts.set(record.name, (counts.get(record.name) ?? 0) + 1);
    return counts;
  });

  protected readonly recent = computed(() => this.state.events().slice(0, 8));

  protected radioOptions(control: ControlDef): Option[] {
    return (control.options ?? []).map((value) => ({ label: value === undefined ? 'Auto' : String(value), value: value ?? DEFAULT_OPTION }));
  }

  protected radioValue(control: ControlDef): unknown {
    return this.state.args()[control.name] ?? DEFAULT_OPTION;
  }

  protected setRadio(control: ControlDef, value: unknown): void {
    this.state.setArg(control.name, value === DEFAULT_OPTION ? undefined : value);
  }

  protected selectOptions(control: ControlDef): Option[] {
    return (control.options ?? []).filter((value) => value !== undefined).map((value) => ({ label: String(value), value }));
  }

  /** Unset booleans show the component default (e.g. `showBack` is true unless turned off). */
  protected booleanValue(control: ControlDef): boolean {
    const value = this.state.args()[control.name];
    return value === undefined ? control.defaultSummary === 'true' : value === true;
  }

  protected numberValue(control: ControlDef): number | null {
    const value = this.state.args()[control.name];
    return typeof value === 'number' ? value : null;
  }

  protected textValue(control: ControlDef): string {
    const value = this.state.args()[control.name];
    return value === undefined || value === null ? '' : String(value);
  }

  protected colorValue(control: ControlDef): string | null {
    const value = this.state.args()[control.name];
    return typeof value === 'string' && value ? value : null;
  }

  protected onText(control: ControlDef, event: Event): void {
    this.state.setArg(control.name, (event.target as HTMLInputElement).value);
  }
}
