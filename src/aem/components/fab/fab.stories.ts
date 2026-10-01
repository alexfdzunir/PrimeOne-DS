import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

interface Args {
  size: 'lg' | 'md';
  label: string;
  icon: string;
  showIcon: boolean;
  iconOnly: boolean;
}

const meta: Meta = {
  title: 'AEM/Buttons/Floating Button',
  parameters: {
    figmaUrl: figmaNode('8600:716'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Medium', 'IconOnly'],
    docs: { description: { component: 'Botón flotante (FAB) para la acción principal de la página. `aem-fab` con `--md` y `--icon-only`; `--fixed` lo fija abajo a la derecha.' } },
  },
  args: { size: 'lg', label: 'Solicitar información', icon: 'chat-circle-dots', showIcon: true, iconOnly: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['lg', 'md'], description: 'Size en Figma: LG 56px, MD 48px.' },
    label: { control: 'text', description: 'Texto (aria-label si es solo icono).' },
    icon: { control: 'text', description: 'Nombre del icono de Phosphor.' },
    showIcon: { control: 'boolean', description: 'Show Icon en Figma.' },
    iconOnly: { control: 'boolean', description: 'Icon-Only en Figma.' },
  },
  render: (raw) => {
    const args = raw as Args;
    const content = args.iconOnly ? icon(args.icon, 'aem-fab__icon') : [`<span>${args.label}</span>`, args.showIcon && icon(args.icon, 'aem-fab__icon')].filter(Boolean).join('\n  ');
    const classes = cx('aem-fab', args.size === 'md' && 'aem-fab--md', args.iconOnly && 'aem-fab--icon-only');
    return { template: `<button ${attrs({ class: classes, type: 'button', 'aria-label': args.iconOnly && args.label })}>\n  ${content}\n</button>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Medium: Story = { args: { size: 'md' } };
export const IconOnly: Story = { args: { iconOnly: true } };
