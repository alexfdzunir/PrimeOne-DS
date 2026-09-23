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
    storyOrder: ['Default', 'TopThumbnails', 'LeftThumbnails', 'RightThumbnails', 'Indicators', 'IndicatorsTop', 'IndicatorsLeft', 'IndicatorsRight', 'IndicatorsOnItem', 'Autoplay'],
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
      <p-galleria
        [value]="images"
        [containerStyle]="{ maxWidth: '640px' }"
        [responsiveOptions]="[{ breakpoint: '767px', numVisible: 4 }, { breakpoint: '575px', numVisible: 3 }]"${bind(args, INPUTS)}
      >
        <ng-template #item let-item>
          <img [src]="item.src" [alt]="item.alt" style="width: 100%; display: block" />
        </ng-template>
        <ng-template #thumbnail let-item>
          <img
            [src]="item.thumbnail"
            [alt]="item.alt"
            style="display: block; width: 100%"
            [style.max-width]="thumbnailsPosition === 'left' || thumbnailsPosition === 'right' ? '6rem' : null"
          />
        </ng-template>
      </p-galleria>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const TopThumbnails: Story = { args: { thumbnailsPosition: 'top' } };
export const LeftThumbnails: Story = { args: { thumbnailsPosition: 'left', verticalThumbnailViewPortHeight: '300px' } };
export const RightThumbnails: Story = { args: { thumbnailsPosition: 'right', verticalThumbnailViewPortHeight: '300px' } };
export const Indicators: Story = { args: { showThumbnails: false, showIndicators: true } };
export const IndicatorsTop: Story = { args: { showThumbnails: false, showIndicators: true, indicatorsPosition: 'top' } };
export const IndicatorsLeft: Story = { args: { showThumbnails: false, showIndicators: true, indicatorsPosition: 'left' } };
export const IndicatorsRight: Story = { args: { showThumbnails: false, showIndicators: true, indicatorsPosition: 'right' } };
export const IndicatorsOnItem: Story = { args: { showThumbnails: false, showIndicators: true, showIndicatorsOnItem: true } };
export const Autoplay: Story = { args: { autoPlay: true, circular: true } };
