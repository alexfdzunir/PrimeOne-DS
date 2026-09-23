import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ContextMenu } from 'primeng/contextmenu';
import { ACTION_ITEMS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['global'];

const meta: Meta = {
  title: 'Menu/ContextMenu',
  decorators: [moduleMetadata({ imports: [ContextMenu] })],
  parameters: {
    controls: { expanded: true },
    docs: { story: { inline: false, height: '320px' } },
  },
  args: {
    onShow: fn(),
    onHide: fn(),
  },
  argTypes: {
    global: { control: 'boolean', description: 'Attaches the menu to document instead of a particular item.' },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, items: ACTION_ITEMS },
    template: `
      <div #target style="display: grid; place-items: center; height: 200px; border: 1px dashed var(--p-content-border-color); border-radius: var(--p-content-border-radius)">
        Haz clic derecho aquí
      </div>
      <p-contextmenu [target]="target" [model]="items"${bind(args, INPUTS)} (onShow)="onShow($event)" (onHide)="onHide($event)" />
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
