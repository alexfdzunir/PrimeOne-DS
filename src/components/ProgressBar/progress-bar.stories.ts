import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ProgressBar } from 'primeng/progressbar';
import { bind } from '../../stories/helpers';

const INPUTS = ['value', 'showValue', 'unit', 'mode', 'color'];

const meta: Meta = {
  title: 'Misc/ProgressBar',
  decorators: [moduleMetadata({ imports: [ProgressBar] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Indeterminate', 'NoValue'],
  },
  args: {
    value: 60,
    showValue: true,
  },
  argTypes: {
    value: { control: 'number', description: 'Current value of the progress.' },
    showValue: { control: 'boolean', description: 'Whether to display the progress bar value.' },
    unit: { control: 'text', description: 'Unit sign appended to the value.' },
    mode: { control: 'inline-radio', options: [undefined, 'determinate', 'indeterminate'], description: 'Defines the mode of the progress', table: { defaultValue: { summary: 'determinate' } } },
    color: { control: 'color', description: 'Color for the background of the progress.' },
  },
  render: (args) => ({
    props: args,
    template: `<p-progressbar${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Indeterminate: Story = { args: { mode: 'indeterminate' } };
export const NoValue: Story = { args: { showValue: false } };
