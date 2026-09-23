import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Button } from 'primeng/button';
import { PrimeOneTaskCard, Task } from './task-card';

export type TaskColumnType = 'pending' | 'completed' | 'overdue';

const COLUMN: Record<TaskColumnType, { title: string; empty: string; color: string }> = {
  pending: { title: 'Pendientes', empty: 'No hay tareas pendientes', color: 'var(--p-primary-color)' },
  completed: { title: 'Completadas', empty: 'No hay tareas completadas', color: 'var(--p-green-500)' },
  overdue: { title: 'Vencidas/Descartadas', empty: 'No hay tareas vencidas o descartadas', color: 'var(--p-text-muted-color)' },
};

/**
 * Column of the Tareas+ board: status header with counter, scrollable cards, empty state and "new task" action.
 */
@Component({
  selector: 'prime-one-task-column',
  imports: [Button, PrimeOneTaskCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'region', '[attr.aria-label]': 'config().title' },
  template: `
    <header class="po-column__header">
      <span class="po-column__dot" [style.background]="config().color" aria-hidden="true"></span>
      <h3 class="po-column__title">{{ config().title }}</h3>
      <span class="po-column__count">{{ tasks().length }}</span>
      <p-button icon="ph ph-arrows-down-up" severity="secondary" size="small" text rounded ariaLabel="Ordenar" (onClick)="sort.emit()" />
    </header>
    <div class="po-column__list">
      @for (task of tasks(); track task.id) {
        <prime-one-task-card [task]="task" [mobile]="mobile()" (open)="taskClick.emit($event)" />
      } @empty {
        <p class="po-column__empty">{{ config().empty }}</p>
      }
    </div>
    <p-button label="Nueva tarea" icon="ph ph-plus" size="small" text (onClick)="add.emit()" />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      min-width: 16rem;
      padding: 0.75rem;
      border-radius: var(--p-content-border-radius);
      background: var(--p-content-hover-background);
    }
    .po-column__header { display: flex; align-items: center; gap: 0.5rem; }
    .po-column__dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; }
    .po-column__title { margin: 0; font-size: 0.875rem; font-weight: 600; }
    .po-column__count { flex: 1; color: var(--p-text-muted-color); font-size: 0.75rem; }
    .po-column__list { display: flex; flex-direction: column; gap: 0.5rem; max-height: var(--po-task-column-height, 32rem); overflow-y: auto; }
    .po-column__empty { margin: 0; padding: 0.75rem; border-radius: var(--p-content-border-radius); background: var(--p-content-background); color: var(--p-text-muted-color); font-size: 0.75rem; }
  `,
})
export class PrimeOneTaskColumn {
  readonly type = input<TaskColumnType>('pending');
  readonly tasks = input<Task[]>([]);
  readonly mobile = input(false);

  readonly add = output<void>();
  readonly sort = output<void>();
  readonly taskClick = output<Task>();

  protected readonly config = computed(() => COLUMN[this.type()]);
}
