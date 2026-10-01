import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode, heading, icon } from '../../stories/helpers';

const PROGRAMS = [
  ['Máster', 'Máster en Formación del Profesorado de Educación Secundaria'],
  ['Máster', 'Máster en Psicopedagogía'],
  ['Grado', 'Grado en Maestro en Educación Primaria'],
  ['Máster', 'Máster en Neuropsicología y Educación'],
  ['Grado', 'Grado en Pedagogía'],
  ['Máster', 'Máster en Educación Especial'],
];

const meta: Meta = {
  title: 'AEM/Modules/Card Block',
  parameters: {
    figmaUrl: figmaNode('19076:25641'),
    layout: 'fullscreen',
    controls: { expanded: true },
    storyOrder: ['Default', 'Secondary'],
    docs: { description: { component: 'Bloque de cards: cabecera del módulo y carrusel de cards de programa (`data-aem-carousel`, `carousel.js`) con barra de progreso y flechas.' } },
  },
  args: { background: 'primary', items: 6 },
  argTypes: {
    background: { control: 'inline-radio', options: ['primary', 'secondary'], description: 'Background en Figma.' },
    items: { control: 'number' },
  },
  render: (args) => {
    const cards = PROGRAMS.slice(0, Math.max(1, Number(args['items']) || 1)).map(
      ([pretitle, title]) => `        <article class="aem-card aem-card--product${args['background'] === 'secondary' ? ' aem-card--secondary' : ''}">
          <div class="aem-card__media aem-card__media--placeholder"></div>
          <span class="aem-tag aem-tag--accelerator"><span class="aem-tag__text">Acelerador</span></span>
          <div class="aem-card__body">
            <div class="aem-card__text">
              <p class="aem-card__pretitle">${pretitle}</p>
              <h3 class="aem-card__title"><a class="aem-card__link" href="#">${title}</a></h3>
            </div>
            <ul class="aem-tag-set"><li><span class="aem-category-tag">Oficial</span></li><li><span class="aem-category-tag">Online</span></li></ul>
          </div>
        </article>`,
    );
    return {
      template: `<section class="${cx('aem-section', 'aem-card-block', args['background'] === 'secondary' && 'aem-section--secondary')}">
  <div class="aem-section__inner">
${heading({ pretitle: 'Educación', title: 'Programas destacados', text: 'Grados y másteres oficiales para docentes, con prácticas en centros educativos de toda España.', link: 'Ver todos los programas' }).replace(/^/gm, '    ')}
    <div class="aem-carousel" data-aem-carousel>
      <div class="aem-carousel__track" tabindex="0" aria-label="Programas">
${cards.join('\n')}
      </div>
      <div class="aem-carousel__controls">
        <span class="aem-carousel__progress"><span class="aem-carousel__bar"></span></span>
        <button class="aem-carousel__prev" type="button" aria-label="Anterior">${icon('arrow-left')}</button>
        <button class="aem-carousel__next" type="button" aria-label="Siguiente">${icon('arrow-right')}</button>
      </div>
    </div>
  </div>
</section>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Secondary: Story = { args: { background: 'secondary' } };
