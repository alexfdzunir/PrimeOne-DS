import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ImageCompare } from 'primeng/imagecompare';
import { IMAGES } from '../../stories/data';

const meta: Meta = {
  title: 'Media/ImageCompare',
  decorators: [moduleMetadata({ imports: [ImageCompare] })],
  parameters: {
    controls: { expanded: true },
  },
  render: (args) => ({
    props: { ...args, before: IMAGES[0].src, after: IMAGES[1].src },
    template: `
      <p-imagecompare style="display: block; max-width: 40rem; border-radius: var(--p-content-border-radius)">
        <ng-template #left><img [src]="before" alt="Antes" style="object-fit: cover" /></ng-template>
        <ng-template #right><img [src]="after" alt="Después" style="object-fit: cover" /></ng-template>
      </p-imagecompare>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
