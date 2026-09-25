import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';

export type AgendaView = 'day' | 'three-days' | 'week' | 'academic-week' | 'month' | 'agenda';
export type AgendaColor = 'green' | 'fuchsia' | 'orange' | 'red';

export interface AgendaEvent {
  id: string;
  title: string;
  subtitle?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: AgendaColor;
}

interface PositionedEvent {
  event: AgendaEvent;
  top: number;
  height: number;
}

const HOUR_HEIGHT = 56;
const AGENDA_DAYS = 14;

export const AGENDA_VIEWS: { label: string; value: AgendaView }[] = [
  { label: 'Día', value: 'day' },
  { label: 'Tres días', value: 'three-days' },
  { label: 'Semana', value: 'week' },
  { label: 'Semana académica', value: 'academic-week' },
  { label: 'Mes', value: 'month' },
  { label: 'Agenda', value: 'agenda' },
];

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function startOfWeek(date: Date): Date {
  return addDays(startOfDay(date), -((date.getDay() + 6) % 7));
}

function overlaps(event: AgendaEvent, from: Date, to: Date): boolean {
  return event.start < to && event.end > from;
}

/**
 * Calendar agenda (Figma "Agenda", Estudiantes): day, three days, week, academic week, month and list views.
 */
@Component({
  selector: 'prime-one-agenda',
  imports: [FormsModule, Button, Select],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="po-agenda__toolbar">
      <p-button icon="ph ph-caret-left" severity="secondary" text rounded ariaLabel="Anterior" (onClick)="move(-1)" />
      <p-button icon="ph ph-caret-right" severity="secondary" text rounded ariaLabel="Siguiente" (onClick)="move(1)" />
      <p-button label="Hoy" severity="secondary" variant="outlined" size="small" (onClick)="date.set(today())" />
      <h2 class="po-agenda__title">{{ title() }}</h2>
      @if (showViewSelector()) {
        <p-select [options]="views" optionLabel="label" optionValue="value" [ngModel]="view()" (ngModelChange)="view.set($event)" size="small" ariaLabel="Vista" />
      }
    </header>

    @switch (view()) {
      @case ('month') {
        <div class="po-agenda__month" role="grid">
          @for (name of weekdays(); track name) {
            <div class="po-agenda__weekday" role="columnheader">{{ name }}</div>
          }
          @for (cell of monthCells(); track cell.day.getTime()) {
            <div class="po-agenda__cell" role="gridcell" [class.po-agenda__cell--out]="!cell.inMonth" [class.po-agenda__cell--today]="cell.today">
              <span class="po-agenda__cell-day">{{ cell.day.getDate() }}</span>
              @for (event of cell.events.slice(0, 3); track event.id) {
                <button type="button" class="po-agenda__chip" [attr.data-color]="event.color ?? 'green'" (click)="eventClick.emit(event)">
                  @if (!event.allDay) {
                    <span class="po-agenda__chip-time">{{ startTime(event) }}</span>
                  }
                  {{ event.title }}
                </button>
              }
              @if (cell.events.length > 3) {
                <span class="po-agenda__more">+{{ cell.events.length - 3 }} más</span>
              }
            </div>
          }
        </div>
      }
      @case ('agenda') {
        <div class="po-agenda__list">
          @for (group of agendaGroups(); track group.day.getTime()) {
            <section>
              <h3 class="po-agenda__list-day" [class.po-agenda__list-day--today]="group.today">{{ longDay(group.day) }}</h3>
              @for (event of group.events; track event.id) {
                <button type="button" class="po-agenda__row" [attr.data-color]="event.color ?? 'green'" (click)="eventClick.emit(event)">
                  <span class="po-agenda__row-time">{{ event.allDay ? 'Todo el día' : timeRange(event) }}</span>
                  <span class="po-agenda__row-text">
                    <strong>{{ event.title }}</strong>
                    @if (event.subtitle) {
                      <span>{{ event.subtitle }}</span>
                    }
                  </span>
                </button>
              }
            </section>
          } @empty {
            <p class="po-agenda__empty">No hay eventos en los próximos {{ agendaDays }} días</p>
          }
        </div>
      }
      @default {
        <div class="po-agenda__grid" [style.--po-agenda-days]="columns().length" role="grid">
          <div class="po-agenda__corner"></div>
          @for (column of columns(); track column.day.getTime()) {
            <div class="po-agenda__dayhead" role="columnheader" [class.po-agenda__dayhead--today]="column.today">
              <span>{{ weekdayName(column.day) }}</span>
              <strong>{{ column.day.getDate() }}</strong>
            </div>
          }
          <div class="po-agenda__allday-label">Todo el día</div>
          @for (column of columns(); track column.day.getTime()) {
            <div class="po-agenda__allday">
              @for (event of column.allDay; track event.id) {
                <button type="button" class="po-agenda__chip" [attr.data-color]="event.color ?? 'green'" (click)="eventClick.emit(event)">{{ event.title }}</button>
              }
            </div>
          }
          <div class="po-agenda__hours">
            @for (hour of hours(); track hour) {
              <span class="po-agenda__hour">{{ hour }}:00</span>
            }
          </div>
          @for (column of columns(); track column.day.getTime()) {
            <div class="po-agenda__column" [style.height.px]="hours().length * hourHeight">
              @for (item of column.timed; track item.event.id) {
                <button
                  type="button"
                  class="po-agenda__event"
                  [attr.data-color]="item.event.color ?? 'green'"
                  [style.top.%]="item.top"
                  [style.height.%]="item.height"
                  (click)="eventClick.emit(item.event)"
                >
                  <strong>{{ item.event.title }}</strong>
                  <span>{{ item.event.subtitle ?? timeRange(item.event) }}</span>
                </button>
              }
            </div>
          }
        </div>
      }
    }
  `,
  styles: `
    :host { display: flex; flex-direction: column; gap: 1rem; color: var(--p-text-color); container: po-agenda / inline-size; }
    [data-color='green'] { --po-agenda-color: var(--p-green-500); }
    [data-color='fuchsia'] { --po-agenda-color: var(--p-fuchsia-500); }
    [data-color='orange'] { --po-agenda-color: var(--p-orange-500); }
    [data-color='red'] { --po-agenda-color: var(--p-red-500); }
    .po-agenda__toolbar { display: flex; align-items: center; gap: 0.5rem; }
    .po-agenda__title { flex: 1; margin: 0 0 0 0.5rem; font-size: 1.125rem; line-height: 1.375rem; font-weight: 600; }
    .po-agenda__title::first-letter, .po-agenda__list-day::first-letter { text-transform: uppercase; }
    .po-agenda__grid {
      display: grid;
      grid-template-columns: 4rem repeat(var(--po-agenda-days), minmax(0, 1fr));
      border: 1px solid var(--p-content-border-color);
      border-radius: var(--p-border-radius-md);
      overflow: auto;
      max-height: 40rem;
    }
    .po-agenda__corner, .po-agenda__dayhead { position: sticky; top: 0; z-index: 1; background: var(--p-content-background); }
    .po-agenda__dayhead { display: flex; flex-direction: column; padding: 0.5rem; border-left: 1px solid var(--p-content-border-color); font-size: 0.75rem; text-transform: capitalize; }
    .po-agenda__dayhead strong { font-size: 1.25rem; }
    .po-agenda__dayhead--today { background: var(--p-primary-50); }
    .po-agenda__dayhead--today strong { color: var(--p-primary-color); }
    .po-agenda__allday-label, .po-agenda__hour { padding: 0.25rem; color: var(--p-surface-400); font-size: 0.6875rem; }
    .po-agenda__allday { display: flex; flex-direction: column; gap: 0.25rem; padding: 0.25rem; border-left: 1px solid var(--p-content-border-color); border-bottom: 1px solid var(--p-content-border-color); }
    .po-agenda__allday-label { border-bottom: 1px solid var(--p-content-border-color); }
    .po-agenda__hours { display: grid; grid-auto-rows: 56px; }
    .po-agenda__column {
      position: relative;
      border-left: 1px solid var(--p-content-border-color);
      background: repeating-linear-gradient(to bottom, transparent 0 55px, var(--p-content-border-color) 55px 56px);
    }
    .po-agenda__event {
      position: absolute;
      inset-inline: 0.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
      min-height: 1.5rem;
      padding: 0.25rem 0.5rem;
      overflow: hidden;
      border: 0;
      border-left: 3px solid var(--po-agenda-color);
      border-radius: var(--p-border-radius-md);
      background: var(--p-content-background);
      color: var(--p-text-color);
      font: inherit;
      font-size: 0.75rem;
      text-align: start;
      cursor: pointer;
    }
    .po-agenda__event span { color: var(--p-text-muted-color); }
    .po-agenda__chip {
      overflow: hidden;
      padding: 0.125rem 0.375rem;
      border: 0;
      border-left: 3px solid var(--po-agenda-color);
      border-radius: var(--p-border-radius-md);
      background: var(--p-content-background);
      color: var(--p-text-color);
      font: inherit;
      font-size: 0.75rem;
      text-align: start;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    .po-agenda__month { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-md); }
    .po-agenda__month .po-agenda__chip { border-radius: 4px; }
    .po-agenda__chip-time { margin-inline-end: 0.25rem; color: var(--p-text-muted-color); }
    .po-agenda__weekday { padding: 0.5rem; color: var(--p-text-muted-color); font-size: 0.75rem; text-transform: capitalize; }
    .po-agenda__cell { display: flex; flex-direction: column; gap: 0.25rem; min-height: 6.5rem; padding: 0.375rem; border-top: 1px solid var(--p-content-border-color); border-left: 1px solid var(--p-content-border-color); }
    .po-agenda__cell--out { background: var(--p-content-hover-background); color: var(--p-text-muted-color); }
    .po-agenda__cell--today .po-agenda__cell-day { display: inline-grid; flex: 0 0 auto; place-items: center; width: 1.5rem; height: 1.5rem; aspect-ratio: 1; border-radius: 50%; background: var(--p-primary-color); color: var(--p-primary-contrast-color); }
    .po-agenda__cell-day { font-size: 0.75rem; font-weight: 600; }
    .po-agenda__more { color: var(--p-primary-color); font-size: 0.75rem; }
    .po-agenda__list { display: flex; flex-direction: column; gap: 1rem; }
    .po-agenda__list-day { margin: 0 0 0.5rem; font-size: 0.875rem; font-weight: 600; }
    .po-agenda__list-day--today { color: var(--p-primary-color); }
    .po-agenda__row {
      display: flex;
      gap: 1rem;
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 0;
      border-left: 3px solid var(--po-agenda-color);
      border-radius: var(--p-border-radius-md);
      background: var(--p-content-background);
      color: var(--p-text-color);
      font: inherit;
      text-align: start;
      cursor: pointer;
    }
    .po-agenda__row + .po-agenda__row { margin-top: 0.5rem; }
    .po-agenda__row-time { flex: 0 0 7rem; color: var(--p-surface-400); font-size: 0.875rem; }
    .po-agenda__row-text { display: flex; flex-direction: column; }
    /* Narrow containers (phones): title on its own row, scrollable day columns and dots in the month view */
    @container po-agenda (max-width: 600px) {
      .po-agenda__toolbar { flex-wrap: wrap; }
      .po-agenda__title { order: -1; flex: 1 0 100%; margin: 0; font-size: 1rem; }
      .po-agenda__toolbar p-select { margin-inline-start: auto; }
      .po-agenda__grid { grid-template-columns: 3rem repeat(var(--po-agenda-days), minmax(6.5rem, 1fr)); }
      .po-agenda__corner, .po-agenda__allday-label, .po-agenda__hours { position: sticky; left: 0; z-index: 2; background: var(--p-content-background); }
      .po-agenda__corner { z-index: 3; }
      .po-agenda__cell { min-height: 3.5rem; flex-flow: row wrap; align-content: flex-start; padding: 0.25rem; }
      .po-agenda__cell-day { flex: 1 0 100%; }
      /* Today keeps its circle: fixed size, and the margin still sends the dots to the next row */
      .po-agenda__cell--today .po-agenda__cell-day { flex: 0 0 1.5rem; margin-inline-end: calc(100% - 1.5rem); }
      .po-agenda__weekday { padding: 0.5rem 0.25rem; text-align: center; }
      .po-agenda__month .po-agenda__chip { flex: 0 0 auto; width: 0.5rem; height: 0.5rem; padding: 0; border: 0; border-radius: 50%; background: var(--po-agenda-color); font-size: 0; }
      .po-agenda__more { font-size: 0.625rem; }
      .po-agenda__row { flex-direction: column; gap: 0.25rem; }
      .po-agenda__row-time { flex: none; }
    }
    .po-agenda__row-text span { color: var(--p-text-muted-color); font-size: 0.875rem; }
    .po-agenda__empty { color: var(--p-text-muted-color); }
    button:focus-visible { outline: 1px solid var(--p-focus-ring-color); outline-offset: 1px; }
  `,
})
export class PrimeOneAgenda {
  readonly events = input<AgendaEvent[]>([]);
  readonly view = model<AgendaView>('week');
  readonly date = model<Date>(new Date());
  readonly startHour = input(7);
  readonly endHour = input(22);
  readonly showViewSelector = input(true);
  readonly locale = input('es-ES');

  readonly eventClick = output<AgendaEvent>();

  protected readonly views = AGENDA_VIEWS;
  protected readonly hourHeight = HOUR_HEIGHT;
  protected readonly agendaDays = AGENDA_DAYS;
  protected readonly today = () => startOfDay(new Date());

  protected readonly hours = computed(() =>
    Array.from({ length: Math.max(this.endHour() - this.startHour(), 1) }, (_, i) => this.startHour() + i),
  );

  protected readonly days = computed(() => {
    const date = startOfDay(this.date());
    switch (this.view()) {
      case 'day':
        return [date];
      case 'three-days':
        return [0, 1, 2].map((i) => addDays(date, i));
      case 'academic-week':
        return [0, 1, 2, 3, 4].map((i) => addDays(startOfWeek(date), i));
      default:
        return [0, 1, 2, 3, 4, 5, 6].map((i) => addDays(startOfWeek(date), i));
    }
  });

  protected readonly columns = computed(() => {
    const todayTime = this.today().getTime();
    const from = this.startHour() * 60;
    const span = this.hours().length * 60;
    return this.days().map((day) => {
      const next = addDays(day, 1);
      const events = this.events().filter((event) => overlaps(event, day, next));
      const timed: PositionedEvent[] = events
        .filter((event) => !event.allDay)
        .map((event) => {
          const start = Math.max(event.start.getTime(), day.getTime());
          const end = Math.min(event.end.getTime(), next.getTime());
          const startMinutes = (start - day.getTime()) / 60_000 - from;
          const minutes = (end - start) / 60_000;
          return { event, top: Math.max(0, (startMinutes / span) * 100), height: Math.max(2, (minutes / span) * 100) };
        });
      return { day, today: day.getTime() === todayTime, allDay: events.filter((event) => event.allDay), timed };
    });
  });

  protected readonly monthCells = computed(() => {
    const date = this.date();
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    const start = startOfWeek(first);
    const todayTime = this.today().getTime();
    return Array.from({ length: 42 }, (_, i) => {
      const day = addDays(start, i);
      return {
        day,
        inMonth: day.getMonth() === first.getMonth(),
        today: day.getTime() === todayTime,
        events: this.events().filter((event) => overlaps(event, day, addDays(day, 1))),
      };
    });
  });

  protected readonly agendaGroups = computed(() => {
    const start = startOfDay(this.date());
    const todayTime = this.today().getTime();
    return Array.from({ length: AGENDA_DAYS }, (_, i) => addDays(start, i))
      .map((day) => ({
        day,
        today: day.getTime() === todayTime,
        events: this.events()
          .filter((event) => overlaps(event, day, addDays(day, 1)))
          .sort((a, b) => a.start.getTime() - b.start.getTime()),
      }))
      .filter((group) => group.events.length > 0);
  });

  protected readonly weekdays = computed(() => {
    const format = new Intl.DateTimeFormat(this.locale(), { weekday: 'long' });
    return [0, 1, 2, 3, 4, 5, 6].map((i) => format.format(addDays(startOfWeek(new Date()), i)));
  });

  protected readonly title = computed(() => {
    const locale = this.locale();
    const days = this.days();
    if (this.view() === 'month' || this.view() === 'agenda') {
      return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(this.date());
    }
    const format = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' });
    const first = days[0];
    const last = days[days.length - 1];
    return days.length === 1 ? new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(first) : `${format.format(first)} - ${format.format(last)}`;
  });

  protected move(direction: number): void {
    const date = this.date();
    const step = { day: 1, 'three-days': 3, week: 7, 'academic-week': 7, agenda: AGENDA_DAYS, month: 0 }[this.view()];
    this.date.set(step ? addDays(date, direction * step) : new Date(date.getFullYear(), date.getMonth() + direction, 1));
  }

  protected weekdayName(day: Date): string {
    return new Intl.DateTimeFormat(this.locale(), { weekday: 'short' }).format(day);
  }

  protected longDay(day: Date): string {
    return new Intl.DateTimeFormat(this.locale(), { weekday: 'long', day: 'numeric', month: 'long' }).format(day);
  }

  protected startTime(event: AgendaEvent): string {
    return new Intl.DateTimeFormat(this.locale(), { hour: '2-digit', minute: '2-digit' }).format(event.start);
  }

  protected timeRange(event: AgendaEvent): string {
    const format = new Intl.DateTimeFormat(this.locale(), { hour: '2-digit', minute: '2-digit' });
    return `${format.format(event.start)} - ${format.format(event.end)}`;
  }
}
