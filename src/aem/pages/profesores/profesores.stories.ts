import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { closing, filterRow, hero, moduleHtml, pageImg, pagesFigma, pagination, people, profiles, section } from '../../stories/page-parts';

const VICE: [string, string, string, string][] = [
  ['vr-gonzalez', 'Vicerrector de Organización y Planificación Académica', 'Rubén González Crespo', 'Catedrático de Ciencias de la Computación e Inteligencia Artificial. Asesor del Ministerio de Educación, de España y de Colombia, en el ámbito universitario.'],
  ['vr-moreno', 'Vicerrector de Investigación', 'Pablo Moreno Ger', 'Vicerrector de Investigación y Coordinador del Programa de Doctorado en Ciencias de la Computación. Catedrático en el área de Computación e IA, su investigación se centra en el uso de la IA en el ámbito educativo. Autor de más de 180 publicaciones.'],
  ['vr-burgos', 'Vicerrector de Proyectos Internacionales', 'Daniel Burgos', 'Director del Instituto de Investigación, Innovación y Tecnologías Educativas (UNIR iTED). Director de la Cátedra UNESCO en eLearning. Consultor de la Comisión Europea y de la ONU. Miembro Senior IEEE.'],
  ['vr-diez', 'Vicerrectora de Transferencia', 'Isabel Díez Vial', 'Catedrática de Organización de Empresas con tres sexenios de investigación reconocidos. Ha realizado estancias de investigación y conferencias en centros internacionales de reconocido prestigio. Tiene varios manuales y casos de empresas.'],
  ['vr-santamaria', 'Vicerrectora de Profesorado y Acción Cultural', 'Mª Teresa Santa María Fernández', 'Profesora en la Facultad de Educación y en el Programa de Doctorado de la UNIR. Directora de área e investigadora dentro del grupo HDAUNIR. Es profesora titular por la ANECA y cuenta con dos sexenios de investigación por la CNEAI.'],
  ['vr-lopez', 'Vicerrectora de Estudiantes', 'Adela López Martínez', 'Doctora en Filosofía. Directora del área de Psicología Educativa de la Facultad de Educación.'],
];
const EXPERTS: [string, string][] = [
  ['Docente UNIR', 'Yolanda Eugenia López Iglesias'],
  ['Experto Asociado', 'Roberto Ranz Torrejón'],
  ['Directora académica', 'Maribel Rodríguez Fernández'],
  ['Docente UNIR', 'Victoria Pascual Cortés'],
  ['Docente UNIR', 'José Salvador Laó López'],
  ['Docente UNIR', 'Juliana Peiró Pérez'],
  ['Experto asociado', 'José María Sánchez Gómez'],
  ['Docente UNIR', 'Raúl Salgado Vilas'],
  ['Experto Asociado', 'Lluis Tolosa'],
  ['Docente UNIR', 'Lucía Pérez Palao'],
];
const TEACHERS = ['A. Javier Rodríguez Hernández', 'Aarón Fernández Del Olmo', 'Aarón Pérez Bernabeu', 'Abdelmalik Moujahid Moujahid', 'Abel Ponce Delgado', 'Abel Estoa Pérez', 'Adal Salamanca Cabrera', 'Abel Lorenzo Iglesias', 'Abelardo Bethencourt', 'Adela Castillejo Castillo', 'Adela Encarnación Cortijo Cantos', 'Adolfo Moreno Martín'];
const AREAS = ['Profesores - Educación', 'Profesores de Empresa', 'Profesores de Ciencias de la Seguridad', 'Profesores de Música', 'Profesores de Marketing y Comunicación', 'Profesores de Ciencias Políticas y Relaciones Internacionales', 'Profesores de Artes', 'Profesores de Humanidades', 'Profesores de MBA', 'Profesores de Ingeniería y Tecnología', 'Profesores de Diseño', 'Profesores de Derecho', 'Profesores de Ciencias Sociales', 'Profesores de Ciencias de la Salud'];

const content = [
  hero({
    crumbs: ['Inicio', 'Profesores'],
    title: 'Docentes UNIR',
    text: 'El claustro de la Universidad Internacional de La Rioja está formado tanto por profesores del ámbito académico, como por profesionales en activo. De los más de 1.000 docentes, el 85% son Doctores, de los cuales, el 40% están acreditados. La comunidad docente de UNIR crece en la misma medida que el número de sus estudiantes, atendiendo a la calidad de la enseñanza y cumpliendo con los compromisos adquiridos en los planes de estudio.',
  }),
  section(
    profiles([
      ['Rector', [[pageImg('rector'), 'Rector', 'José María Vázquez García-Peñuela', 'Catedrático (1997) de Derecho Eclesiástico (en excedencia) de la Universidad de Almería. Actualmente, Rector de la UNIR y Director del Máster universitario en Derecho Matrimonial Canónico. Miembro del consejo científico de revistas especializadas.']]],
      ['Vicerrectores', VICE.map(([f, r, n, t]) => [pageImg(f), r, n, t] as [string, string, string, string])],
    ]),
  ),
  section(people(EXPERTS.map(([role, name], i) => [pageImg(`exp-${i + 1}`), role, name])), { flush: true, heading: { title: 'Nuestros Expertos' } }),
  section(`${filterRow(['Áreas']).replace(/<div class="aem-section" style="padding-block: 0"><div class="aem-section__inner aem-filter-module">|<\/div><\/div>$/g, '')}
${people(TEACHERS.map((name, i) => [pageImg(`prof-${i + 1}`), '', name]))}
${pagination(1, 20)}`, { flush: true, heading: { title: 'Profesores' } }),
  section(`<ul class="aem-list-block__list" style="--aem-list-block-columns: 4">\n${AREAS.map((a) => `  <li><a class="aem-link-button aem-link-button--secondary" href="#">${a}</a></li>`).join('\n')}\n</ul>`, {
    flush: true,
    heading: { title: 'Conoce nuestros docentes por áreas de estudio' },
  }),
  ...closing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Profesores',
  parameters: {
    figmaUrl: pagesFigma('2134:741412'),
    order: 13,
    layout: 'fullscreen',
    docs: { description: { component: 'Claustro: hero, rector y vicerrectores, expertos, buscador de profesores con filtro de área y paginación, profesores por áreas, propuesta educativa y vídeos.' } },
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
