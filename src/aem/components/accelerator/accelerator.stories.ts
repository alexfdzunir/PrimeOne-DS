import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

const LINKS = [
  ['calendar-blank', 'Próximo inicio: octubre'],
  ['currency-eur', 'Precio y becas'],
  ['file-text', 'Plan de estudios'],
  ['chats', 'Habla con un asesor'],
  ['sparkle', 'Matrícula abierta'],
];

const meta: Meta = {
  title: 'AEM/Modules/Accelerator',
  parameters: {
    figmaUrl: figmaNode('9883:40327'),
    layout: 'fullscreen',
    controls: { expanded: true },
    storyOrder: ['Default', 'Light', 'Highlight', 'Vertical'],
    docs: { description: { component: 'Barra de accesos rápidos con icono (`aem-accelerator`): sobre azul oscuro, blanca (`--default`) o miel (`--highlight`); el último enlace destacado.' } },
  },
  args: { background: 'inverse', items: 5, vertical: false },
  argTypes: {
    background: { control: 'inline-radio', options: ['inverse', 'default', 'highlight'], description: 'Background en Figma.' },
    items: { control: 'number' },
    vertical: { control: 'boolean', description: 'Disposition=Vertical (sidebar).' },
  },
  render: (args) => {
    const count = Math.max(1, Math.min(LINKS.length, Number(args['items']) || 1));
    const items = LINKS.slice(0, count).map(([name, label], i) => `  <li><a ${attrs({ class: cx('aem-accelerator__link', i === count - 1 && count > 1 && 'aem-accelerator__link--highlight'), href: '#' })}>${icon(name)} ${label}</a></li>`);
    return { template: `<ul class="${cx('aem-accelerator', args['background'] !== 'inverse' && `aem-accelerator--${args['background']}`, args['vertical'] && 'aem-accelerator--vertical')}" aria-label="Accesos rápidos">\n${items.join('\n')}\n</ul>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Light: Story = { args: { background: 'default' } };
export const Highlight: Story = { args: { background: 'highlight' } };
export const Vertical: Story = { args: { vertical: true, items: 4 } };
