import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, heading, icon, indent } from '../../stories/helpers';

const QUOTES = [
  ['LG', 'Laura García', 'Máster en Psicopedagogía', 'Pude compaginar el máster con mi trabajo gracias a las clases en diferido y a mi tutora, que siempre estuvo pendiente.'],
  ['JM', 'Javier Martín', 'Grado en Ingeniería Informática', 'Los proyectos prácticos me prepararon para el día a día de mi empresa. Recomendaría UNIR sin dudarlo.'],
  ['AR', 'Ana Ruiz', 'Máster en Neuropsicología', 'El claustro está formado por profesionales en activo, y eso se nota en cada asignatura.'],
  ['DS', 'David Sánchez', 'Grado en Derecho', 'Estudiar online no significa estudiar solo: los foros y las sesiones en directo crean comunidad.'],
];

const meta: Meta = {
  title: 'AEM/Modules/Testimonial',
  parameters: {
    figmaUrl: figmaNode('9701:29996'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Testimonios: cabecera del módulo y carrusel (`carousel.js`) de citas con el perfil del estudiante (`aem-testimonial`).' } },
  },
  args: { title: 'Lo que dicen nuestros estudiantes', items: 4 },
  argTypes: { title: { control: 'text' }, items: { control: 'number' } },
  render: (args) => {
    const count = Math.max(1, Math.min(QUOTES.length, Number(args['items']) || 1));
    const quotes = QUOTES.slice(0, count).map(
      ([initials, name, role, quote]) => `  <figure class="aem-testimonial">
    ${icon('quotes', 'aem-testimonial__mark', 'fill')}
    <blockquote class="aem-testimonial__quote">${quote}</blockquote>
    <figcaption class="aem-testimonial__profile">
      <span class="aem-avatar aem-avatar--initials" aria-hidden="true">${initials}</span>
      <span><cite class="aem-testimonial__name">${name}</cite><span class="aem-testimonial__role">${role}</span></span>
    </figcaption>
  </figure>`,
    );
    return {
      template: `<section class="aem-section">
  <div class="aem-section__inner">
${indent(heading({ title: args['title'] }), 4)}
    <div class="aem-carousel" data-aem-carousel>
      <div class="aem-carousel__track" tabindex="0" aria-label="Testimonios">
${indent(quotes.join('\n'), 6)}
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
