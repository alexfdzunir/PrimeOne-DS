import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { icon } from '../../stories/helpers';
import { accordion, asidePage, card, generalFormPanel, grid, hero, moduleHtml, pageImg, pagesFigma, richText, section } from '../../stories/page-parts';

const panel = (t: string) => `Información detallada sobre ${t.toLowerCase().replace(/[¿?]/g, '')}.`;
const items = (ts: string[]) => ts.map((t) => [t, panel(t)] as [string, string]);

const content = [
  hero({
    crumbs: ['Inicio', 'Estudiar en UNIR', 'Becas universitarias y ayudas', 'Becas Función Pública - UNIR'],
    title: 'Becas Función Pública - UNIR',
    after: `<ul class="aem-offer__meta" style="color: var(--aem-color-text-inverse-primary)"><li>${icon('monitor')} Convocatoria abierta</li><li>${icon('calendar-blank')} Fecha límite de postulación: 28/02/2026</li></ul>`,
  }),
  section(
    `<img class="aem-offer__logo" src="${pageImg('beca-funcion-publica', 'png')}" alt="Función Pública" />
${richText(['Función Pública y UNIR lanzan, en colaboración, becas del 60% para titulaciones oficiales seleccionadas en las áreas de Derecho, Ciencias Económicas y Administrativas, Marketing y Comunicación, Ingeniería, Ciencias Sociales y del Trabajo, Artes y Humanidades y Administración de la Salud. Esta convocatoria está dirigida a servidores públicos y contratistas del Estado colombiano.'])}`,
    { heading: { title: '¿Qué son las Becas Función Pública?' } },
  ),
  section(
    richText(['Para obtener una Beca Función Pública el interesado debe:'], [
      'Ser servidor público o contratista.',
      'Haber sido admitido en una de las maestrías de UNIR que forman parte de la convocatoria de becas y haber hecho el pago de la reserva de matrícula.',
      'Demostrar su capacidad financiera para hacer frente a las cuotas del programa no cubiertas por la beca en los plazos establecidos.',
      'Completar y enviar el formulario de Función Pública que te facilitará tu asesor académico.',
    ]),
    { flush: true, heading: { title: 'Requisitos y criterios de elegibilidad de las Becas Función Pública' } },
  ),
  section(
    `<ol class="aem-list aem-list--ordered">
${[
  'Pide información sobre la maestría de UNIR que más encaja con tu perfil a través de nuestro formulario web.',
  'Uno de nuestros asesores te contactará para informarte sobre el programa y saber si cumples con los requisitos de acceso.',
  'Una vez aceptado, envía la documentación necesaria para realizar la matrícula en UNIR y paga la reserva de matrícula.',
  'Una vez hayas sido admitido postúlate a la beca y, además, completa el formulario que te compartirá tu asesor académico. (Si no se completa este formulario la postulación no será tomada en cuenta)',
  'Tras finalizar el plazo de postulación UNIR y Función Pública decidirán los ganadores de la beca.',
  'Si has sido uno de los beneficiarios nos pondremos en contacto contigo para informarte de las nuevas condiciones de pago y los siguientes pasos.',
].map((t) => `  <li><span>${t}</span></li>`).join('\n')}
</ol>`,
    { flush: true, heading: { title: '¿Cómo postularse a una beca Función Pública en UNIR Colombia?', subtitle: 'Pasos para aplicar' } },
  ),
  section(
    richText([], ['Formulario de admisión de UNIR cumplimentado.', 'Fotocopia del título universitario de pregrado.', 'Fotocopia del certificado de notas universitarias.', 'Fotocopia del Documento de Identidad.', 'Currículum Vitae (CV/hoja de vida).', 'Formulario de Función Pública completado.']),
    { flush: true, heading: { title: 'Documentación necesaria' } },
  ),
  section('', {
    flush: true,
    heading: {
      title: 'Otras Becas Universitarias que ofrece UNIR',
      text: 'En UNIR apostamos por el talento y la educación de calidad. Por eso, queremos acercar nuestro modelo educativo a los colombianos interesados en estudiar una maestría oficial con nosotros a través de las diferentes becas universitarias que ofrecemos junto a instituciones nacionales e internacionales.',
    },
  }),
  section(accordion(items(['Derecho', 'Administrativas', 'Ingeniería, Tecnología y Diseño', 'Marketing y Comunicación', 'MBA', 'Administración de la Salud', 'Ciencias Sociales', 'Artes y Humanidades'])), {
    flush: true,
    className: 'aem-accordion-block',
    heading: { title: 'Titulaciones incluidas en las Becas Función Pública' },
  }),
  section(accordion(items(['¿Qué costos cubre la beca?', '¿Cuándo se publican los resultados para UNIR Colombia?', 'Ganadores de la convocatoria de Septiembre 2025'])), {
    flush: true,
    className: 'aem-accordion-block',
    heading: { title: 'Preguntas frecuentes sobre las Becas Función Pública' },
  }),
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
  title: 'AEM/Pages/Beca Detalle',
  parameters: {
    figmaUrl: pagesFigma('2081:45526'),
    order: 18,
    layout: 'fullscreen',
    docs: { description: { component: 'Detalle de una beca: hero con estado y plazo, descripción con logo, requisitos, pasos, documentación, titulaciones, preguntas y vídeos, junto al formulario lateral.' } },
  },
  render: () => ({ template: asidePage(moduleHtml(navigationHeader), content, generalFormPanel(), moduleHtml(footer)) }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
