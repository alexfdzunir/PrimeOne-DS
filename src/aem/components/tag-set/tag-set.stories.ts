import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode } from '../../stories/helpers';

const CATEGORIES = ['Educación', 'Psicología', 'Investigación', 'Becas'];

const meta: Meta = {
  title: 'AEM/Status/Tag Set',
  parameters: {
    figmaUrl: figmaNode('7796:14394'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Interactive', 'Categories'],
    docs: { description: { component: 'Fila de etiquetas: `aem-state-tag` (modalidad: live, online, presencial, finalizado) y `aem-category-tag` (enlaces si son interactivas), separadas por filetes.' } },
  },
  args: { state: 'online', showState: true, categories: 3, interactive: false },
  argTypes: {
    state: { control: 'inline-radio', options: ['live', 'online', 'presencial', 'finalizado'], description: 'Type del state-tag en Figma.' },
    showState: { control: 'boolean', description: 'Show State Tag en Figma.' },
    categories: { control: 'number', description: 'Etiquetas de categoría.' },
    interactive: { control: 'boolean', description: 'Interactive en Figma: las categorías son enlaces.' },
  },
  render: (args) => {
    const labels = { live: 'Live', online: 'Online', presencial: 'Presencial', finalizado: 'Finalizado' } as Record<string, string>;
    const items: string[] = [];
    if (args['showState']) items.push(`  <li><span class="aem-state-tag aem-state-tag--${args['state']}">${labels[args['state']]}</span></li>`);
    CATEGORIES.slice(0, Math.max(0, Number(args['categories']) || 0)).forEach((label) =>
      items.push(args['interactive'] ? `  <li><a class="aem-category-tag" href="#">${label}</a></li>` : `  <li><span class="aem-category-tag">${label}</span></li>`),
    );
    return { template: `<ul class="aem-tag-set">\n${items.join('\n')}\n</ul>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Interactive: Story = { args: { interactive: true } };
export const Categories: Story = { args: { showState: false, categories: 4 } };
