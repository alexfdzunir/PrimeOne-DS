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
    storyOrder: ['Default', 'Popup', 'Dividers'],
    docs: { story: { inline: false, height: '360px' } },
  },
  args: {
    dividers: false,
    onShow: fn(),
    onHide: fn(),
  },
  argTypes: {
    popup: { control: 'boolean', description: 'Defines if menu would displayed as a popup.' },
    dividers: { control: 'boolean', description: 'Separadores entre grupos (Figma: Dividers).' },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, items: args['dividers'] ? FLAT_MENU_ITEMS.flatMap((group, i) => (i ? [{ separator: true }, group] : [group])) : FLAT_MENU_ITEMS },
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
export const Dividers: Story = { args: { dividers: true } };
