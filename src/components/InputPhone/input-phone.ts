import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { PrimeOneValueAccessor, provideValueAccessor, uniqueId } from '../shared/value-accessor';

export interface PhoneCountry {
  /** ISO 3166-1 alpha-2 code, used for the flag. */
  code: string;
  name: string;
  dialCode: string;
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: 'ES', name: 'España', dialCode: '+34' },
  { code: 'PT', name: 'Portugal', dialCode: '+351' },
  { code: 'FR', name: 'Francia', dialCode: '+33' },
  { code: 'IT', name: 'Italia', dialCode: '+39' },
  { code: 'DE', name: 'Alemania', dialCode: '+49' },
  { code: 'GB', name: 'Reino Unido', dialCode: '+44' },
  { code: 'US', name: 'Estados Unidos', dialCode: '+1' },
  { code: 'MX', name: 'México', dialCode: '+52' },
  { code: 'CO', name: 'Colombia', dialCode: '+57' },
  { code: 'AR', name: 'Argentina', dialCode: '+54' },
  { code: 'CL', name: 'Chile', dialCode: '+56' },
  { code: 'PE', name: 'Perú', dialCode: '+51' },
  { code: 'EC', name: 'Ecuador', dialCode: '+593' },
];

/**
 * Phone number with country prefix. Value format: `"+34 645378923"`.
 */
@Component({
  selector: 'prime-one-inputphone',
  imports: [FormsModule, NgTemplateOutlet, FloatLabel, InputText, Select],
  providers: [provideValueAccessor(PrimeOneInputPhone)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="po-inputphone" [class.po-inputphone--sm]="size() === 'small'">
      @if (floatLabel()) {
        <p-floatlabel variant="on" class="po-inputphone__prefix">
          <ng-container *ngTemplateOutlet="prefixTpl" />
          <label [for]="id + '-prefix'">{{ prefixLabel() }}</label>
        </p-floatlabel>
        <p-floatlabel variant="on" class="po-inputphone__number">
          <ng-container *ngTemplateOutlet="numberTpl" />
          <label [for]="id">{{ label() }}</label>
        </p-floatlabel>
      } @else {
        <ng-container *ngTemplateOutlet="prefixTpl" />
        <ng-container *ngTemplateOutlet="numberTpl" />
      }
    </div>

    <ng-template #prefixTpl>
      <p-select
        class="po-inputphone__prefix"
        [inputId]="id + '-prefix'"
        [options]="countries()"
        optionLabel="name"
        [ngModel]="country()"
        (ngModelChange)="selectCountry($event)"
        [filter]="true"
        filterBy="name,dialCode"
        [size]="size()"
        [invalid]="invalid()"
        [disabled]="isDisabled()"
        ariaLabel="Prefijo telefónico"
        appendTo="body"
      >
        <ng-template #selectedItem let-country>{{ flag(country.code) }} {{ country.dialCode }}</ng-template>
        <ng-template #item let-country>
          <span>{{ flag(country.code) }} {{ country.name }}</span>
          <span class="po-inputphone__dial">{{ country.dialCode }}</span>
        </ng-template>
      </p-select>
    </ng-template>

    <ng-template #numberTpl>
      <input
        pInputText
        class="po-inputphone__number"
        type="tel"
        inputmode="tel"
        autocomplete="tel-national"
        [id]="id"
        [value]="number()"
        [attr.placeholder]="floatLabel() ? null : placeholder()"
        [pSize]="size()"
        [invalid]="invalid()"
        [disabled]="isDisabled()"
        (input)="onNumber($event)"
        (blur)="onTouched()"
      />
    </ng-template>
  `,
  styles: `
    :host { display: block; }
    .po-inputphone { display: flex; gap: 0.5rem; }
    .po-inputphone__prefix { flex: 0 0 7.5rem; }
    .po-inputphone--sm .po-inputphone__prefix { flex-basis: 6.5rem; }
    .po-inputphone__number { flex: 1 1 auto; min-width: 0; }
    p-floatlabel p-select, p-floatlabel input { width: 100%; }
    .po-inputphone__dial { margin-inline-start: auto; color: var(--p-text-muted-color); }
  `,
})
export class PrimeOneInputPhone extends PrimeOneValueAccessor<string> {
  readonly countries = input<PhoneCountry[]>(PHONE_COUNTRIES);
  /** ISO code of the prefix shown when there is no value. */
  readonly defaultCountry = input('ES');
  readonly placeholder = input('Teléfono');
  readonly label = input('Teléfono');
  readonly prefixLabel = input('Prefijo');
  readonly floatLabel = input(false);
  readonly size = input<'small' | 'large' | undefined>(undefined);
  readonly invalid = input(false);

  protected readonly id = uniqueId('po-inputphone');
  private readonly selected = signal<PhoneCountry | undefined>(undefined);

  private readonly parsed = computed(() => {
    const raw = (this.value() ?? '').trim();
    const match = [...this.countries()]
      .sort((a, b) => b.dialCode.length - a.dialCode.length)
      .find((country) => raw.startsWith(country.dialCode));
    return match ? { country: match, number: raw.slice(match.dialCode.length).trim() } : { country: undefined, number: raw };
  });

  protected readonly country = computed(
    () =>
      this.parsed().country ??
      this.selected() ??
      this.countries().find((country) => country.code === this.defaultCountry()) ??
      this.countries()[0],
  );
  protected readonly number = computed(() => this.parsed().number);

  protected flag(code: string): string {
    return String.fromCodePoint(...[...code.toUpperCase()].map((char) => 0x1f1a5 + char.charCodeAt(0)));
  }

  protected selectCountry(country: PhoneCountry): void {
    this.selected.set(country);
    this.emit(country, this.number());
  }

  protected onNumber(event: Event): void {
    this.emit(this.country(), (event.target as HTMLInputElement).value);
  }

  private emit(country: PhoneCountry | undefined, number: string): void {
    const digits = number.replace(/[^\d]/g, '');
    this.updateValue(digits ? `${country?.dialCode ?? ''} ${digits}`.trim() : null);
  }
}
