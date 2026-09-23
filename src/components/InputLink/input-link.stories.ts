import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { PrimeOneInputLink } from './input-link';
import { bind } from '../../stories/helpers';

const INPUTS = ['label', 'placeholder', 'size', 'invalid', 'disabled'];

const meta: Meta = {
  title: 'Proeduca/InputLink',
  decorators: [moduleMetadata({ imports: [FormsModule, PrimeOneInputLink] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    label: 'Enlace',
  },
  argTypes: {
    label: { control: 'text', description: 'Visible label above the field (Figma "Out Label").' },
    placeholder: { control: 'text', table: { defaultValue: { summary: 'Introduce un enlace' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], table: { defaultValue: { summary: 'undefined' } } },
    invalid: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `<prime-one-inputlink [(ngModel)]="value"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Invalid: Story = { args: { invalid: true } };
export const Small: Story = { args: { size: 'small' } };
