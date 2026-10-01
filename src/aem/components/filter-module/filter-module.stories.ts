import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, figmaNode, icon } from '../../stories/helpers';

const FILTERS: [string, string, string[]][] = [
  ['Tipo de estudio', 'graduation-cap', ['Grado', 'Máster', 'Doctorado']],
  ['Área', 'books', ['Educación', 'Salud', 'Ingeniería', 'Empresa']],
  ['Modalidad', 'monitor', ['Online', 'Semipresencial']],
  ['Idioma', 'translate', ['Español', 'Inglés']],
];
const SELECTED = ['Máster', 'Educación', 'Online'];
let seq = 0;

const meta: Meta = {
  title: 'AEM/Modules/Filter Module',
  parameters: {
    figmaUrl: figmaNode('11567:9273'),
    layout: 'fullscreen',
    height: '420px',
    controls: { expanded: true },
    docs: { description: { component: 'Módulo de filtros de un listado: búsqueda, filtros desplegables (Filter), chips de lo seleccionado con «Borrar filtros» y número de resultados (`aem-filter-module`).' } },
  },
  args: { selected: 3, results: 48 },
  argTypes: { selected: { control: 'number', description: 'Filtros aplicados.' }, results: { control: 'number' } },
  render: (args) => {
    const filters = FILTERS.map(([label, name, options]) => {
      const id = `aem-fm-${++seq}`;
      return `      <div class="aem-filter" data-aem-dropdown>
        <button ${attrs({ class: 'aem-field aem-filter__trigger', type: 'button', 'aria-haspopup': 'listbox', 'aria-expanded': 'false', 'aria-controls': id })}>
          ${icon(name, 'aem-filter__icon')}
          <span>${label} <span data-aem-dropdown-count></span></span>
          ${icon('caret-down', 'aem-filter__caret')}
        </button>
        <ul class="aem-menu" id="${id}" role="listbox" aria-label="${label}" aria-multiselectable="true" hidden>
${options.map((o) => `          <li class="aem-menu__item" role="option" aria-selected="false"><span class="aem-menu__check">${icon('check', '', 'bold')}</span>${o}</li>`).join('\n')}
        </ul>
      </div>`;
    });
    const count = Math.max(0, Math.min(SELECTED.length, Number(args['selected']) || 0));
    const chips = SELECTED.slice(0, count).map((label) => `        <button class="aem-chip aem-chip--primary" type="button" aria-pressed="true"><span>${label}</span>${icon('x', 'aem-chip__icon')}</button>`);
    const selected = count
      ? `\n    <div class="aem-filter-module__selected">\n${chips.join('\n')}\n      <button class="aem-link-button aem-link-button--sm" type="button">${icon('trash')} Borrar filtros</button>\n    </div>`
      : '';
    return {
      template: `<section class="aem-section">
  <div class="aem-section__inner aem-filter-module">
    <div class="aem-filter-module__bar">
      <button class="aem-button aem-button--secondary aem-button--icon-only" type="button" aria-label="Buscar">${icon('magnifying-glass', 'aem-button__icon')}</button>
${filters.join('\n')}
    </div>${selected}
    <p class="aem-filter-module__results"><strong>${args['results']}</strong> resultados</p>
  </div>
</section>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
