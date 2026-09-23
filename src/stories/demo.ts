import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationService, MessageService, type Confirmation } from 'primeng/api';
import { Button } from 'primeng/button';
import { type Terminal, TerminalService } from 'primeng/terminal';

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

const HOME = '/home/unir';

/** Read-only file tree of the demo shell: folders list their entries (sub-folders end in `/`). */
const DIRS: Record<string, string[]> = {
  '/': ['home/'],
  '/home': ['unir/'],
  [HOME]: ['asignaturas/', 'tfg/', 'notas.txt', 'README.md'],
  [`${HOME}/asignaturas`]: ['algebra-lineal.pdf', 'bases-de-datos.pdf', 'programacion-i.pdf'],
  [`${HOME}/tfg`]: ['memoria.docx', 'presentacion.pptx'],
};

const FILES: Record<string, string> = {
  [`${HOME}/notas.txt`]: 'Examen de Álgebra lineal: 18/01/2027\nEntrega del TFG: 15/06/2027',
  [`${HOME}/README.md`]: '# PrimeOne Design System\nComponentes Angular sobre PrimeNG 21 con los temas Estudiantes, Prodi y Foundations.',
};

const HELP = [
  'Comandos disponibles:',
  '  help            muestra esta ayuda',
  '  ls [ruta]       lista una carpeta',
  '  cd [ruta]       cambia de carpeta (~, .., rutas relativas)',
  '  pwd             carpeta actual',
  '  cat <fichero>   muestra un fichero',
  '  echo <texto>    repite el texto',
  '  whoami, date, uname, history, clear',
].join('\n');

/** Demo shell for the Terminal story: basic commands over a small read-only file tree. */
@Component({ selector: 'po-terminal-responder', template: '' })
export class TerminalResponder {
  /** Terminal it answers; only `clear` needs it, to empty the command list. */
  readonly terminal = input<Terminal>();

  private cwd = HOME;
  private readonly history: string[] = [];

  constructor() {
    const service = inject(TerminalService);
    service.commandHandler.pipe(takeUntilDestroyed(inject(DestroyRef))).subscribe((command: string) => {
      const response = this.run(command.trim());
      if (response) service.sendResponse(response);
    });
  }

  private run(command: string): string {
    if (!command) return '';
    this.history.push(command);
    const [name, ...args] = command.split(/\s+/);
    const target = args[0];
    switch (name) {
      case 'help':
        return HELP;
      case 'pwd':
        return this.cwd;
      case 'whoami':
        return 'unir';
      case 'date':
        return new Date().toLocaleString('es-ES');
      case 'uname':
        return 'PrimeOne OS (Angular 21, PrimeNG 21)';
      case 'echo':
        return args.join(' ');
      case 'history':
        return this.history.map((entry, i) => `${String(i + 1).padStart(3)}  ${entry}`).join('\n');
      case 'ls': {
        const path = this.resolve(target);
        if (FILES[path]) return path.split('/').pop() ?? '';
        return DIRS[path]?.join('   ') ?? `ls: no existe ${target}`;
      }
      case 'cd': {
        const path = this.resolve(target ?? '~');
        if (!DIRS[path]) return `cd: no es una carpeta: ${target}`;
        this.cwd = path;
        return '';
      }
      case 'cat': {
        if (!target) return 'cat: falta el fichero';
        const path = this.resolve(target);
        return FILES[path] ?? (DIRS[path] ? `cat: ${target} es una carpeta` : `cat: no existe ${target}`);
      }
      case 'clear':
        this.terminal()?.commands.splice(0);
        return '';
      default:
        return `${name}: comando no encontrado. Escribe help`;
    }
  }

  /** Absolute path of `target` from the current folder (`~`, `.` and `..` included). */
  private resolve(target = '.'): string {
    const base = target.startsWith('/') ? [] : target.startsWith('~') ? HOME.split('/') : this.cwd.split('/');
    const parts = base.filter(Boolean);
    for (const part of target.replace(/^~/, '').split('/')) {
      if (!part || part === '.') continue;
      if (part === '..') parts.pop();
      else parts.push(part);
    }
    return '/' + parts.join('/');
  }
}
