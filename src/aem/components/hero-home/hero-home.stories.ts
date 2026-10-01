import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, icon } from '../../stories/helpers';

const CARDS = [
  ['MBA: conquista la cima con UNIR', 'El mejor del mundo online, oficial y de habla hispana, según los rankings.'],
  ['IA para tomar impulso como profesional', 'El máster que te hará llegar lejos, sea cual sea tu perfil.'],
  ['Psicología con prácticas desde el primer curso', 'Aprende con casos reales y un tutor personal.'],
  ['Educación: la vocación que transforma', 'Grados y másteres para docentes con salidas en todo el mundo.'],
];

const meta: Meta = {
  title: 'AEM/Modules/Hero Home',
  parameters: {
    figmaUrl: figmaNode('10154:11605'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Hero de la home sobre el azul de marca: título grande, texto, logos de rankings y carrusel de tarjetas destacadas (`data-aem-carousel`, carousel.js).' } },
  },
  args: { title: 'La universidad online Nº1 en Educación', text: 'Estudia un grado, máster, doctorado u otra formación en UNIR y transforma tu potencial en oportunidades reales.' },
  argTypes: { title: { control: 'text' }, text: { control: 'text' } },
  render: (args) => ({
    template: `<section class="aem-hero-home aem-brand">
  <div class="aem-hero-home__inner">
    <div class="aem-hero-home__content">
      <h1 class="aem-hero-home__title">${args['title']}</h1>
      <p class="aem-hero-home__text">${args['text']}</p>
      <ul class="aem-hero-home__logos" aria-label="Rankings">
        <li>${icon('medal')} Times Higher Education</li>
        <li>${icon('newspaper')} Forbes</li>
        <li>${icon('trophy')} Shanghai Ranking</li>
      </ul>
    </div>
    <div class="aem-hero-home__cards aem-carousel" data-aem-carousel>
      <div class="aem-carousel__track" tabindex="0" aria-label="Destacados">
${CARDS.map(([title, text]) => `        <a class="aem-feature-card" href="#"><span class="aem-feature-card__media"><span class="aem-card__media--placeholder"></span></span><span class="aem-feature-card__title">${title}</span><span class="aem-feature-card__text">${text}</span></a>`).join('\n')}
      </div>
      <div class="aem-carousel__controls aem-carousel__controls--inverse">
        <span class="aem-carousel__progress"><span class="aem-carousel__bar"></span></span>
        <button class="aem-carousel__prev" type="button" aria-label="Anterior">${icon('arrow-left')}</button>
        <button class="aem-carousel__next" type="button" aria-label="Siguiente">${icon('arrow-right')}</button>
      </div>
    </div>
  </div>
</section>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
