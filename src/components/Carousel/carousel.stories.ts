import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Carousel } from 'primeng/carousel';
import { Tag } from 'primeng/tag';
import { PRODUCTS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['numVisible', 'numScroll', 'orientation', 'circular', 'showIndicators', 'showNavigators', 'autoplayInterval'];

const meta: Meta = {
  title: 'Media/Carousel',
  decorators: [moduleMetadata({ imports: [Carousel, Tag] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Circular', 'Vertical'],
  },
  args: {
    numVisible: 3,
    numScroll: 1,
    onPage: fn(),
  },
  argTypes: {
    numVisible: { control: 'number', description: 'Number of items per page.', table: { defaultValue: { summary: '1' } } },
    numScroll: { control: 'number', description: 'Number of items to scroll.', table: { defaultValue: { summary: '1' } } },
    orientation: { control: 'inline-radio', options: [undefined, 'horizontal', 'vertical'], description: 'Specifies the layout of the component.' },
    circular: { control: 'boolean', description: 'Defines if scrolling would be infinite.' },
    showIndicators: { control: 'boolean', description: 'Whether to display indicator container.' },
    showNavigators: { control: 'boolean', description: 'Whether to display navigation buttons in container.' },
    autoplayInterval: { control: 'number', description: 'Time in milliseconds to scroll items automatically.' },
    onPage: { action: 'onPage', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, products: PRODUCTS },
    template: `
      <p-carousel [value]="products"${bind(args, INPUTS)} (onPage)="onPage($event)">
        <ng-template #item let-product>
          <div style="margin: 0.5rem; padding: 1rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-content-border-radius)">
            <p style="margin: 0 0 0.25rem; font-weight: 600">{{ product.name }}</p>
            <p style="margin: 0 0 0.75rem; color: var(--p-text-muted-color)">{{ product.category }}</p>
            <p-tag [value]="product.status" [severity]="product.severity" />
          </div>
        </ng-template>
      </p-carousel>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Circular: Story = { args: { circular: true, autoplayInterval: 3000 } };
export const Vertical: Story = { args: { orientation: 'vertical', numVisible: 1 } };
