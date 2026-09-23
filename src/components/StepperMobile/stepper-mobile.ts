import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface StepperMobileStep {
  title: string;
  description?: string;
}

const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Compact mobile stepper: circular progress with "current/total" plus the current step text.
 */
@Component({
  selector: 'prime-one-stepper-mobile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="po-steppermobile__ring"
      role="progressbar"
      aria-valuemin="1"
      [attr.aria-valuemax]="total()"
      [attr.aria-valuenow]="position()"
      [attr.aria-valuetext]="'Paso ' + position() + ' de ' + total()"
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle class="po-steppermobile__track" cx="24" cy="24" [attr.r]="radius" />
        <circle
          class="po-steppermobile__value"
          cx="24"
          cy="24"
          [attr.r]="radius"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="offset()"
        />
      </svg>
      <span class="po-steppermobile__count">{{ position() }}/{{ total() }}</span>
    </div>
    <div class="po-steppermobile__text">
      <p class="po-steppermobile__title">{{ current()?.title }}</p>
      @if (current()?.description; as description) {
        <p class="po-steppermobile__description">{{ description }}</p>
      }
    </div>
  `,
  styles: `
    :host { display: flex; align-items: center; gap: 0.75rem; }
    .po-steppermobile__ring { position: relative; flex: 0 0 3rem; width: 3rem; height: 3rem; }
    .po-steppermobile__ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
    .po-steppermobile__track, .po-steppermobile__value { fill: none; stroke-width: 3; }
    .po-steppermobile__track { stroke: var(--p-content-border-color); }
    .po-steppermobile__value { stroke: var(--p-primary-color); stroke-linecap: round; transition: stroke-dashoffset var(--p-transition-duration, 0.2s); }
    .po-steppermobile__count {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--p-primary-color);
    }
    .po-steppermobile__text { min-width: 0; }
    .po-steppermobile__title, .po-steppermobile__description { margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .po-steppermobile__title { color: var(--p-primary-color); font-weight: 600; }
    .po-steppermobile__description { color: var(--p-text-muted-color); font-size: 0.75rem; }
  `,
})
export class PrimeOneStepperMobile {
  readonly steps = input.required<StepperMobileStep[]>();
  /** Zero-based index of the current step. */
  readonly activeStep = input(0);

  protected readonly radius = RADIUS;
  protected readonly circumference = CIRCUMFERENCE;
  protected readonly total = computed(() => this.steps().length);
  protected readonly index = computed(() => Math.min(Math.max(this.activeStep(), 0), Math.max(this.total() - 1, 0)));
  protected readonly position = computed(() => (this.total() ? this.index() + 1 : 0));
  protected readonly current = computed<StepperMobileStep | undefined>(() => this.steps()[this.index()]);
  protected readonly offset = computed(() => CIRCUMFERENCE * (1 - (this.total() ? this.position() / this.total() : 0)));
}
