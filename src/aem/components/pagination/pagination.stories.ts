import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode, icon } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Navigation/Pagination',
  parameters: {
    figmaUrl: figmaNode('9111:3815'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Short', 'Bar'],
    docs: { description: { component: 'Paginación: flechas (botón ghost pequeño) y números con la página actual en azul. `pagination.js` genera los números a partir de `data-pages` y `data-page`.' } },
  },
  args: { pages: 12, page: 5, bar: false },
  argTypes: {
    pages: { control: 'number', description: 'Total de páginas.' },
    page: { control: 'number', description: 'Página actual.' },
    bar: { control: 'boolean', description: 'pagination-module: barra a todo el ancho.' },
  },
  render: (args) => ({
    template: `<nav class="${cx('aem-pagination', args['bar'] && 'aem-pagination--bar')}" aria-label="Paginación" data-pages="${args['pages']}" data-page="${args['page']}">
  <ul class="aem-pagination__list">
    <li><button class="aem-button aem-button--ghost aem-button--sm aem-button--icon-only" type="button" aria-label="Página anterior" data-aem-page="prev">${icon('caret-left', 'aem-button__icon')}</button></li>
    <li><button class="aem-button aem-button--ghost aem-button--sm aem-button--icon-only" type="button" aria-label="Página siguiente" data-aem-page="next">${icon('caret-right', 'aem-button__icon')}</button></li>
  </ul>
</nav>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Short: Story = { args: { pages: 4, page: 1 } };
export const Bar: Story = { args: { bar: true } };
