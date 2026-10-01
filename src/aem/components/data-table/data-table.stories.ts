import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode } from '../../stories/helpers';

const COLUMNS = ['Asignatura', 'Curso', 'Créditos', 'Modalidad', 'Guía'];
const ROWS = [
  ['Fundamentos de Psicología', '1.º', '6 ECTS', 'Online', 'Ver guía'],
  ['Psicología del Desarrollo', '1.º', '6 ECTS', 'Online', 'Ver guía'],
  ['Estadística Aplicada', '2.º', '6 ECTS', 'Online', 'Ver guía'],
  ['Psicopatología', '2.º', '6 ECTS', 'Presencial', 'Ver guía'],
  ['Evaluación Psicológica', '3.º', '6 ECTS', 'Online', 'Ver guía'],
  ['Trabajo Fin de Grado', '4.º', '12 ECTS', 'Online', 'Ver guía'],
];

const meta: Meta = {
  title: 'AEM/Content/Data Table',
  parameters: {
    figmaUrl: figmaNode('9333:4599'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Striped', 'ThreeColumns'],
    docs: { description: { component: 'Tabla de datos nativa (`aem-table`, `--striped`) dentro de `aem-table-wrap` para el desplazamiento horizontal en móvil.' } },
  },
  args: { columns: 5, rows: 6, striped: false, showHeader: true, showCaption: true },
  argTypes: {
    columns: { control: 'inline-radio', options: [2, 3, 5], description: 'Columns en Figma.' },
    rows: { control: 'number' },
    striped: { control: 'boolean', description: 'Striped en Figma.' },
    showHeader: { control: 'boolean', description: 'Header en Figma.' },
    showCaption: { control: 'boolean', description: 'Título de la tabla.' },
  },
  render: (args) => {
    const cols = Number(args['columns']) || 5;
    const pick = (row: string[]) => (cols === 5 ? row : cols === 3 ? [row[0], row[2], row[4]] : [row[0], row[2]]);
    const cell = (value: string, i: number, row: string[]) => (row === COLUMNS ? `<th scope="col">${value}</th>` : i === 0 ? `<th scope="row">${value}</th>` : value === 'Ver guía' ? `<td><a href="#">${value}</a></td>` : `<td>${value}</td>`);
    const head = args['showHeader'] ? `\n    <thead>\n      <tr>${pick(COLUMNS).map((v, i) => cell(v, i, COLUMNS)).join('')}</tr>\n    </thead>` : '';
    const body = ROWS.slice(0, Math.max(1, Number(args['rows']) || 1))
      .map((row) => `      <tr>${pick(row).map((v, i) => cell(v, i, row)).join('')}</tr>`)
      .join('\n');
    const caption = args['showCaption'] ? `\n    <caption>Plan de estudios del Grado en Psicología</caption>` : '';
    return { template: `<div class="aem-table-wrap">\n  <table class="${cx('aem-table', args['striped'] && 'aem-table--striped')}">${caption}${head}\n    <tbody>\n${body}\n    </tbody>\n  </table>\n</div>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Striped: Story = { args: { striped: true } };
export const ThreeColumns: Story = { args: { columns: 3 } };
