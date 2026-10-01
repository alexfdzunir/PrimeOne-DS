import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode, icon } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Modules/Image Gallery',
  parameters: {
    figmaUrl: figmaNode('11116:23634'),
    layout: 'fullscreen',
    controls: { expanded: true },
    storyOrder: ['Default', 'TwoImages', 'OneImage'],
    docs: { description: { component: 'Galería de imágenes del bloque de contenido: mosaico, dos imágenes o una (`aem-gallery`).' } },
  },
  args: { type: 'mosaic' },
  argTypes: { type: { control: 'inline-radio', options: ['1-image', '2-image', 'mosaic'], description: 'Type en Figma.' } },
  render: (args) => {
    const type = args['type'] as string;
    const count = type === 'mosaic' ? 4 : type === '2-image' ? 2 : 1;
    const items = Array.from({ length: count }, (_, i) => `    <li><div class="aem-placeholder" role="img" aria-label="Campus UNIR ${i + 1}">${icon('image')}</div></li>`);
    return { template: `<section class="aem-section">\n  <ul class="${cx('aem-gallery', type === 'mosaic' && 'aem-gallery--mosaic', type === '2-image' && 'aem-gallery--2')}" style="max-width: 76rem; margin: 0 auto">\n${items.join('\n')}\n  </ul>\n</section>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const TwoImages: Story = { args: { type: '2-image' } };
export const OneImage: Story = { args: { type: '1-image' } };
