import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Avatar } from 'primeng/avatar';
import { bind } from '../../stories/helpers';

const INPUTS = ['label', 'size', 'shape', 'icon', 'image'];

const meta: Meta = {
  title: 'Misc/Avatar',
  decorators: [moduleMetadata({ imports: [Avatar] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    label: 'LM',
    size: 'large',
    shape: 'circle',
    onImageError: fn(),
  },
  argTypes: {
    label: { control: 'text', description: 'Defines the text to display.' },
    size: { control: 'inline-radio', options: ['large', 'normal', 'xlarge'], description: 'Size of the element.' },
    shape: { control: 'inline-radio', options: ['circle', 'square'], description: 'Shape of the element.' },
    icon: { control: 'text', description: 'Defines the icon to display.' },
    image: { control: 'text', description: 'Defines the image to display.' },
    onImageError: { action: 'onImageError', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `<p-avatar${bind(args, INPUTS)} (onImageError)="onImageError($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Icon: Story = { args: { label: undefined, icon: 'ph ph-user' } };
export const Square: Story = { args: { shape: 'square' } };
export const XLarge: Story = { args: { size: 'xlarge' } };
