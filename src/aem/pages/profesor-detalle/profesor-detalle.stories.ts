import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { carousel, closing, hero, moduleHtml, pageImg, pagesFigma, programCard, section } from '../../stories/page-parts';

const block = (title: string, text: string) => `<div class="aem-article"><div class="aem-rich-text"><h2>${title}</h2><p>${text}</p></div></div>`;

const content = [
  hero({
    crumbs: ['Inicio', 'Profesores', 'José María Vázquez García-Peñuela'],
    title: '',
    after: `<div class="aem-hero__profile">
  <img src="${pageImg('rector')}" alt="" />
  <div class="aem-hero__content">
    <h1 class="aem-hero__title">José María Vázquez García-Peñuela</h1>
    <p class="aem-hero__pretitle">Rector</p>
    <p class="aem-hero__text">Catedrático (1997) de Derecho Eclesiástico (en excedencia) de la Universidad de Almería. Actualmente, Rector de la UNIR y Director del Máster universitario en Derecho Matrimonial Canónico. Miembro del consejo científico de revistas especializadas.</p>
  </div>
</div>`,
  }).replace(/\s*<div class="aem-hero__content">\s*<h1 class="aem-hero__title"><\/h1>\s*<\/div>/, ''),
  section(block('Formación', 'Catedrático de Derecho Eclesiástico de la Universidad de Almería (1993). Doctor en Derecho y en Derecho Canónico por la Universidad de Navarra. Doctor Honoris Causa por la Universidad Nacional Abierta y a Distancia (UNAD), de Colombia.')),
  section(block('Experiencia', 'Profesor Titular (1993, Universidad de Granada). Catedrático (1997) de Derecho Eclesiástico del Estado (en excedencia) de la Universidad de Almería, en la que ostentó los cargos de Decano, Director de Departamento y Vicerrector de Internacionalización y Cooperación al Desarrollo. Rector de la UNIR y Director del Máster universitario en Derecho Matrimonial Canónico. Miembro del Comité Organizador del Simposio Internacional de Derecho Concordatario.'), { flush: true }),
  section(block('Líneas de investigación', 'Miembro del Grupo de Investigación "Culturas, religiones y derechos humanos" de la Universidad Internacional de La Rioja. Líneas de investigación: Relaciones Iglesia-Estado en la España moderna y contemporánea, Regalismo, Derecho concordatario, Libertad religiosa, Estatuto jurídico de las entidades eclesiásticas en el ordenamiento jurídico español.'), { flush: true }),
  section(
    carousel(
      [
        programCard(pageImg('estudio-doctorado'), 'Programa de Doctorado en', 'Sociedad del Conocimiento y Acción en los Ámbitos de la Educación, la Comunicación, los Derechos y las Nuevas Tecnologías', ['1 curso', '60 ECTS', '2 nov 2026']),
        programCard(pageImg('estudio-canonico'), 'Máster Universitario en', 'Derecho Matrimonial Canónico', ['1 curso', '60 ECTS', '2 nov 2026']),
      ],
      'Estudios',
    ),
    { secondary: true, className: 'aem-card-block', heading: { title: 'Algunos estudios en los que imparte clase' } },
  ),
  ...closing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Profesor Detalle',
  parameters: {
    figmaUrl: pagesFigma('2108:62823'),
    order: 14,
    layout: 'fullscreen',
    docs: { description: { component: 'Ficha de profesor: hero de perfil con foto, formación, experiencia, líneas de investigación, estudios en los que imparte clase, propuesta educativa y vídeos.' } },
  },
  render: () => ({
    template: `<div class="aem-page">
${moduleHtml(navigationHeader)}
<main>
${content.join('\n')}
</main>
${moduleHtml(footer)}
</div>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
