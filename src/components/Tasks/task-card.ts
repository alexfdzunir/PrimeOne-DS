import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';

export type TaskPriority = 'high' | 'mid' | 'low';
export type TaskType = 'academic' | 'deliveries' | 'personal' | 'management';

export interface Task {
  id: string;
  title: string;
  subtitle?: string;
  /** Due text, e.g. "Vence en 7 días". */
  due?: string;
  priority?: TaskPriority;
  type?: TaskType;
  completed?: boolean;
}

const PRIORITY: Record<TaskPriority, { label: string; severity: 'danger' | 'warn' | 'secondary' }> = {
  high: { label: 'Alta', severity: 'danger' },
  mid: { label: 'Media', severity: 'warn' },
  low: { label: 'Baja', severity: 'secondary' },
};

const TYPE: Record<TaskType, { label: string; icon: string }> = {
  academic: { label: 'Académico', icon: 'ph ph-graduation-cap' },
  deliveries: { label: 'Entregas', icon: 'ph ph-package' },
  personal: { label: 'Personal', icon: 'ph ph-user' },
  management: { label: 'Gestión', icon: 'ph ph-briefcase' },
};

/**
 * Task card of the Tareas+ board.
 */
@Component({
  selector: 'prime-one-task-card',
  imports: [Tag, Tooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.po-task--mobile]': 'mobile()' },
  template: `
    <button type="button" class="po-task" (click)="open.emit(task())">
      <span class="po-task__title">
        @if (task().completed) {
          <i class="ph-fill ph-check-circle po-task__done" aria-label="Completada"></i>
        }
        {{ task().title }}
      </span>
      @if (task().subtitle) {
        <span class="po-task__subtitle">{{ task().subtitle }}</span>
      }
      <span class="po-task__footer">
        @if (task().due && showDate()) {
          <p-tag [value]="task().due" icon="ph ph-clock" severity="secondary" />
        }
        @if (priority(); as p) {
          <p-tag [value]="p.label" icon="ph ph-flag" [severity]="p.severity" />
        }
        @if (type(); as t) {
          @if (showType()) {
            <i [class]="t.icon + ' po-task__type'" [pTooltip]="t.label" [attr.aria-label]="t.label"></i>
          }
        }
      </span>
    </button>
  `,
  styles: `
    :host { display: block; }
    .po-task {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      padding: 0.75rem;
      border: 1px solid transparent;
      border-radius: var(--p-content-border-radius);
      background: var(--p-content-background);
      color: var(--p-text-color);
      font: inherit;
      text-align: start;
      cursor: pointer;
    }
    .po-task:hover { border-color: var(--p-content-border-color); }
    .po-task:focus-visible { outline: 1px solid var(--p-focus-ring-color); outline-offset: 1px; }
    .po-task__title { display: flex; gap: 0.25rem; font-weight: 600; font-size: 0.875rem; line-height: 1.25rem; }
    .po-task__done { color: var(--p-green-500); font-size: 1rem; }
    .po-task__subtitle { overflow: hidden; color: var(--p-text-muted-color); font-size: 0.75rem; text-overflow: ellipsis; white-space: nowrap; }
    .po-task__footer { display: flex; align-items: center; gap: 0.5rem; }
    .po-task__type { margin-inline-start: auto; font-size: 1rem; }
    :host(.po-task--mobile) .po-task { padding: 0.5rem; }
  `,
})
export class PrimeOneTaskCard {
  readonly task = input.required<Task>();
  readonly showDate = input(true);
  readonly showType = input(true);
  readonly mobile = input(false);

  readonly open = output<Task>();

  protected readonly priority = computed(() => {
    const value = this.task().priority;
    return value ? PRIORITY[value] : undefined;
  });
  protected readonly type = computed(() => {
    const value = this.task().type;
    return value ? TYPE[value] : undefined;
  });
}
