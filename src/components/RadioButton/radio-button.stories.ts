import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { RadioButton } from 'primeng/radiobutton';
import { bind } from '../../stories/helpers';

const INPUTS = ['invalid', 'disabled', 'binary', 'variant', 'size'];

const meta: Meta = {
  title: 'Form/RadioButton',
  decorators: [moduleMetadata({ imports: [FormsModule, RadioButton] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    binary: { control: 'boolean', description: 'Allows to select a boolean value.' },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'undefined' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    onClick: { action: 'onClick', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: 'Estudiantes', roles: ['Estudiantes', 'Docentes', 'Personal'] },
    template: `
      <div class="sb-stack">
        @for (role of roles; track role) {
          <div class="sb-row">
            <p-radiobutton name="role" [inputId]="'radio-' + role" [value]="role" [(ngModel)]="value"${bind(args, INPUTS)} (onClick)="onClick($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" />
            <label [attr.for]="'radio-' + role">{{ role }}</label>
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
