import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode, icon } from '../../stories/helpers';

const ITEMS = [
  ['Clases en directo con los mejores profesionales', 'video-camera'],
  ['Tutor personal durante todo el programa', 'user-focus'],
  ['Prácticas en empresas e instituciones', 'briefcase'],
  ['Título oficial válido en el EEES', 'certificate'],
  ['Becas y pago a plazos sin intereses', 'piggy-bank'],
];

const meta: Meta = {
  title: 'AEM/Content/List',
  parameters: {
    figmaUrl: figmaNode('10431:64022'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Ordered', 'Icon', 'Interactive', 'Small'],
    docs: { description: { component: 'Listas de contenido: viñetas, numeradas (`--ordered`) o con iconos (`--icon`); `--sm` y `--interactive` (enlaces).' } },
  },
  args: { type: 'unordered', size: 'md', items: 4, interactive: false },
  argTypes: {
    type: { control: 'inline-radio', options: ['unordered', 'ordered', 'icon'], description: 'Type en Figma.' },
    size: { control: 'inline-radio', options: ['md', 'sm'], description: 'Size en Figma.' },
    items: { control: 'number', description: 'N-items en Figma.' },
    interactive: { control: 'boolean', description: 'Interactive en Figma: los elementos son enlaces.' },
  },
  render: (args) => {
    const type = args['type'] as string;
    const tag = type === 'ordered' ? 'ol' : 'ul';
    const classes = cx('aem-list', type !== 'unordered' && `aem-list--${type}`, args['size'] === 'sm' && 'aem-list--sm', args['interactive'] && 'aem-list--interactive');
    const items = ITEMS.slice(0, Math.max(1, Math.min(ITEMS.length, Number(args['items']) || 1))).map(([text, name]) => {
      const content = args['interactive'] ? `<a href="#">${text}</a>` : `<span>${text}</span>`;
      return `  <li>${type === 'icon' ? icon(name, 'aem-list__icon') : ''}${content}</li>`;
    });
    return { template: `<${tag} class="${classes}">\n${items.join('\n')}\n</${tag}>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Ordered: Story = { args: { type: 'ordered' } };
export const Icon: Story = { args: { type: 'icon' } };
export const Interactive: Story = { args: { interactive: true } };
export const Small: Story = { args: { size: 'sm' } };
