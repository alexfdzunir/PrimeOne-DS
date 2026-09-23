import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { PRODUCTS, type Product } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['paginator', 'rows', 'pageLinks', 'alwaysShowPaginator', 'paginatorPosition', 'showCurrentPageReport', 'showJumpToPageDropdown', 'showJumpToPageInput', 'showFirstLastIcon', 'showPageLinks', 'sortMode', 'resetPageOnSort', 'selectionPageOnly', 'metaKeySelection', 'scrollable', 'scrollHeight', 'loading', 'loadingIcon', 'showLoader', 'rowHover', 'showInitialSortBadge', 'size', 'showGridlines', 'stripedRows'];

const meta: Meta = {
  title: 'Data/DataTable',
  decorators: [moduleMetadata({ imports: [TableModule, Tag] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Gridlines', 'Striped', 'Small', 'Scrollable', 'Loading'],
  },
  args: {
    paginator: true,
    rows: 5,
    onRowSelect: fn(),
    onRowUnselect: fn(),
    onPage: fn(),
    onSort: fn(),
  },
  argTypes: {
    paginator: { control: 'boolean', description: 'When specified as true, enables the pagination.' },
    rows: { control: 'number', description: 'Number of rows to display per page.' },
    pageLinks: { control: 'number', description: 'Number of page links to display in paginator.' },
    alwaysShowPaginator: { control: 'boolean', description: 'Whether to show it even there is only one page.' },
    paginatorPosition: { control: 'inline-radio', options: [undefined, 'both', 'bottom', 'top'], description: 'Position of the paginator, options are "top", "bottom" or "both".' },
    showCurrentPageReport: { control: 'boolean', description: 'Whether to display current page report.' },
    showJumpToPageDropdown: { control: 'boolean', description: 'Whether to display a dropdown to navigate to any page.' },
    showJumpToPageInput: { control: 'boolean', description: 'Whether to display a input to navigate to any page.' },
    showFirstLastIcon: { control: 'boolean', description: 'When enabled, icons are displayed on paginator to go first and last page.' },
    showPageLinks: { control: 'boolean', description: 'Whether to show page links.' },
    sortMode: { control: 'inline-radio', options: [undefined, 'multiple', 'single'], description: 'Defines whether sorting works on single column or on multiple columns.' },
    resetPageOnSort: { control: 'boolean', description: 'When true, resets paginator to first page after sorting. Available only when sortMode is set to single.' },
    selectionPageOnly: { control: 'boolean', description: 'When enabled with paginator and checkbox selection mode, the select all checkbox in the header will select all rows on the current page.' },
    metaKeySelection: { control: 'boolean', description: 'Defines whether metaKey should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically.' },
    scrollable: { control: 'boolean', description: 'Enables scrollable tables.' },
    scrollHeight: { control: 'text', description: 'Height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size.' },
    loading: { control: 'boolean', description: 'Displays a loader to indicate data load is in progress.' },
    loadingIcon: { control: 'text', description: 'The icon to show while indicating data load is in progress.' },
    showLoader: { control: 'boolean', description: 'Whether to show the loading mask when loading property is true.' },
    rowHover: { control: 'boolean', description: 'Adds hover effect to rows without the need for selectionMode. Note that tr elements that can be hovered need to have "p-selectable-row" class for rowHover to work.' },
    showInitialSortBadge: { control: 'boolean', description: 'Whether to use the initial sort badge or not.' },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Defines the size of the table.' },
    showGridlines: { control: 'boolean', description: 'Whether to show grid lines between cells.' },
    stripedRows: { control: 'boolean', description: 'Whether to display rows with alternating colors.' },
    onRowSelect: { action: 'onRowSelect', table: { category: 'Eventos' } },
    onRowUnselect: { action: 'onRowUnselect', table: { category: 'Eventos' } },
    onPage: { action: 'onPage', table: { category: 'Eventos' } },
    onSort: { action: 'onSort', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, products: PRODUCTS, selection: [] as Product[] },
    template: `
      <p-table [value]="products" [(selection)]="selection" dataKey="code"${bind(args, INPUTS)} (onRowSelect)="onRowSelect($event)" (onRowUnselect)="onRowUnselect($event)" (onPage)="onPage($event)" (onSort)="onSort($event)">
        <ng-template #caption>Asignaturas</ng-template>
        <ng-template #header>
          <tr>
            <th style="width: 3rem"><p-tableHeaderCheckbox /></th>
            <th pSortableColumn="name">Nombre <p-sortIcon field="name" /></th>
            <th pSortableColumn="category">Área <p-sortIcon field="category" /></th>
            <th pSortableColumn="quantity">Plazas <p-sortIcon field="quantity" /></th>
            <th>Estado</th>
          </tr>
        </ng-template>
        <ng-template #body let-product>
          <tr>
            <td><p-tableCheckbox [value]="product" /></td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
            <td><p-tag [value]="product.status" [severity]="product.severity" /></td>
          </tr>
        </ng-template>
      </p-table>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Gridlines: Story = { args: { showGridlines: true } };
export const Striped: Story = { args: { stripedRows: true } };
export const Small: Story = { args: { size: 'small' } };
export const Scrollable: Story = { args: { paginator: false, scrollable: true, scrollHeight: '240px' } };
export const Loading: Story = { args: { loading: true } };
