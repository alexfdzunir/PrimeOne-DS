import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';
import { bind } from '../../stories/helpers';

const INPUTS = ['invalid', 'disabled', 'valueColor', 'rangeColor', 'textColor', 'size', 'min', 'max', 'step', 'strokeWidth', 'showValue', 'readonly'];

const meta: Meta = {
  title: 'Form/Knob',
  decorators: [moduleMetadata({ imports: [FormsModule, Knob] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Large', 'ReadOnly'],
  },
  args: {
    onChange: fn(),
  },
  argTypes: {
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    valueColor: { control: 'color' },
    rangeColor: { control: 'color' },
    textColor: { control: 'color' },
    size: { control: 'number', description: 'Size of the component in pixels.' },
    min: { control: 'number', description: 'Mininum boundary value.' },
    max: { control: 'number', description: 'Maximum boundary value.' },
    step: { control: 'number', description: 'Step factor to increment/decrement the value.' },
    strokeWidth: { control: 'number', description: 'Width of the knob stroke.' },
    showValue: { control: 'boolean', description: 'Whether the show the value inside the knob.' },
    readonly: { control: 'boolean', description: 'When present, it specifies that the component value cannot be edited.' },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: 60 },
    template: `<p-knob [(ngModel)]="value"${bind(args, INPUTS)} (onChange)="onChange($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Large: Story = { args: { size: 200, strokeWidth: 8 } };
export const ReadOnly: Story = { args: { readonly: true } };
