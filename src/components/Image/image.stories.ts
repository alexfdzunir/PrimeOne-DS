import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Image } from 'primeng/image';
import { IMAGES } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['alt', 'preview', 'loading'];

const meta: Meta = {
  title: 'Media/Image',
  decorators: [moduleMetadata({ imports: [Image] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    alt: 'Campus',
    preview: true,
    onShow: fn(),
    onHide: fn(),
    onImageError: fn(),
  },
  argTypes: {
    alt: { control: 'text', description: 'Attribute of the preview image element.' },
    preview: { control: 'boolean', description: 'Controls the preview functionality.' },
    loading: { control: 'inline-radio', options: [undefined, 'eager', 'lazy'], description: 'Attribute of the image element.' },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
    onImageError: { action: 'onImageError', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, src: IMAGES[0].src },
    template: `<p-image [src]="src" style="display: block; max-width: 30rem" [imageStyle]="{ display: 'block', width: '100%', height: 'auto', borderRadius: 'var(--p-content-border-radius)' }"${bind(args, INPUTS)} (onShow)="onShow($event)" (onHide)="onHide($event)" (onImageError)="onImageError($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
