import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneTaskColumn } from './task-column';
import type { Task } from './task-card';
import { bind } from '../../stories/helpers';

const INPUTS = ['type', 'mobile'];
const TASKS: Task[] = [
  { id: '1', title: 'Entrega de la actividad 2', subtitle: 'Bases de datos', due: '25/09/2026', priority: 'high', type: 'deliveries' },
  { id: '2', title: 'Repasar el tema 4', subtitle: 'Álgebra lineal', due: '28/09/2026', priority: 'mid', type: 'academic' },
  { id: '3', title: 'Pedir cita en secretaría', due: '30/09/2026', priority: 'low', type: 'management' },
];

const meta: Meta = {
  title: 'Proeduca/TaskColumn',
  decorators: [moduleMetadata({ imports: [PrimeOneTaskColumn] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Completed', 'Overdue'],
  },
  args: {
    type: 'pending',
    add: fn(),
    sort: fn(),
    taskClick: fn(),
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['completed', 'overdue', 'pending'], table: { defaultValue: { summary: 'pending' } } },
    mobile: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    add: { action: 'add', table: { category: 'Eventos' } },
    sort: { action: 'sort', table: { category: 'Eventos' } },
    taskClick: { action: 'taskClick', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, tasks: TASKS },
    template: `
      <div style="max-width: 24rem">
        <prime-one-task-column [tasks]="tasks"${bind(args, INPUTS)} (add)="add($event)" (sort)="sort($event)" (taskClick)="taskClick($event)" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Completed: Story = { args: { type: 'completed' } };
export const Overdue: Story = { args: { type: 'overdue' } };
