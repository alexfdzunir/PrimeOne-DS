import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { bind } from '../../stories/helpers';

const INPUTS = ['variant'];

const meta: Meta = {
  title: 'Form/FloatLabel',
  decorators: [moduleMetadata({ imports: [FormsModule, FloatLabel, InputText] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'In', 'Over', 'Filled', 'Invalid', 'Disabled'],
  },
  args: {
    variant: 'on',
    label: 'Nombre',
    value: '',
    invalid: false,
    disabled: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['in', 'on', 'over'], description: 'Defines the positioning of the label relative to the input.' },
    label: { control: 'text' },
    value: { control: 'text' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding-top: 1rem">
        <p-floatlabel${bind(args, INPUTS)}>
          <input pInputText id="po-float" [(ngModel)]="value" [invalid]="invalid" [disabled]="disabled" autocomplete="off" />
          <label for="po-float">{{ label }}</label>
        </p-floatlabel>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const In: Story = { args: { variant: 'in' } };
export const Over: Story = { args: { variant: 'over' } };
export const Filled: Story = { args: { value: 'Ana García' } };
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };
