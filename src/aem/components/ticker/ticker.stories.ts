import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, icon } from '../../stories/helpers';

const INFO = [
  ['calendar-blank', 'Inicio: octubre 2026'],
  ['clock', '12 meses'],
  ['certificate', '60 ECTS'],
  ['translate', 'Español'],
];

const meta: Meta = {
  title: 'AEM/Messaging/Ticker',
  parameters: {
    figmaUrl: figmaNode('7448:19133'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Barra de datos clave del programa bajo la cabecera: modalidad y etiquetas informativas sobre azul oscuro (`aem-ticker`).' } },
  },
  args: { items: 4 },
  argTypes: { items: { control: 'number', description: 'Etiquetas informativas.' } },
  render: (args) => {
    const tags = INFO.slice(0, Math.max(0, Number(args['items']) || 0)).map(
      ([name, label]) => `    <li><span class="aem-tag aem-tag--plain">${icon(name, 'aem-tag__icon')}<span class="aem-tag__text">${label}</span></span></li>`,
    );
    return {
      template: `<div class="aem-ticker">
  <ul class="aem-tag-set">
    <li><span class="aem-state-tag aem-state-tag--online">Online</span></li>
${tags.join('\n')}
  </ul>
</div>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
