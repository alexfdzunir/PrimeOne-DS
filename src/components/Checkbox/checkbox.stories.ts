import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { bind } from '../../stories/helpers';

const INPUTS = ['invalid', 'disabled', 'inputClass', 'indeterminate', 'checkboxIcon', 'readonly', 'variant', 'size'];

const meta: Meta = {
  title: 'Form/Checkbox',
  decorators: [moduleMetadata({ imports: [FormsModule, Checkbox] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Filled', 'Invalid', 'Small', 'Disabled'],
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    inputClass: { control: 'text', description: 'Style class of the input element.' },
    indeterminate: { control: 'boolean', description: 'When present, it specifies input state as indeterminate.' },
    checkboxIcon: { control: 'text', description: 'Icon class of the checkbox icon.' },
    readonly: { control: 'boolean', description: 'When present, it specifies that the component cannot be edited.' },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'undefined' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: ['Estudiantes'], roles: ['Estudiantes', 'Docentes', 'Personal'] },
    template: `
      <div class="sb-stack">
        @for (role of roles; track role) {
          <div class="sb-row">
            <p-checkbox [inputId]="'check-' + role" [value]="role" [(ngModel)]="value"${bind(args, INPUTS)} (onChange)="onChange($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" />
            <label [attr.for]="'check-' + role">{{ role }}</label>
          </div>
        }
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Filled: Story = { args: { variant: 'filled' } };
export const Invalid: Story = { args: { invalid: true } };
export const Small: Story = { args: { size: 'small' } };
export const Disabled: Story = { args: { disabled: true } };
