import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { InputOtp } from 'primeng/inputotp';
import { bind } from '../../stories/helpers';

const INPUTS = ['length', 'invalid', 'disabled', 'readonly', 'mask', 'integerOnly', 'variant', 'size'];

const meta: Meta = {
  title: 'Form/InputOtp',
  decorators: [moduleMetadata({ imports: [FormsModule, InputOtp] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    length: 4,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    length: { control: 'number', description: 'Number of characters to initiate.' },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    readonly: { control: 'boolean', description: 'When present, it specifies that an input field is read-only.' },
    mask: { control: 'boolean', description: 'Mask pattern.' },
    integerOnly: { control: 'boolean', description: 'When present, it specifies that an input field is integer-only.' },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'undefined' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `<p-inputotp [(ngModel)]="value"${bind(args, INPUTS)} (onChange)="onChange($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Mask: Story = { args: { mask: true } };
export const Six: Story = { args: { length: 6, integerOnly: true } };
