import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, icon } from '../../stories/helpers';

const ITEMS = ['Grados', 'Másteres', 'Doctorados', 'Formación permanente', 'Idiomas'];

const meta: Meta = {
  title: 'AEM/Modules/Distributor',
  parameters: {
    figmaUrl: figmaNode('11427:4517'),
    layout: 'fullscreen',
    controls: { expanded: true },
    storyOrder: ['Default', 'Three'],
    docs: { description: { component: 'Distribuidor a las secciones del portal: tarjetas con imagen y título y, en la última columna, dos accesos azules (`aem-distributor`).' } },
  },
  args: { items: 5 },
  argTypes: { items: { control: 'inline-radio', options: [3, 4, 5], description: 'N-of items en Figma.' } },
  render: (args) => {
    const count = Number(args['items']) || 5;
    const images = count - 2;
    const tiles = ITEMS.slice(0, images).map((label) => `    <li><a class="aem-distributor__item" href="#"><span class="aem-distributor__media"><span class="aem-card__media--placeholder"></span></span>${label}</a></li>`);
    const solid = ITEMS.slice(images, count).map((label) => `      <a class="aem-distributor__item aem-distributor__item--solid" href="#">${label} ${icon('arrow-right')}</a>`);
    return {
      template: `<section class="aem-section">
  <div class="aem-section__inner">
  <ul class="aem-distributor">
${tiles.join('\n')}
    <li class="aem-distributor__stack">
${solid.join('\n')}
    </li>
  </ul>
  </div>
</section>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Three: Story = { args: { items: 3 } };
