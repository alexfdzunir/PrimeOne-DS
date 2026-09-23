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
  },
  args: {
    label: 'Nombre',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: [undefined, 'in', 'on', 'over'], description: 'Defines the positioning of the label relative to the input.' },
    label: { control: 'text' },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <p-floatlabel${bind(args, INPUTS)}>
        <input pInputText id="po-float" [(ngModel)]="value" autocomplete="off" />
        <label for="po-float">{{ label }}</label>
      </p-floatlabel>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const In: Story = { args: { variant: 'in' } };
export const On: Story = { args: { variant: 'on' } };
