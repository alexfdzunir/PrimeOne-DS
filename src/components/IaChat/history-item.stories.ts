import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneHistoryItem } from './history-item';
import { bind } from '../../stories/helpers';

const INPUTS = ['label', 'time', 'active'];

const meta: Meta = {
  title: 'Proeduca/HistoryItem',
  decorators: [moduleMetadata({ imports: [PrimeOneHistoryItem] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    label: 'Resumen del tema 3',
    time: 'Hace 2 h',
    select: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    time: { control: 'text' },
    active: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    select: { action: 'select', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 20rem">
        <prime-one-history-item${bind(args, INPUTS)} (select)="select($event)" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };
