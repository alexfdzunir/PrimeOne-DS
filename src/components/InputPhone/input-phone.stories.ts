import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { PrimeOneInputPhone } from './input-phone';
import { bind } from '../../stories/helpers';

const INPUTS = ['defaultCountry', 'placeholder', 'label', 'prefixLabel', 'floatLabel', 'size', 'invalid'];

const meta: Meta = {
  title: 'Proeduca/InputPhone',
  decorators: [moduleMetadata({ imports: [FormsModule, PrimeOneInputPhone] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'FloatLabel', 'Small', 'Invalid', 'Disabled'],
  },
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: { control: 'boolean', description: 'Deshabilitado vía ngModel (Figma: Disabled).', table: { defaultValue: { summary: 'false' } } },
    defaultCountry: { control: 'text', description: 'ISO code of the prefix shown when there is no value.', table: { defaultValue: { summary: 'ES' } } },
    placeholder: { control: 'text', table: { defaultValue: { summary: 'Teléfono' } } },
    label: { control: 'text', table: { defaultValue: { summary: 'Teléfono' } } },
    prefixLabel: { control: 'text', table: { defaultValue: { summary: 'Prefijo' } } },
    floatLabel: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], table: { defaultValue: { summary: 'undefined' } } },
    invalid: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `<prime-one-inputphone [(ngModel)]="value" [disabled]="disabled"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const FloatLabel: Story = { args: { floatLabel: true } };
export const Small: Story = { args: { size: 'small' } };
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };
