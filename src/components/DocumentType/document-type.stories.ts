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
    storyOrder: ['Default', 'Selected', 'FloatLabel', 'Small', 'Invalid'],
  },
  args: {
    selected: false,
  },
  argTypes: {
    placeholder: { control: 'text', table: { defaultValue: { summary: 'Tipo de documento' } } },
    floatLabel: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], table: { defaultValue: { summary: 'undefined' } } },
    invalid: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    selected: { control: 'boolean', description: 'Con un valor elegido (Figma: State=Selected).' },
  },
  render: (args) => ({
    props: { ...args, value: args['selected'] ? 'passport' : null },
    template: `<prime-one-documenttype [(ngModel)]="value"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const FloatLabel: Story = { args: { floatLabel: true } };
export const Small: Story = { args: { size: 'small' } };
export const Invalid: Story = { args: { invalid: true } };
