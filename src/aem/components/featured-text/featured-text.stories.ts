import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, icon } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Modules/Featured Text',
  parameters: {
    figmaUrl: figmaNode('10812:26472'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Texto destacado con filete de acento: icono, título, texto, logo de la entidad y botón (`aem-featured-text`).' } },
  },
  args: {
    title: 'Obtén el Diploma en Innovación y Creatividad del Programa Harvard ManageMentor',
    text: 'Como parte del Máster de Protocolo y Eventos, formarás parte del taller de Eventos Corporativos impartido por una experta en la organización de eventos empresariales.',
    showLogo: true,
    button: 'Más información',
  },
  argTypes: { title: { control: 'text' }, text: { control: 'text' }, showLogo: { control: 'boolean', description: 'Logo de la entidad.' }, button: { control: 'text' } },
  render: (args) => ({
    template: `<section class="aem-section">
  <div class="aem-section__inner">
    <div class="aem-featured-text">
      ${icon('seal-check', 'aem-featured-text__icon')}
      <h3 class="aem-featured-text__title">${args['title']}</h3>
      <p class="aem-featured-text__text">${args['text']}</p>${args['showLogo'] ? `\n      <span class="aem-logo-placeholder">Logo</span>` : ''}
      <a class="aem-button aem-button--outlined aem-button--sm" href="#">${args['button']}</a>
    </div>
  </div>
</section>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
