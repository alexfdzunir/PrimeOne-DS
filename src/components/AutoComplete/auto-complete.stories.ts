import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { CITIES, type City } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['placeholder', 'invalid', 'disabled', 'fluid', 'variant', 'size', 'minQueryLength', 'delay', 'readonly', 'scrollHeight', 'autoHighlight', 'forceSelection', 'type', 'dropdownIcon', 'unique', 'completeOnFocus', 'showClear', 'dropdown', 'showEmptyMessage', 'dropdownMode', 'multiple', 'addOnTab', 'emptyMessage', 'autocomplete', 'optionGroupChildren', 'optionGroupLabel', 'searchMessage', 'emptySelectionMessage', 'selectionMessage', 'selectOnFocus', 'typeahead', 'addOnBlur'];

const meta: Meta = {
  title: 'Form/AutoComplete',
  decorators: [moduleMetadata({ imports: [FormsModule, AutoComplete] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    placeholder: 'Busca una ciudad',
    onSelect: fn(),
    onUnselect: fn(),
    onAdd: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onDropdownClick: fn(),
    onClear: fn(),
    onInputKeydown: fn(),
    onKeyUp: fn(),
    onShow: fn(),
    onHide: fn(),
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Hint text for the input field.' },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'false' } } },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'outlined' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    minQueryLength: { control: 'number', description: 'Minimum number of characters to initiate a search.' },
    delay: { control: 'number', description: 'Delay between keystrokes to wait before sending a query.' },
    readonly: { control: 'boolean', description: 'When present, it specifies that the input cannot be typed.' },
    scrollHeight: { control: 'text', description: 'Maximum height of the suggestions panel.' },
    autoHighlight: { control: 'boolean', description: 'When enabled, highlights the first item in the list by default.' },
    forceSelection: { control: 'boolean', description: 'When present, autocomplete clears the manual input if it does not match of the suggestions to force only accepting values from the suggestions.' },
    type: { control: 'text', description: 'Type of the input, defaults to "text".' },
    dropdownIcon: { control: 'text', description: 'Icon class of the dropdown icon.' },
    unique: { control: 'boolean', description: 'Ensures uniqueness of selected items on multiple mode.' },
    completeOnFocus: { control: 'boolean', description: 'Whether to run a query when input receives focus.' },
    showClear: { control: 'boolean', description: 'When enabled, a clear icon is displayed to clear the value.' },
    dropdown: { control: 'boolean', description: 'Displays a button next to the input field when enabled.' },
    showEmptyMessage: { control: 'boolean', description: 'Whether to show the empty message or not.' },
    dropdownMode: { control: 'text', description: 'Specifies the behavior dropdown button. Default "blank" mode sends an empty string and "current" mode sends the input value.' },
    multiple: { control: 'boolean', description: 'Specifies if multiple values can be selected.' },
    addOnTab: { control: 'boolean', description: 'When enabled, the input value is added to the selected items on tab key press when multiple is true and typeahead is false.' },
    emptyMessage: { control: 'text', description: 'Text to display when there is no data. Defaults to global value in i18n translation configuration.' },
    autocomplete: { control: 'text', description: 'Used to define a string that autocomplete attribute the current element.' },
    optionGroupChildren: { control: 'text', description: 'Name of the options field of an option group.' },
    optionGroupLabel: { control: 'text', description: 'Name of the label field of an option group.' },
    searchMessage: { control: 'text', description: 'Text to display when the search is active. Defaults to global value in i18n translation configuration.', table: { defaultValue: { summary: '{0} results are available' } } },
    emptySelectionMessage: { control: 'text', description: 'Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.', table: { defaultValue: { summary: 'No selected item' } } },
    selectionMessage: { control: 'text', description: 'Text to be displayed in hidden accessible field when options are selected. Defaults to global value in i18n translation configuration.', table: { defaultValue: { summary: '{0} items selected' } } },
    selectOnFocus: { control: 'boolean', description: 'When enabled, the focused option is selected.' },
    typeahead: { control: 'boolean', description: 'Whether typeahead is active or not.', table: { defaultValue: { summary: 'true' } } },
    addOnBlur: { control: 'boolean', description: 'Whether to add an item on blur event if the input has value and typeahead is false with multiple mode.', table: { defaultValue: { summary: 'false' } } },
    onSelect: { action: 'onSelect', table: { category: 'Eventos' } },
    onUnselect: { action: 'onUnselect', table: { category: 'Eventos' } },
    onAdd: { action: 'onAdd', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
    onDropdownClick: { action: 'onDropdownClick', table: { category: 'Eventos' } },
    onClear: { action: 'onClear', table: { category: 'Eventos' } },
    onInputKeydown: { action: 'onInputKeydown', table: { category: 'Eventos' } },
    onKeyUp: { action: 'onKeyUp', table: { category: 'Eventos' } },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: null, suggestions: [] as City[], search: function (this: { suggestions: City[] }, event: { query: string }) {
      this.suggestions = CITIES.filter((city) => city.name.toLowerCase().includes(event.query.toLowerCase()));
    } },
    template: `<p-autocomplete [(ngModel)]="value" [suggestions]="suggestions" (completeMethod)="search($event)" optionLabel="name"${bind(args, INPUTS)} (onSelect)="onSelect($event)" (onUnselect)="onUnselect($event)" (onAdd)="onAdd($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" (onDropdownClick)="onDropdownClick($event)" (onClear)="onClear($event)" (onInputKeydown)="onInputKeydown($event)" (onKeyUp)="onKeyUp($event)" (onShow)="onShow($event)" (onHide)="onHide($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Dropdown: Story = { args: { dropdown: true } };
export const Multiple: Story = { args: { multiple: true } };
export const Invalid: Story = { args: { invalid: true } };
