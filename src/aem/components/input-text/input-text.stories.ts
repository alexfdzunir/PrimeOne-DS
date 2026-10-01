import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

interface Args {
  type: 'text' | 'phone';
  label: string;
  value: string;
  icon: string;
  showIcon: boolean;
  supportingText: string;
  showSupporting: boolean;
  state: 'default' | 'success' | 'invalid';
  disabled: boolean;
}

let seq = 0;

const meta: Meta = {
  title: 'AEM/Inputs/Input Text',
  parameters: {
    figmaUrl: figmaNode('6913:21369'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Filled', 'Invalid', 'Phone', 'Disabled'],
    docs: {
      description: {
        component:
          'Campo de texto con etiqueta flotante: la etiqueta sube al enfocar o escribir. `aem-field-host aem-input` con `aem-field` (estilos compartidos de `styles/field.css`); el input necesita `placeholder=" "`.',
      },
    },
  },
  args: { type: 'text', label: 'Nombre y apellidos', value: '', icon: 'user', showIcon: true, supportingText: 'Tal como aparece en tu documento de identidad', showSupporting: false, state: 'default', disabled: false },
  argTypes: {
    type: { control: 'inline-radio', options: ['text', 'phone'], description: 'Type en Figma: texto o teléfono con prefijo.' },
    state: { control: 'inline-radio', options: ['default', 'success', 'invalid'], description: 'Validación: Filled (success) e Invalid en Figma.' },
    label: { control: 'text' },
    value: { control: 'text', description: 'Valor inicial.' },
    icon: { control: 'text', description: 'Icono de Phosphor a la derecha.' },
    showIcon: { control: 'boolean', description: 'Show Icon en Figma.' },
    supportingText: { control: 'text' },
    showSupporting: { control: 'boolean', description: 'Show Supporting Text en Figma.' },
    disabled: { control: 'boolean' },
  },
  render: (raw) => {
    const args = raw as Args;
    const id = `aem-input-${++seq}`;
    const host = cx('aem-field-host', 'aem-input', args.type === 'phone' && 'aem-input--phone', args.state !== 'default' && `aem-field-host--${args.state}`, args.disabled && 'aem-field-host--disabled');
    const input = `<input ${attrs({ class: 'aem-field__input', id, type: args.type === 'phone' ? 'tel' : 'text', placeholder: ' ', value: args.value, disabled: args.disabled, 'aria-invalid': args.state === 'invalid' && 'true', 'aria-describedby': (args.showSupporting || args.state === 'invalid') && `${id}-help` })} />`;
    const field = `<label class="aem-field" for="${id}">
    <span class="aem-field__control">
      ${input}
      <span class="aem-field__label">${args.type === 'phone' ? 'Teléfono' : args.label}</span>
    </span>${args.showIcon ? `\n    ${icon(args.type === 'phone' ? 'phone' : args.icon, 'aem-field__icon')}` : ''}
  </label>`;
    const body = args.type === 'phone' ? `<div class="aem-input__row">\n    <span class="aem-field aem-input__prefix">+34</span>\n    ${field.replace(/\n/g, '\n  ')}\n  </div>` : field;
    const supporting = args.showSupporting || args.state === 'invalid' ? `\n  <p class="aem-field__supporting" id="${id}-help">${args.state === 'invalid' ? 'Revisa este campo' : args.supportingText}</p>` : '';
    return { template: `<div class="${host}" style="max-width: 22rem">\n  ${body}${supporting}\n</div>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Filled: Story = { args: { value: 'María García López', state: 'success' } };
export const Invalid: Story = { args: { value: 'María', state: 'invalid' } };
export const Phone: Story = { args: { type: 'phone', value: '600 000 000' } };
export const Disabled: Story = { args: { disabled: true } };
