import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { PrimeOneValueAccessor, provideValueAccessor, uniqueId } from '../shared/value-accessor';

function toUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`);
    return url.hostname.includes('.') ? url.href : null;
  } catch {
    return null;
  }
}

/**
 * URL field with a link action. Marks itself invalid when the text is not a URL.
 */
@Component({
  selector: 'prime-one-inputlink',
  imports: [IconField, InputIcon, InputText],
  providers: [provideValueAccessor(PrimeOneInputLink)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label()) {
      <label class="po-inputlink__label" [for]="id">{{ label() }}</label>
    }
    <p-iconfield iconPosition="right">
      <input
        pInputText
        type="url"
        inputmode="url"
        [id]="id"
        [value]="value() ?? ''"
        [attr.placeholder]="placeholder()"
        [pSize]="size()"
        [invalid]="showInvalid()"
        [disabled]="isDisabled()"
        (input)="onInput($event)"
        (blur)="blurred()"
      />
      <p-inputicon>
        @if (href(); as link) {
          <a class="po-inputlink__open ph ph-link-simple" [href]="link" target="_blank" rel="noopener" aria-label="Abrir enlace"></a>
        } @else {
          <span class="po-inputlink__icon ph ph-link-simple" aria-hidden="true"></span>
        }
      </p-inputicon>
    </p-iconfield>
  `,
  styles: `
    :host { display: flex; flex-direction: column; gap: 0.5rem; }
    p-iconfield, input { width: 100%; }
    .po-inputlink__open { color: var(--p-primary-color); text-decoration: none; }
    .po-inputlink__icon { color: var(--p-text-muted-color); }
  `,
})
export class PrimeOneInputLink extends PrimeOneValueAccessor<string> {
  /** Visible label above the field (Figma "Out Label"). */
  readonly label = input<string>();
  readonly placeholder = input('Introduce un enlace');
  readonly size = input<'small' | 'large' | undefined>(undefined);
  readonly invalid = input(false);

  protected readonly id = uniqueId('po-inputlink');
  private readonly touched = signal(false);

  protected readonly href = computed(() => toUrl(this.value() ?? ''));
  protected readonly showInvalid = computed(
    () => this.invalid() || (this.touched() && !!this.value() && !this.href()),
  );

  protected onInput(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.updateValue(text ? text : null);
  }

  protected blurred(): void {
    this.touched.set(true);
    this.onTouched();
  }
}
