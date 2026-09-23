import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { FLAT_MENU_ITEMS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['popup'];

const meta: Meta = {
  title: 'Menu/Menu',
  decorators: [moduleMetadata({ imports: [Menu, Button] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Popup'],
    docs: { story: { inline: false, height: '360px' } },
  },
  args: {
    onShow: fn(),
    onHide: fn(),
  },
  argTypes: {
    popup: { control: 'boolean', description: 'Defines if menu would displayed as a popup.' },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, items: FLAT_MENU_ITEMS },
    template: `
      @if (popup) {
        <p-button label="Abrir menú" icon="ph ph-list" (onClick)="menu.toggle($event)" />
      }
      <p-menu #menu [model]="items"${bind(args, INPUTS)} (onShow)="onShow($event)" (onHide)="onHide($event)" />
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Popup: Story = { args: { popup: true } };
