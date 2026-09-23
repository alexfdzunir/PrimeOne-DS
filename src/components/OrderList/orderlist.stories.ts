import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { OrderList } from 'primeng/orderlist';
import { PRODUCTS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['header', 'filterPlaceholder', 'metaKeySelection', 'dragdrop', 'controlsPosition', 'ariaFilterLabel', 'filterMatchMode', 'stripedRows', 'disabled', 'scrollHeight'];

const meta: Meta = {
  title: 'Data/OrderList',
  decorators: [moduleMetadata({ imports: [OrderList] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    header: 'Asignaturas',
    onReorder: fn(),
    onSelectionChange: fn(),
  },
  argTypes: {
    header: { control: 'text', description: 'Text for the caption.' },
    filterPlaceholder: { control: 'text', description: 'Placeholder of the filter input.' },
    metaKeySelection: { control: 'boolean', description: 'When true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.' },
    dragdrop: { control: 'boolean', description: 'Whether to enable dragdrop based reordering.' },
    controlsPosition: { control: 'inline-radio', options: [undefined, 'left', 'right'], description: 'Defines the location of the buttons with respect to the list.' },
    ariaFilterLabel: { control: 'text', description: 'Defines a string that labels the filter input.' },
    filterMatchMode: { control: 'select', options: [undefined, 'contains', 'endsWith', 'equals', 'gt', 'gte', 'in', 'lt', 'lte', 'notEquals', 'startsWith'], description: 'Defines how the items are filtered.' },
    stripedRows: { control: 'boolean', description: 'Whether to displays rows with alternating colors.' },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should be disabled.' },
    scrollHeight: { control: 'text', description: 'Height of the viewport, a scrollbar is defined if height of list exceeds this value.' },
    onReorder: { action: 'onReorder', table: { category: 'Eventos' } },
    onSelectionChange: { action: 'onSelectionChange', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, products: PRODUCTS.slice(0, 6) },
    template: `
      <p-orderlist [value]="products" dataKey="code" [style]="{ maxWidth: '26rem' }"${bind(args, INPUTS)} (onReorder)="onReorder($event)" (onSelectionChange)="onSelectionChange($event)">
        <ng-template #item let-item>{{ item.name }}</ng-template>
      </p-orderlist>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const DragDrop: Story = { args: { dragdrop: true } };
export const Striped: Story = { args: { stripedRows: true } };
