import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

interface Args {
  size: 'lg' | 'sm';
  label: string;
  showLabel: boolean;
  items: number;
  checked: boolean;
  indeterminate: boolean;
  invalid: boolean;
  disabled: boolean;
  supportingText: string;
  showSupporting: boolean;
}

const OPTIONS = ['Acepto la política de privacidad', 'Quiero recibir información de UNIR', 'Soy antiguo alumno', 'Necesito beca'];

const meta: Meta = {
  title: 'AEM/Inputs/Checkbox',
  parameters: {
    figmaUrl: figmaNode('5968:10119'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Checked', 'Indeterminate', 'Group', 'Invalid', 'Disabled'],
    docs: { description: { component: 'Casilla nativa con la caja de Figma. `aem-checkbox` (`--sm`, `--invalid`) con `aem-checkbox__item` por opción.' } },
  },
  args: { size: 'lg', label: 'Consentimiento', showLabel: false, items: 1, checked: false, indeterminate: false, invalid: false, disabled: false, supportingText: 'Debes aceptar para continuar', showSupporting: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['lg', 'sm'], description: 'Size en Figma: LG Small 1, SM Caption.' },
    label: { control: 'text', description: 'Etiqueta del grupo (Label Text).' },
    showLabel: { control: 'boolean', description: 'Show Label en Figma.' },
    items: { control: 'number', description: 'Número de opciones.' },
    checked: { control: 'boolean', description: 'Selection=Selected en Figma.' },
    indeterminate: { control: 'boolean', description: 'Selection=Indeterminate en Figma.' },
    invalid: { control: 'boolean', description: 'State=Error en Figma.' },
    disabled: { control: 'boolean' },
    supportingText: { control: 'text' },
    showSupporting: { control: 'boolean', description: 'Show Supporting Text en Figma.' },
  },
  render: (raw) => {
    const args = raw as Args;
    const count = Math.max(1, Math.min(OPTIONS.length, Number(args.items) || 1));
    const items = OPTIONS.slice(0, count).map(
      (text, i) => `  <label class="aem-checkbox__item">
    <input ${attrs({ class: 'aem-checkbox__input', type: 'checkbox', name: 'consent', checked: args.checked && i === 0, 'data-indeterminate': args.indeterminate && i === 0, disabled: args.disabled, 'aria-invalid': args.invalid && 'true' })} />
    <span class="aem-checkbox__box">${icon('check', 'aem-checkbox__check', 'bold')}${icon('minus', 'aem-checkbox__minus', 'bold')}</span>
    <span>${text}</span>
  </label>`,
    );
    const classes = cx('aem-checkbox', args.size === 'sm' && 'aem-checkbox--sm', args.invalid && 'aem-checkbox--invalid');
    const legend = args.showLabel ? `  <legend class="aem-checkbox__legend">${args.label}</legend>\n` : '';
    const supporting = args.showSupporting || args.invalid ? `\n  <p class="aem-checkbox__supporting">${args.supportingText}</p>` : '';
    return { template: `<fieldset class="${classes}">\n${legend}${items.join('\n')}${supporting}\n</fieldset>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const Group: Story = { args: { items: 4, showLabel: true } };
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true, checked: true } };
