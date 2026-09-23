import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PickList } from 'primeng/picklist';
import { PRODUCTS, type Product } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['sourceHeader', 'targetHeader', 'showSourceFilter', 'showTargetFilter', 'metaKeySelection', 'dragdrop', 'showSourceControls', 'showTargetControls', 'sourceFilterPlaceholder', 'targetFilterPlaceholder', 'disabled', 'ariaSourceFilterLabel', 'ariaTargetFilterLabel', 'filterMatchMode', 'stripedRows', 'keepSelection', 'scrollHeight'];

const meta: Meta = {
  title: 'Data/PickList',
  decorators: [moduleMetadata({ imports: [PickList] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'DragDrop', 'Filters'],
  },
  args: {
    sourceHeader: 'Disponibles',
    targetHeader: 'Seleccionadas',
    onMoveToTarget: fn(),
    onMoveToSource: fn(),
    onMoveAllToTarget: fn(),
    onMoveAllToSource: fn(),
  },
  argTypes: {
    sourceHeader: { control: 'text', description: 'Text for the source list caption' },
    targetHeader: { control: 'text', description: 'Text for the target list caption' },
    showSourceFilter: { control: 'boolean', description: 'Whether to show filter input for source list when filterBy is enabled.' },
    showTargetFilter: { control: 'boolean', description: 'Whether to show filter input for target list when filterBy is enabled.' },
    metaKeySelection: { control: 'boolean', description: 'Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.' },
    dragdrop: { control: 'boolean', description: 'Whether to enable dragdrop based reordering.' },
    showSourceControls: { control: 'boolean', description: 'Whether to show buttons of source list.' },
    showTargetControls: { control: 'boolean', description: 'Whether to show buttons of target list.' },
    sourceFilterPlaceholder: { control: 'text', description: 'Placeholder text on source filter input.' },
    targetFilterPlaceholder: { control: 'text', description: 'Placeholder text on target filter input.' },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should be disabled.' },
    ariaSourceFilterLabel: { control: 'text', description: 'Defines a string that labels the filter input of source list.' },
    ariaTargetFilterLabel: { control: 'text', description: 'Defines a string that labels the filter input of target list.' },
    filterMatchMode: { control: 'select', options: [undefined, 'contains', 'endsWith', 'equals', 'gt', 'gte', 'in', 'lt', 'lte', 'notEquals', 'startsWith'], description: 'Defines how the items are filtered.' },
    stripedRows: { control: 'boolean', description: 'Whether to displays rows with alternating colors.' },
    keepSelection: { control: 'boolean', description: 'Keeps selection on the transfer list.' },
    scrollHeight: { control: 'text', description: 'Height of the viewport, a scrollbar is defined if height of list exceeds this value.' },
    onMoveToTarget: { action: 'onMoveToTarget', table: { category: 'Eventos' } },
    onMoveToSource: { action: 'onMoveToSource', table: { category: 'Eventos' } },
    onMoveAllToTarget: { action: 'onMoveAllToTarget', table: { category: 'Eventos' } },
    onMoveAllToSource: { action: 'onMoveAllToSource', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, source: PRODUCTS.slice(0, 5), target: PRODUCTS.slice(5, 7) },
    template: `
      <p-picklist [source]="source" [target]="target" dataKey="code" [responsive]="true"${bind(args, INPUTS)} (onMoveToTarget)="onMoveToTarget($event)" (onMoveToSource)="onMoveToSource($event)" (onMoveAllToTarget)="onMoveAllToTarget($event)" (onMoveAllToSource)="onMoveAllToSource($event)">
        <ng-template #item let-item>{{ item.name }}</ng-template>
      </p-picklist>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const DragDrop: Story = { args: { dragdrop: true } };
export const Filters: Story = { args: { showSourceFilter: true, showTargetFilter: true } };
