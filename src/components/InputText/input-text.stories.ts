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
    storyOrder: ['Default', 'Filled', 'Invalid', 'Small', 'Large', 'Disabled'],
  },
  args: {
    label: 'Nombre',
    placeholder: 'Nombre y apellidos',
    helper: 'Tal como aparece en tu documento de identidad.',
    disabled: false,
  },
  argTypes: {
    pSize: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Defines the size of the component.' },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'undefined' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'undefined' } } },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    label: { control: 'text', description: 'Etiqueta del campo (Show Label en Figma). Vacía, no se muestra.' },
    placeholder: { control: 'text' },
    helper: { control: 'text', description: 'Texto de ayuda bajo el campo (Show Helper en Figma). Vacío, no se muestra.' },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 20rem">
        @if (label) {
          <label for="po-inputtext">{{ label }}</label>
        }
        <input pInputText id="po-inputtext" [(ngModel)]="value" [placeholder]="placeholder" [disabled]="disabled"${bind(args, INPUTS)} />
        @if (helper) {
          <small [style.color]="invalid ? 'var(--p-form-field-invalid-border-color)' : 'var(--p-text-muted-color)'">{{ helper }}</small>
        }
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Filled: Story = { args: { variant: 'filled' } };
export const Invalid: Story = { args: { invalid: true, helper: 'Este campo es obligatorio.' } };
export const Small: Story = { args: { pSize: 'small' } };
export const Large: Story = { args: { pSize: 'large' } };
export const Disabled: Story = { args: { disabled: true } };
