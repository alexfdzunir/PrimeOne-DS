import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ProgressSpinner } from 'primeng/progressspinner';
import { bind } from '../../stories/helpers';

const INPUTS = ['strokeWidth', 'fill', 'animationDuration'];

const meta: Meta = {
  title: 'Misc/ProgressSpinner',
  decorators: [moduleMetadata({ imports: [ProgressSpinner] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    strokeWidth: '4',
  },
  argTypes: {
    strokeWidth: { control: 'text', description: 'Width of the circle stroke.' },
    fill: { control: 'color', description: 'Color for the background of the circle.' },
    animationDuration: { control: 'text', description: 'Duration of the rotate animation.' },
  },
  render: (args) => ({
    props: args,
    template: `<p-progressspinner${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Thin: Story = { args: { strokeWidth: '2', animationDuration: '.5s' } };
