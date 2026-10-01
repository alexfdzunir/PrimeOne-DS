import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

interface Args {
  placeholder: string;
  value: string;
  compact: boolean;
  suggestions: boolean;
  disabled: boolean;
}

const SUGGESTIONS = ['Grado en Psicología', 'Grado en Derecho', 'Máster en Psicopedagogía', 'Máster en Inteligencia Artificial', 'Doctorado en Educación'];

const meta: Meta = {
  title: 'AEM/Inputs/Search',
  parameters: {
    figmaUrl: figmaNode('11559:9409'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Compact', 'Filled', 'Disabled'],
    docs: { description: { component: 'Buscador en píldora con botón de borrar y sugerencias (`search.js`). `--compact` empieza como icono y se abre al enfocarlo. Escribe "psico" para ver las sugerencias.' } },
  },
  args: { placeholder: 'Buscar estudios', value: '', compact: false, suggestions: true, disabled: false },
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    compact: { control: 'boolean', description: 'Full Width=False en Figma: solo el icono hasta que se usa.' },
    suggestions: { control: 'boolean', description: 'Lista de sugerencias (State=Typing).' },
    disabled: { control: 'boolean' },
  },
  render: (raw) => {
    const args = raw as Args;
    const menu = args.suggestions ? `\n  <ul class="aem-menu" role="listbox" hidden>\n${SUGGESTIONS.map((s) => `    <li class="aem-menu__item" role="option">${s}</li>`).join('\n')}\n  </ul>` : '';
    return {
      template: `<div class="${cx('aem-field-host', 'aem-search', args.compact && 'aem-search--compact', args.disabled && 'aem-field-host--disabled')}" role="search" style="max-width: 22rem">
  <label class="aem-field">
    ${icon('magnifying-glass', 'aem-search__icon')}
    <input ${attrs({ class: 'aem-search__input', type: 'search', placeholder: args.placeholder, value: args.value, 'aria-label': args.placeholder, autocomplete: 'off', disabled: args.disabled })} />
    <button class="aem-search__clear" type="button" aria-label="Borrar búsqueda">${icon('x')}</button>
  </label>${menu}
</div>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Compact: Story = { args: { compact: true } };
export const Filled: Story = { args: { value: 'Psicología' } };
export const Disabled: Story = { args: { disabled: true } };
