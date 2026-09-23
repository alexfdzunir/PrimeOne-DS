import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Tree } from 'primeng/tree';
import { TreeDragDropService } from 'primeng/api';
import { TREE_NODES } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['selectionMode', 'loadingMode', 'draggableNodes', 'droppableNodes', 'metaKeySelection', 'propagateSelectionUp', 'propagateSelectionDown', 'loading', 'loadingIcon', 'emptyMessage', 'filter', 'filterInputAutoFocus', 'filterPlaceholder', 'scrollHeight', 'indentation', 'highlightOnSelect'];

const meta: Meta = {
  title: 'Data/Tree',
  decorators: [moduleMetadata({ imports: [Tree], providers: [TreeDragDropService] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Single', 'Checkbox', 'Filter', 'DragDrop'],
  },
  args: {
    onNodeSelect: fn(),
    onNodeUnselect: fn(),
    onNodeExpand: fn(),
    onNodeCollapse: fn(),
  },
  argTypes: {
    selectionMode: { control: 'inline-radio', options: [undefined, 'checkbox', 'multiple', 'single'], description: 'Defines the selection mode.' },
    loadingMode: { control: 'inline-radio', options: [undefined, 'icon', 'mask'], description: 'Loading mode display.' },
    draggableNodes: { control: 'boolean', description: 'Whether the nodes are draggable.' },
    droppableNodes: { control: 'boolean', description: 'Whether the nodes are droppable.' },
    metaKeySelection: { control: 'boolean', description: 'Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.' },
    propagateSelectionUp: { control: 'boolean', description: 'Whether checkbox selections propagate to ancestor nodes.' },
    propagateSelectionDown: { control: 'boolean', description: 'Whether checkbox selections propagate to descendant nodes.' },
    loading: { control: 'boolean', description: 'Displays a loader to indicate data load is in progress.' },
    loadingIcon: { control: 'text', description: 'The icon to show while indicating data load is in progress.' },
    emptyMessage: { control: 'text', description: 'Text to display when there is no data.' },
    filter: { control: 'boolean', description: 'When specified, displays an input field to filter the items.' },
    filterInputAutoFocus: { control: 'boolean', description: 'Determines whether the filter input should be automatically focused when the component is rendered.' },
    filterPlaceholder: { control: 'text', description: 'Placeholder text to show when filter input is empty.' },
    scrollHeight: { control: 'text', description: 'Height of the scrollable viewport.' },
    indentation: { control: 'number', description: 'Indentation factor for spacing of the nested node when virtual scrolling is enabled.' },
    highlightOnSelect: { control: 'boolean', description: 'Highlights the node on select.' },
    onNodeSelect: { action: 'onNodeSelect', table: { category: 'Eventos' } },
    onNodeUnselect: { action: 'onNodeUnselect', table: { category: 'Eventos' } },
    onNodeExpand: { action: 'onNodeExpand', table: { category: 'Eventos' } },
    onNodeCollapse: { action: 'onNodeCollapse', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, nodes: structuredClone(TREE_NODES), selection: null },
    template: `<p-tree [value]="nodes" [(selection)]="selection" [style]="{ maxWidth: '24rem' }"${bind(args, INPUTS)} (onNodeSelect)="onNodeSelect($event)" (onNodeUnselect)="onNodeUnselect($event)" (onNodeExpand)="onNodeExpand($event)" (onNodeCollapse)="onNodeCollapse($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Single: Story = { args: { selectionMode: 'single' } };
export const Checkbox: Story = { args: { selectionMode: 'checkbox' } };
export const Filter: Story = { args: { filter: true } };
export const DragDrop: Story = { args: { draggableNodes: true, droppableNodes: true } };
