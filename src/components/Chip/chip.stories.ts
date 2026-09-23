import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Chip } from 'primeng/chip';
import { bind } from '../../stories/helpers';

const INPUTS = ['label', 'icon', 'image', 'alt', 'disabled', 'removable', 'removeIcon'];

const meta: Meta = {
  title: 'Misc/Chip',
  decorators: [moduleMetadata({ imports: [Chip] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    label: 'Angular',
    icon: 'ph ph-code',
    onRemove: fn(),
    onImageError: fn(),
  },
  argTypes: {
    label: { control: 'text', description: 'Defines the text to display.' },
    icon: { control: 'text', description: 'Defines the icon to display.' },
    image: { control: 'text', description: 'Defines the image to display.' },
    alt: { control: 'text', description: 'Alt attribute of the image.' },
    disabled: { control: 'boolean', description: 'When present, it specifies that the element should be disabled.' },
    removable: { control: 'boolean', description: 'Whether to display a remove icon.' },
    removeIcon: { control: 'text', description: 'Icon of the remove element.' },
    onRemove: { action: 'onRemove', table: { category: 'Eventos' } },
    onImageError: { action: 'onImageError', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `<p-chip${bind(args, INPUTS)} (onRemove)="onRemove($event)" (onImageError)="onImageError($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Removable: Story = { args: { removable: true } };
export const Disabled: Story = { args: { disabled: true } };
