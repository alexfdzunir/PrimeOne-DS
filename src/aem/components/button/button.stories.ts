import type { Meta, StoryObj } from '@storybook/angular';

interface ButtonArgs {
  label: string;
  severity: 'primary' | 'secondary' | 'ghost' | 'outlined';
  size: 'sm' | 'md' | 'lg';
  iconOnly: boolean;
  prefixIcon: boolean;
  suffixIcon: boolean;
  icon: string;
  danger: boolean;
  disabled: boolean;
}

/** HTML of the button for the given args (BEM modifiers only when they differ from the default). */
function buttonHtml(args: ButtonArgs): string {
  const classes = [
    'aem-button',
    args.severity !== 'primary' && `aem-button--${args.severity}`,
    args.size !== 'md' && `aem-button--${args.size}`,
    args.iconOnly && 'aem-button--icon-only',
    args.danger && 'aem-button--danger',
  ].filter(Boolean);
  const icon = `<i class="${args.icon} aem-button__icon" aria-hidden="true"></i>`;
  const content = args.iconOnly
    ? icon
    : [args.prefixIcon && icon, `<span class="aem-button__label">${args.label}</span>`, args.suffixIcon && icon].filter(Boolean).join('\n  ');
  const attrs = [`class="${classes.join(' ')}"`, 'type="button"', args.iconOnly && `aria-label="${args.label}"`, args.disabled && 'disabled'].filter(Boolean).join(' ');
  return `<button ${attrs}>\n  ${content}\n</button>`;
}

const meta: Meta = {
  title: 'AEM/Buttons/Button',
  parameters: {
    figmaUrl: 'https://www.figma.com/design/hT9BgF8wE5lXM54ldUcy9H/Design-System---AEM-Portales?node-id=8512-12742',
    controls: { expanded: true },
    storyOrder: ['Default', 'Secondary', 'Ghost', 'Outlined', 'IconOnly', 'Danger', 'Disabled'],
    docs: {
      description: {
        component:
          'Botón de los portales AEM: HTML con clases BEM (`aem-button`, modificadores `--secondary`, `--ghost`, `--outlined`, `--sm`, `--lg`, `--icon-only`, `--danger`) y el CSS de `src/aem`. En modo oscuro (`.aem-dark`) toma los colores On-Inverse de Figma; `--inverse` los fuerza en una sección oscura de una página clara.',
      },
    },
  },
  args: {
    label: 'Button',
    severity: 'primary',
    size: 'md',
    iconOnly: false,
    prefixIcon: false,
    suffixIcon: true,
    icon: 'ph ph-arrow-right',
    danger: false,
    disabled: false,
  },
  argTypes: {
    severity: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'outlined'], description: 'Severity en Figma.' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Size en Figma: SM 36px, MD 44px, LG 52px.' },
    label: { control: 'text', description: 'Texto del botón (aria-label si es solo icono).' },
    icon: { control: 'text', description: 'Clase del icono.' },
    prefixIcon: { control: 'boolean', description: 'Show Prefix-Icon en Figma.' },
    suffixIcon: { control: 'boolean', description: 'Show Suffix-Icon en Figma.' },
    iconOnly: { control: 'boolean', description: 'Icon-Only en Figma: botón cuadrado solo con icono.' },
    danger: { control: 'boolean', description: 'Acción destructiva (Danger en Figma).' },
    disabled: { control: 'boolean', description: 'Disabled en Figma.' },
  },
  render: (args) => ({ template: buttonHtml(args as ButtonArgs) }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Secondary: Story = { args: { severity: 'secondary' } };
export const Ghost: Story = { args: { severity: 'ghost' } };
export const Outlined: Story = { args: { severity: 'outlined' } };
export const IconOnly: Story = { args: { iconOnly: true, icon: 'ph ph-plus', label: 'Añadir' } };
export const Danger: Story = { args: { danger: true, label: 'Eliminar', icon: 'ph ph-trash', suffixIcon: false, prefixIcon: true } };
export const Disabled: Story = { args: { disabled: true } };
