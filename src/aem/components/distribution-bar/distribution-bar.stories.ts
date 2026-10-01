import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, figmaNode, icon } from '../../stories/helpers';

const FIELDS: [string, string[]][] = [
  ['Tipo de estudios', ['Grado', 'Máster', 'Doctorado', 'Formación permanente']],
  ['Área de estudios', ['Educación', 'Salud', 'Ingeniería', 'Empresa', 'Derecho']],
  ['Oficialidad', ['Oficial', 'Propio']],
];

const meta: Meta = {
  title: 'AEM/Modules/Distribution Bar',
  parameters: {
    figmaUrl: figmaNode('9993:48196'),
    layout: 'padded',
    height: '360px',
    controls: { expanded: true },
    docs: { description: { component: 'Buscador de titulaciones: tres desplegables (Dropdown, `dropdown.js`) y el botón de búsqueda en una tarjeta flotante (`aem-distribution-bar`).' } },
  },
  args: { button: 'Encuentra tu título' },
  argTypes: { button: { control: 'text' } },
  render: (args) => {
    const fields = FIELDS.map(
      ([label, options], i) => `  <div class="aem-field-host aem-dropdown" data-aem-dropdown>
    <button ${attrs({ class: 'aem-field aem-dropdown__trigger', type: 'button', 'aria-haspopup': 'listbox', 'aria-expanded': 'false', 'aria-controls': `aem-dist-${i}` })}>
      <span class="aem-field__control"><span class="aem-dropdown__value" data-aem-dropdown-value></span><span class="aem-field__label">${label}</span></span>
      ${icon('caret-down', 'aem-dropdown__caret')}
    </button>
    <ul class="aem-menu" id="aem-dist-${i}" role="listbox" aria-label="${label}" hidden>
${options.map((o) => `      <li class="aem-menu__item" role="option" aria-selected="false">${o}</li>`).join('\n')}
    </ul>
  </div>`,
    );
    return { template: `<form class="aem-distribution-bar" action="#" role="search">\n${fields.join('\n')}\n  <button class="aem-button aem-button--secondary" type="submit">${args['button']}</button>\n</form>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
