import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneTaskCard } from './task-card';
import type { Task } from './task-card';
import { bind } from '../../stories/helpers';

const INPUTS = ['showDate', 'showType', 'mobile'];
const TASK: Task = { id: '1', title: 'Entrega de la actividad 2', subtitle: 'Bases de datos', due: '25/09/2026' };

const meta: Meta = {
  title: 'Proeduca/TaskCard',
  decorators: [moduleMetadata({ imports: [PrimeOneTaskCard] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Completed', 'NoType', 'NoDate', 'Mobile'],
  },
  args: {
    priority: 'high',
    taskType: 'deliveries',
    completed: false,
    open: fn(),
  },
  argTypes: {
    showDate: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showType: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    mobile: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    priority: { control: 'inline-radio', options: ['high', 'mid', 'low'], description: 'task.priority' },
    taskType: { control: 'select', options: ['academic', 'deliveries', 'personal', 'management'], description: 'task.type' },
    completed: { control: 'boolean', description: 'task.completed' },
    open: { action: 'open', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, task: { ...TASK, priority: args['priority'], type: args['taskType'], completed: args['completed'] } as Task },
    template: `
      <div style="max-width: 22rem">
        <prime-one-task-card [task]="task"${bind(args, INPUTS)} (open)="open($event)" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Completed: Story = { args: { completed: true } };
export const NoType: Story = { args: { showType: false } };
export const NoDate: Story = { args: { showDate: false } };
export const Mobile: Story = { args: { mobile: true } };
