import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, figmaNode, icon } from '../../stories/helpers';

interface Args {
  label: string;
  showLabel: boolean;
  option: string;
  checked: boolean;
  disabled: boolean;
}

const meta: Meta = {
  title: 'AEM/Inputs/Toggle',
  parameters: {
    figmaUrl: figmaNode('6484:7306'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Checked', 'Disabled'],
    docs: { description: { component: 'Interruptor: checkbox nativo con `role="switch"` y el aspecto de Figma (`aem-toggle`).' } },
  },
  args: { label: 'Notificaciones', showLabel: true, option: 'Recibir avisos por email', checked: false, disabled: false },
  argTypes: {
    label: { control: 'text', description: 'Etiqueta superior (Label Text).' },
    showLabel: { control: 'boolean', description: 'Show label en Figma.' },
    option: { control: 'text', description: 'Texto junto al interruptor (Option Text).' },
    checked: { control: 'boolean', description: 'Selected en Figma.' },
    disabled: { control: 'boolean' },
  },
  render: (raw) => {
    const args = raw as Args;
    const label = args.showLabel ? `\n  <span class="aem-toggle__label">${args.label}</span>` : '';
    return {
      template: `<div class="aem-toggle">${label}
  <label class="aem-toggle__control">
    <span>${args.option}</span>
    <input ${attrs({ class: 'aem-toggle__input', type: 'checkbox', role: 'switch', checked: args.checked, disabled: args.disabled })} />
    <span class="aem-toggle__track"><span class="aem-toggle__handle">${icon('x', 'aem-toggle__off', 'bold')}${icon('check', 'aem-toggle__on', 'bold')}</span></span>
  </label>
</div>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true, checked: true } };
