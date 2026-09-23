import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { PrimeOneDocumentType } from './document-type';
import { bind } from '../../stories/helpers';

const INPUTS = ['placeholder', 'floatLabel', 'size', 'invalid', 'disabled'];

const meta: Meta = {
  title: 'Proeduca/DocumentType',
  decorators: [moduleMetadata({ imports: [FormsModule, PrimeOneDocumentType] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'FloatLabel', 'Invalid'],
  },
  argTypes: {
    placeholder: { control: 'text', table: { defaultValue: { summary: 'Tipo de documento' } } },
    floatLabel: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], table: { defaultValue: { summary: 'undefined' } } },
    invalid: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
  },
  render: (args) => ({
    props: { ...args, value: null },
    template: `<prime-one-documenttype [(ngModel)]="value"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const FloatLabel: Story = { args: { floatLabel: true } };
export const Invalid: Story = { args: { invalid: true } };
