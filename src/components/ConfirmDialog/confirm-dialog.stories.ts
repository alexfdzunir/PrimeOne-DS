import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmTrigger } from '../../stories/demo';
import { bind } from '../../stories/helpers';

const INPUTS = ['header', 'message', 'icon', 'acceptLabel', 'rejectLabel', 'acceptIcon', 'acceptVisible', 'rejectIcon', 'rejectVisible', 'closeOnEscape', 'dismissableMask', 'blockScroll', 'closable', 'focusTrap', 'defaultFocus', 'modal', 'position', 'draggable'];

const meta: Meta = {
  title: 'Overlay/ConfirmDialog',
  decorators: [moduleMetadata({ imports: [ConfirmDialog, ConfirmTrigger] })],
  parameters: {
    controls: { expanded: true },
    docs: { story: { inline: false, height: '360px' }, description: { component: '`ConfirmTrigger` (solo stories) llama a `ConfirmationService.confirm()`; el contenido sale de los inputs de `p-confirmdialog`.' } },
  },
  args: {
    header: 'Confirmar eliminación',
    message: '¿Seguro que quieres eliminar este elemento?',
    icon: 'ph ph-warning',
    acceptLabel: 'Eliminar',
    rejectLabel: 'Cancelar',
    accepted: fn(),
    rejected: fn(),
  },
  argTypes: {
    header: { control: 'text', description: 'Title text of the dialog.' },
    message: { control: 'text', description: 'Message of the confirmation.' },
    icon: { control: 'text', description: 'Icon to display next to message.' },
    acceptLabel: { control: 'text', description: 'Label of the accept button.' },
    rejectLabel: { control: 'text', description: 'Label of the reject button.' },
    acceptIcon: { control: 'text', description: 'Icon of the accept button.' },
    acceptVisible: { control: 'boolean', description: 'Visibility of the accept button.' },
    rejectIcon: { control: 'text', description: 'Icon of the reject button.' },
    rejectVisible: { control: 'boolean', description: 'Visibility of the reject button.' },
    closeOnEscape: { control: 'boolean', description: 'Specifies if pressing escape key should hide the dialog.' },
    dismissableMask: { control: 'boolean', description: 'Specifies if clicking the modal background should hide the dialog.' },
    blockScroll: { control: 'boolean', description: 'Determines whether scrolling behavior should be blocked within the component.' },
    closable: { control: 'boolean', description: 'Adds a close icon to the header to hide the dialog.' },
    focusTrap: { control: 'boolean', description: 'When enabled, can only focus on elements inside the confirm dialog.' },
    defaultFocus: { control: 'select', options: [undefined, 'accept', 'close', 'none', 'reject'], description: 'Element to receive the focus when the dialog gets visible.' },
    modal: { control: 'boolean', description: 'Defines if background should be blocked when dialog is displayed.' },
    position: { control: 'select', options: [undefined, 'bottom', 'bottomleft', 'bottomright', 'center', 'left', 'right', 'top', 'topleft', 'topright'], description: 'Allows getting the position of the component.' },
    draggable: { control: 'boolean', description: 'Enables dragging to change the position using header.' },
    accepted: { action: 'accepted', table: { category: 'Eventos' } },
    rejected: { action: 'rejected', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-confirmdialog [style]="{ width: '26rem' }"${bind(args, INPUTS)} />
      <po-confirm-trigger (accepted)="accepted($event)" (rejected)="rejected($event)" />
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Top: Story = { args: { position: 'top' } };
