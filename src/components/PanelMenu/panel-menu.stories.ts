import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PanelMenu } from 'primeng/panelmenu';
import { MENU_ITEMS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['multiple'];

const meta: Meta = {
  title: 'Menu/PanelMenu',
  decorators: [moduleMetadata({ imports: [PanelMenu] })],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    multiple: { control: 'boolean', description: 'Whether multiple tabs can be activated at the same time or not.' },
  },
  render: (args) => ({
    props: { ...args, items: MENU_ITEMS },
    template: `<p-panelmenu [model]="items" [style]="{ maxWidth: '20rem' }"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true } };
