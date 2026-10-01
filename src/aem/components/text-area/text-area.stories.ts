import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

interface Args {
  label: string;
  value: string;
  maxLength: number;
  showIcon: boolean;
  supportingText: string;
  showFooter: boolean;
  state: 'default' | 'success' | 'invalid';
  disabled: boolean;
}

let seq = 0;

const meta: Meta = {
  title: 'AEM/Inputs/Text Area',
  parameters: {
    figmaUrl: figmaNode('5968:13325'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Filled', 'Invalid', 'Disabled'],
    docs: { description: { component: 'Área de texto con etiqueta, contador de caracteres (`text-area.js`) y texto de ayuda. Sobre el campo compartido (`aem-field`).' } },
  },
  args: { label: 'Cuéntanos qué te interesa', value: '', maxLength: 250, showIcon: true, supportingText: 'Opcional', showFooter: true, state: 'default', disabled: false },
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'success', 'invalid'], description: 'Validación.' },
    label: { control: 'text' },
    value: { control: 'text' },
    maxLength: { control: 'number', description: 'Máximo de caracteres del contador.' },
    showIcon: { control: 'boolean', description: 'Show Suffix-Icon en Figma.' },
    supportingText: { control: 'text' },
    showFooter: { control: 'boolean', description: 'Show Footer en Figma (ayuda y contador).' },
    disabled: { control: 'boolean' },
  },
  render: (raw) => {
    const args = raw as Args;
    const id = `aem-textarea-${++seq}`;
    const host = cx('aem-field-host', 'aem-textarea', args.state !== 'default' && `aem-field-host--${args.state}`, args.disabled && 'aem-field-host--disabled');
    const footer = args.showFooter
      ? `\n  <div class="aem-textarea__footer">\n    <p class="aem-field__supporting" id="${id}-help">${args.state === 'invalid' ? 'Revisa este campo' : args.supportingText}</p>\n    <span class="aem-textarea__count" aria-live="polite">${args.value.length}/${args.maxLength}</span>\n  </div>`
      : '';
    return {
      template: `<div class="${host}" style="max-width: 22rem">
  <label class="aem-field" for="${id}">
    <span class="aem-textarea__head">
      <span class="aem-textarea__label">${args.label}</span>${args.showIcon ? `\n      ${icon('pencil-simple', 'aem-field__icon')}` : ''}
    </span>
    <textarea ${attrs({ class: 'aem-field__input', id, rows: 3, placeholder: ' ', maxlength: args.maxLength, disabled: args.disabled, 'aria-describedby': args.showFooter && `${id}-help` })}>${args.value}</textarea>
  </label>${footer}
</div>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Filled: Story = { args: { value: 'Me interesa el máster en Inteligencia Artificial.', state: 'success' } };
export const Invalid: Story = { args: { state: 'invalid' } };
export const Disabled: Story = { args: { disabled: true } };
