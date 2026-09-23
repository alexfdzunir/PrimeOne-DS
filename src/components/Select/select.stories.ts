import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { CITIES } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['placeholder', 'invalid', 'disabled', 'fluid', 'variant', 'size', 'scrollHeight', 'filter', 'readonly', 'loadingIcon', 'filterPlaceholder', 'resetFilterOnHide', 'checkmark', 'dropdownIcon', 'loading', 'optionValue', 'optionDisabled', 'optionGroupLabel', 'optionGroupChildren', 'showClear', 'emptyFilterMessage', 'emptyMessage', 'ariaFilterLabel', 'filterMatchMode', 'tooltip', 'tooltipPosition', 'selectOnFocus', 'autofocusFilter', 'filterValue'];

const meta: Meta = {
  title: 'Form/Select',
  decorators: [moduleMetadata({ imports: [FormsModule, Select] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Filter', 'Clear', 'Filled', 'Invalid', 'Loading', 'Small', 'Disabled'],
  },
  args: {
    placeholder: 'Selecciona una ciudad',
    onChange: fn(),
    onFilter: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onShow: fn(),
    onHide: fn(),
    onClear: fn(),
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Default text to display when no option is selected.' },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'false' } } },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'outlined' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    scrollHeight: { control: 'text', description: 'Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.' },
    filter: { control: 'boolean', description: 'When specified, displays an input field to filter the items on keyup.' },
    readonly: { control: 'boolean', description: 'When present, it specifies that the component cannot be edited.' },
    loadingIcon: { control: 'text', description: 'Icon to display in loading state.' },
    filterPlaceholder: { control: 'text', description: 'Placeholder text to show when filter input is empty.' },
    resetFilterOnHide: { control: 'boolean', description: 'Clears the filter value when hiding the select.' },
    checkmark: { control: 'boolean', description: 'Whether the selected option will be shown with a check mark.' },
    dropdownIcon: { control: 'text', description: 'Icon class of the select icon.' },
    loading: { control: 'boolean', description: 'Whether the select is in loading state.' },
    optionValue: { control: 'text', description: 'Name of the value field of an option.' },
    optionDisabled: { control: 'text', description: 'Name of the disabled field of an option.' },
    optionGroupLabel: { control: 'text', description: 'Name of the label field of an option group.' },
    optionGroupChildren: { control: 'text', description: 'Name of the options field of an option group.' },
    showClear: { control: 'boolean', description: 'When enabled, a clear icon is displayed to clear the value.' },
    emptyFilterMessage: { control: 'text', description: 'Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.' },
    emptyMessage: { control: 'text', description: 'Text to display when there is no data. Defaults to global value in i18n translation configuration.' },
    ariaFilterLabel: { control: 'text', description: 'Defines a string that labels the filter input.' },
    filterMatchMode: { control: 'select', options: [undefined, 'contains', 'endsWith', 'equals', 'gt', 'gte', 'in', 'lt', 'lte', 'notEquals', 'startsWith'], description: 'Defines how the items are filtered.' },
    tooltip: { control: 'text', description: 'Advisory information to display in a tooltip on hover.' },
    tooltipPosition: { control: 'select', options: [undefined, 'bottom', 'left', 'right', 'top'], description: 'Position of the tooltip.' },
    selectOnFocus: { control: 'boolean', description: 'Determines if the option will be selected on focus.' },
    autofocusFilter: { control: 'boolean', description: 'Applies focus to the filter element when the overlay is shown.' },
    filterValue: { control: 'text', description: 'When specified, filter displays with this value.' },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
    onFilter: { action: 'onFilter', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
    onClick: { action: 'onClick', table: { category: 'Eventos' } },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
    onClear: { action: 'onClear', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, cities: CITIES, value: null },
    template: `<p-select [(ngModel)]="value" [options]="cities" optionLabel="name" [style]="{ minWidth: '16rem' }"${bind(args, INPUTS)} (onChange)="onChange($event)" (onFilter)="onFilter($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" (onClick)="onClick($event)" (onShow)="onShow($event)" (onHide)="onHide($event)" (onClear)="onClear($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Filter: Story = { args: { filter: true } };
export const Clear: Story = { args: { showClear: true } };
export const Filled: Story = { args: { variant: 'filled' } };
export const Invalid: Story = { args: { invalid: true } };
export const Loading: Story = { args: { loading: true } };
export const Small: Story = { args: { size: 'small' } };
export const Disabled: Story = { args: { disabled: true } };
