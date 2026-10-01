import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

interface Args {
  label: string;
  value: string;
  state: 'default' | 'success' | 'invalid';
  disabled: boolean;
}

let seq = 0;

const meta: Meta = {
  title: 'AEM/Inputs/Date Picker',
  parameters: {
    figmaUrl: figmaNode('7438:5959'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Filled', 'Invalid', 'Disabled'],
    docs: { description: { component: 'Campo de fecha con calendario desplegable (`date-picker.js`): pasos de mes y año, día de hoy marcado y valor en formato dd/mm/aaaa.' } },
  },
  args: { label: 'Fecha de nacimiento', value: '', state: 'default', disabled: false },
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'success', 'invalid'], description: 'Validación.' },
    label: { control: 'text' },
    value: { control: 'text', description: 'Fecha inicial (dd/mm/aaaa).' },
    disabled: { control: 'boolean' },
  },
  render: (raw) => {
    const args = raw as Args;
    const id = `aem-date-${++seq}`;
    const host = cx('aem-field-host', 'aem-datepicker', args.state !== 'default' && `aem-field-host--${args.state}`, args.disabled && 'aem-field-host--disabled');
    return {
      template: `<div class="${host}" style="max-width: 17.25rem">
  <div class="aem-field">
    <label class="aem-field__control" for="${id}">
      <input ${attrs({ class: 'aem-field__input', id, type: 'text', inputmode: 'numeric', placeholder: ' ', value: args.value, autocomplete: 'bday', disabled: args.disabled })} />
      <span class="aem-field__label">${args.label}</span>
    </label>
    <button ${attrs({ class: 'aem-datepicker__toggle', type: 'button', 'aria-label': 'Abrir calendario', 'aria-expanded': 'false', 'aria-controls': `${id}-calendar`, disabled: args.disabled })}>${icon('calendar-blank')}</button>
  </div>
  <div class="aem-calendar" id="${id}-calendar" role="dialog" aria-label="Calendario" hidden></div>
</div>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Filled: Story = { args: { value: '14/09/2026', state: 'success' } };
export const Invalid: Story = { args: { value: '31/02/2026', state: 'invalid' } };
export const Disabled: Story = { args: { disabled: true } };
