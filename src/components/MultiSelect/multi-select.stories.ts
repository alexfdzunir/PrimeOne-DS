import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { CITIES } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['placeholder', 'invalid', 'disabled', 'readonly', 'filter', 'filterPlaceHolder', 'overlayVisible', 'displaySelectedLabel', 'maxSelectedLabels', 'selectionLimit', 'selectedItemsLabel', 'showToggleAll', 'emptyFilterMessage', 'emptyMessage', 'resetFilterOnHide', 'dropdownIcon', 'chipIcon', 'optionValue', 'optionDisabled', 'optionGroupLabel', 'optionGroupChildren', 'showHeader', 'scrollHeight', 'loading', 'loadingIcon', 'ariaFilterLabel', 'filterMatchMode', 'tooltip', 'tooltipPosition', 'autofocusFilter', 'display', 'autocomplete', 'showClear', 'filterValue', 'selectAll', 'selectOnFocus', 'highlightOnSelect', 'size', 'variant', 'fluid'];

const meta: Meta = {
  title: 'Form/MultiSelect',
  decorators: [moduleMetadata({ imports: [FormsModule, MultiSelect] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Chips', 'Filled', 'Invalid', 'Small', 'Disabled'],
  },
  args: {
    placeholder: 'Selecciona ciudades',
    onChange: fn(),
    onFilter: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onClear: fn(),
    onPanelShow: fn(),
    onPanelHide: fn(),
    onRemove: fn(),
    onSelectAllChange: fn(),
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Label to display when there are no selections.' },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    readonly: { control: 'boolean', description: 'When present, it specifies that the component cannot be edited.' },
    filter: { control: 'boolean', description: 'When specified, displays an input field to filter the items on keyup.' },
    filterPlaceHolder: { control: 'text', description: 'Defines placeholder of the filter input.' },
    overlayVisible: { control: 'boolean', description: 'Specifies the visibility of the options panel.' },
    displaySelectedLabel: { control: 'boolean', description: 'Whether to show labels of selected item labels or use default label.', table: { defaultValue: { summary: 'true' } } },
    maxSelectedLabels: { control: 'number', description: 'Decides how many selected item labels to show at most.', table: { defaultValue: { summary: '3' } } },
    selectionLimit: { control: 'number', description: 'Maximum number of selectable items.' },
    selectedItemsLabel: { control: 'text', description: 'Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow.' },
    showToggleAll: { control: 'boolean', description: 'Whether to show the checkbox at header to toggle all items at once.' },
    emptyFilterMessage: { control: 'text', description: 'Text to display when filtering does not return any results.' },
    emptyMessage: { control: 'text', description: 'Text to display when there is no data. Defaults to global value in i18n translation configuration.' },
    resetFilterOnHide: { control: 'boolean', description: 'Clears the filter value when hiding the dropdown.' },
    dropdownIcon: { control: 'text', description: 'Icon class of the dropdown icon.' },
    chipIcon: { control: 'text', description: 'Icon class of the chip icon.' },
    optionValue: { control: 'text', description: 'Name of the value field of an option.' },
    optionDisabled: { control: 'text', description: 'Name of the disabled field of an option.' },
    optionGroupLabel: { control: 'text', description: 'Name of the label field of an option group.' },
    optionGroupChildren: { control: 'text', description: 'Name of the options field of an option group.' },
    showHeader: { control: 'boolean', description: 'Whether to show the header.' },
    scrollHeight: { control: 'text', description: 'Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.' },
    loading: { control: 'boolean', description: 'Whether the multiselect is in loading state.' },
    loadingIcon: { control: 'text', description: 'Icon to display in loading state.' },
    ariaFilterLabel: { control: 'text', description: 'Defines a string that labels the filter input.' },
    filterMatchMode: { control: 'select', options: [undefined, 'contains', 'endsWith', 'equals', 'gt', 'gte', 'in', 'lt', 'lte', 'notEquals', 'startsWith'], description: 'Defines how the items are filtered.' },
    tooltip: { control: 'text', description: 'Advisory information to display in a tooltip on hover.' },
    tooltipPosition: { control: 'select', options: [undefined, 'bottom', 'left', 'right', 'top'], description: 'Position of the tooltip.' },
    autofocusFilter: { control: 'boolean', description: 'Applies focus to the filter element when the overlay is shown.' },
    display: { control: 'inline-radio', options: [undefined, 'chip', 'comma'], description: 'Defines how the selected items are displayed.' },
    autocomplete: { control: 'text', description: 'Defines the autocomplete is active.' },
    showClear: { control: 'boolean', description: 'When enabled, a clear icon is displayed to clear the value.' },
    filterValue: { control: 'text', description: 'When specified, filter displays with this value.' },
    selectAll: { control: 'boolean', description: 'Whether all data is selected.' },
    selectOnFocus: { control: 'boolean', description: 'Determines if the option will be selected on focus.' },
    highlightOnSelect: { control: 'boolean', description: 'Whether the selected option will be add highlight class.' },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'undefined' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'undefined' } } },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
    onFilter: { action: 'onFilter', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
    onClick: { action: 'onClick', table: { category: 'Eventos' } },
    onClear: { action: 'onClear', table: { category: 'Eventos' } },
    onPanelShow: { action: 'onPanelShow', table: { category: 'Eventos' } },
    onPanelHide: { action: 'onPanelHide', table: { category: 'Eventos' } },
    onRemove: { action: 'onRemove', table: { category: 'Eventos' } },
    onSelectAllChange: { action: 'onSelectAllChange', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, cities: CITIES, value: [] },
    template: `<p-multiselect [(ngModel)]="value" [options]="cities" optionLabel="name" [style]="{ minWidth: '16rem' }"${bind(args, INPUTS)} (onChange)="onChange($event)" (onFilter)="onFilter($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" (onClick)="onClick($event)" (onClear)="onClear($event)" (onPanelShow)="onPanelShow($event)" (onPanelHide)="onPanelHide($event)" (onRemove)="onRemove($event)" (onSelectAllChange)="onSelectAllChange($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Chips: Story = { args: { display: 'chip' } };
export const Filled: Story = { args: { variant: 'filled' } };
export const Invalid: Story = { args: { invalid: true } };
export const Small: Story = { args: { size: 'small' } };
export const Disabled: Story = { args: { disabled: true } };
