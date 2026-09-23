import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Message } from 'primeng/message';
import { bind } from '../../stories/helpers';

const INPUTS = ['severity', 'icon', 'closable', 'closeIcon', 'life', 'size', 'variant'];

const meta: Meta = {
  title: 'Messages/Message',
  decorators: [moduleMetadata({ imports: [Message] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    severity: 'info',
    icon: 'ph ph-info',
    content: 'Tu solicitud se ha enviado correctamente.',
    onClose: fn(),
  },
  argTypes: {
    severity: { control: 'select', options: ['contrast', 'error', 'info', 'secondary', 'success', 'warn'], description: 'Severity level of the message.', table: { defaultValue: { summary: 'info' } } },
    icon: { control: 'text', description: 'Icon to display in the message.', table: { defaultValue: { summary: 'undefined' } } },
    closable: { control: 'boolean', description: 'Whether the message can be closed manually using the close icon.', table: { defaultValue: { summary: 'false' } } },
    closeIcon: { control: 'text', description: 'Icon to display in the message close button.', table: { defaultValue: { summary: 'undefined' } } },
    life: { control: 'number', description: 'Delay in milliseconds to close the message automatically.', table: { defaultValue: { summary: 'undefined' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Defines the size of the component.' },
    variant: { control: 'inline-radio', options: [undefined, 'outlined', 'simple', 'text'], description: 'Specifies the input variant of the component.' },
    content: { control: 'text' },
    onClose: { action: 'onClose', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `<p-message${bind(args, INPUTS)} (onClose)="onClose($event)">{{ content }}</p-message>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Success: Story = { args: { severity: 'success', icon: 'ph ph-check-circle' } };
export const Warn: Story = { args: { severity: 'warn', icon: 'ph ph-warning' } };
export const Error: Story = { args: { severity: 'error', icon: 'ph ph-x-circle' } };
export const Outlined: Story = { args: { variant: 'outlined' } };
export const Simple: Story = { args: { variant: 'simple' } };
export const Closable: Story = { args: { closable: true } };
