import { Directive, Provider, Type, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

/** Unique DOM id for label/input pairs inside DS components. */
export function uniqueId(prefix: string): string {
  return `${prefix}-${nextId++}`;
}

export function provideValueAccessor(type: Type<unknown>): Provider {
  return { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => type), multi: true };
}

/** Shared ControlValueAccessor plumbing for DS form components (ngModel and reactive forms). */
@Directive()
export abstract class PrimeOneValueAccessor<T> implements ControlValueAccessor {
  /** Disables the control when it is not bound to a form. */
  readonly disabled = input(false);

  protected readonly value = signal<T | null>(null);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  private onChange: (value: T | null) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: T | null): void {
    this.value.set(value ?? null);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.formDisabled.set(disabled);
  }

  protected updateValue(value: T | null): void {
    this.value.set(value);
    this.onChange(value);
  }
}
