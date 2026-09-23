import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { SpeedDial } from 'primeng/speeddial';
import { ACTION_ITEMS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['direction', 'className', 'transitionDelay', 'type', 'radius', 'mask', 'disabled', 'hideOnClickOutside', 'buttonClassName', 'maskClassName', 'showIcon', 'hideIcon', 'rotateAnimation'];

const meta: Meta = {
  title: 'Button/SpeedDial',
  decorators: [moduleMetadata({ imports: [SpeedDial] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    direction: 'up',
    onVisibleChange: fn(),
    onClick: fn(),
    onShow: fn(),
    onHide: fn(),
  },
  argTypes: {
    direction: { control: 'select', options: ['down', 'down-left', 'down-right', 'left', 'right', 'up', 'up-left', 'up-right'], description: 'Specifies the opening direction of actions.' },
    className: { control: 'text', description: 'Style class of the element.' },
    transitionDelay: { control: 'number', description: 'Transition delay step for each action item.' },
    type: { control: 'select', options: [undefined, 'circle', 'linear', 'quarter-circle', 'semi-circle'], description: 'Specifies the opening type of actions.' },
    radius: { control: 'number', description: 'Radius for *circle types.' },
    mask: { control: 'boolean', description: 'Whether to show a mask element behind the speeddial.' },
    disabled: { control: 'boolean', description: 'Whether the component is disabled.' },
    hideOnClickOutside: { control: 'boolean', description: 'Whether the actions close when clicked outside.' },
    buttonClassName: { control: 'text', description: 'Style class of the button element.' },
    maskClassName: { control: 'text', description: 'Style class of the mask element.' },
    showIcon: { control: 'text', description: 'Show icon of the button element.' },
    hideIcon: { control: 'text', description: 'Hide icon of the button element.' },
    rotateAnimation: { control: 'boolean', description: 'Defined to rotate showIcon when hideIcon is not present.' },
    onVisibleChange: { action: 'onVisibleChange', table: { category: 'Eventos' } },
    onClick: { action: 'onClick', table: { category: 'Eventos' } },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, items: ACTION_ITEMS },
    template: `
      <div style="position: relative; height: 320px">
        <p-speeddial [model]="items" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', bottom: 0 }"${bind(args, INPUTS)} (onVisibleChange)="onVisibleChange($event)" (onClick)="onClick($event)" (onShow)="onShow($event)" (onHide)="onHide($event)" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Circle: Story = { args: { type: 'circle', direction: undefined, radius: 80 } };
export const Mask: Story = { args: { mask: true } };
