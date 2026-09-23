import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Message } from 'primeng/message';
import { RadioButton } from 'primeng/radiobutton';
import { Textarea } from 'primeng/textarea';
import { uniqueId } from '../shared/value-accessor';

export type QuestionType = 'multiple' | 'single' | 'text';
export type QuestionState = 'default' | 'success' | 'error' | 'unanswered' | 'corrected';
export type QuestionAnswer = string | string[] | null;

export interface QuestionOption {
  value: string;
  label: string;
  /** Marks the right answer once the question is corrected. */
  correct?: boolean;
}

const FEEDBACK: Record<Exclude<QuestionState, 'default'>, { severity: 'success' | 'error' | 'warn' | 'info'; icon: string; title: string }> = {
  success: { severity: 'success', icon: 'ph ph-check-circle', title: 'Respuesta correcta' },
  error: { severity: 'error', icon: 'ph ph-x-circle', title: 'Respuestas incorrectas' },
  unanswered: { severity: 'warn', icon: 'ph ph-warning-circle', title: 'Sin contestar' },
  corrected: { severity: 'info', icon: 'ph ph-info', title: 'Corregido' },
};

/**
 * Assessment question (Figma "Question (Custom)"): multiple/single choice or free text,
 * with correction feedback and teacher actions.
 */
@Component({
  selector: 'prime-one-question',
  imports: [FormsModule, Button, Checkbox, Message, RadioButton, Textarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.po-question--mobile]': 'mobile()' },
  template: `
    <div class="po-question__head">
      <p class="po-question__statement" [id]="id">
        @if (number()) {
          {{ number() }}.
        }
        {{ statement() }}
      </p>
      @if (role() === 'teacher') {
        <div class="po-question__actions">
          <p-button icon="ph ph-arrows-clockwise" severity="secondary" text rounded ariaLabel="Regenerar" (onClick)="regenerate.emit()" />
          <p-button icon="ph ph-pencil-simple" severity="secondary" text rounded ariaLabel="Editar" (onClick)="edit.emit()" />
          <p-button icon="ph ph-star" severity="secondary" text rounded ariaLabel="Favorita" (onClick)="favorite.emit()" />
          <p-button icon="ph ph-trash" severity="danger" text rounded ariaLabel="Eliminar" (onClick)="remove.emit()" />
        </div>
      }
    </div>

    @if (type() === 'text') {
      <textarea
        pTextarea
        rows="3"
        [autoResize]="true"
        [attr.aria-labelledby]="id"
        [attr.placeholder]="placeholder()"
        [value]="textValue()"
        [disabled]="locked()"
        (input)="onText($event)"
      ></textarea>
    } @else {
      <div class="po-question__options" [attr.role]="type() === 'single' ? 'radiogroup' : 'group'" [attr.aria-labelledby]="id">
        @for (option of options(); track option.value; let i = $index) {
          <div class="po-question__option" [attr.data-mark]="marks()[i]">
            @if (type() === 'multiple') {
              <p-checkbox
                [inputId]="id + '-' + i"
                [value]="option.value"
                [ngModel]="multipleValue()"
                (ngModelChange)="answer.set($event)"
                [invalid]="marks()[i] === 'wrong'"
                [disabled]="locked()"
              />
            } @else {
              <p-radiobutton
                [inputId]="id + '-' + i"
                [name]="id"
                [value]="option.value"
                [ngModel]="answer()"
                (ngModelChange)="answer.set($event)"
                [invalid]="marks()[i] === 'wrong'"
                [disabled]="locked()"
              />
            }
            <label [for]="id + '-' + i">{{ letter(i) }}) {{ option.label }}</label>
            @if (marks()[i] === 'correct') {
              <i class="ph-fill ph-check-circle po-question__mark" aria-label="Correcta"></i>
            } @else if (marks()[i] === 'wrong') {
              <i class="ph-fill ph-x-circle po-question__mark" aria-label="Incorrecta"></i>
            }
          </div>
        }
      </div>
    }

    @if (feedbackConfig(); as config) {
      <p-message [severity]="config.severity" [icon]="config.icon">
        <div class="po-question__feedback">
          <strong>{{ feedbackTitle() ?? config.title }}</strong>
          @if (feedback()) {
            <span>{{ feedback() }}</span>
          }
        </div>
      </p-message>
    }
  `,
  styles: `
    :host { display: flex; flex-direction: column; gap: 1rem; padding: 1.5rem; border-radius: var(--p-content-border-radius); background: var(--p-content-hover-background); }
    :host(.po-question--mobile) { padding: 1rem; }
    .po-question__head { display: flex; align-items: flex-start; gap: 1rem; }
    .po-question__statement { flex: 1; margin: 0; font-size: 1rem; font-weight: 500; color: var(--p-text-color); }
    .po-question__actions { display: flex; }
    .po-question__options { display: flex; flex-direction: column; gap: 0.75rem; }
    .po-question__option { display: flex; align-items: center; gap: 0.5rem; }
    .po-question__option[data-mark='correct'] .po-question__mark { color: var(--p-green-500); }
    .po-question__option[data-mark='wrong'] .po-question__mark { color: var(--p-red-500); }
    .po-question__feedback { display: flex; flex-direction: column; gap: 0.25rem; }
    textarea { width: 100%; }
  `,
})
export class PrimeOneQuestion {
  readonly statement = input.required<string>();
  readonly number = input<number>();
  readonly type = input<QuestionType>('multiple');
  readonly options = input<QuestionOption[]>([]);
  readonly state = input<QuestionState>('default');
  readonly feedbackTitle = input<string>();
  readonly feedback = input<string>();
  readonly role = input<'student' | 'teacher'>('student');
  readonly placeholder = input('Escribe tu respuesta');
  readonly mobile = input(false);
  /** Selected value (single), values (multiple) or text (free text). */
  readonly answer = model<QuestionAnswer>(null);

  readonly regenerate = output<void>();
  readonly edit = output<void>();
  readonly favorite = output<void>();
  readonly remove = output<void>();

  protected readonly id = uniqueId('po-question');
  protected readonly locked = computed(() => this.state() !== 'default');
  protected readonly feedbackConfig = computed(() => (this.state() === 'default' ? undefined : FEEDBACK[this.state() as Exclude<QuestionState, 'default'>]));
  protected readonly multipleValue = computed(() => {
    const value = this.answer();
    return Array.isArray(value) ? value : [];
  });
  protected readonly textValue = computed(() => {
    const value = this.answer();
    return typeof value === 'string' ? value : '';
  });
  /** Per option: right answer, wrong selection or nothing, once corrected. */
  protected readonly marks = computed(() => {
    const reviewed = this.state() === 'success' || this.state() === 'error' || this.state() === 'corrected';
    const selected = new Set(this.type() === 'multiple' ? this.multipleValue() : [this.answer()]);
    return this.options().map((option) => {
      if (!reviewed) return undefined;
      if (option.correct) return 'correct';
      return selected.has(option.value) ? 'wrong' : undefined;
    });
  });

  protected letter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  protected onText(event: Event): void {
    this.answer.set((event.target as HTMLTextAreaElement).value);
  }
}
