import type { Meta, StoryObj } from '@storybook/angular';
import distributionBar from '../../components/distribution-bar/distribution-bar.stories';
import footer from '../../components/footer/footer.stories';
import heroHome from '../../components/hero-home/hero-home.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { icon, indent } from '../../stories/helpers';
import { card, carousel, grid, moduleHtml, pagesFigma, section } from '../../stories/page-parts';

const DISTRIBUTOR = ['Grado', 'Másteres', 'Doctorados'];
const DISTRIBUTOR_SOLID = ['Formación Permanente', 'Formación Profesional'];
const AREAS = ['Educación', 'Empresa', 'Ciencias de la Salud', 'Ingeniería y Tecnología', 'Derecho', 'IA y Ciencia de Datos', 'Marketing y Comunicación', 'Humanidades', 'Ciencias Sociales', 'Música', 'Diseño', 'Ejercicio de la Abogacía', 'MBA', 'Artes', 'Ciencias de la Seguridad', 'Ciencias Políticas y Relaciones Internacionales', 'Acceso a la universidad para mayores', 'Idiomas'];
const FEATURED: [string, string][] = [
  ['UNIR Revista: qué necesitas saber para iluminar tu vocación', 'Consultar aquí'],
  ['Nuestros Grupos de Investigación construyen futuro', 'Saber más'],
  ['Transfórmate con UNIR, la universidad online con los másteres que harán destacar tu perfil', 'Ver los títulos oficiales'],
  ['Escuela de Humanidades: ideas que mueven el mundo', 'Conocer más'],
];
const EVENTS: [string, string, string][] = [
  ['26', 'Profesionalización de la educación ambiental: docencia clave para la crisis climática', 'La educación ambiental es estratégica para impulsar la sostenibilidad y acompañar la transición ecosocial.'],
  ['27', 'Venezuela, Groenlandia y el nuevo tablero global: ¿hacia dónde se dirige la geopolítica mundial?', 'Los expertos diplomáticos Inocencio Arias y Yago de Ojeda analizan el nuevo escenario internacional.'],
];
const AREA_CHIPS = ['Todos', 'Educación', 'Ciencias de la Salud', 'Derecho', 'Empresa', 'MBA', 'Marketing y Comunicación', 'Ciencias Sociales', 'Ingeniería y Tecnología', 'Humanidades'];
const PROGRAMS: [string, string][] = [
  ['Máster Universitario', 'Formación del Profesorado de Educación Secundaria Obligatoria y Bachillerato'],
  ['Grado', 'Psicología General Sanitaria'],
  ['Máster Universitario', 'El ejercicio de la abogacía y la procura'],
  ['Grado', 'Psicología'],
  ['Máster Universitario', 'Neuropsicología y Educación'],
];
const NEWS: [string, string][] = [
  ['UNIR acoge a los máximos representantes del ámbito académico para impulsar la Academia de Trabajo Social', 'Los expertos visibilizaron en la Universidad Internacional de La Rioja los avances de la disciplina.'],
  ['El MBA de UNIR entre los mejores MBA del mundo, según el Ranking FSO 2025', 'La Universidad Internacional de La Rioja es la primera institución en obtener el reconocimiento.'],
  ['UNIR y la Universidad Villanueva evocaron el espíritu de la tradición vienesa en su Concierto de Año Nuevo', 'Más de 2.000 personas celebraron en el Auditorio Nacional de Madrid el bicentenario de Johann Strauss.'],
  ['Miguel Arrufat: “En cinco años la IA va a cambiar totalmente la universidad”', 'El promotor de UNIR explicó durante el I Congreso de IA y Educación los retos de la universidad.'],
];
const RESEARCH: [string, string][] = [
  ['Investigadoras de UNIR apuestan por educar y no prohibir el uso de TikTok entre los jóvenes', 'UNIR clausura el proyecto ‘Vidas Digitales’ con un seminario sobre juventud, redes sociales y convivencia digital.'],
  ['Dos revistas editadas por UNIR (REP e IJIMAI) reciben el Sello de Calidad de FECYT', 'La Fundación Española para la Ciencia y la Tecnología reconoce la calidad editorial y científica.'],
  ['Expertos de UNIR en el estudio ‘Infancia Digital 2025’ reclaman una estrategia nacional', 'UNIR aporta tres investigadores al comité de 43 expertos internacionales que ha elaborado este informe.'],
  ['Médicos instan a individualizar la prevención de la preeclampsia en embarazadas con lupus', 'Investigadores de UNIR y los hospitales Puerta de Hierro y Doce de Octubre publican sus resultados.'],
];
const SOCIAL: [string, string][] = [
  ['Supercuidadores', 'Proyecto de emprendimiento social cuyo objetivo es formar y dar asistencia a las familias y profesionales dedicados al cuidado.'],
  ['Campus Solidario', 'Ofrecemos educación gratuita a quienes más lo necesitan a través de un programa de becas.'],
  ['Clínica Jurídica', 'Espacio de aprendizaje virtual en el que los alumnos de Derecho resuelven casos y consultas jurídicas reales.'],
  ['UNIR Ediciones', 'Colaboramos con la difusión de la investigación y el conocimiento científico y humanístico.'],
  ['Aula de Cultura', 'Apostamos por la difusión de la cultura en sus distintas ramas: música, cine, literatura y arte.'],
  ['Nueva revista', 'Fundada por Antonio Fontán en 1990, es un espacio de reflexión sobre política, cultura y arte.'],
];
const MEDIA: [string, string][] = [
  ['laSexta', 'El 74,3% de los adolescentes hospitalizados por depresión son chicas'],
  ['Telva', 'Con este método de Harvard, conseguirás (por fin) desconectar digitalmente en vacaciones'],
  ['Wired', 'Más allá de Torre Pacheco: las redes que explotan el odio en internet'],
];
const PROPOSAL: [string, string, string][] = [
  ['monitor-play', 'Docencia 100% Online', 'Nuestra metodología te permite estudiar sin desplazamientos, con un modelo de aprendizaje personalizado.'],
  ['video-camera', 'Clases en directo', 'Nuestros profesores imparten 4.000 horas de clases en directo cada semana, que también puedes ver en diferido.'],
  ['user-circle-check', 'Mentor - UNIR', 'En UNIR nunca estarás solo. Un tutor realizará un seguimiento personalizado de tu progreso.'],
];
const VIDEOS = ['La fuerza que necesitas', 'Graduación España 2024', 'Acompañamiento personalizado'];

const distributor = `<ul class="aem-distributor">
${DISTRIBUTOR.map((label) => `  <li><a class="aem-distributor__item" href="#"><span class="aem-distributor__media"><span class="aem-card__media--placeholder"></span></span>${label}</a></li>`).join('\n')}
  <li class="aem-distributor__stack">
${DISTRIBUTOR_SOLID.map((label) => `    <a class="aem-distributor__item aem-distributor__item--solid" href="#">${label} ${icon('arrow-right')}</a>`).join('\n')}
  </li>
</ul>`;

const areas = `<div class="aem-list-block">
  <ul class="aem-list-block__list">
${AREAS.map((area) => `    <li><a class="aem-link-button aem-link-button--secondary" href="#">${area}</a></li>`).join('\n')}
  </ul>
  <div class="aem-list-block__actions">
    <a class="aem-button aem-button--outlined aem-button--sm" href="#">Ver toda la oferta académica</a>
  </div>
</div>`;

const featured = `<div class="aem-featured">
${indent(card({ title: 'Líderes en MBA', pretitle: 'Descuento disponible', media: true, link: 'Descúbrelo', size: 'lg' }), 2)}
${indent(grid(FEATURED.map(([title, link]) => card({ title, link }))), 2)}
</div>`;

const events = grid(
  EVENTS.map(([day, title, text]) =>
    card({
      title,
      text,
      size: 'lg',
      tags: ['OpenClasses', 'Derecho'],
      media: `<div class="aem-date-tag"><span class="aem-state-tag aem-state-tag--online">Online</span><span class="aem-date-tag__date"><span class="aem-date-tag__day">${day}</span><span class="aem-date-tag__meta"><span class="aem-date-tag__month">Ene</span><span class="aem-date-tag__time">2026</span></span></span></div>`,
    }),
  ),
  '24rem',
);

const programs = `<div class="aem-chip-group" role="group" aria-label="Áreas de estudio">
${AREA_CHIPS.map((label, i) => `  <button class="aem-chip" type="button" aria-pressed="${i === 0}"><span>${label}</span></button>`).join('\n')}
</div>
${carousel(
  PROGRAMS.map(
    ([pretitle, title]) => `<article class="aem-card aem-card--product aem-card--secondary">
  <div class="aem-card__media aem-card__media--placeholder"></div>
  <div class="aem-card__body">
    <div class="aem-card__text">
      <p class="aem-card__pretitle">${pretitle}</p>
      <h3 class="aem-card__title"><a class="aem-card__link" href="#">${title}</a></h3>
    </div>
    <ul class="aem-tag-set"><li><span class="aem-category-tag">Oficial</span></li><li><span class="aem-category-tag">Online</span></li></ul>
  </div>
</article>`,
  ),
  'Títulos',
)}`;

const newsCarousel = (items: [string, string][], label: string) => carousel(items.map(([title, text]) => card({ title, text, media: true })), label);

const meta: Meta = {
  title: 'AEM/Pages/Home',
  parameters: {
    figmaUrl: pagesFigma('2006:44285'),
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Home del portal (Figma Desktop 1920, 1280, Tablet 768 y Mobile 375): cabecera, hero con buscador de titulaciones, distribuidor, áreas de estudio, destacados, eventos, títulos, actualidad, investigación, compromiso social, medios, propuesta educativa, vídeos y pie. Montada con los módulos de AEM.',
      },
    },
  },
  render: () => ({
    template: `<div class="aem-page">
${moduleHtml(navigationHeader)}
<main>
${moduleHtml(heroHome)}
<div class="aem-page__search">
${indent(moduleHtml(distributionBar), 2)}
</div>
${section(distributor)}
${section(areas, { flush: true, heading: { title: 'Oferta académica por áreas de estudio' } })}
${section(featured, { flush: true, heading: { title: 'Destacados' } })}
${section(events, { flush: true, heading: { title: 'Próximos eventos en directo', link: 'Ver todos los eventos' } })}
${section(programs, { secondary: true, className: 'aem-card-block', heading: { title: 'Descubre los principales títulos de UNIR, la universidad a distancia' } })}
${section(newsCarousel(NEWS, 'Actualidad académica'), { className: 'aem-card-block', heading: { title: 'Actualidad académica', link: 'Ver todas las noticias' } })}
${section(newsCarousel(RESEARCH, 'Investigación'), { flush: true, className: 'aem-card-block', heading: { title: 'Investigación', link: 'Ver todas las noticias' } })}
${section(grid(SOCIAL.map(([title, text]) => card({ title, text, link: 'Ver más' })), '20rem'), { flush: true, heading: { title: 'Compromiso social y cultural' } })}
${section(grid(MEDIA.map(([pretitle, title]) => card({ pretitle, title, tags: ['23/07/2025'], secondary: true })), '20rem'), { secondary: true, heading: { title: 'UNIR en los medios', text: 'Noticias, artículos, entrevistas y todo aquello que los medios de comunicación publican sobre UNIR y nuestros profesores.', link: 'Descubre lo que dicen de nosotros' } })}
${section(grid(PROPOSAL.map(([name, title, text]) => card({ icon: name, title, text })), '20rem'), { heading: { title: 'UNIR, una propuesta educativa única' } })}
${section(grid(VIDEOS.map((title) => card({ title, media: true, play: true })), '20rem'), { flush: true, heading: { title: 'Conoce UNIR' } })}
</main>
${moduleHtml(footer)}
</div>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
