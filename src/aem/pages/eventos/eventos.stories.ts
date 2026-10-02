import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { card, carousel, closing, eventCard, filterRow, grid, hero, moduleHtml, pageImg, pagesFigma, pagination, section, speakers } from '../../stories/page-parts';

type Ev = [image: string | true, day: string, title: string, text: string, tags: string[], caption?: string];
const UPCOMING: Ev[] = [
  ['evento-ambiental', '26', 'Profesionalización de la educación ambiental: docencia clave para la crisis climática', 'La educación ambiental es estratégica para impulsar la resiliencia climática y acompañar la transición ecosocial. Pero ¿está el sistema reconociendo y sosteniendo a quienes hacen posible este cambio desde la docencia?', ['Openclasses', 'Derecho']],
  ['evento-groenlandia', '27', 'Venezuela, Groenlandia y el nuevo tablero global: ¿hacia dónde se dirige la geopolítica mundial?', 'Los expertos diplomáticos, Inocencio Arias y Yago Pico de Coaña, analizarán los principales retos geopolíticos actuales, desde la estrategia de EE. UU. en América Latina hasta la disputa por Groenlandia.', ['Openclasses', 'Derecho']],
  ['evento-presencialidad', '09', 'Nuevos modelos de aprendizaje en la universidad pública: valor añadido de la presencialidad y el papel de la enseñanza híbrida', 'En la segunda sesión del ciclo “La universidad pública ante los retos sociales”, nos centraremos en el proceso de enseñanza-aprendizaje y en las nuevas metodologías docentes.', ['Seminarios', 'Educación']],
  ['evento-terror', '12', 'Más allá del susto: el cine de terror y la fractura del sueño americano', 'Este género cinematográfico ya no solo asusta: interpela. En esta sesión exploraremos cómo el formato se ha convertido en un campo de batalla ideológico, influido por movimientos como Black Lives Matter y #MeToo.', ['Openclass', 'Arte'], `${speakers([pageImg('avatar-tello'), pageImg('avatar-tello')])} Lucía Tello y Noelia Gregorio, ponentes del evento.`],
  ['evento-ia-marketing', '15', 'IA y Marketing: la nueva era de la captación inteligente', 'Referentes del marketing digital analizarán cómo la inteligencia artificial está transformando la captación, personalización y automatización de campañas en esta nueva era del marketing.', ['Openclasses', 'Marketing y Comunicación'], `${speakers([pageImg('avatar-betancort')])} Cristian Betancort, como ponente.`],
  [true, '18', 'Del algoritmo al armario, cómo la IA revoluciona el marketing de moda', 'Andrea de Juan, Chief Marketing Officer de Silbon y Ramón Montanera, Data Strategy Director de Elogia, explorarán las oportunidades que ofrece la inteligencia artificial, como impulsar la hiperpersonalización.', ['Openclasses', 'Empresa y MBA'], `${speakers([pageImg('avatar-dejuan')])} Andrea de Juan y Ramón Montanera, ponentes del evento`],
  ['evento-adicciones', '10', 'Especialízate en el tratamiento integral de las nuevas adicciones comportamentales', 'Aprende en esta sesión informativa del Experto en Adicciones Comportamentales, junto con José Juan Nogales, las claves y contenidos que se verán en el título.', ['Sesiones informativas', 'Ciencias de la salud']],
  ['evento-salesforce', '10', 'IA para Marketing y Ventas: de datos a resultados con Salesforce', 'Referentes del sector mostrarán cómo la IA de Salesforce convierte datos en acciones para optimizar campañas, anticipar clientes y cerrar ventas con mayor rapidez.', ['Openclasses', 'Marketing y comunicación']],
];

const content = [
  hero({ crumbs: ['Inicio', 'Eventos'], title: 'Eventos' }),
  filterRow(['Estado del evento', 'Área', 'Tipología']),
  section(
    `${grid(
      UPCOMING.map(([image, day, title, text, tags, caption]) => {
        const withImage = eventCard(image === true ? true : pageImg(image), { day, month: 'Sep 2025', year: 'Horario' }, title, text, tags);
        return caption ? withImage.replace(/(<div class="aem-date-tag">[\s\S]*?<\/span><\/span><\/span><\/div>)/, `$1\n    <p class="aem-card__caption">${caption}</p>`) : withImage;
      }),
      '24rem',
    )}\n${pagination(1, 20)}`,
  ),
  section(
    carousel(
      (
        [
          ['users-three', 'Foros', 'Conectamos la actualidad y temas de interés de la sociedad con la academia para crear conocimiento compartido.'],
          ['lightbulb', 'Openclasses', 'Sesiones de formación en abierto con los mejores expertos.'],
          ['monitor', 'Sesiones informativas', 'Jornadas de puertas abiertas online para conocer más sobre la universidad y las titulaciones'],
          ['medal', 'Seminarios', 'Encuentros especializados sobre diversas materias dentro del ámbito académico o profesional.'],
          ['book-open', 'Jornadas y congresos', 'Iniciativas culturales y educativas con el objetivo de difundir conocimiento en sus distintas ramas.'],
        ] as [string, string, string][]
      ).map(([name, title, text]) => card({ icon: name, title, text, link: 'Ver todos' })),
      'Tipos de evento',
    ),
    { flush: true, className: 'aem-card-block', heading: { title: '¿Qué tipo de evento UNIR buscas?' } },
  ),
  section(
    grid(
      (
        [
          ['evento-puy-du-fou', 'La fórmula del éxito en el sector del ocio con Jesús Sainz, vicepresidente de Puy du Fou España', 'El parque temático de Toledo se ha convertido en un referente y sus espectáculos son reconocidos mundialmente por su calidad. Hemos hablado de todo ello, así como de los retos de su gestión, en el pasado Visión CEO.'],
          ['evento-psicoterapia', 'Escuchar al cuerpo en psicoterapia: el idioma de los síntomas somáticos', 'En esta openclass explicamos por qué y cómo incluir el lenguaje de los síntomas corporales en la práctica clínica de la psicoterapia de la mano de José Luis Marín.'],
          ['evento-chatgpt', '¿Cómo usar ChatGPT y la inteligencia artificial en tu aula?', 'Cristian Andrades, experto en EdTech y fundador de Kumubox, habló sobre la aplicación de ChatGPT y otros valiosos aportes de la IA para mejorar la experiencia educativa de tus alumnos.'],
          ['evento-pactar', 'Presentación del monográfico “Pactar es progresar”, una reflexión sobre los pactos como motor del progreso', 'UNIR, en colaboración con la Fundación Felipe González, presentaron un número monográfico de Nueva Revista bajo el lema “Una sociedad que pacta es una sociedad que progresa”.'],
        ] as [string, string, string][]
      ).map(([file, title, text]) => eventCard(pageImg(file), { day: '10', month: 'Sep', year: '2025', state: 'finalizado' }, title, text, ['OpenClasses', 'Empresa y MBA'])),
      '24rem',
    ),
    {
      flush: true,
      heading: { title: 'Revive nuestros eventos destacados', text: 'En UNIR te ofrecemos acceso a seminarios, jornadas y clases magistrales pasadas que sobresalen por abordar temas de gran relevancia. Accede aquí.', link: 'Ver todos los eventos pasados' },
    },
  ),
  ...closing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Eventos',
  parameters: {
    figmaUrl: pagesFigma('2106:370968'),
    order: 11,
    layout: 'fullscreen',
    docs: { description: { component: 'Listado de eventos: hero, filtros, rejilla de próximos eventos con ponentes y paginación, tipos de evento, eventos pasados destacados, propuesta educativa y vídeos.' } },
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
