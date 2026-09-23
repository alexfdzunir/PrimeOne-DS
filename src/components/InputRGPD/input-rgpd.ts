import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { PrimeOneValueAccessor, provideValueAccessor, uniqueId } from '../shared/value-accessor';

export interface RgpdConsent {
  /** Privacy policy and legal terms (mandatory to submit). */
  legal: boolean;
  /** Commercial communications from the Proeduca group (optional). */
  marketing: boolean;
}

export const RGPD_DEFAULT_TEXT =
  'UNIVERSIDAD INTERNACIONAL DE LA RIOJA, S.A. (en adelante, "UNIR"), tratará los datos de carácter personal que usted ha ' +
  'proporcionado con la finalidad de atender a su solicitud de información, reclamación, duda o sugerencia que realice sobre ' +
  'los productos y/o servicios ofrecidos por UNIR, incluido por vía telefónica, así como para mantenerle informado de nuestra actividad.';

/**
 * Data protection block: scrollable legal text plus consent checkboxes.
 */
@Component({
  selector: 'prime-one-inputrgpd',
  imports: [FormsModule, Checkbox],
  providers: [provideValueAccessor(PrimeOneInputRgpd)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (showText()) {
      <div class="po-rgpd__text" tabindex="0" role="region" aria-label="Información sobre protección de datos">
        {{ text() }}
      </div>
    }
    @if (legalCheck()) {
      <div class="po-rgpd__check">
        <p-checkbox
          [inputId]="id + '-legal'"
          [binary]="true"
          [ngModel]="consent().legal"
          (ngModelChange)="change('legal', $event)"
          [invalid]="invalid()"
          [disabled]="isDisabled()"
        />
        <label [for]="id + '-legal'">
          He leído y acepto la
          @if (privacyUrl(); as url) {
            <a [href]="url" target="_blank" rel="noopener">protección de datos y las condiciones legales</a>
          } @else {
            protección de datos y las condiciones legales
          }
          (Obligatorio)
        </label>
      </div>
    }
    @if (marketingCheck()) {
      <div class="po-rgpd__check">
        <p-checkbox
          [inputId]="id + '-marketing'"
          [binary]="true"
          [ngModel]="consent().marketing"
          (ngModelChange)="change('marketing', $event)"
          [disabled]="isDisabled()"
        />
        <label [for]="id + '-marketing'">
          Deseo recibir información de UNIR, así como del resto de empresas del
          @if (groupUrl(); as url) {
            <a [href]="url" target="_blank" rel="noopener">Grupo Proeduca</a>,
          } @else {
            Grupo Proeduca,
          }
          vinculadas al sector de la educación
        </label>
      </div>
    }
  `,
  styles: `
    :host { display: flex; flex-direction: column; gap: 1rem; }
    .po-rgpd__text {
      max-height: 5.5rem;
      overflow-y: auto;
      padding: 0.75rem;
      border: 1px solid var(--p-form-field-border-color);
      border-radius: var(--p-form-field-border-radius);
      color: var(--p-text-muted-color);
      font-size: 0.8125rem;
      line-height: 1.25rem;
    }
    .po-rgpd__check { display: flex; align-items: flex-start; gap: 0.5rem; }
    .po-rgpd__check label { color: var(--p-text-color); line-height: 1.375rem; }
    .po-rgpd__check a { color: var(--p-primary-color); text-decoration: none; }
  `,
})
export class PrimeOneInputRgpd extends PrimeOneValueAccessor<RgpdConsent> {
  readonly text = input(RGPD_DEFAULT_TEXT);
  readonly showText = input(true);
  /** Mandatory legal acceptance checkbox (Figma "2 Checks" / "Only Checks"). */
  readonly legalCheck = input(false);
  /** Optional communications checkbox (Figma "1 Check" / "2 Checks" / "Only Checks"). */
  readonly marketingCheck = input(false);
  readonly privacyUrl = input<string>();
  readonly groupUrl = input<string>();
  readonly invalid = input(false);

  protected readonly id = uniqueId('po-rgpd');
  protected readonly consent = computed<RgpdConsent>(() => this.value() ?? { legal: false, marketing: false });

  protected change(key: keyof RgpdConsent, checked: boolean): void {
    this.updateValue({ ...this.consent(), [key]: checked });
    this.onTouched();
  }
}
