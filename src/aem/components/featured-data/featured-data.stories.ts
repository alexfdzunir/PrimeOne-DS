import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode, heading } from '../../stories/helpers';

const DATA = [
  ['+60', 'mil', 'Estudiantes', 'De más de 100 países estudian cada año en UNIR.'],
  ['+200', '', 'Titulaciones oficiales', 'Grados, másteres y doctorados reconocidos en el EEES.'],
  ['95', '%', 'Empleabilidad', 'De nuestros egresados trabaja en su sector al año de terminar.'],
];

const meta: Meta = {
  title: 'AEM/Modules/Featured Data',
  parameters: {
    figmaUrl: figmaNode('9873:51891'),
    layout: 'fullscreen',
    controls: { expanded: true },
    storyOrder: ['Default', 'Secondary'],
    docs: { description: { component: 'Cifras destacadas con su título y texto bajo la cabecera del módulo (`aem-featured-data`, `--secondary` en azul).' } },
  },
  args: { severity: 'primary', items: 3 },
  argTypes: {
    severity: { control: 'inline-radio', options: ['primary', 'secondary'], description: 'Severity en Figma.' },
    items: { control: 'inline-radio', options: [1, 2, 3], description: 'N-of data en Figma.' },
  },
  render: (args) => {
    const items = DATA.slice(0, Number(args['items']) || 3).map(
      ([value, unit, title, text]) => `      <li class="aem-featured-data__item">
        <p class="aem-featured-data__number">${value}${unit ? `<span class="aem-featured-data__unit">${unit}</span>` : ''}</p>
        <h3 class="aem-featured-data__title">${title}</h3>
        <p class="aem-featured-data__text">${text}</p>
      </li>`,
    );
    return {
      template: `<section class="aem-section">
  <div class="aem-section__inner">
${heading({ pretitle: 'UNIR en cifras', title: 'Una universidad que crece contigo', text: 'Datos del curso 2025-2026.' }).replace(/^/gm, '    ')}
    <ul class="${cx('aem-featured-data', args['severity'] === 'secondary' && 'aem-featured-data--secondary')}">
${items.join('\n')}
    </ul>
  </div>
</section>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Secondary: Story = { args: { severity: 'secondary' } };
