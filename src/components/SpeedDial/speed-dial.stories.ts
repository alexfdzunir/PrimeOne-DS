import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { SpeedDial } from 'primeng/speeddial';
import type { MenuItem } from 'primeng/api';
import { bind } from '../../stories/helpers';

const INPUTS = ['type', 'direction', 'className', 'transitionDelay', 'radius', 'mask', 'disabled', 'hideOnClickOutside', 'buttonClassName', 'maskClassName', 'showIcon', 'hideIcon', 'rotateAnimation'];
const ACTIONS: MenuItem[] = [
  { label: 'Editar', icon: 'ph ph-pencil-simple' },
  { label: 'Compartir', icon: 'ph ph-share-network' },
  { label: 'Descargar', icon: 'ph ph-download-simple' },
  { label: 'Eliminar', icon: 'ph ph-trash' },
];
/** Anchors the button where the chosen direction has room (as in the PrimeNG demos). */
function speedDialPosition(type: string | undefined, direction: string | undefined): Record<string, string> {
  const center = 'calc(50% - 1.25rem)';
  if (type === 'circle') return { position: 'absolute', top: center, left: center };
  const way = direction ?? 'up';
  const style: Record<string, string> = { position: 'absolute' };
  if (way.startsWith('up')) style['bottom'] = '1rem';
  if (way.startsWith('down')) style['top'] = '1rem';
  if (way === 'left' || way === 'right') style['top'] = center;
  if (way === 'up' || way === 'down') style['left'] = center;
  if (way.endsWith('left')) style['right'] = '1rem';
  if (way.endsWith('right')) style['left'] = '1rem';
  return style;
}

const meta: Meta = {
  title: 'Button/SpeedDial',
  decorators: [moduleMetadata({ imports: [SpeedDial] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Down', 'Left', 'Right', 'Circle', 'SemiCircleUp', 'SemiCircleDown', 'SemiCircleLeft', 'SemiCircleRight', 'QuarterUpLeft', 'QuarterUpRight', 'QuarterDownLeft', 'QuarterDownRight', 'Mask'],
    docs: { story: { inline: false, height: '460px' } },
  },
  args: {
    type: 'linear',
    direction: 'up',
    onVisibleChange: fn(),
    onClick: fn(),
    onShow: fn(),
    onHide: fn(),
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['circle', 'linear', 'quarter-circle', 'semi-circle'], description: 'Specifies the opening type of actions.' },
    direction: { control: 'select', options: ['down', 'down-left', 'down-right', 'left', 'right', 'up', 'up-left', 'up-right'], description: 'Specifies the opening direction of actions.' },
    className: { control: 'text', description: 'Style class of the element.' },
    transitionDelay: { control: 'number', description: 'Transition delay step for each action item.' },
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
    props: { ...args, items: ACTIONS, position: speedDialPosition(args['type'], args['direction']) },
    template: `
      <div style="position: relative; height: 420px; border: 1px dashed var(--p-content-border-color); border-radius: var(--p-content-border-radius)">
        <p-speeddial [model]="items" [style]="position"${bind(args, INPUTS)} (onVisibleChange)="onVisibleChange($event)" (onClick)="onClick($event)" (onShow)="onShow($event)" (onHide)="onHide($event)" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Down: Story = { args: { direction: 'down' } };
export const Left: Story = { args: { direction: 'left' } };
export const Right: Story = { args: { direction: 'right' } };
export const Circle: Story = { args: { type: 'circle', radius: 80 } };
export const SemiCircleUp: Story = { args: { type: 'semi-circle', direction: 'up', radius: 80 } };
export const SemiCircleDown: Story = { args: { type: 'semi-circle', direction: 'down', radius: 80 } };
export const SemiCircleLeft: Story = { args: { type: 'semi-circle', direction: 'left', radius: 80 } };
export const SemiCircleRight: Story = { args: { type: 'semi-circle', direction: 'right', radius: 80 } };
export const QuarterUpLeft: Story = { args: { type: 'quarter-circle', direction: 'up-left', radius: 120 } };
export const QuarterUpRight: Story = { args: { type: 'quarter-circle', direction: 'up-right', radius: 120 } };
export const QuarterDownLeft: Story = { args: { type: 'quarter-circle', direction: 'down-left', radius: 120 } };
export const QuarterDownRight: Story = { args: { type: 'quarter-circle', direction: 'down-right', radius: 120 } };
export const Mask: Story = { args: { mask: true } };
