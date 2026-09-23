import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { Password } from 'primeng/password';
import { bind } from '../../stories/helpers';

const INPUTS = ['placeholder', 'toggleMask', 'promptLabel', 'weakLabel', 'mediumLabel', 'strongLabel', 'invalid', 'disabled', 'fluid', 'variant', 'size', 'label', 'mediumRegex', 'strongRegex', 'feedback', 'autocomplete', 'showClear'];

const meta: Meta = {
  title: 'Form/Password',
  decorators: [moduleMetadata({ imports: [FormsModule, Password] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'NoFeedback', 'Invalid', 'Small', 'NoToggleMask'],
  },
  args: {
    placeholder: 'Contraseña',
    toggleMask: true,
    promptLabel: 'Introduce una contraseña',
    weakLabel: 'Débil',
    mediumLabel: 'Media',
    strongLabel: 'Fuerte',
    onFocus: fn(),
    onBlur: fn(),
    onClear: fn(),
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Advisory information to display on input.' },
    toggleMask: { control: 'boolean', description: 'Whether to show an icon to display the password as plain text.' },
    promptLabel: { control: 'text', description: 'Text to prompt password entry. Defaults to PrimeNG I18N API configuration.' },
    weakLabel: { control: 'text', description: 'Text for a weak password. Defaults to PrimeNG I18N API configuration.' },
    mediumLabel: { control: 'text', description: 'Text for a medium password. Defaults to PrimeNG I18N API configuration.' },
    strongLabel: { control: 'text', description: 'Text for a strong password. Defaults to PrimeNG I18N API configuration.' },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'false' } } },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'outlined' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    label: { control: 'text', description: 'Label of the input for accessibility.' },
    mediumRegex: { control: 'text', description: 'Regex value for medium regex.' },
    strongRegex: { control: 'text', description: 'Regex value for strong regex.' },
    feedback: { control: 'boolean', description: 'Whether to show the strength indicator or not.' },
    autocomplete: { control: 'text', description: 'Specify automated assistance in filling out password by browser.' },
    showClear: { control: 'boolean', description: 'When enabled, a clear icon is displayed to clear the value.' },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
    onClear: { action: 'onClear', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `<p-password [(ngModel)]="value"${bind(args, INPUTS)} (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" (onClear)="onClear($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const NoFeedback: Story = { args: { feedback: false } };
export const Invalid: Story = { args: { invalid: true } };
export const Small: Story = { args: { size: 'small' } };
export const NoToggleMask: Story = { args: { toggleMask: false } };
