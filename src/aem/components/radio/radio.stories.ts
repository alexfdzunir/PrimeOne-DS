import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode } from '../../stories/helpers';

interface Args {
  size: 'lg' | 'sm';
  label: string;
  showLabel: boolean;
  selected: number;
  invalid: boolean;
  disabled: boolean;
  supportingText: string;
  showSupporting: boolean;
}

const OPTIONS = ['Grado', 'Máster', 'Doctorado', 'Formación permanente'];

const meta: Meta = {
  title: 'AEM/Inputs/Radio Button',
  parameters: {
    figmaUrl: figmaNode('6104:1373'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Invalid', 'Disabled'],
    docs: { description: { component: 'Grupo de radios nativos con el círculo de Figma: `aem-radio` (`--sm`, `--invalid`) con `aem-radio__item` por opción.' } },
  },
  args: { size: 'lg', label: 'Nivel de estudios', showLabel: true, selected: 1, invalid: false, disabled: false, supportingText: 'Elige una opción', showSupporting: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['lg', 'sm'], description: 'Size en Figma.' },
    label: { control: 'text', description: 'Etiqueta del grupo.' },
    showLabel: { control: 'boolean', description: 'Show Label en Figma.' },
    selected: { control: 'number', description: 'Opción marcada (0 ninguna).' },
    invalid: { control: 'boolean', description: 'State=Error en Figma.' },
    disabled: { control: 'boolean' },
    supportingText: { control: 'text' },
    showSupporting: { control: 'boolean', description: 'Show Supporting Text en Figma.' },
  },
  render: (raw) => {
    const args = raw as Args;
    const items = OPTIONS.map(
      (text, i) => `  <label class="aem-radio__item">
    <input ${attrs({ class: 'aem-radio__input', type: 'radio', name: 'level', value: text, checked: Number(args.selected) === i + 1, disabled: args.disabled })} />
    <span class="aem-radio__circle"></span>
    <span>${text}</span>
  </label>`,
    );
    const classes = cx('aem-radio', args.size === 'sm' && 'aem-radio--sm', args.invalid && 'aem-radio--invalid');
    const legend = args.showLabel ? `  <legend class="aem-radio__legend">${args.label}</legend>\n` : '';
    const supporting = args.showSupporting || args.invalid ? `\n  <p class="aem-radio__supporting">${args.supportingText}</p>` : '';
    return { template: `<fieldset class="${classes}">\n${legend}${items.join('\n')}${supporting}\n</fieldset>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Invalid: Story = { args: { invalid: true, selected: 0 } };
export const Disabled: Story = { args: { disabled: true } };
