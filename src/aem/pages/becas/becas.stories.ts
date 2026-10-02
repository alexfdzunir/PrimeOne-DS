import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { icon } from '../../stories/helpers';
import { accordion, asidePage, card, carousel, generalFormPanel, grid, hero, moduleHtml, pageImg, pagesFigma, section, testimonials } from '../../stories/page-parts';

const panel = (t: string) => `Información detallada sobre ${t.toLowerCase().replace(/[¿?]/g, '')}.`;

const OFFERS: [string, string, string, boolean, string][] = [
  ['beca-funcion-publica', 'Becas Función Pública - UNIR', 'Función Pública y UNIR suscriben la convocatoria oficial de becas universitarias del 60% para maestrías oficiales seleccionadas de las áreas de Derecho; Ciencias Económicas y Administrativas; Marketing y Comunicación; Ingeniería; Ciencias Sociales y del Trabajo; Artes y Humanidades y Administración de la Salud.', true, '28/02/26'],
  ['beca-icetex', 'Becas ICETEX', 'El aspirante podrá postularse a una beca UNIR – ICETEX para formarse con una de nuestras maestrías virtuales y oficiales tras verificar que el candidato cumple con los requisitos de admisión que requiere el programa.', false, '30/01/26'],
  ['beca-oea', 'Becas OEA 2025 para Maestrías Virtuales', 'La Secretaría General de la Organización de los Estados Americanos (OEA) y la Universidad Internacional de La Rioja (UNIR) de España han decidido apoyar a estudiantes sobresalientes de las Américas mediante la concesión de becas universitarias del 60% para estudios oficiales en maestrías.', false, '30/01/26'],
  ['beca-santillana', 'Becas Santillana - UNIR', 'En UNIR contamos con un acuerdo exclusivo de colaboración con Santillana para otorgar 40 becas universitarias del 60% del costo del programa a interesados en estudiar maestrías virtuales en educación convalidables por el MEN.', false, '30/01/26'],
  ['beca-heroes', 'Becas Héroes de la Patria', 'UNIR y la Policía Nacional de Colombia suscriben una alianza para conceder becas del 50% en las maestrías oficiales de todas las áreas académicas a los héroes de la patria.', false, '30/01/26'],
  ['beca-fiacine', 'Becas FIACINE', 'La Universidad Internacional de la Rioja (UNIR) y la Federación Iberoamericana de Academias de Artes y Ciencias Cinematográficas (FIACINE) buscan apoyar el talento artístico colombiano. Ponen a tu disposición 50 becas del 50% para maestrías del área de Artes, Música y Humanidades.', false, '30/01/26'],
];

const offers = `<ul class="aem-offers">
${OFFERS.map(
  ([logo, title, text, open, date]) => `  <li class="aem-offer">
    <img class="aem-offer__logo" src="${pageImg(logo, 'png')}" alt="" loading="lazy" />
    <h3 class="aem-offer__title"><a href="#">${title}</a> ${icon('arrow-right')}</h3>
    <p class="aem-offer__text">${text}</p>
    <ul class="aem-offer__meta">${open ? `<li>${icon('monitor')} Convocatoria abierta</li>` : ''}<li>${icon('calendar-blank')} Fecha límite de postulación: ${date}</li></ul>
  </li>`,
).join('\n')}
</ul>`;

const content = [
  hero({ crumbs: ['Inicio', 'Estudiar en UNIR', 'Becas universitarias y ayudas'], title: 'Becas universitarias y ayudas' }),
  section(offers, {
    heading: {
      title: 'Tipos de becas universitarias',
      text: 'Desde la Universidad Internacional de La Rioja mantenemos nuestro firme compromiso con la educación de calidad en Colombia. Por eso, tratamos de acercar nuestro modelo educativo a todos los estudiantes interesados gracias a nuestro programa de becas universitarias en Colombia. Conoce nuestros principales acuerdos con las instituciones nacionales e internacionales más prestigiosas y postúlate para conseguir tu beca y ayudas al estudio.',
    },
  }),
  section('', {
    secondary: true,
    heading: {
      title: 'Solicita una cesantía para estudiar',
      text: 'Si tienes un contrato laboral y quieres crecer profesionalmente o potenciar tus competencias, puedes solicitar a tu empleador o empresa una cesantía económica para destinar al estudio de educación superior en UNIR. Las cesantías son un fondo de ahorro al que tienen derecho los trabajadores y que se puede retirar parcialmente para pagar estudios.',
    },
  }),
  section(testimonials([['“Me siento muy orgullosa de haber estudiado en UNIR con una beca OEA. Tras una exhaustiva búsqueda, encontré esta maestría, la cual me ha proporcionado el conocimiento para educar a mis pacientes en su carácter, emociones y valores.”', 'Lucy Ondina', 'Egresada de la Maestría en Educación del Carácter y Educación Emocional', pageImg('alumni-ondina')]])),
  section(
    accordion(['¿Cómo se utilizan las cesantías para la educación superior?', '¿Cómo puedo obtener una beca para la universidad?', '¿Cuáles son los requisitos para solicitar una beca universitaria?', '¿Qué beneficios supone obtener alguna de las becas universitarias que existen en Colombia?', '¿Cómo saber si obtuve la beca?'].map((t) => [t, panel(t)] as [string, string])),
    { flush: true, className: 'aem-accordion-block', heading: { title: 'Preguntas frecuentes sobre becas universitarias' } },
  ),
  section(
    carousel(
      (
        [
          ['beca-news-1', '¿Cuáles son las becas para posgrados que se pueden solicitar en Colombia?', 'Entidades como la OEA, ICETEX o el Organismo Internacional de la Juventud, entre otras, ofrecen becas para estudiar un posgrado o maestría y ayudar a las personas para su formación académica.'],
          ['beca-news-2', '¿Cuánto cuesta estudiar una maestría en Colombia?', 'Existen diferentes factores que influyen en el precio para estudiar un posgrado, como la universidad, la modalidad o el campo académico seleccionado.'],
          ['beca-news-3', '¿Cuáles son las maestrías en Colombia más demandadas y con mayor futuro?', 'Destacar en el mercado laboral o acceder a puestos más altos puede resultar complicado. Por eso es importante tener claro cuáles son las maestrías con un mayor futuro laboral.'],
          ['beca-news-4', '¿Cuánto dura una maestría en Colombia?', 'Una maestría en una universidad colombiana tiene una duración habitual de dos años, pero existe la posibilidad de elegir opciones alternativas para titularse en 12 meses.'],
        ] as [string, string, string][]
      ).map(([f, title, text]) => card({ title, text, fill: 'empty', image: pageImg(f), mediaHeight: '20rem' })),
      'Noticias',
    ),
    { flush: true, className: 'aem-card-block', heading: { title: 'Noticias sobre becas universitarias en Colombia' } },
  ),
  section(
    grid(
      (
        [
          ['percent', 'Becas y ayudas', 'Aprovecha las ayudas económicas que ponemos a tu disposición para que alcances tus metas.'],
          ['file-text', 'Requisitos de acceso', 'Descubre lo que necesitas para estudiar un pregrado, una maestría o un título de educación continuada.'],
          ['question', '¿Tienes dudas?', '¿Cómo se estudia online? ¿Cómo asisto a clases? Respondemos a todas tus preguntas.'],
        ] as [string, string, string][]
      ).map(([n, title, text]) => card({ icon: n, title, text, link: 'Más información' })),
      '16rem',
    ),
    { flush: true },
  ),
  section(
    grid(
      (
        [
          ['video-mentor', 'Así es la labor del mentor en UNIR'],
          ['video-colombia', 'Esta es la universidad UNIR en Colombia'],
          ['video-plataforma', 'Los alumnos hablan sobre la plataforma y los contenidos de UNIR'],
        ] as [string, string][]
      ).map(([f, title]) => card({ title, fill: 'image', image: pageImg(f), play: true, mediaHeight: '28.3125rem' })),
      '16rem',
    ),
    { flush: true, heading: { title: 'Conoce UNIR' } },
  ),
];

const meta: Meta = {
  title: 'AEM/Pages/Becas',
  parameters: {
    figmaUrl: pagesFigma('2104:95096'),
    order: 17,
    layout: 'fullscreen',
    docs: { description: { component: 'Becas universitarias (portal de Colombia): listado de becas con logo, plazo y estado, cesantías, testimonio, preguntas, noticias, accesos y vídeos, junto al formulario lateral.' } },
  },
  render: () => ({ template: asidePage(moduleHtml(navigationHeader), content, generalFormPanel(), moduleHtml(footer)) }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
