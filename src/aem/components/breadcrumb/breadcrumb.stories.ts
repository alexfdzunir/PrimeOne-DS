import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode } from '../../stories/helpers';

const LEVELS = ['Inicio', 'Grados', 'Ciencias de la Salud', 'Grado en Psicología', 'Plan de estudios'];

const meta: Meta = {
  title: 'AEM/Navigation/Breadcrumb',
  parameters: {
    figmaUrl: figmaNode('9016:19780'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Small', 'Bar'],
    docs: { description: { component: 'Miga de pan: `nav` con lista de enlaces y la página actual con `aria-current="page"`. `--sm` y `--bar` (módulo a todo el ancho).' } },
  },
  args: { size: 'md', items: 4, bar: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'sm'], description: 'Size en Figma.' },
    items: { control: 'number', description: 'Nº Items en Figma.' },
    bar: { control: 'boolean', description: 'breadcrumb-menu: barra a todo el ancho con filete inferior.' },
  },
  render: (args) => {
    const levels = LEVELS.slice(0, Math.max(2, Math.min(LEVELS.length, Number(args['items']) || 2)));
    const items = levels.map((label, i) =>
      i === levels.length - 1
        ? `    <li class="aem-breadcrumb__item"><span aria-current="page">${label}</span></li>`
        : `    <li class="aem-breadcrumb__item"><a class="aem-breadcrumb__link" href="#">${label}</a></li>`,
    );
    return { template: `<nav class="${cx('aem-breadcrumb', args['size'] === 'sm' && 'aem-breadcrumb--sm', args['bar'] && 'aem-breadcrumb--bar')}" aria-label="Migas de pan">\n  <ol class="aem-breadcrumb__list">\n${items.join('\n')}\n  </ol>\n</nav>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Bar: Story = { args: { bar: true } };
