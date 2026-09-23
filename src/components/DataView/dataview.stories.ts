import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { PRODUCTS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['layout', 'paginator', 'rows', 'pageLinks', 'paginatorPosition', 'alwaysShowPaginator', 'showCurrentPageReport', 'showJumpToPageDropdown', 'showFirstLastIcon', 'showPageLinks', 'emptyMessage', 'loading', 'loadingIcon'];

const meta: Meta = {
  title: 'Data/DataView',
  decorators: [moduleMetadata({ imports: [DataView, Tag] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Grid', 'Empty'],
  },
  args: {
    layout: 'list',
    paginator: true,
    rows: 4,
    onPage: fn(),
    onChangeLayout: fn(),
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['grid', 'list'], description: 'Defines the layout mode.' },
    paginator: { control: 'boolean', description: 'When specified as true, enables the pagination.' },
    rows: { control: 'number', description: 'Number of rows to display per page.' },
    pageLinks: { control: 'number', description: 'Number of page links to display in paginator.' },
    paginatorPosition: { control: 'inline-radio', options: [undefined, 'both', 'bottom', 'top'], description: 'Position of the paginator.' },
    alwaysShowPaginator: { control: 'boolean', description: 'Whether to show it even there is only one page.' },
    showCurrentPageReport: { control: 'boolean', description: 'Whether to display current page report.' },
    showJumpToPageDropdown: { control: 'boolean', description: 'Whether to display a dropdown to navigate to any page.' },
    showFirstLastIcon: { control: 'boolean', description: 'When enabled, icons are displayed on paginator to go first and last page.' },
    showPageLinks: { control: 'boolean', description: 'Whether to show page links.' },
    emptyMessage: { control: 'text', description: 'Text to display when there is no data. Defaults to global value in i18n translation configuration.' },
    loading: { control: 'boolean', description: 'Displays a loader to indicate data load is in progress.' },
    loadingIcon: { control: 'text', description: 'The icon to show while indicating data load is in progress.' },
    onPage: { action: 'onPage', table: { category: 'Eventos' } },
    onChangeLayout: { action: 'onChangeLayout', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, products: PRODUCTS },
    template: `
      <p-dataview [value]="products"${bind(args, INPUTS)} (onPage)="onPage($event)" (onChangeLayout)="onChangeLayout($event)">
        <ng-template #list let-items>
          <div class="sb-stack">
            @for (item of items; track item.code) {
              <div class="sb-row" style="justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--p-content-border-color)">
                <span>{{ item.name }} · <small>{{ item.category }}</small></span>
                <p-tag [value]="item.status" [severity]="item.severity" />
              </div>
            }
          </div>
        </ng-template>
        <ng-template #grid let-items>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); gap: 1rem">
            @for (item of items; track item.code) {
              <div style="padding: 1rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-content-border-radius)">
                <p style="margin: 0 0 0.5rem">{{ item.name }}</p>
                <p-tag [value]="item.status" [severity]="item.severity" />
              </div>
            }
          </div>
        </ng-template>
      </p-dataview>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Grid: Story = { args: { layout: 'grid' } };
export const Empty: Story = { args: { paginator: false } };
