import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, heading, icon, indent } from '../../stories/helpers';

const COLUMNS: [string, string, string[]][] = [
  ['Grado', 'Formación universitaria completa para empezar tu carrera.', ['240 ECTS', '4 años', 'Prácticas en empresa']],
  ['Máster', 'Especialízate y accede a puestos de mayor responsabilidad.', ['60 ECTS', '1 año', 'Trabajo fin de máster']],
  ['Doctorado', 'Investiga y obtén el máximo grado académico.', ['Tesis doctoral', '3 años', 'Dirección personal']],
  ['Curso', 'Actualiza una competencia concreta en pocas semanas.', ['Créditos propios', '3 meses', 'Certificado UNIR']],
];

const meta: Meta = {
  title: 'AEM/Modules/Comparison Block',
  parameters: {
    figmaUrl: figmaNode('21034:28885'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Bloque comparativo: cabecera del módulo y columnas con titular, texto y lista con separadores (`aem-comparison`).' } },
  },
  args: { columns: 4, title: '¿Qué tipo de formación buscas?' },
  argTypes: { columns: { control: 'inline-radio', options: [2, 3, 4] }, title: { control: 'text' } },
  render: (args) => {
    const count = Number(args['columns']) || 4;
    const columns = COLUMNS.slice(0, count).map(
      ([title, text, list]) => `  <li class="aem-comparison__column">
    <h3 class="aem-comparison__title">${title}</h3>
    <p class="aem-comparison__text">${text}</p>
    <ul class="aem-comparison__list">
${list.map((item) => `      <li>${icon('check-circle')} ${item}</li>`).join('\n')}
    </ul>
  </li>`,
    );
    return {
      template: `<section class="aem-section">
  <div class="aem-section__inner">
${indent(heading({ title: args['title'] }), 4)}
    <ul class="aem-comparison">
${indent(columns.join('\n'), 4)}
    </ul>
  </div>
</section>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
