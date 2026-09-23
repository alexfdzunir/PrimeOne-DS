import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';
import { CITIES } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['invalid', 'disabled', 'searchMessage', 'emptySelectionMessage', 'selectionMessage', 'selectOnFocus', 'filterMessage', 'scrollHeight', 'multiple', 'readonly', 'checkbox', 'filter', 'filterMatchMode', 'metaKeySelection', 'showToggleAll', 'optionValue', 'optionGroupChildren', 'optionGroupLabel', 'ariaFilterLabel', 'filterPlaceHolder', 'emptyFilterMessage', 'emptyMessage', 'filterValue', 'selectAll', 'striped', 'highlightOnSelect', 'checkmark', 'fluid'];

const meta: Meta = {
  title: 'Form/Listbox',
  decorators: [moduleMetadata({ imports: [FormsModule, Listbox] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Multiple', 'Filter', 'Striped', 'Invalid', 'Disabled'],
  },
  args: {
    onChange: fn(),
    onClick: fn(),
    onDblClick: fn(),
    onFilter: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onSelectAllChange: fn(),
    onDrop: fn(),
  },
  argTypes: {
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    searchMessage: { control: 'text', description: 'Text to display when the search is active. Defaults to global value in i18n translation configuration.', table: { defaultValue: { summary: '{0} results are available' } } },
    emptySelectionMessage: { control: 'text', description: 'Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.', table: { defaultValue: { summary: 'No selected item' } } },
    selectionMessage: { control: 'text', description: 'Text to be displayed in hidden accessible field when options are selected. Defaults to global value in i18n translation configuration.', table: { defaultValue: { summary: '{0} items selected' } } },
    selectOnFocus: { control: 'boolean', description: 'When enabled, the focused option is selected.' },
    filterMessage: { control: 'text', description: 'Text to display when filtering.' },
    scrollHeight: { control: 'text', description: 'Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.' },
    multiple: { control: 'boolean', description: 'When specified, allows selecting multiple values.' },
    readonly: { control: 'boolean', description: 'When present, it specifies that the element value cannot be changed.' },
    checkbox: { control: 'boolean', description: 'When specified, allows selecting items with checkboxes.' },
    filter: { control: 'boolean', description: 'When specified, displays a filter input at header.' },
    filterMatchMode: { control: 'select', options: [undefined, 'contains', 'endsWith', 'equals', 'gt', 'gte', 'in', 'lt', 'lte', 'notEquals', 'startsWith'], description: 'Defines how the items are filtered.' },
    metaKeySelection: { control: 'boolean', description: 'Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.' },
    showToggleAll: { control: 'boolean', description: 'Whether header checkbox is shown in multiple mode.' },
    optionValue: { control: 'text', description: 'Name of the value field of an option.' },
    optionGroupChildren: { control: 'text', description: 'Name of the options field of an option group.' },
    optionGroupLabel: { control: 'text', description: 'Name of the label field of an option group.' },
    ariaFilterLabel: { control: 'text', description: 'Defines a string that labels the filter input.' },
    filterPlaceHolder: { control: 'text', description: 'Defines placeholder of the filter input.' },
    emptyFilterMessage: { control: 'text', description: 'Text to display when filtering does not return any results.' },
    emptyMessage: { control: 'text', description: 'Text to display when there is no data. Defaults to global value in i18n translation configuration.' },
    filterValue: { control: 'text', description: 'When specified, filter displays with this value.' },
    selectAll: { control: 'boolean', description: 'Whether all data is selected.' },
    striped: { control: 'boolean', description: 'Whether to displays rows with alternating colors.', table: { defaultValue: { summary: 'false' } } },
    highlightOnSelect: { control: 'boolean', description: 'Whether the selected option will be add highlight class.', table: { defaultValue: { summary: 'true' } } },
    checkmark: { control: 'boolean', description: 'Whether the selected option will be shown with a check mark.', table: { defaultValue: { summary: 'false' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'undefined' } } },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
    onClick: { action: 'onClick', table: { category: 'Eventos' } },
    onDblClick: { action: 'onDblClick', table: { category: 'Eventos' } },
    onFilter: { action: 'onFilter', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
    onSelectAllChange: { action: 'onSelectAllChange', table: { category: 'Eventos' } },
    onDrop: { action: 'onDrop', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, cities: CITIES, value: null },
    template: `<p-listbox [(ngModel)]="value" [options]="cities" optionLabel="name" [style]="{ width: '16rem' }"${bind(args, INPUTS)} (onChange)="onChange($event)" (onClick)="onClick($event)" (onDblClick)="onDblClick($event)" (onFilter)="onFilter($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" (onSelectAllChange)="onSelectAllChange($event)" (onDrop)="onDrop($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true, checkbox: true } };
export const Filter: Story = { args: { filter: true } };
export const Striped: Story = { args: { striped: true } };
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };
