import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { accordion, asidePage, closing, generalFormPanel, hero, moduleHtml, pagesFigma, section } from '../../stories/page-parts';

const GROUPS: [string, string[]][] = [
  ['Oficialidad', ['¿Es UNIR una universidad oficial reconocida por las autoridades académicas españolas?', '¿Por qué estudiar en UNIR? ¿Qué me ofrece a diferencia de otras universidades online?']],
  ['Requisitos de acceso', ['¿Qué requisitos debo cumplir para estudiar en UNIR un Título Oficial de Grado?', '¿Qué requisitos debo cumplir para estudiar en UNIR un título oficial de Máster?', 'Estoy estudiando un Grado en otra Universidad. ¿Cómo puedo pedir el traslado a UNIR?']],
  ['Reconocimiento de créditos', ['¿Qué son los reconocimientos?', '¿Los créditos que se reconocen van con alguna calificación?', '¿Puedo acceder a la universidad por Reconocimiento de Créditos?', '¿Qué se reconoce y qué no se reconoce?', '¿Tengo que hacer yo una propuesta de reconocimiento, comparando los contenidos y programas de asignaturas?', '¿Tengo que matricularme antes de solicitar el Reconocimiento de Créditos?', '¿Cómo solicito el reconocimiento por estudios universitarios previos?', '¿Cuánto cuesta el reconocimiento?', '¿Cuánto tarda el reconocimiento?', '¿Qué documentación deberé aportar?']],
  ['Estudiar en UNIR', ['¿Es necesario residir en España para ser alumno UNIR?', '¿Qué es un asesor personal?', '¿Tengo que matricularme en un curso completo de Grado o puedo hacerlo por partes?', '¿Cuánto cuesta estudiar en UNIR?', '¿Qué formas de pago me ofrece UNIR?', '¿El precio de los libros de texto está incluido en la matrícula?', '¿A cuántas convocatorias de una misma asignatura me puedo presentar con cada matrícula?', '¿Cuándo son los exámenes?', '¿Qué conocimientos de informática y qué recursos técnicos necesito para estudiar en UNIR y acceder al Aula Virtual?', '¿Cuántas horas debo dedicar a estudiar?']],
  ['Educación Online', ['¿Qué sistema de evaluación se utiliza en UNIR para los estudios de Grado?', '¿Cuáles son las ventajas de la educación online?', '¿Cómo accedo al Aula Virtual?', '¿Debo conectarme a determinados días y horas establecidos?', '¿Tienen los estudios online la misma calidad que los cursos presenciales?', '¿Tienen el mismo valor los títulos online que los presenciales?']],
  ['Titulaciones', ['¿Qué son los títulos propios?', '¿Qué diferencia un Título Propio de un Máster Universitario?', '¿Puedo solicitar la expedición del título si estoy cursando una mención?']],
  ['Proceso de solicitud del Título de UNIR', ['1. Solicitud del título', '2. Plazo de la autorización', '3. Pago de las tasas', '4. Entrega del certificado supletorio provisional', '5. Entrega del título oficial']],
  ['Sobre el Plan Bolonia y el Espacio Europeo de Educación Superior (EEES)', ['¿Ha adaptado UNIR sus planes de estudios al Espacio Europeo de Educación Superior (EEES)?', 'Si estudio un Grado en UNIR, ¿mi título tiene validez en todos los países europeos miembros del Espacio Europeo de Educación Superior (EEES)?', '¿El Espacio Europeo de Educación Superior (EEES) supone la uniformidad de las titulaciones? ¿Dejará de ser importante la universidad donde se estudie?']],
];

const content = [
  hero({
    crumbs: ['Inicio', 'Estudiar en UNIR', 'Preguntas frecuentes'],
    title: 'Preguntas frecuentes',
    text: 'Si aún tienes dudas sobre las fortalezas de la educación online, la oficialidad de los títulos, los requisitos de acceso a UNIR o cómo reconocer créditos, te ayudamos a resolverlas. Si lo deseas, también puedes realizar tu propia consulta en el formulario.',
  }),
  ...GROUPS.map(([title, qs], i) =>
    section(accordion(qs.map((q) => [q, `Respuesta a la pregunta: ${q.replace(/[¿?]/g, '').toLowerCase()}. Consulta con tu asesor personal para más detalles.`])), { flush: i > 0, className: 'aem-accordion-block', heading: { title } }),
  ),
  ...closing(),
];

const meta: Meta = {
  title: 'AEM/Pages/FAQs',
  parameters: {
    figmaUrl: pagesFigma('2081:23331'),
    order: 19,
    layout: 'fullscreen',
    docs: { description: { component: 'Preguntas frecuentes: hero y bloques de acordeón por tema (oficialidad, acceso, créditos, estudiar en UNIR, educación online, titulaciones, título y EEES), propuesta educativa, vídeos y formulario lateral.' } },
  },
  render: () => ({ template: asidePage(moduleHtml(navigationHeader), content, generalFormPanel(), moduleHtml(footer)) }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
