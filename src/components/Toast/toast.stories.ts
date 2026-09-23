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
    docs: { story: { inline: false, height: '360px' }, description: { component: '`ToastTrigger` (solo stories) llama a `MessageService.add()` con los valores de los controles.' } },
  },
  args: {
    severity: 'info',
    summary: 'Información',
    detail: 'Los cambios se han guardado correctamente.',
    life: 3000,
    sticky: false,
    onClose: fn(),
  },
  argTypes: {
    position: { control: 'select', options: [undefined, 'bottom-center', 'bottom-left', 'bottom-right', 'center', 'top-center', 'top-left', 'top-right'], description: 'Position of the toast in viewport.' },
    preventOpenDuplicates: { control: 'boolean', description: 'It does not add the new message if there is already a toast displayed with the same content' },
    preventDuplicates: { control: 'boolean', description: 'Displays only once a message with the same content.' },
    severity: { control: 'select', options: ['success', 'info', 'warn', 'error', 'secondary', 'contrast'] },
    summary: { control: 'text' },
    detail: { control: 'text' },
    life: { control: 'number' },
    sticky: { control: 'boolean' },
    onClose: { action: 'onClose', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-toast${bind(args, INPUTS)} (onClose)="onClose($event)" />
      <po-toast-trigger [severity]="severity" [summary]="summary" [detail]="detail" [life]="life" [sticky]="sticky" />
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Success: Story = { args: { severity: 'success', summary: 'Guardado' } };
export const Error: Story = { args: { severity: 'error', summary: 'Error' } };
export const BottomCenter: Story = { args: { position: 'bottom-center' } };
