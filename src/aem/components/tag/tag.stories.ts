import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode, icon } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Status/Tag',
  parameters: {
    figmaUrl: figmaNode('7573:6728'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Highlight', 'Subtle', 'Plain'],
    docs: { description: { component: 'Etiqueta informativa (info-tag): `aem-tag` con `--highlight`, `--subtle`, `--plain` (sin fondo) y `--accelerator`.' } },
  },
  args: { severity: 'primary', label: '60 ECTS', icon: 'clock', showIcon: true, plain: false },
  argTypes: {
    severity: { control: 'inline-radio', options: ['primary', 'highlight', 'subtle', 'accelerator'], description: 'Severity en Figma.' },
    label: { control: 'text' },
    icon: { control: 'text', description: 'Icono de Phosphor.' },
    showIcon: { control: 'boolean', description: 'Show Icon en Figma.' },
    plain: { control: 'boolean', description: 'Fill=False en Figma: sin fondo.' },
  },
  render: (args) => {
    const classes = cx('aem-tag', args['severity'] !== 'primary' && `aem-tag--${args['severity']}`, args['plain'] && 'aem-tag--plain');
    const glyph = args['showIcon'] ? `\n  ${icon(args['icon'], 'aem-tag__icon')}` : '';
    return { template: `<span class="${classes}">${glyph}\n  <span class="aem-tag__text">${args['label']}</span>\n</span>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Highlight: Story = { args: { severity: 'highlight', label: 'Nuevo', icon: 'star' } };
export const Subtle: Story = { args: { severity: 'subtle' } };
export const Plain: Story = { args: { plain: true } };
