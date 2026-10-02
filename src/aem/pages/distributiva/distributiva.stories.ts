import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { icon } from '../../stories/helpers';
import { card, carousel, filterGroup, hero, moduleHtml, pageImg, pagesFigma, section } from '../../stories/page-parts';

const RESULTS = [
  'Grado Combinado en Maestro en Educación Infantil y Primaria',
  'Grado en Pedagogía',
  'Curso de Adaptación al Grado en Maestro en Educación Infantil para Diplomados',
  'Curso de Adaptación al Grado en Maestro en Educación Primaria para Diplomados',
  'Curso de Cualificación para la Enseñanza de Filosofía y Valores Éticos',
  'Curso de Cualificación para la Enseñanza de Geografía e Historia',
  'Curso de Cualificación para la Enseñanza de Lengua y Literatura',
  'Grado Combinado en Maestro en Educación Infantil y Pedagogía',
  'Grado Combinado en Maestro en Educación Primaria y Pedagogía',
  'Grado en Maestro en Educación Infantil',
  'Grado en Maestro en Educación Infantil (Grupo Bilingüe)',
  'Grado en Maestro en Educación Primaria',
  'Grado en Maestro en Educación Primaria (Grupo Bilingüe)',
  'Mención en Audición y Lenguaje',
  'Mención en Educación Física',
];

const listing = `<div class="aem-listing">
  <aside class="aem-listing__filters" aria-label="Filtrar titulaciones">
    <h2 class="aem-listing__title">Filtrar titulaciones</h2>
${filterGroup('Tipos', [['Grados, Dobles Grados y Menciones', true], ['Másteres'], ['Doctorados'], ['Experto Universitario'], ['Programas'], ['Cursos']])}
${filterGroup('Áreas', [['Educación', true], ['Derecho'], ['Ciencias Políticas y Relaciones Internacionales'], ['Ciencias de la Seguridad'], ['Empresa'], ['Artes'], ['Humanidades'], ['Marketing y Comunicación'], ['Ingeniería y Tecnología'], ['Diseño'], ['Ciencias de la Salud'], ['Ciencias Sociales'], ['Música']])}
${filterGroup('Oficialidad', [['Títulos oficiales'], ['Títulos propios']])}
  </aside>
  <div class="aem-listing__results">
    <h2 class="aem-listing__title">Resultados</h2>
    <p class="aem-listing__count">18 titulaciones</p>
    <div class="aem-listing__chips">
      <button class="aem-chip aem-chip--primary" type="button" aria-pressed="true"><span>Grados, Dobles Grados y Menciones</span>${icon('x', 'aem-chip__icon')}</button>
      <button class="aem-chip aem-chip--primary" type="button" aria-pressed="true"><span>Educación</span>${icon('x', 'aem-chip__icon')}</button>
      <button class="aem-link-button aem-link-button--sm" type="button">Borrar filtros</button>
    </div>
    <ul class="aem-list">
${RESULTS.map((r) => `      <li><a href="#">${r}</a></li>`).join('\n')}
    </ul>
    <div class="aem-list-block__actions">
      <p class="aem-list-block__count">Has visto 15 de 18 resultados</p>
      <a class="aem-button" href="#">Ver más titulaciones</a>
    </div>
  </div>
</div>`;

const content = [
  hero({ crumbs: ['Inicio', 'Oferta académica'], title: 'Oferta académica' }),
  listing,
  section(
    carousel(
      (
        [
          ['logo-forbes-color', 'Forbes', 'Líderes en innovación educativa, según ‘Forbes’', 'Forbes nos posiciona entre las tres mejores universidades de España y como la primera online. Además, destaca a UNIR como un referente global en la formación online por su metodología y la experiencia interactiva que ofrece a sus estudiantes.'],
          ['logo-qs', 'QS Stars', 'UNIR: una universidad de 5 estrellas, según QS Stars', 'UNIR alcanza la máxima calificación en el rating de la reconocida consultora británica. Estamos entre las mejores universidades en línea del mundo tras superar ampliamente todos los requisitos exigibles en una rigurosa auditoria centrada en la excelencia y la calidad educativa.'],
          ['logo-the-2', 'Times Higher Education', 'UNIR, la universidad en línea nº1 del mundo en español, según Times Higher Education', 'La prestigiosa revista THE, que publica uno de los tres rankings más influyentes en el ámbito de la educación superior internacional, reconoce a UNIR en 2024 como la primera universidad hispanohablante en línea del mundo.'],
        ] as [string, string, string, string][]
      ).map(([file, alt, title, text]) => card({ logo: [pageImg(file, 'png'), alt], title, text, fill: 'secondary' })),
      'Rankings',
    ),
    { secondary: true, className: 'aem-card-block', heading: { title: 'Los rankings nos avalan' } },
  ),
];

const meta: Meta = {
  title: 'AEM/Pages/Distributiva',
  parameters: {
    figmaUrl: pagesFigma('1020:104443'),
    order: 10,
    layout: 'fullscreen',
    docs: { description: { component: 'Oferta académica: filtros laterales por tipo, área y oficialidad, resultados con filtros aplicados, listado de titulaciones, rankings y pie con contacto.' } },
  },
  render: () => ({
    template: `<div class="aem-page">
${moduleHtml(navigationHeader)}
<main>
${content.join('\n')}
</main>
${moduleHtml(footer, { showContact: true })}
</div>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
