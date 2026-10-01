import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Modules/Logo Gallery',
  parameters: {
    figmaUrl: figmaNode('10410:37035'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Galería de logos de entidades colaboradoras (`aem-logos`, de 1 a 6 por fila).' } },
  },
  args: { logos: 6 },
  argTypes: { logos: { control: 'inline-radio', options: [1, 2, 3, 4, 5, 6], description: 'N-Logos en Figma.' } },
  render: (args) => {
    const count = Number(args['logos']) || 6;
    const items = Array.from({ length: count }, (_, i) => `    <li><span class="aem-logo-placeholder">Logo ${i + 1}</span></li>`);
    return { template: `<section class="aem-section">\n  <ul class="aem-logos" style="--aem-logos-columns: ${count}; max-width: 80rem; margin: 0 auto">\n${items.join('\n')}\n  </ul>\n</section>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
