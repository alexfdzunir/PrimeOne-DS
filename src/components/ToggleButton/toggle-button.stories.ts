import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { ToggleButton } from 'primeng/togglebutton';
import { bind } from '../../stories/helpers';

const INPUTS = ['onLabel', 'offLabel', 'onIcon', 'offIcon', 'invalid', 'disabled', 'iconPos', 'size', 'allowEmpty', 'fluid'];

const meta: Meta = {
  title: 'Form/ToggleButton',
  decorators: [moduleMetadata({ imports: [FormsModule, ToggleButton] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onLabel: 'Activado',
    offLabel: 'Desactivado',
    onIcon: 'ph ph-check',
    offIcon: 'ph ph-x',
    onChange: fn(),
  },
  argTypes: {
    onLabel: { control: 'text', description: 'Label for the on state.' },
    offLabel: { control: 'text', description: 'Label for the off state.' },
    onIcon: { control: 'text', description: 'Icon for the on state.' },
    offIcon: { control: 'text', description: 'Icon for the off state.' },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    iconPos: { control: 'inline-radio', options: [undefined, 'left', 'right'], description: 'Position of the icon.' },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Defines the size of the component.' },
    allowEmpty: { control: 'boolean', description: 'Whether selection can not be cleared.' },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'undefined' } } },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: false },
    template: `<p-togglebutton [(ngModel)]="value"${bind(args, INPUTS)} (onChange)="onChange($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Invalid: Story = { args: { invalid: true } };
