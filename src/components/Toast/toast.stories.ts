import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Toast } from 'primeng/toast';
import { ToastTrigger } from '../../stories/demo';
import { bind } from '../../stories/helpers';

const INPUTS = ['position', 'preventOpenDuplicates', 'preventDuplicates'];

const meta: Meta = {
  title: 'Messages/Toast',
  decorators: [moduleMetadata({ imports: [Toast, ToastTrigger] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Success', 'Warn', 'Error', 'Secondary', 'Contrast', 'Sticky', 'BottomCenter'],
    docs: { story: { inline: false, height: '360px' }, description: { component: '`ToastTrigger` (solo stories) llama a `MessageService.add()` con los valores de los controles.' } },
  },
  args: {
    severity: 'info',
    life: 3000,
    sticky: false,
    onClose: fn(),
  },
  argTypes: {
    position: { control: 'select', options: [undefined, 'bottom-center', 'bottom-left', 'bottom-right', 'center', 'top-center', 'top-left', 'top-right'], description: 'Position of the toast in viewport.' },
    preventOpenDuplicates: { control: 'boolean', description: 'It does not add the new message if there is already a toast displayed with the same content' },
    preventDuplicates: { control: 'boolean', description: 'Displays only once a message with the same content.' },
    severity: { control: 'select', options: ['success', 'info', 'warn', 'error', 'secondary', 'contrast'] },
    summary: { control: 'text', description: 'Vacío: el título de ejemplo de cada color (Cambios guardados, Atención, Error...).' },
    detail: { control: 'text', description: 'Vacío: el mensaje de ejemplo de cada color.' },
    life: { control: 'number' },
    sticky: { control: 'boolean' },
    onClose: { action: 'onClose', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-toast [breakpoints]="{ '575px': { width: 'calc(100% - 2rem)', left: '1rem', right: '1rem' } }"${bind(args, INPUTS)} (onClose)="onClose($event)" />
      <po-toast-trigger [severity]="severity" [summary]="summary" [detail]="detail" [life]="life" [sticky]="sticky" />
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Success: Story = { args: { severity: 'success' } };
export const Warn: Story = { args: { severity: 'warn' } };
export const Error: Story = { args: { severity: 'error' } };
export const Secondary: Story = { args: { severity: 'secondary' } };
export const Contrast: Story = { args: { severity: 'contrast' } };
export const Sticky: Story = { args: { sticky: true } };
export const BottomCenter: Story = { args: { position: 'bottom-center' } };
