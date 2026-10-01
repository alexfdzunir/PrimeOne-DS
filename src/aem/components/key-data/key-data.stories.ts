import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode } from '../../stories/helpers';

const DATA = [
  ['Créditos', '60 ECTS'],
  ['Duración', '12 meses'],
  ['Modalidad', 'Online'],
  ['Inicio', 'Octubre 2026'],
  ['Idioma', 'Español'],
  ['Titulación', 'Máster oficial'],
];

const meta: Meta = {
  title: 'AEM/Modules/Key Data',
  parameters: {
    figmaUrl: figmaNode('22281:32793'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Datos clave del programa en una banda azul (`aem-key-data`, lista de definiciones).' } },
  },
  args: { items: 4 },
  argTypes: { items: { control: 'inline-radio', options: [2, 3, 4, 5, 6], description: 'N. de datos en Figma.' } },
  render: (args) => ({
    template: `<dl class="aem-key-data">\n${DATA.slice(0, Number(args['items']) || 4)
      .map(([dt, dd]) => `  <div><dt>${dt}</dt><dd>${dd}</dd></div>`)
      .join('\n')}\n</dl>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
