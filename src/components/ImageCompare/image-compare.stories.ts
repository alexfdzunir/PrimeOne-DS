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
    props: { ...args, left: IMAGES[0].src, right: IMAGES[1].src },
    template: `
      <p-imagecompare style="max-width: 32rem">
        <ng-template #left><img [src]="left" alt="Antes" /></ng-template>
        <ng-template #right><img [src]="right" alt="Después" /></ng-template>
      </p-imagecompare>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
