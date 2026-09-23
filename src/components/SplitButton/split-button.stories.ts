import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { SplitButton } from 'primeng/splitbutton';
import { ACTION_ITEMS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['label', 'icon', 'severity', 'raised', 'rounded', 'text', 'outlined', 'size', 'plain', 'iconPos', 'tooltip', 'dropdownIcon', 'dir', 'disabled', 'menuButtonDisabled', 'buttonDisabled'];

const meta: Meta = {
  title: 'Button/SplitButton',
  decorators: [moduleMetadata({ imports: [SplitButton] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Secondary', 'Outlined', 'Small'],
  },
  args: {
    label: 'Guardar',
    icon: 'ph ph-floppy-disk',
    onClick: fn(),
    onMenuHide: fn(),
    onMenuShow: fn(),
    onDropdownClick: fn(),
  },
  argTypes: {
    label: { control: 'text', description: 'Text of the button.' },
    icon: { control: 'text', description: 'Name of the icon.' },
    severity: { control: 'select', options: [undefined, 'contrast', 'danger', 'help', 'info', 'primary', 'secondary', 'success', 'warn'], description: 'Defines the style of the button.' },
    raised: { control: 'boolean', description: 'Add a shadow to indicate elevation.' },
    rounded: { control: 'boolean', description: 'Add a circular border radius to the button.' },
    text: { control: 'boolean', description: 'Add a textual class to the button without a background initially.' },
    outlined: { control: 'boolean', description: 'Add a border class without a background initially.' },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Defines the size of the button.' },
    plain: { control: 'boolean', description: 'Add a plain textual class to the button without a background initially.' },
    iconPos: { control: 'inline-radio', options: [undefined, 'left', 'right'], description: 'Position of the icon.' },
    tooltip: { control: 'text', description: 'Tooltip for the main button.' },
    dropdownIcon: { control: 'text', description: 'Name of the dropdown icon.' },
    dir: { control: 'text', description: 'Indicates the direction of the element.' },
    disabled: { control: 'boolean', description: 'When present, it specifies that the element should be disabled.' },
    menuButtonDisabled: { control: 'boolean', description: 'When present, it specifies that the menu button element should be disabled.' },
    buttonDisabled: { control: 'boolean', description: 'When present, it specifies that the button element should be disabled.' },
    onClick: { action: 'onClick', table: { category: 'Eventos' } },
    onMenuHide: { action: 'onMenuHide', table: { category: 'Eventos' } },
    onMenuShow: { action: 'onMenuShow', table: { category: 'Eventos' } },
    onDropdownClick: { action: 'onDropdownClick', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, items: ACTION_ITEMS },
    template: `<p-splitbutton [model]="items"${bind(args, INPUTS)} (onClick)="onClick($event)" (onMenuHide)="onMenuHide($event)" (onMenuShow)="onMenuShow($event)" (onDropdownClick)="onDropdownClick($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Secondary: Story = { args: { severity: 'secondary' } };
export const Outlined: Story = { args: { outlined: true } };
export const Small: Story = { args: { size: 'small' } };
