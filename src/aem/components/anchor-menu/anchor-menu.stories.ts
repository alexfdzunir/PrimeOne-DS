import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode } from '../../stories/helpers';

const SECTIONS = ['Presentación', 'Plan de estudios', 'Profesorado', 'Metodología', 'Titulación', 'Salidas profesionales', 'Precio y becas', 'Opiniones'];

const meta: Meta = {
  title: 'AEM/Navigation/Anchor Menu',
  parameters: {
    figmaUrl: figmaNode('10032:114764'),
    layout: 'fullscreen',
    controls: { expanded: true },
    storyOrder: ['Default', 'Floating'],
    docs: { description: { component: 'Menú de anclas de la página: píldoras con la sección actual en azul (`aria-current`). `anchor-menu.js` la sigue al desplazarse; `--floating` la deja fija arriba.' } },
  },
  args: { type: 'section', items: 5, current: 1 },
  argTypes: {
    type: { control: 'inline-radio', options: ['section', 'floating'], description: 'Type en Figma.' },
    items: { control: 'number', description: 'N-items en Figma.' },
    current: { control: 'number', description: 'Sección actual.' },
  },
  render: (args) => {
    const items = SECTIONS.slice(0, Math.max(2, Math.min(SECTIONS.length, Number(args['items']) || 2))).map(
      (label, i) => `    <li><a ${attrs({ class: 'aem-anchor-menu__link', href: `#seccion-${i + 1}`, 'aria-current': Number(args['current']) === i + 1 && 'true' })}>${label}</a></li>`,
    );
    return { template: `<nav class="${cx('aem-anchor-menu', args['type'] === 'floating' && 'aem-anchor-menu--floating')}" aria-label="En esta página">\n  <ul class="aem-anchor-menu__list">\n${items.join('\n')}\n  </ul>\n</nav>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Floating: Story = { args: { type: 'floating' } };
