import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { bind } from '../../stories/helpers';

const INPUTS = ['currency', 'locale', 'invalid', 'disabled', 'fluid', 'variant', 'size', 'min', 'max', 'step', 'showButtons', 'format', 'buttonLayout', 'placeholder', 'title', 'ariaRequired', 'autocomplete', 'incrementButtonClass', 'decrementButtonClass', 'incrementButtonIcon', 'decrementButtonIcon', 'readonly', 'allowEmpty', 'useGrouping', 'minFractionDigits', 'maxFractionDigits', 'prefix', 'suffix', 'showClear'];

const meta: Meta = {
  title: 'Form/InputNumber',
  decorators: [moduleMetadata({ imports: [FormsModule, InputNumber] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Currency', 'Buttons', 'Suffix', 'Invalid'],
  },
  args: {
    mode: 'decimal',
    currency: 'EUR',
    locale: 'es-ES',
    onInput: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onKeyDown: fn(),
    onClear: fn(),
  },
  argTypes: {
    currency: { control: 'text', description: 'The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB. There is no default value; if the style is "currency", the currency property must be provided.' },
    locale: { control: 'text', description: 'Locale to be used in formatting.' },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'false' } } },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'outlined' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    min: { control: 'number', description: 'The value must be greater than or equal to the value.', table: { defaultValue: { summary: 'undefined' } } },
    max: { control: 'number', description: 'The value must be less than or equal to the value.', table: { defaultValue: { summary: 'undefined' } } },
    step: { control: 'number', description: 'Unless the step is set to the any literal, the value must be min + an integral multiple of the step.', table: { defaultValue: { summary: 'undefined' } } },
    showButtons: { control: 'boolean', description: 'Displays spinner buttons.' },
    format: { control: 'boolean', description: 'Whether to format the value.' },
    buttonLayout: { control: 'text', description: 'Layout of the buttons, valid values are "stacked" (default), "horizontal" and "vertical".' },
    placeholder: { control: 'text', description: 'Advisory information to display on input.' },
    title: { control: 'text', description: 'Title text of the input text.' },
    ariaRequired: { control: 'boolean', description: 'Used to indicate that user input is required on an element before a form can be submitted.' },
    autocomplete: { control: 'text', description: 'Used to define a string that autocomplete attribute the current element.' },
    incrementButtonClass: { control: 'text', description: 'Style class of the increment button.' },
    decrementButtonClass: { control: 'text', description: 'Style class of the decrement button.' },
    incrementButtonIcon: { control: 'text', description: 'Style class of the increment button.' },
    decrementButtonIcon: { control: 'text', description: 'Style class of the decrement button.' },
    readonly: { control: 'boolean', description: 'When present, it specifies that an input field is read-only.' },
    allowEmpty: { control: 'boolean', description: 'Determines whether the input field is empty.' },
    useGrouping: { control: 'boolean', description: 'Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.' },
    minFractionDigits: { control: 'number', description: 'The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn\'t provide that information).' },
    maxFractionDigits: { control: 'number', description: 'The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn\'t provide that information).' },
    prefix: { control: 'text', description: 'Text to display before the value.' },
    suffix: { control: 'text', description: 'Text to display after the value.' },
    showClear: { control: 'boolean', description: 'When enabled, a clear icon is displayed to clear the value.' },
    mode: { control: 'text' },
    onInput: { action: 'onInput', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
    onKeyDown: { action: 'onKeyDown', table: { category: 'Eventos' } },
    onClear: { action: 'onClear', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: 1500 },
    template: `<p-inputnumber [(ngModel)]="value"${bind(args, INPUTS)} (onInput)="onInput($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" (onKeyDown)="onKeyDown($event)" (onClear)="onClear($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Currency: Story = { args: { mode: 'currency' } };
export const Buttons: Story = { args: { showButtons: true, buttonLayout: 'horizontal' } };
export const Suffix: Story = { args: { suffix: ' %', min: 0, max: 100 } };
export const Invalid: Story = { args: { invalid: true } };
