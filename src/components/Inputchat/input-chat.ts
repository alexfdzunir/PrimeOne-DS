import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Button } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Tag } from 'primeng/tag';
import { Textarea } from 'primeng/textarea';
import { PrimeOneValueAccessor, provideValueAccessor } from '../shared/value-accessor';

export interface ChatAttachment {
  name: string;
  /** Short file type shown as a tag, e.g. "Pdf". */
  type?: string;
}

/**
 * Chat composer: text, attachments, audio recording and send/stop actions. Value: the draft text.
 */
@Component({
  selector: 'prime-one-inputchat',
  imports: [Button, ProgressSpinner, Tag, Textarea],
  providers: [provideValueAccessor(PrimeOneInputChat)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="po-inputchat" [class.po-inputchat--mobile]="mobile()" [class.po-inputchat--disabled]="isDisabled()">
      @if (attachments().length) {
        <ul class="po-inputchat__attachments">
          @for (file of attachments(); track file.name) {
            <li class="po-inputchat__file">
              <span class="po-inputchat__file-name">{{ file.name }}</span>
              @if (file.type) {
                <p-tag [value]="file.type" severity="info" />
              }
              <p-button
                class="po-inputchat__file-remove"
                icon="ph ph-x"
                severity="secondary"
                size="small"
                text
                rounded
                [ariaLabel]="'Quitar ' + file.name"
                (onClick)="removeAttachment.emit(file)"
              />
            </li>
          }
        </ul>
      }

      @if (recording()) {
        <div class="po-inputchat__recording">
          <p-button icon="ph ph-trash" severity="danger" text rounded ariaLabel="Descartar audio" (onClick)="cancelRecording.emit()" />
          <span class="po-inputchat__dot" aria-hidden="true"></span>
          <span class="po-inputchat__time">{{ recordingTime() }}</span>
          <span class="po-inputchat__wave" aria-hidden="true"></span>
        </div>
      } @else if (transcribing()) {
        <p class="po-inputchat__status">Transcribiendo...</p>
      } @else {
        <textarea
          pTextarea
          class="po-inputchat__text"
          rows="1"
          [autoResize]="true"
          [value]="value() ?? ''"
          [attr.placeholder]="placeholder()"
          [disabled]="isDisabled()"
          aria-label="Mensaje"
          (input)="onInput($event)"
          (keydown.enter)="onEnter($event)"
          (blur)="onTouched()"
        ></textarea>
      }

      <div class="po-inputchat__actions">
        @if (showAttach()) {
          <p-button icon="ph ph-plus" severity="secondary" text rounded ariaLabel="Adjuntar" [disabled]="isDisabled()" (onClick)="attach.emit()" />
        }
        <span class="po-inputchat__spacer"></span>
        @if (showAudio() && !recording()) {
          <p-button
            icon="ph ph-microphone"
            text
            rounded
            ariaLabel="Grabar audio"
            [disabled]="isDisabled() || busy()"
            (onClick)="startRecording.emit()"
          />
        }
        @if (loading() || transcribing()) {
          <p-progress-spinner strokeWidth="6" [style]="{ width: '24px', height: '24px' }" ariaLabel="Procesando" />
        } @else if (busy()) {
          <p-button icon="ph ph-stop" rounded ariaLabel="Detener respuesta" (onClick)="stop.emit()" />
        } @else if (recording()) {
          <p-button icon="ph ph-arrow-up" rounded ariaLabel="Enviar audio" (onClick)="stopRecording.emit()" />
        } @else {
          <p-button icon="ph ph-arrow-up" rounded ariaLabel="Enviar" [disabled]="!canSend()" (onClick)="submit()" />
        }
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }
    .po-inputchat {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1rem;
      background: var(--p-content-background);
      border: 1px solid var(--p-form-field-border-color);
      /* Figma inputchat/desktop/border/radius: 12 / 24 / 0 per theme = content radius x 1.5 */
      border-radius: calc(var(--p-content-border-radius) * 1.5);
    }
    .po-inputchat:focus-within { border-color: var(--p-form-field-focus-border-color); }
    .po-inputchat--mobile { padding: 0.75rem; border-radius: var(--p-content-border-radius); }
    .po-inputchat--disabled { background: var(--p-form-field-disabled-background); }
    .po-inputchat__attachments { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0; padding: 0; list-style: none; }
    .po-inputchat__file {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      max-width: 17rem;
      padding: 0.75rem 2.5rem 0.75rem 0.75rem;
      border: 1px solid var(--p-content-border-color);
      border-radius: var(--p-border-radius-md);
    }
    .po-inputchat__file-name { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .po-inputchat__file-remove { position: absolute; top: 0.25rem; right: 0.25rem; }
    .po-inputchat__text { width: 100%; border: 0; padding: 0; background: transparent; box-shadow: none; resize: none; }
    .po-inputchat__recording { display: flex; align-items: center; gap: 0.75rem; }
    .po-inputchat__dot { flex: 0 0 auto; width: 0.75rem; height: 0.75rem; border-radius: 50%; background: var(--p-red-500); }
    .po-inputchat__time { font-variant-numeric: tabular-nums; }
    .po-inputchat__wave {
      flex: 1;
      height: 0.25rem;
      border-radius: 999px;
      background: repeating-linear-gradient(90deg, var(--p-surface-300, #cbd5e1) 0 0.5rem, transparent 0.5rem 0.625rem);
    }
    .po-inputchat__status { margin: 0; color: var(--p-text-muted-color); }
    .po-inputchat__actions { display: flex; align-items: center; gap: 0.25rem; }
    .po-inputchat__spacer { flex: 1; }
  `,
})
export class PrimeOneInputChat extends PrimeOneValueAccessor<string> {
  readonly placeholder = input('Pregunta lo que quieras');
  readonly attachments = input<ChatAttachment[]>([]);
  /** A response is being generated: shows the stop action. */
  readonly busy = input(false);
  readonly loading = input(false);
  readonly recording = input(false);
  readonly recordingTime = input('0:00');
  readonly transcribing = input(false);
  readonly showAttach = input(true);
  readonly showAudio = input(true);
  readonly mobile = input(false);

  readonly send = output<string>();
  readonly stop = output<void>();
  readonly attach = output<void>();
  readonly removeAttachment = output<ChatAttachment>();
  readonly startRecording = output<void>();
  readonly stopRecording = output<void>();
  readonly cancelRecording = output<void>();

  protected readonly canSend = computed(
    () => !this.isDisabled() && (!!this.value()?.trim() || this.attachments().length > 0),
  );

  protected onInput(event: Event): void {
    const text = (event.target as HTMLTextAreaElement).value;
    this.updateValue(text ? text : null);
  }

  protected onEnter(event: Event): void {
    if ((event as KeyboardEvent).shiftKey) return;
    event.preventDefault();
    this.submit();
  }

  protected submit(): void {
    if (!this.canSend()) return;
    this.send.emit(this.value()?.trim() ?? '');
    this.updateValue(null);
  }
}
