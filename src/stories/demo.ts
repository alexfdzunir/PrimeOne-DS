import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationService, MessageService, type Confirmation } from 'primeng/api';
import { Button } from 'primeng/button';
import { TerminalService } from 'primeng/terminal';

/** Story-only helpers that call the PrimeNG services the real components listen to. */

@Component({
  selector: 'po-confirm-trigger',
  imports: [Button],
  template: `<p-button [label]="label()" [severity]="severity()" (onClick)="open($event)" />`,
})
export class ConfirmTrigger {
  private readonly confirmation = inject(ConfirmationService);

  readonly label = input('Eliminar');
  readonly severity = input<'danger' | 'secondary' | undefined>('danger');
  /** Only the options that have a value are sent, so the dialog inputs are not overwritten. */
  readonly message = input<string>();
  readonly icon = input<string>();
  readonly acceptLabel = input<string>();
  readonly rejectLabel = input<string>();
  readonly accepted = output<void>();
  readonly rejected = output<void>();

  protected open(event: Event): void {
    const options: Confirmation = {
      target: (event.currentTarget ?? event.target) as EventTarget,
      accept: () => this.accepted.emit(),
      reject: () => this.rejected.emit(),
    };
    for (const key of ['message', 'icon', 'acceptLabel', 'rejectLabel'] as const) {
      const value = this[key]();
      if (value !== undefined) options[key] = value;
    }
    this.confirmation.confirm(options);
  }
}

@Component({
  selector: 'po-toast-trigger',
  imports: [Button],
  template: `<p-button label="Mostrar notificación" (onClick)="show()" />`,
})
export class ToastTrigger {
  private readonly messages = inject(MessageService);

  readonly severity = input<'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'>('info');
  readonly summary = input('Información');
  readonly detail = input('Los cambios se han guardado correctamente.');
  readonly life = input(3000);
  readonly sticky = input(false);
  readonly closable = input(true);

  protected show(): void {
    this.messages.add({
      severity: this.severity(),
      summary: this.summary(),
      detail: this.detail(),
      life: this.life(),
      sticky: this.sticky(),
      closable: this.closable(),
    });
  }
}

/** Answers the commands typed in p-terminal. */
@Component({ selector: 'po-terminal-responder', template: '' })
export class TerminalResponder {
  constructor() {
    const terminal = inject(TerminalService);
    terminal.commandHandler.pipe(takeUntilDestroyed(inject(DestroyRef))).subscribe((command: string) => {
      const [name, ...rest] = command.trim().split(/\s+/);
      const responses: Record<string, string> = {
        date: new Date().toLocaleString('es-ES'),
        echo: rest.join(' '),
        help: 'Comandos: date, echo <texto>, help',
      };
      terminal.sendResponse(responses[name] ?? `Comando desconocido: ${name}`);
    });
  }
}
