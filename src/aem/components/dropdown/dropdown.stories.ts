import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

interface Args {
  label: string;
  multiple: boolean;
  showCategory: boolean;
  selected: number;
  supportingText: string;
  showSupporting: boolean;
  state: 'default' | 'invalid';
  disabled: boolean;
}

const OPTIONS = ['Grado', 'Máster universitario', 'Máster propio', 'Doctorado', 'Formación permanente', 'Cursos de idiomas'];
let seq = 0;

const meta: Meta = {
  title: 'AEM/Inputs/Dropdown',
  parameters: {
    figmaUrl: figmaNode('6913:26550'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Selected', 'Multiple', 'Invalid', 'Disabled'],
    docs: { description: { component: 'Desplegable accesible (botón + listbox) con selección única o múltiple. `dropdown.js` gestiona la apertura, el teclado y el valor.' } },
  },
  args: { label: 'Tipo de estudios', multiple: false, showCategory: false, selected: 0, supportingText: 'Elige el nivel que te interesa', showSupporting: false, state: 'default', disabled: false },
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'invalid'], description: 'State=Error en Figma.' },
    label: { control: 'text', description: 'Label Text en Figma.' },
    multiple: { control: 'boolean', description: 'Type=Multiselection: opciones con casilla.' },
    showCategory: { control: 'boolean', description: 'Show Category en Figma: cabecera del grupo de opciones.' },
    selected: { control: 'number', description: 'Opción elegida al empezar (0 ninguna).' },
    supportingText: { control: 'text' },
    showSupporting: { control: 'boolean', description: 'Show Supporting Text en Figma.' },
    disabled: { control: 'boolean' },
  },
  render: (raw) => {
    const args = raw as Args;
    const id = `aem-dropdown-${++seq}`;
    const chosen = Number(args.selected) || 0;
    const items = OPTIONS.map((label, i) => {
      const check = args.multiple ? `<span class="aem-menu__check">${icon('check', '', 'bold')}</span>` : '';
      return `    <li ${attrs({ class: 'aem-menu__item', role: 'option', 'aria-selected': String(i + 1 === chosen) })}>${check}${label}</li>`;
    });
    const category = args.showCategory ? `    <li class="aem-menu__category" role="presentation">Estudios oficiales</li>\n` : '';
    const host = cx('aem-field-host', 'aem-dropdown', args.multiple && 'aem-dropdown--multiple', args.state === 'invalid' && 'aem-field-host--invalid', args.disabled && 'aem-field-host--disabled');
    const supporting = args.showSupporting || args.state === 'invalid' ? `\n  <p class="aem-field__supporting">${args.state === 'invalid' ? 'Elige una opción' : args.supportingText}</p>` : '';
    return {
      template: `<div class="${host}" data-aem-dropdown style="max-width: 22rem">
  <button ${attrs({ class: cx('aem-field', 'aem-dropdown__trigger', chosen && 'has-value'), type: 'button', 'aria-haspopup': 'listbox', 'aria-expanded': 'false', 'aria-controls': `${id}-list`, disabled: args.disabled })}>
    <span class="aem-field__control">
      <span class="aem-dropdown__value" data-aem-dropdown-value>${chosen ? OPTIONS[chosen - 1] : ''}</span>
      <span class="aem-field__label">${args.label}</span>
    </span>
    ${icon('caret-down', 'aem-dropdown__caret')}
  </button>
  <ul ${attrs({ class: 'aem-menu', id: `${id}-list`, role: 'listbox', 'aria-label': args.label, 'aria-multiselectable': args.multiple && 'true', hidden: true })}>
${category}${items.join('\n')}
  </ul>${supporting}
</div>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Selected: Story = { args: { selected: 2 } };
export const Multiple: Story = { args: { multiple: true, showCategory: true } };
export const Invalid: Story = { args: { state: 'invalid' } };
export const Disabled: Story = { args: { disabled: true } };
