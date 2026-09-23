import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { bind } from '../../stories/helpers';

const INPUTS = ['pSize', 'variant', 'fluid', 'invalid'];

const meta: Meta = {
  title: 'Form/InputText',
  decorators: [moduleMetadata({ imports: [FormsModule, InputText] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    placeholder: 'Nombre y apellidos',
    disabled: false,
  },
  argTypes: {
    pSize: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Defines the size of the component.' },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'undefined' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'undefined' } } },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `<input pInputText [(ngModel)]="value" [placeholder]="placeholder" [disabled]="disabled"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Filled: Story = { args: { variant: 'filled' } };
export const Invalid: Story = { args: { invalid: true } };
export const Small: Story = { args: { pSize: 'small' } };
export const Large: Story = { args: { pSize: 'large' } };
export const Disabled: Story = { args: { disabled: true } };
