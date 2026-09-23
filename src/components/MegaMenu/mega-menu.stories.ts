import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { MegaMenu } from 'primeng/megamenu';
import { MEGA_MENU_ITEMS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['scrollHeight', 'disabled'];

const meta: Meta = {
  title: 'Menu/MegaMenu',
  decorators: [moduleMetadata({ imports: [MegaMenu] })],
  parameters: {
    controls: { expanded: true },
    docs: { story: { inline: false, height: '320px' } },
  },
  args: {
    orientation: undefined,
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: [undefined, 'horizontal', 'vertical'], description: 'Defines the orientation.' },
    scrollHeight: { control: 'text', description: 'Height of the viewport, a scrollbar is defined if height of list exceeds this value.' },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should be disabled.' },
  },
  render: (args) => ({
    props: { ...args, items: MEGA_MENU_ITEMS },
    template: `<p-megamenu [model]="items" [orientation]="orientation ?? 'horizontal'"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' } };
