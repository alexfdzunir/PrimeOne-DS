import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { CascadeSelect } from 'primeng/cascadeselect';
import { COUNTRIES } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['placeholder', 'invalid', 'disabled', 'searchMessage', 'emptyMessage', 'selectionMessage', 'emptySearchMessage', 'emptySelectionMessage', 'selectOnFocus', 'optionValue', 'value', 'inputLabel', 'showClear', 'loading', 'loadingIcon', 'size', 'variant', 'fluid'];

const meta: Meta = {
  title: 'Form/CascadeSelect',
  decorators: [moduleMetadata({ imports: [FormsModule, CascadeSelect] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Filled', 'Invalid', 'Small', 'Disabled'],
  },
  args: {
    placeholder: 'Selecciona una ciudad',
    onChange: fn(),
    onGroupChange: fn(),
    onShow: fn(),
    onHide: fn(),
    onClear: fn(),
    onBeforeShow: fn(),
    onBeforeHide: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Default text to display when no option is selected.' },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    searchMessage: { control: 'text', description: 'Text to display when the search is active. Defaults to global value in i18n translation configuration.', table: { defaultValue: { summary: '{0} results are available' } } },
    emptyMessage: { control: 'text', description: 'Text to display when there is no data. Defaults to global value in i18n translation configuration.' },
    selectionMessage: { control: 'text', description: 'Text to be displayed in hidden accessible field when options are selected. Defaults to global value in i18n translation configuration.', table: { defaultValue: { summary: '{0} items selected' } } },
    emptySearchMessage: { control: 'text', description: 'Text to display when filtering does not return any results. Defaults to value from PrimeNG locale configuration.', table: { defaultValue: { summary: 'No available options' } } },
    emptySelectionMessage: { control: 'text', description: 'Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.', table: { defaultValue: { summary: 'No selected item' } } },
    selectOnFocus: { control: 'boolean', description: 'Determines if the option will be selected on focus.' },
    optionValue: { control: 'text', description: 'Property name or getter function to use as the value of an option, defaults to the option itself when not defined.' },
    value: { control: 'text', description: 'Selected value of the component.' },
    inputLabel: { control: 'text', description: 'Label of the input for accessibility.' },
    showClear: { control: 'boolean', description: 'When enabled, a clear icon is displayed to clear the value.' },
    loading: { control: 'boolean', description: 'Whether the dropdown is in loading state.' },
    loadingIcon: { control: 'text', description: 'Icon to display in loading state.' },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'undefined' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'undefined' } } },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
    onGroupChange: { action: 'onGroupChange', table: { category: 'Eventos' } },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
    onClear: { action: 'onClear', table: { category: 'Eventos' } },
    onBeforeShow: { action: 'onBeforeShow', table: { category: 'Eventos' } },
    onBeforeHide: { action: 'onBeforeHide', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, countries: COUNTRIES, value: null },
    template: `<p-cascadeselect [(ngModel)]="value" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" [style]="{ minWidth: '16rem' }"${bind(args, INPUTS)} (onChange)="onChange($event)" (onGroupChange)="onGroupChange($event)" (onShow)="onShow($event)" (onHide)="onHide($event)" (onClear)="onClear($event)" (onBeforeShow)="onBeforeShow($event)" (onBeforeHide)="onBeforeHide($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Filled: Story = { args: { variant: 'filled' } };
export const Invalid: Story = { args: { invalid: true } };
export const Small: Story = { args: { size: 'small' } };
export const Disabled: Story = { args: { disabled: true } };
