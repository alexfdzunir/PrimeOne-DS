import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { DataView } from 'primeng/dataview';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Tag } from 'primeng/tag';
import { PRODUCTS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['layout', 'paginator', 'rows', 'pageLinks', 'paginatorPosition', 'alwaysShowPaginator', 'showCurrentPageReport', 'showJumpToPageDropdown', 'showFirstLastIcon', 'showPageLinks', 'emptyMessage', 'loading', 'loadingIcon'];

const meta: Meta = {
  title: 'Data/DataView',
  decorators: [moduleMetadata({ imports: [FormsModule, DataView, Tag, Button, Select, SelectButton] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Grid', 'Empty'],
  },
  args: {
    layout: 'list',
    paginator: true,
    rows: 6,
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
  // As in Figma: header with the sort and the layout switch; list rows and grid cards with image, category, name,
  // rating, price and actions. The image is a tile with the icon of the category.
  render: (args) => ({
    props: {
      ...args,
      products: PRODUCTS,
      sort: null,
      sortOptions: [
        { label: 'Precio: de menor a mayor', value: 1 },
        { label: 'Precio: de mayor a menor', value: -1 },
      ],
      layouts: [
        { value: 'list', icon: 'ph ph-list', label: 'Lista' },
        { value: 'grid', icon: 'ph ph-squares-four', label: 'Cuadrícula' },
      ],
      icons: { Matemáticas: 'ph-function', Informática: 'ph-code', Empresa: 'ph-briefcase', Educación: 'ph-chalkboard-teacher', Derecho: 'ph-scales', Salud: 'ph-heartbeat' },
    },
    template: `
      <p-dataview [value]="products" [sortField]="sort ? 'price' : undefined" [sortOrder]="sort"${bind(args, INPUTS)} (onPage)="onPage($event)" (onChangeLayout)="onChangeLayout($event)">
        <ng-template #header>
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem">
            <p-select [(ngModel)]="sort" [options]="sortOptions" optionLabel="label" optionValue="value" placeholder="Ordenar por precio" [style]="{ minWidth: '14rem' }" />
            <p-selectbutton [(ngModel)]="layout" [options]="layouts" optionValue="value" [allowEmpty]="false" ariaLabel="Vista">
              <ng-template #item let-option>
                <i [class]="option.icon" [attr.aria-label]="option.label" [title]="option.label"></i>
              </ng-template>
            </p-selectbutton>
          </div>
        </ng-template>

        <ng-template #list let-items>
          <div>
            @for (item of items; track item.code; let first = $first) {
              <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; padding: 1rem 0.5rem" [style.border-top]="first ? null : '1px solid var(--p-content-border-color)'">
                <div style="position: relative; display: grid; place-items: center; flex: 0 0 9.375rem; height: 6.25rem; border-radius: var(--p-content-border-radius); background: var(--p-highlight-background); color: var(--p-primary-color)">
                  <i [class]="'ph ' + icons[item.category]" style="font-size: 2.5rem" aria-hidden="true"></i>
                  <p-tag [value]="item.status" [severity]="item.severity" style="position: absolute; top: 0.375rem; left: 0.375rem" />
                </div>
                <div style="display: flex; flex: 1 1 5rem; flex-direction: column; align-items: flex-start; gap: 0.5rem; min-width: 5rem">
                  <span style="color: var(--p-text-muted-color); font-size: 0.875rem">{{ item.category }}</span>
                  <span style="font-weight: 500">{{ item.name }}</span>
                  <span style="display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.625rem; border-radius: 999px; background: var(--p-content-hover-background); font-size: 0.875rem">
                    {{ item.rating }} <i class="ph-fill ph-star" style="color: var(--p-yellow-500)" aria-hidden="true"></i>
                  </span>
                </div>
                <div style="display: flex; flex: 0 0 auto; flex-direction: column; align-items: flex-end; gap: 1.5rem; margin-inline-start: auto">
                  <span style="font-size: 1.125rem; font-weight: 600">{{ item.price }} €</span>
                  <div style="display: flex; gap: 0.5rem">
                    <p-button icon="ph ph-heart" [outlined]="true" ariaLabel="Añadir a favoritos" />
                    <p-button icon="ph ph-shopping-cart" label="Matricularme" [disabled]="item.quantity === 0" />
                  </div>
                </div>
              </div>
            }
          </div>
        </ng-template>

        <ng-template #grid let-items>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); gap: 1rem; padding-block: 1rem">
            @for (item of items; track item.code) {
              <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-content-border-radius); background: var(--p-content-background)">
                <div style="position: relative; display: grid; place-items: center; height: 9rem; border-radius: var(--p-content-border-radius); background: var(--p-highlight-background); color: var(--p-primary-color)">
                  <i [class]="'ph ' + icons[item.category]" style="font-size: 3.5rem" aria-hidden="true"></i>
                  <p-tag [value]="item.status" [severity]="item.severity" style="position: absolute; top: 0.375rem; left: 0.375rem" />
                </div>
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem">
                  <div style="display: flex; flex-direction: column; gap: 0.25rem">
                    <span style="color: var(--p-text-muted-color); font-size: 0.875rem">{{ item.category }}</span>
                    <span style="font-weight: 500">{{ item.name }}</span>
                  </div>
                  <span style="display: inline-flex; flex-shrink: 0; align-items: center; gap: 0.375rem; padding: 0.25rem 0.625rem; border-radius: 999px; background: var(--p-content-hover-background); font-size: 0.875rem">
                    {{ item.rating }} <i class="ph-fill ph-star" style="color: var(--p-yellow-500)" aria-hidden="true"></i>
                  </span>
                </div>
                <span style="font-size: 1.125rem; font-weight: 600">{{ item.price }} €</span>
                <div style="display: flex; gap: 0.5rem; margin-top: auto">
                  <div style="flex: 1"><p-button icon="ph ph-shopping-cart" label="Matricularme" [disabled]="item.quantity === 0" [fluid]="true" /></div>
                  <p-button icon="ph ph-heart" [outlined]="true" ariaLabel="Añadir a favoritos" />
                </div>
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
