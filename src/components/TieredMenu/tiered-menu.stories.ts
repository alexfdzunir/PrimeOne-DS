import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { TieredMenu } from 'primeng/tieredmenu';
import { Button } from 'primeng/button';
import { MENU_ITEMS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['popup', 'autoDisplay', 'disabled'];

const meta: Meta = {
  title: 'Menu/TieredMenu',
  decorators: [moduleMetadata({ imports: [TieredMenu, Button] })],
  parameters: {
    controls: { expanded: true },
    docs: { story: { inline: false, height: '360px' } },
  },
  args: {
    onShow: fn(),
    onHide: fn(),
  },
  argTypes: {
    popup: { control: 'boolean', description: 'Defines if menu would displayed as a popup.' },
    autoDisplay: { control: 'boolean', description: 'Whether to show a root submenu on mouse over.', table: { defaultValue: { summary: 'true' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should be disabled.' },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, items: MENU_ITEMS },
    template: `
      @if (popup) {
        <p-button label="Abrir menú" icon="ph ph-list" (onClick)="menu.toggle($event)" />
      }
      <p-tieredmenu #menu [model]="items"${bind(args, INPUTS)} (onShow)="onShow($event)" (onHide)="onHide($event)" />
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Popup: Story = { args: { popup: true } };
