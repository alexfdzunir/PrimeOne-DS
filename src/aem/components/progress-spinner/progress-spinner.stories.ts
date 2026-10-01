import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Status/Progress Spinner',
  parameters: {
    figmaUrl: figmaNode('7671:6862'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Small'],
    docs: { description: { component: 'Indicador de carga circular (`aem-spinner`, `--sm`). Lleva `role="status"` y un texto para lectores de pantalla.' } },
  },
  args: { size: 'lg', label: 'Cargando' },
  argTypes: {
    size: { control: 'inline-radio', options: ['lg', 'sm'], description: 'Size en Figma: LG 80px, SM 20px.' },
    label: { control: 'text', description: 'Texto accesible.' },
  },
  render: (args) => ({ template: `<span ${attrs({ class: cx('aem-spinner', args['size'] === 'sm' && 'aem-spinner--sm'), role: 'status', 'aria-label': args['label'] })}></span>` }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
