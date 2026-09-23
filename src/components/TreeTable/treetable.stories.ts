import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { TreeTableModule } from 'primeng/treetable';
import { FILE_COLUMNS, FILE_TREE } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['paginator', 'rows', 'pageLinks', 'alwaysShowPaginator', 'paginatorPosition', 'showCurrentPageReport', 'showJumpToPageDropdown', 'showFirstLastIcon', 'showPageLinks', 'sortMode', 'resetPageOnSort', 'rowHover', 'loading', 'loadingIcon', 'showLoader', 'scrollable', 'scrollHeight', 'showGridlines'];

const meta: Meta = {
  title: 'Data/TreeTable',
  decorators: [moduleMetadata({ imports: [TreeTableModule] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Gridlines', 'Paginator'],
  },
  args: {
    onNodeExpand: fn(),
    onNodeCollapse: fn(),
  },
  argTypes: {
    paginator: { control: 'boolean', description: 'When specified as true, enables the pagination.' },
    rows: { control: 'number', description: 'Number of rows to display per page.' },
    pageLinks: { control: 'number', description: 'Number of page links to display in paginator.' },
    alwaysShowPaginator: { control: 'boolean', description: 'Whether to show it even there is only one page.' },
    paginatorPosition: { control: 'inline-radio', options: [undefined, 'both', 'bottom', 'top'], description: 'Position of the paginator.' },
    showCurrentPageReport: { control: 'boolean', description: 'Whether to display current page report.' },
    showJumpToPageDropdown: { control: 'boolean', description: 'Whether to display a dropdown to navigate to any page.' },
    showFirstLastIcon: { control: 'boolean', description: 'When enabled, icons are displayed on paginator to go first and last page.' },
    showPageLinks: { control: 'boolean', description: 'Whether to show page links.' },
    sortMode: { control: 'inline-radio', options: [undefined, 'multiple', 'single'], description: 'Defines whether sorting works on single column or on multiple columns.' },
    resetPageOnSort: { control: 'boolean', description: 'When true, resets paginator to first page after sorting.' },
    rowHover: { control: 'boolean', description: 'Adds hover effect to rows without the need for selectionMode.' },
    loading: { control: 'boolean', description: 'Displays a loader to indicate data load is in progress.' },
    loadingIcon: { control: 'text', description: 'The icon to show while indicating data load is in progress.' },
    showLoader: { control: 'boolean', description: 'Whether to show the loading mask when loading property is true.' },
    scrollable: { control: 'boolean', description: 'When specified, enables horizontal and/or vertical scrolling.' },
    scrollHeight: { control: 'text', description: 'Height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size.' },
    showGridlines: { control: 'boolean', description: 'Whether to show grid lines between cells.', table: { defaultValue: { summary: 'false' } } },
    onNodeExpand: { action: 'onNodeExpand', table: { category: 'Eventos' } },
    onNodeCollapse: { action: 'onNodeCollapse', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, files: structuredClone(FILE_TREE), cols: FILE_COLUMNS },
    template: `
      <p-treetable [value]="files" [columns]="cols"${bind(args, INPUTS)} (onNodeExpand)="onNodeExpand($event)" (onNodeCollapse)="onNodeCollapse($event)">
        <ng-template #header let-columns>
          <tr>
            @for (col of columns; track col.field) {
              <th>{{ col.header }}</th>
            }
          </tr>
        </ng-template>
        <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
          <tr [ttRow]="rowNode">
            @for (col of columns; track col.field; let first = $first) {
              <td>
                @if (first) {
                  <p-treetable-toggler [rowNode]="rowNode" />
                }
                {{ rowData[col.field] }}
              </td>
            }
          </tr>
        </ng-template>
      </p-treetable>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Gridlines: Story = { args: { showGridlines: true } };
export const Paginator: Story = { args: { paginator: true, rows: 2 } };
