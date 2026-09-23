import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { PrimeOneValueAccessor, provideValueAccessor, uniqueId } from '../shared/value-accessor';

export interface DocumentTypeOption {
  label: string;
  value: string;
}

export const DOCUMENT_TYPES: DocumentTypeOption[] = [
  { label: 'Pasaporte', value: 'passport' },
  { label: 'Documento Identificativo Fiscal', value: 'tax-id' },
];

/**
 * Identity document type selector. Value: the option `value`.
 */
@Component({
  selector: 'prime-one-documenttype',
  imports: [FormsModule, FloatLabel, Select],
  providers: [provideValueAccessor(PrimeOneDocumentType)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (floatLabel()) {
      <p-floatlabel variant="on">
        <p-select
          [inputId]="id"
          [options]="types()"
          optionLabel="label"
          optionValue="value"
          [ngModel]="value()"
          (ngModelChange)="select($event)"
          [size]="size()"
          [invalid]="invalid()"
          [disabled]="isDisabled()"
        />
        <label [for]="id">{{ placeholder() }}</label>
      </p-floatlabel>
    } @else {
      <p-select
        [inputId]="id"
        [options]="types()"
        optionLabel="label"
        optionValue="value"
        [ngModel]="value()"
        (ngModelChange)="select($event)"
        [placeholder]="placeholder()"
        [size]="size()"
        [invalid]="invalid()"
        [disabled]="isDisabled()"
        [ariaLabel]="placeholder()"
      />
    }
  `,
  styles: `
    :host { display: block; }
    p-select { width: 100%; }
  `,
})
export class PrimeOneDocumentType extends PrimeOneValueAccessor<string> {
  readonly types = input<DocumentTypeOption[]>(DOCUMENT_TYPES);
  readonly placeholder = input('Tipo de documento');
  readonly floatLabel = input(false);
  readonly size = input<'small' | 'large' | undefined>(undefined);
  readonly invalid = input(false);

  protected readonly id = uniqueId('po-documenttype');

  protected select(value: string | null): void {
    this.updateValue(value);
    this.onTouched();
  }
}
