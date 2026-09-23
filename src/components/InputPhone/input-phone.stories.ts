import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { PrimeOneInputPhone } from './input-phone';
import { bind } from '../../stories/helpers';

const INPUTS = ['defaultCountry', 'placeholder', 'label', 'prefixLabel', 'floatLabel', 'size', 'invalid', 'disabled'];

const meta: Meta = {
  title: 'Proeduca/InputPhone',
  decorators: [moduleMetadata({ imports: [FormsModule, PrimeOneInputPhone] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'FloatLabel', 'Invalid'],
  },
  argTypes: {
    defaultCountry: { control: 'text', description: 'ISO code of the prefix shown when there is no value.', table: { defaultValue: { summary: 'ES' } } },
    placeholder: { control: 'text', table: { defaultValue: { summary: 'Teléfono' } } },
    label: { control: 'text', table: { defaultValue: { summary: 'Teléfono' } } },
    prefixLabel: { control: 'text', table: { defaultValue: { summary: 'Prefijo' } } },
    floatLabel: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], table: { defaultValue: { summary: 'undefined' } } },
    invalid: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `<prime-one-inputphone [(ngModel)]="value"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const FloatLabel: Story = { args: { floatLabel: true } };
export const Invalid: Story = { args: { invalid: true } };
