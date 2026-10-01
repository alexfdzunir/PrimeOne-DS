import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, icon } from '../../stories/helpers';

const DATA = [
  ['Créditos', '240 ECTS'],
  ['Duración', '4 años'],
  ['Modalidad', 'Online'],
  ['Inicio', 'Octubre 2026'],
  ['Idioma', 'Español'],
  ['Titulación', 'Oficial'],
];
const TILES = [
  ['graduation-cap', 'Grados'],
  ['certificate', 'Másteres'],
  ['books', 'Doctorados'],
  ['chalkboard-teacher', 'Formación permanente'],
];

const meta: Meta = {
  title: 'AEM/Modules/Hero',
  parameters: {
    figmaUrl: figmaNode('10260:14851'),
    layout: 'fullscreen',
    controls: { expanded: true },
    storyOrder: ['Default', 'Distributor', 'Event', 'News'],
    docs: { description: { component: 'Cabecera de página sobre el azul de marca con la curva (`aem-hero aem-brand`): migas, título, texto y un bloque por tipo (ficha con datos clave, distribuidor, evento o noticia).' } },
  },
  args: { type: 'ficha', pretitle: 'Grado oficial', title: 'Grado en Psicología', text: 'Fórmate como psicólogo con un grado oficial 100 % online, clases en directo y prácticas en centros de toda España.' },
  argTypes: {
    type: { control: 'inline-radio', options: ['ficha', 'distributor', 'event', 'news'], description: 'Type en Figma.' },
    pretitle: { control: 'text' },
    title: { control: 'text' },
    text: { control: 'text' },
  },
  render: (args) => {
    const type = args['type'] as string;
    const crumbs = ['Inicio', 'Grados', 'Ciencias de la Salud'];
    const breadcrumb = `    <nav class="aem-breadcrumb aem-breadcrumb--sm aem-breadcrumb--inverse" aria-label="Migas de pan">
      <ol class="aem-breadcrumb__list">
${crumbs.map((c) => `        <li class="aem-breadcrumb__item"><a class="aem-breadcrumb__link" href="#">${c}</a></li>`).join('\n')}
        <li class="aem-breadcrumb__item"><span aria-current="page">${args['title']}</span></li>
      </ol>
    </nav>`;
    const tags = (items: string[]) => `      <ul class="aem-tag-set">\n${items.map((t) => `        <li><span class="aem-category-tag">${t}</span></li>`).join('\n')}\n      </ul>`;
    const content = `    <div class="aem-hero__content">
${type === 'event' || type === 'news' ? tags(type === 'event' ? ['Jornada', 'Psicología', 'Gratuito'] : ['Noticias', 'Investigación']) : `      <p class="aem-hero__pretitle">${args['pretitle']}</p>`}
      <h1 class="aem-hero__title">${args['title']}</h1>
      <p class="aem-hero__text">${args['text']}</p>${type === 'event' ? `\n      <div class="aem-hero__speakers"><span class="aem-avatar aem-avatar--initials aem-avatar--shadow" role="img" aria-label="Laura Martín">LM</span> Laura Martín, doctora en Psicología Clínica</div>` : ''}${type === 'news' ? `\n      <p class="aem-hero__pretitle">14 de septiembre de 2026</p>` : ''}
    </div>`;
    const block = {
      ficha: `    <dl class="aem-hero__data aem-glass">\n${DATA.map(([dt, dd]) => `      <div><dt>${dt}</dt><dd>${dd}</dd></div>`).join('\n')}\n    </dl>`,
      distributor: `    <ul class="aem-hero__tiles">\n${TILES.map(([name, label]) => `      <li><a class="aem-hero__tile aem-glass" href="#">${icon(name)}<span>${label}</span></a></li>`).join('\n')}\n    </ul>`,
      event: `    <div class="aem-hero__meta">
      <ul class="aem-tag-set">
        <li><span class="aem-state-tag aem-state-tag--online">Online</span></li>
        <li><span class="aem-tag aem-tag--plain">${icon('calendar-blank', 'aem-tag__icon')}<span class="aem-tag__text">22 de octubre de 2026</span></span></li>
        <li><span class="aem-tag aem-tag--plain">${icon('clock', 'aem-tag__icon')}<span class="aem-tag__text">18:00 h</span></span></li>
      </ul>
      <button class="aem-link-button aem-link-button--inverse" type="button">Compártelo ${icon('export')}</button>
    </div>`,
      news: '',
    }[type];
    return { template: `<section class="aem-hero aem-brand">\n  <div class="aem-hero__inner">\n${breadcrumb}\n${content}${block ? '\n' + block : ''}\n  </div>\n</section>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Distributor: Story = { args: { type: 'distributor', pretitle: 'Oferta académica', title: 'Estudia en UNIR', text: 'Más de 200 titulaciones oficiales online para avanzar en tu carrera.' } };
export const Event: Story = { args: { type: 'event', title: 'Jornada de Psicología Clínica', text: 'Expertos de UNIR analizan los retos de la salud mental en la próxima década.' } };
export const News: Story = { args: { type: 'news', title: 'UNIR, primera universidad online en el ranking THE', text: 'Times Higher Education sitúa a UNIR entre las mejores universidades jóvenes del mundo.' } };
