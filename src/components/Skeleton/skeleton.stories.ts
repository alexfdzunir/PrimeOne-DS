import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Skeleton } from 'primeng/skeleton';

const meta: Meta = {
  title: 'Misc/Skeleton',
  decorators: [moduleMetadata({ imports: [Skeleton] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Text', 'AvatarStart', 'AvatarEnd', 'Circle', 'Static'],
  },
  args: {
    width: '16rem',
    height: '1rem',
    shape: undefined,
    size: undefined,
    borderRadius: undefined,
    animation: undefined,
    pattern: 'single',
  },
  argTypes: {
    width: { control: 'text', description: 'Width of the element.' },
    height: { control: 'text', description: 'Height of the element.' },
    shape: { control: 'inline-radio', options: [undefined, 'rectangle', 'circle'], description: 'Shape of the element.' },
    size: { control: 'text', description: 'Size of the skeleton (width and height).' },
    borderRadius: { control: 'text', description: 'Border radius of the element, defaults to value from theme.' },
    animation: { control: 'inline-radio', options: [undefined, 'wave', 'none'], description: 'Type of the animation.' },
    pattern: { control: 'inline-radio', options: ['single', 'text', 'start', 'end'], description: 'Composiciones del DS: texto (SkeletonText) y avatar con líneas al inicio o al final (skeleton, Position).' },
  },
  render: (args) => ({
    props: args,
    template: `
      @if (pattern === 'text') {
        <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 28rem">
          <p-skeleton width="100%" height="0.75rem" [animation]="animation" />
          <p-skeleton width="92%" height="0.75rem" [animation]="animation" />
          <p-skeleton width="96%" height="0.75rem" [animation]="animation" />
          <p-skeleton width="60%" height="0.75rem" [animation]="animation" />
        </div>
      } @else if (pattern === 'start' || pattern === 'end') {
        <div [style.flex-direction]="pattern === 'end' ? 'row-reverse' : 'row'" style="display: flex; gap: 1rem; align-items: center; max-width: 28rem">
          <p-skeleton shape="circle" size="3rem" [animation]="animation" />
          <div style="display: flex; flex: 1; flex-direction: column; gap: 0.5rem">
            <p-skeleton width="70%" height="0.875rem" [animation]="animation" />
            <p-skeleton width="45%" height="0.75rem" [animation]="animation" />
          </div>
        </div>
      } @else {
        <p-skeleton [width]="width" [height]="height" [shape]="shape" [size]="size" [borderRadius]="borderRadius" [animation]="animation" />
      }
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Text: Story = { args: { pattern: 'text' } };
export const AvatarStart: Story = { args: { pattern: 'start' } };
export const AvatarEnd: Story = { args: { pattern: 'end' } };
export const Circle: Story = { args: { shape: 'circle', size: '4rem' } };
export const Static: Story = { args: { animation: 'none' } };
