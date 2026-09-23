import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Drawer } from 'primeng/drawer';
import { Button } from 'primeng/button';
import { bind } from '../../stories/helpers';

const INPUTS = ['header', 'blockScroll', 'modal', 'dismissible', 'closeOnEscape', 'visible', 'position', 'fullScreen', 'closable'];

const meta: Meta = {
  title: 'Overlay/Drawer',
  decorators: [moduleMetadata({ imports: [Drawer, Button] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Right', 'Bottom', 'FullScreen'],
    docs: { story: { inline: false, height: '460px' } },
  },
  args: {
    header: 'Panel lateral',
    content: 'Contenido de ejemplo del componente. Cambia los controles del panel inferior para ver su comportamiento real con los tokens del tema seleccionado.',
    onShow: fn(),
    onHide: fn(),
  },
  argTypes: {
    header: { control: 'text', description: 'Title content of the dialog.' },
    blockScroll: { control: 'boolean', description: 'Whether to block scrolling of the document when drawer is active.' },
    modal: { control: 'boolean', description: 'Whether an overlay mask is displayed behind the drawer.' },
    dismissible: { control: 'boolean', description: 'Whether to dismiss drawer on click of the mask.' },
    closeOnEscape: { control: 'boolean', description: 'Specifies if pressing escape key should hide the drawer.' },
    visible: { control: 'boolean', description: 'The visible property is an input that determines the visibility of the component.', table: { defaultValue: { summary: 'false' } } },
    position: { control: 'select', options: [undefined, 'bottom', 'full', 'left', 'right', 'top'], description: 'Specifies the position of the drawer, valid values are "left", "right", "bottom" and "top".', table: { defaultValue: { summary: 'left' } } },
    fullScreen: { control: 'boolean', description: 'Adds a close icon to the header to hide the dialog.', table: { defaultValue: { summary: 'false' } } },
    closable: { control: 'boolean', description: 'Whether to display close button.', table: { defaultValue: { summary: 'true' } } },
    content: { control: 'text' },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, visible: true },
    template: `
      <p-button label="Abrir panel" icon="ph ph-sidebar-simple" (onClick)="visible = true" />
      <p-drawer [(visible)]="visible"${bind(args, INPUTS)} (onShow)="onShow($event)" (onHide)="onHide($event)">
        <p style="margin: 0">{{ content }}</p>
      </p-drawer>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Right: Story = { args: { position: 'right' } };
export const Bottom: Story = { args: { position: 'bottom' } };
export const FullScreen: Story = { args: { fullScreen: true } };
