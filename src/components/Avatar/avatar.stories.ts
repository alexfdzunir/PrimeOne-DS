import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Avatar } from 'primeng/avatar';
import { OverlayBadge } from 'primeng/overlaybadge';
import { PORTRAITS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['label', 'size', 'shape', 'icon'];

const meta: Meta = {
  title: 'Misc/Avatar',
  decorators: [moduleMetadata({ imports: [Avatar, OverlayBadge] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Photo', 'Icon', 'IconDark', 'Mentor', 'ExtraSmall', 'Small', 'Large', 'ExtraLarge', 'Square'],
  },
  args: {
    label: 'LM',
    size: 'large',
    shape: 'circle',
    extraSize: undefined,
    photo: false,
    dark: false,
    badge: '',
    caption: '',
    onImageError: fn(),
  },
  argTypes: {
    label: { control: 'text', description: 'Defines the text to display.' },
    size: { control: 'inline-radio', options: ['large', 'normal', 'xlarge'], description: 'Size of the element.' },
    shape: { control: 'inline-radio', options: ['circle', 'square'], description: 'Shape of the element.' },
    icon: { control: 'text', description: 'Defines the icon to display.' },
    extraSize: { control: 'inline-radio', options: [undefined, 'xs', 'xl'], description: 'Tamaños del DS fuera de PrimeNG: XS 24px y XL 100px.' },
    photo: { control: 'boolean', description: 'Foto (Figma: Photo Unit).' },
    dark: { control: 'boolean', description: 'Fondo primario (Figma: Icon Dark).' },
    badge: { control: 'text', description: 'Badge superpuesto (Figma: Show Badge).' },
    caption: { control: 'text', description: 'Texto bajo el avatar (Figma: Show Text).' },
    onImageError: { action: 'onImageError', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, photoSrc: PORTRAITS[0] },
    template: `
      <div style="display: inline-flex; flex-direction: column; align-items: center; gap: 0.375rem">
        @if (badge) {
          <p-overlaybadge [value]="badge" [severity]="dark ? 'contrast' : undefined" [badgeSize]="extraSize === 'xl' ? 'xlarge' : size === 'xlarge' ? 'large' : 'small'">
            <p-avatar
              [image]="photo ? photoSrc : undefined"
              [style.width]="extraSize === 'xs' ? '24px' : extraSize === 'xl' ? '100px' : null"
              [style.height]="extraSize === 'xs' ? '24px' : extraSize === 'xl' ? '100px' : null"
              [style.font-size]="extraSize === 'xs' ? '0.625rem' : extraSize === 'xl' ? '1.4375rem' : null"
              [style.background]="dark ? 'var(--p-primary-color)' : null"
              [style.color]="dark ? 'var(--p-primary-contrast-color)' : null"${bind(args, INPUTS)} (onImageError)="onImageError($event)"
            />
          </p-overlaybadge>
        } @else {
          <p-avatar
            [image]="photo ? photoSrc : undefined"
            [style.width]="extraSize === 'xs' ? '24px' : extraSize === 'xl' ? '100px' : null"
            [style.height]="extraSize === 'xs' ? '24px' : extraSize === 'xl' ? '100px' : null"
            [style.font-size]="extraSize === 'xs' ? '0.625rem' : extraSize === 'xl' ? '1.4375rem' : null"
            [style.background]="dark ? 'var(--p-primary-color)' : null"
            [style.color]="dark ? 'var(--p-primary-contrast-color)' : null"${bind(args, INPUTS)} (onImageError)="onImageError($event)"
          />
        }
        @if (caption) {
          <span style="font-size: 0.75rem">{{ caption }}</span>
        }
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Photo: Story = { args: { photo: true, label: undefined } };
export const Icon: Story = { args: { label: undefined, icon: 'ph ph-user' } };
export const IconDark: Story = { args: { label: undefined, icon: 'ph ph-user', dark: true } };
export const Mentor: Story = { args: { badge: '8', caption: 'Mi mentor' } };
export const ExtraSmall: Story = { args: { extraSize: 'xs', size: undefined } };
export const Small: Story = { args: { size: 'normal' } };
export const Large: Story = { args: { size: 'xlarge' } };
export const ExtraLarge: Story = { args: { extraSize: 'xl', size: 'xlarge' } };
export const Square: Story = { args: { shape: 'square' } };
