import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { TreeSelect } from 'primeng/treeselect';
import { TREE_NODES } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['placeholder', 'invalid', 'disabled', 'scrollHeight', 'metaKeySelection', 'display', 'selectionMode', 'emptyMessage', 'filter', 'filterMode', 'filterPlaceholder', 'filterInputAutoFocus', 'propagateSelectionDown', 'propagateSelectionUp', 'showClear', 'resetFilterOnHide', 'loading', 'loadingMode', 'size', 'variant', 'fluid'];

const meta: Meta = {
  title: 'Form/TreeSelect',
  decorators: [moduleMetadata({ imports: [FormsModule, TreeSelect] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    placeholder: 'Selecciona un archivo',
    onNodeExpand: fn(),
    onNodeCollapse: fn(),
    onShow: fn(),
    onHide: fn(),
    onClear: fn(),
    onFilter: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onNodeUnselect: fn(),
    onNodeSelect: fn(),
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Label to display when there are no selections.' },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    scrollHeight: { control: 'text', description: 'Height of the viewport, a scrollbar is defined if height of list exceeds this value.' },
    metaKeySelection: { control: 'boolean', description: 'Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.' },
    display: { control: 'inline-radio', options: [undefined, 'chip', 'comma'], description: 'Defines how the selected items are displayed.' },
    selectionMode: { control: 'inline-radio', options: [undefined, 'checkbox', 'multiple', 'single'], description: 'Defines the selection mode.' },
    emptyMessage: { control: 'text', description: 'Text to display when there are no options available. Defaults to value from PrimeNG locale configuration.' },
    filter: { control: 'boolean', description: 'When specified, displays an input field to filter the items.' },
    filterMode: { control: 'text', description: 'Mode for filtering valid values are "lenient" and "strict". Default is lenient.' },
    filterPlaceholder: { control: 'text', description: 'Placeholder text to show when filter input is empty.' },
    filterInputAutoFocus: { control: 'boolean', description: 'Determines whether the filter input should be automatically focused when the component is rendered.' },
    propagateSelectionDown: { control: 'boolean', description: 'Whether checkbox selections propagate to descendant nodes.' },
    propagateSelectionUp: { control: 'boolean', description: 'Whether checkbox selections propagate to ancestor nodes.' },
    showClear: { control: 'boolean', description: 'When enabled, a clear icon is displayed to clear the value.' },
    resetFilterOnHide: { control: 'boolean', description: 'Clears the filter value when hiding the dropdown.' },
    loading: { control: 'boolean', description: 'Displays a loader to indicate data load is in progress.' },
    loadingMode: { control: 'inline-radio', options: [undefined, 'icon', 'mask'], description: 'Loading mode display.' },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'undefined' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'undefined' } } },
    onNodeExpand: { action: 'onNodeExpand', table: { category: 'Eventos' } },
    onNodeCollapse: { action: 'onNodeCollapse', table: { category: 'Eventos' } },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
    onClear: { action: 'onClear', table: { category: 'Eventos' } },
    onFilter: { action: 'onFilter', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
    onNodeUnselect: { action: 'onNodeUnselect', table: { category: 'Eventos' } },
    onNodeSelect: { action: 'onNodeSelect', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, nodes: TREE_NODES, value: null },
    template: `<p-treeselect [(ngModel)]="value" [options]="nodes" [style]="{ minWidth: '16rem' }"${bind(args, INPUTS)} (onNodeExpand)="onNodeExpand($event)" (onNodeCollapse)="onNodeCollapse($event)" (onShow)="onShow($event)" (onHide)="onHide($event)" (onClear)="onClear($event)" (onFilter)="onFilter($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" (onNodeUnselect)="onNodeUnselect($event)" (onNodeSelect)="onNodeSelect($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Checkbox: Story = { args: { selectionMode: 'checkbox', display: 'chip' } };
export const Filter: Story = { args: { filter: true } };
export const Invalid: Story = { args: { invalid: true } };
