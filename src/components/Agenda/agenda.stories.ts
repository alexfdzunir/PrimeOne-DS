import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneAgenda } from './agenda';
import type { AgendaEvent } from './agenda';
import { bind } from '../../stories/helpers';

const INPUTS = ['view', 'startHour', 'endHour', 'showViewSelector', 'locale'];
function at(dayOffset: number, hour: number, minutes = 0): Date {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minutes, 0, 0);
  return date;
}

const EVENTS: AgendaEvent[] = [
  { id: '1', title: 'Álgebra lineal', subtitle: 'Clase en directo', start: at(0, 9), end: at(0, 10, 30), color: 'green' },
  { id: '2', title: 'Tutoría', subtitle: 'Programación I', start: at(1, 12), end: at(1, 13), color: 'fuchsia' },
  { id: '3', title: 'Entrega de la práctica', start: at(2, 0), end: at(2, 23, 59), allDay: true, color: 'orange' },
  { id: '4', title: 'Examen parcial', subtitle: 'Bases de datos', start: at(3, 16), end: at(3, 18), color: 'red' },
];

const meta: Meta = {
  title: 'Proeduca/Agenda',
  decorators: [moduleMetadata({ imports: [PrimeOneAgenda] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Day', 'ThreeDays', 'AcademicWeek', 'Month', 'List'],
  },
  args: {
    view: 'week',
    eventClick: fn(),
  },
  argTypes: {
    view: { control: 'select', options: ['academic-week', 'agenda', 'day', 'month', 'three-days', 'week'], table: { defaultValue: { summary: 'week' } } },
    startHour: { control: 'number', table: { defaultValue: { summary: '7' } } },
    endHour: { control: 'number', table: { defaultValue: { summary: '22' } } },
    showViewSelector: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    locale: { control: 'text', table: { defaultValue: { summary: 'es-ES' } } },
    eventClick: { action: 'eventClick', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, events: EVENTS },
    template: `<prime-one-agenda [events]="events"${bind(args, INPUTS)} (eventClick)="eventClick($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Day: Story = { args: { view: 'day' } };
export const ThreeDays: Story = { args: { view: 'three-days' } };
export const AcademicWeek: Story = { args: { view: 'academic-week' } };
export const Month: Story = { args: { view: 'month' } };
export const List: Story = { args: { view: 'agenda' } };
