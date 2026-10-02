import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, heading, icon, indent } from '../../stories/helpers';

const ITEMS = ['Psicología', 'Educación Infantil', 'Educación Primaria', 'Derecho', 'Administración de Empresas', 'Marketing', 'Ingeniería Informática', 'Ciencia de Datos', 'Trabajo Social', 'Comunicación', 'Turismo', 'Criminología', 'Relaciones Internacionales', 'Humanidades', 'Ingeniería de Organización', 'Música'];

const meta: Meta = {
  title: 'AEM/Modules/List Block',
  parameters: {
    figmaUrl: figmaNode('9560:33771'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Listado en columnas con viñetas, botón y enlace con el resto de resultados (`aem-list-block`).' } },
  },
  args: { items: 12, columns: 4, title: 'Grados universitarios online' },
  argTypes: { items: { control: 'number' }, columns: { control: 'inline-radio', options: [2, 3, 4] }, title: { control: 'text' } },
  render: (args) => {
    const count = Math.max(1, Math.min(ITEMS.length, Number(args['items']) || 1));
    return {
      template: `<section class="aem-section">
  <div class="aem-section__inner aem-list-block">
${indent(heading({ title: args['title'] }), 4)}
    <ul class="aem-list-block__list" style="--aem-list-block-columns: ${args['columns']}">
${ITEMS.slice(0, count).map((item) => `      <li>${item}</li>`).join('\n')}
    </ul>
    <div class="aem-list-block__actions">
      <a class="aem-button aem-button--outlined aem-button--lg" href="#">Ver todos los grados</a>
      <a class="aem-link-button" href="#">Ver más resultados ${icon('caret-right')}</a>
      <p class="aem-list-block__count">Has visto ${count} de ${count + 20} resultados</p>
    </div>
  </div>
</section>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
