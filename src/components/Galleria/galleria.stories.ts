import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { GalleriaModule } from 'primeng/galleria';
import { IMAGES } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['numVisible', 'showItemNavigators', 'showThumbnailNavigators', 'showItemNavigatorsOnHover', 'changeItemOnIndicatorHover', 'circular', 'autoPlay', 'shouldStopAutoplayByClick', 'transitionInterval', 'showThumbnails', 'thumbnailsPosition', 'verticalThumbnailViewPortHeight', 'showIndicators', 'showIndicatorsOnItem', 'indicatorsPosition'];

const meta: Meta = {
  title: 'Media/Galleria',
  decorators: [moduleMetadata({ imports: [GalleriaModule] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Indicators', 'Autoplay', 'LeftThumbnails'],
  },
  args: {
    numVisible: 5,
  },
  argTypes: {
    numVisible: { control: 'number', description: 'Number of items per page.' },
    showItemNavigators: { control: 'boolean', description: 'Whether to display navigation buttons in item section.' },
    showThumbnailNavigators: { control: 'boolean', description: 'Whether to display navigation buttons in thumbnail container.' },
    showItemNavigatorsOnHover: { control: 'boolean', description: 'Whether to display navigation buttons on item hover.' },
    changeItemOnIndicatorHover: { control: 'boolean', description: 'When enabled, item is changed on indicator hover.' },
    circular: { control: 'boolean', description: 'Defines if scrolling would be infinite.' },
    autoPlay: { control: 'boolean', description: 'Items are displayed with a slideshow in autoPlay mode.' },
    shouldStopAutoplayByClick: { control: 'boolean', description: 'When enabled, autorun should stop by click.' },
    transitionInterval: { control: 'number', description: 'Time in milliseconds to scroll items.' },
    showThumbnails: { control: 'boolean', description: 'Whether to display thumbnail container.' },
    thumbnailsPosition: { control: 'select', options: [undefined, 'bottom', 'left', 'right', 'top'], description: 'Position of thumbnails.' },
    verticalThumbnailViewPortHeight: { control: 'text', description: 'Height of the viewport in vertical thumbnail.' },
    showIndicators: { control: 'boolean', description: 'Whether to display indicator container.' },
    showIndicatorsOnItem: { control: 'boolean', description: 'When enabled, indicator container is displayed on item container.' },
    indicatorsPosition: { control: 'select', options: [undefined, 'bottom', 'left', 'right', 'top'], description: 'Position of indicators.' },
  },
  render: (args) => ({
    props: { ...args, images: IMAGES },
    template: `
      <p-galleria [value]="images" [containerStyle]="{ maxWidth: '640px' }"${bind(args, INPUTS)}>
        <ng-template #item let-item>
          <img [src]="item.src" [alt]="item.alt" style="width: 100%; display: block" />
        </ng-template>
        <ng-template #thumbnail let-item>
          <img [src]="item.thumbnail" [alt]="item.alt" style="display: block" />
        </ng-template>
      </p-galleria>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Indicators: Story = { args: { showThumbnails: false, showIndicators: true } };
export const Autoplay: Story = { args: { autoPlay: true, circular: true } };
export const LeftThumbnails: Story = { args: { thumbnailsPosition: 'left', verticalThumbnailViewPortHeight: '300px' } };
