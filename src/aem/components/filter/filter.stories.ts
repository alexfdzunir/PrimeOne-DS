import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

interface Args {
  type: 'row' | 'column';
  label: string;
  icon: string;
  showIcon: boolean;
  multiple: boolean;
  selected: number;
  group: boolean;
}

const OPTIONS = ['Online', 'Presencial', 'Semipresencial', 'Fin de semana', 'Intensivo'];
let seq = 0;

function filterHtml(args: Args, label: string, iconName: string): string {
  const id = `aem-filter-${++seq}`;
  const chosen = Number(args.selected) || 0;
  const items = OPTIONS.map((text, i) => {
    const check = args.multiple ? `<span class="aem-menu__check">${icon('check', '', 'bold')}</span>` : '';
    return `    <li ${attrs({ class: 'aem-menu__item', role: 'option', 'aria-selected': String(args.multiple ? i < chosen : i + 1 === chosen) })}>${check}${text}</li>`;
  });
  const count = args.multiple && chosen ? `(${chosen})` : '';
  return `<div class="${cx('aem-filter', args.type === 'column' && 'aem-filter--column')}" data-aem-dropdown>
  <button ${attrs({ class: cx('aem-field', 'aem-filter__trigger', chosen && 'has-value'), type: 'button', 'aria-haspopup': 'listbox', 'aria-expanded': 'false', 'aria-controls': `${id}-list` })}>
    ${args.showIcon ? icon(iconName, 'aem-filter__icon') : ''}
    <span>${label} <span data-aem-dropdown-count>${count}</span></span>
    ${icon('caret-down', 'aem-filter__caret')}
  </button>
  <ul ${attrs({ class: 'aem-menu', id: `${id}-list`, role: 'listbox', 'aria-label': label, 'aria-multiselectable': args.multiple && 'true', hidden: true })}>
${items.join('\n')}
  </ul>
</div>`;
}

const meta: Meta = {
  title: 'AEM/Inputs/Filter',
  parameters: {
    figmaUrl: figmaNode('7009:13428'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Multiple', 'Group', 'Column'],
    docs: { description: { component: 'Filtro en píldora que abre la lista de opciones. Usa el mismo JavaScript que el Dropdown (`dropdown.js`, atributo `data-aem-dropdown`).' } },
  },
  args: { type: 'row', label: 'Modalidad', icon: 'monitor', showIcon: true, multiple: false, selected: 0, group: false },
  argTypes: {
    type: { control: 'inline-radio', options: ['row', 'column'], description: 'Type en Figma: píldora o fila de panel.' },
    label: { control: 'text' },
    icon: { control: 'text', description: 'Icono de Phosphor delante.' },
    showIcon: { control: 'boolean', description: 'Show Prefix-Icon en Figma.' },
    multiple: { control: 'boolean', description: 'State=Multiselection: casillas y número de elegidas.' },
    selected: { control: 'number', description: 'Opciones elegidas al empezar.' },
    group: { control: 'boolean', description: 'Barra de filtros.' },
  },
  render: (raw) => {
    const args = raw as Args;
    if (!args.group) return { template: filterHtml(args, args.label, args.icon) };
    const filters = [
      ['Modalidad', 'monitor'],
      ['Área', 'books'],
      ['Duración', 'clock'],
      ['Idioma', 'translate'],
    ].map(([label, name]) => filterHtml(args, label, name).replace(/^/gm, '  '));
    return { template: `<div class="aem-filter-group">\n${filters.join('\n')}\n</div>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true, selected: 2 } };
export const Group: Story = { args: { group: true } };
export const Column: Story = { args: { type: 'column', showIcon: false } };
