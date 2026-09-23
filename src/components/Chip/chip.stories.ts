import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Chip } from 'primeng/chip';
import { PORTRAITS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['label', 'icon', 'disabled', 'removable', 'removeIcon'];

const meta: Meta = {
  title: 'Misc/Chip',
  decorators: [moduleMetadata({ imports: [Chip] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Image', 'NoIcon', 'Removable', 'Disabled'],
  },
  args: {
    label: 'Angular',
    icon: 'ph ph-code',
    photo: false,
    onRemove: fn(),
    onImageError: fn(),
  },
  argTypes: {
    label: { control: 'text', description: 'Defines the text to display.' },
    icon: { control: 'text', description: 'Defines the icon to display.' },
    disabled: { control: 'boolean', description: 'When present, it specifies that the element should be disabled.' },
    removable: { control: 'boolean', description: 'Whether to display a remove icon.' },
    removeIcon: { control: 'text', description: 'Icon of the remove element.' },
    photo: { control: 'boolean', description: 'Imagen a la izquierda (Figma: Image=True).' },
    onRemove: { action: 'onRemove', table: { category: 'Eventos' } },
    onImageError: { action: 'onImageError', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, photoSrc: PORTRAITS[1] },
    template: `<p-chip [image]="photo ? photoSrc : undefined"${bind(args, INPUTS)} (onRemove)="onRemove($event)" (onImageError)="onImageError($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Image: Story = { args: { photo: true, icon: undefined, label: 'Laura Martín' } };
export const NoIcon: Story = { args: { icon: undefined } };
export const Removable: Story = { args: { removable: true } };
export const Disabled: Story = { args: { disabled: true } };
