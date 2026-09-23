import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Skeleton } from 'primeng/skeleton';
import { bind } from '../../stories/helpers';

const INPUTS = ['width', 'height', 'shape', 'animation', 'borderRadius', 'size'];

const meta: Meta = {
  title: 'Misc/Skeleton',
  decorators: [moduleMetadata({ imports: [Skeleton] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Circle', 'Static'],
  },
  args: {
    width: '16rem',
    height: '1rem',
  },
  argTypes: {
    width: { control: 'text', description: 'Width of the element.' },
    height: { control: 'text', description: 'Height of the element.' },
    shape: { control: 'inline-radio', options: [undefined, 'rectangle', 'circle'], description: 'Shape of the element.' },
    animation: { control: 'inline-radio', options: [undefined, 'wave', 'none'], description: 'Type of the animation.' },
    borderRadius: { control: 'text', description: 'Border radius of the element, defaults to value from theme.' },
    size: { control: 'text', description: 'Size of the skeleton.' },
  },
  render: (args) => ({
    props: args,
    template: `<p-skeleton${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Circle: Story = { args: { shape: 'circle', size: '4rem' } };
export const Static: Story = { args: { animation: 'none' } };
