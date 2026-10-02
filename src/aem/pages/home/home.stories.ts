import type { Meta, StoryObj } from '@storybook/angular';
import distributionBar from '../../components/distribution-bar/distribution-bar.stories';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { icon, indent } from '../../stories/helpers';
import { card, carousel, grid, moduleHtml, pagesFigma, section } from '../../stories/page-parts';

/** Images of the Figma page, served next to the page (aem/pages/home/images). */
const img = (name: string, ext = 'webp') => `aem/pages/home/images/${name}.${ext}`;

const HERO_CARDS: [string, string, string][] = [
  ['hero-mba', 'MBA: Conquista la cima con UNIR', 'El mejor del mundo online, oficial y de habla hispana, según los rankings.'],
  ['hero-ia', 'IA para tomar impulso como profesional', 'Tenemos el máster que te hará llegar lejos, sea cual sea tu perfil.'],
  ['hero-viaje', 'Viaje al centro del conocimiento', 'Participa en foros, seminarios y muchos más eventos.'],
];
const RANKINGS: [string, string][] = [
  ['logo-the', 'Times Higher Education'],
  ['logo-forbes', 'Forbes'],
  ['logo-shanghai', 'Shanghai Ranking'],
];
const DISTRIBUTOR: [string, string][] = [
  ['grado', 'Grado'],
  ['masteres', 'Másteres'],
  ['doctorados', 'Doctorados'],
];
const AREAS = ['Educación', 'Empresa', 'Ciencias de la Salud', 'Ingeniería y Tecnología', 'Derecho', 'IA y Ciencia de Datos', 'Marketing y Comunicación', 'Humanidades', 'Ciencias Sociales', 'Música', 'Diseño', 'Ejercicio de la Abogacía', 'MBA', 'Artes', 'Ciencias de la Seguridad', 'Ciencias Políticas y Relaciones Internacionales', 'Acceso a la universidad para mayores', 'Idiomas'];
const FEATURED: [string, string][] = [
  ['UNIR Revista: qué necesitas saber para iluminar tu vocación', 'Consultar aquí'],
  ['Nuestros Grupos de Investigación construyen futuro', 'Saber más'],
  ['Transfórmate con UNIR, la universidad online con los másteres que harán destacar tu perfil', 'Ver los títulos oficiales'],
  ['Escuela de Humanidades: ideas que mueven el mundo', 'Conocer más'],
];
const EVENTS: [string, string, string][] = [
  ['26', 'Profesionalización de la educación ambiental: docencia clave para la crisis climática', 'La educación ambiental es estratégica para impulsar la resiliencia climática y acompañar la transición ecosocial. Pero ¿está el sistema reconociendo y sosteniendo a quienes hacen posible este cambio desde la docencia?'],
  ['27', 'Venezuela, Groenlandia y el nuevo tablero global: ¿hacia dónde se dirige la geopolítica mundial?', 'Los expertos diplomáticos Inocencio Arias y Yago Pico de Coaña analizarán los principales retos geopolíticos actuales, desde la estrategia de EE. UU. en América Latina hasta la disputa por Groenlandia.'],
];
/** Study areas of the chips: value and label. */
const AREA_CHIPS: [string, string][] = [
  ['all', 'Todos'],
  ['educacion', 'Educación'],
  ['salud', 'Ciencias de la Salud'],
  ['derecho', 'Derecho'],
  ['empresa', 'Empresa'],
  ['mba', 'MBA'],
  ['marketing', 'Marketing y Comunicación'],
  ['sociales', 'Ciencias Sociales'],
  ['politicas', 'Ciencias Políticas y Relaciones Internacionales'],
  ['ingenieria', 'Ingeniería y Tecnología'],
  ['humanidades', 'Humanidades'],
  ['musica', 'Música'],
  ['diseno', 'Diseño'],
  ['seguridad', 'Ciencias de la Seguridad'],
  ['artes', 'Artes'],
];
/** Programmes: image, pretitle, title, ECTS and the areas they belong to. */
const PROGRAMS: [string, string, string, string, string][] = [
  ['profesorado', 'Máster Universitario en', 'Formación del Profesorado de Educación Secundaria Obligatoria y Bachillerato, Formación Profesional y Enseñanzas de Idiomas', '60 ECTS', 'educacion humanidades artes musica'],
  ['psicologia-sanitaria', 'Grado en', 'Psicología General Sanitaria', '90 ECTS', 'salud'],
  ['abogacia', 'Máster Universitario en', 'El ejercicio de la abogacía y la Procura', '90 ECTS', 'derecho seguridad politicas'],
  ['psicologia', 'Grado en', 'Psicología', '240 ECTS', 'salud sociales'],
  ['neuropsicologia', 'Máster Universitario en', 'Dirección y Administración de Empresas (MBA)', '60 ECTS', 'empresa mba marketing'],
  ['research-ia', 'Grado en', 'Ingeniería Informática', '240 ECTS', 'ingenieria diseno'],
];
const NEWS: [string, string, string, string][] = [
  ['news-academia', 'Foto de familia del encuentro.', 'UNIR acoge a los máximos representantes del ámbito académico para impulsar la Academia de Trabajo Social', 'Los expertos visibilizaron en la Universidad Internacional de La Rioja los avances en esta disciplina y consolidaron su compromiso.'],
  ['news-fso', 'Reconocimientos recibidos por las instituciones de la red Proeduca en el ranking FSO 2025.', 'El MBA de UNIR entre los mejores MBA del mundo, según el Ranking FSO 2025', 'La Universidad Internacional de La Rioja es la primera institución en obtener el reconocimiento con un MBA oficial.'],
  ['news-concierto', 'La orquesta y el coro, dirigidos por Ernesto Monsalve.', 'UNIR y la Universidad Villanueva evocaron el espíritu de la tradición vienesa en su Concierto Universitario de Año Nuevo', 'Más de 2.000 personas celebraron en el Auditorio Nacional de Madrid el bicentenario de Johann Strauss Jr.'],
  ['news-arrufat', 'Miguel Arrufat: “En cinco años la IA va a cambiar totalmente la universidad”', 'Miguel Arrufat: “En cinco años la IA va a cambiar totalmente la universidad”', 'El promotor de UNIR explicó durante el Congreso Futuro Iberoamericano los cinco grandes impactos de la IA.'],
  ['news-yannelys', 'Yannelys Aparicio, en la Academia Ecuatoriana de la Lengua.', 'Yannelys Aparicio, en la Academia Ecuatoriana de la Lengua', 'La catedrática de UNIR se incorpora como miembro correspondiente de la institución.'],
];
const RESEARCH: [string, string, string, string][] = [
  ['research-tiktok', 'Mitsuko Matsumoto y Pilar Lacasa durante el seminario.', 'Investigadoras de UNIR apuestan por educar y no prohibir el uso de TikTok entre los jóvenes', 'UNIR clausura el proyecto ‘Vidas Digitales’ con un seminario sobre juventud, redes sociales y convivencia digital.'],
  ['research-rep', 'Revistas científicas editadas por UNIR.', 'Dos revistas editadas por UNIR (REP e IJIMAI) reciben el Sello de Calidad de FECYT', 'La Fundación Española para la Ciencia y la Tecnología reconoce la calidad editorial y científica de la Revista Española de Pedagogía.'],
  ['research-infancia', 'Joaquín González-Cabrera, miembro del equipo director y autor del informe.', 'Expertos de UNIR en el estudio ‘Infancia Digital 2025’ reclaman una estrategia nacional que garantice el bienestar de niños y adolescentes', 'UNIR aporta tres investigadores al comité de 43 expertos internacionales que han elaborado este informe.'],
  ['research-lupus', 'El investigador de UNIR, Víctor Moreno-Torres Concha.', 'Médicos instan a individualizar la prevención de la preeclampsia en embarazadas con Lupus', 'Investigadores de UNIR y los hospitales Puerta de Hierro y Cruces de Bizkaia revelan que el riesgo de preeclampsia varía.'],
  ['research-ia', 'Los resultados revelan que España cuenta con una base sólida.', 'España lidera el desarrollo de la IA en el ámbito de la robótica educativa', 'La investigación encabezada por la Universidad Internacional de La Rioja analiza el uso de la IA en las aulas.'],
];
const SOCIAL: [string, string][] = [
  ['Supercuidadores', 'Proyecto de emprendimiento social cuyo objetivo es formar y dar asistencia a los familiares y profesionales dedicados a atender a personas mayores, discapacitadas o dependientes.'],
  ['Campus Solidario', 'Ofrecemos educación gratuita a quienes más lo necesitan a través de un programa de voluntariado online. En esta plataforma comparten sus conocimientos profesionales.'],
  ['Clínica Jurídica', 'Espacio de aprendizaje virtual en el que los alumnos de Derecho resuelven casos y consultas jurídicas reales planteadas por diversas entidades sin ánimo de lucro.'],
  ['UNIR Ediciones', 'Colaboramos con la difusión de la investigación y el conocimiento científico y humanístico. Entre nuestras colecciones destacan UNIR Emprende, centrada en la empresa.'],
  ['Aula de Cultura', 'Apostamos por la difusión de la cultura en sus distintas ramas a la sociedad riojana y la comunidad educativa de UNIR. Las sesiones de Aula de Cultura son abiertas.'],
  ['Nueva revista', 'Fundada por Antonio Fontán en 1990, es un espacio dedicado al análisis de la sociedad contemporánea y a la reflexión profunda en los órdenes de la cultura y la política.'],
];
const MEDIA: [string, string, string, string][] = [
  ['logo-lasexta', 'png', 'laSexta', 'El 74,3% de los adolescentes hospitalizados por depresión son chicas.'],
  ['logo-telva', 'png', 'Telva', 'Con este método de Hardvard, conseguirás (por fin) la desconexión digital de estas vacaciones ¡y todo el año!'],
  ['logo-wired', 'png', 'Wired', 'Más allá de Torre Pacheco: las redes que explotan el odio a nivel global.'],
];
const PROPOSAL: [string, string, string][] = [
  ['monitor', 'Docencia 100% Online', 'Nuestra metodología te permite estudiar sin desplazarte mediante un modelo de aprendizaje personalizado.'],
  ['projector-screen', 'Clases en directo', 'Nuestros profesores imparten 4.000 horas de clases online a la semana. Puedes asistir en directo o verlas en otro momento.'],
  ['users', 'Mentor - UNIR', 'En UNIR nunca estarás solo. Un tutor realizará un seguimiento individualizado y te ayudará en todo lo que necesites.'],
];
const VIDEOS: [string, string][] = [
  ['video-fuerza', 'La fuerza que necesitas'],
  ['video-graduacion', 'Graduación España 2024'],
  ['video-acompanamiento', 'Acompañamiento personalizado'],
];

const hero = `<section class="aem-hero-home aem-brand">
  <div class="aem-hero-home__inner">
    <div class="aem-hero-home__content">
      <h1 class="aem-hero-home__title">La universidad online Nº1 en Educación</h1>
      <p class="aem-hero-home__text">Estudia un grado, máster, doctorado u otra formación en UNIR y transforma tu potencial en oportunidades reales.</p>
      <ul class="aem-hero-home__logos" aria-label="Rankings">
${RANKINGS.map(([file, label]) => `        <li><img src="${img(file, 'png')}" alt="${label}" /></li>`).join('\n')}
      </ul>
    </div>
    <div class="aem-hero-home__cards aem-carousel" data-aem-carousel>
      <div class="aem-carousel__track" tabindex="0" aria-label="Destacados">
${HERO_CARDS.map(([file, title, text]) => `        <a class="aem-feature-card" href="#"><span class="aem-feature-card__media"><img src="${img(file)}" alt="" /></span><span class="aem-feature-card__title">${title}</span><span class="aem-feature-card__text">${text}</span></a>`).join('\n')}
      </div>
      <div class="aem-carousel__controls aem-carousel__controls--inverse">
        <span class="aem-carousel__progress"><span class="aem-carousel__bar"></span></span>
        <button class="aem-carousel__prev" type="button" aria-label="Anterior">${icon('arrow-left')}</button>
        <button class="aem-carousel__next" type="button" aria-label="Siguiente">${icon('arrow-right')}</button>
      </div>
    </div>
  </div>
</section>`;

const distributor = `<ul class="aem-distributor">
${DISTRIBUTOR.map(([file, label]) => `  <li><a class="aem-distributor__item" href="#"><span class="aem-distributor__media"><img src="${img(file)}" alt="" /></span>${label} ${icon('arrow-right')}</a></li>`).join('\n')}
  <li class="aem-distributor__stack">
    <a class="aem-distributor__item aem-distributor__item--solid" href="#">Formación Permanente ${icon('arrow-right')}</a>
    <a class="aem-distributor__item aem-distributor__item--solid" href="#">Formación Profesional ${icon('arrow-up-right')}</a>
  </li>
</ul>`;

const areas = `<div class="aem-list-block">
  <ul class="aem-list-block__list">
${AREAS.map((area) => `    <li>${area}</li>`).join('\n')}
  </ul>
  <div class="aem-list-block__actions">
    <a class="aem-button aem-button--outlined aem-button--lg" href="#">Ver toda la oferta académica</a>
  </div>
</div>`;

const featured = `<div class="aem-featured">
${indent(card({ title: 'Líderes en MBA', image: img('rankings-mba'), mediaHeight: '15.5rem', overlay: '<span class="aem-tag aem-tag--accelerator"><span class="aem-tag__text">Descuento disponible</span></span>', link: 'Descúbrelo' }), 2)}
${indent(grid(FEATURED.map(([title, link]) => card({ title, link }))), 2)}
</div>`;

const dateTag = (day: string) =>
  `<div class="aem-date-tag"><span class="aem-state-tag aem-state-tag--online">Online</span><span class="aem-date-tag__date"><span class="aem-date-tag__day">${day}</span><span class="aem-date-tag__meta"><span class="aem-date-tag__month">Ene</span><span class="aem-date-tag__time">2026</span></span></span></div>`;
const events = grid(
  EVENTS.map(([day, title, text]) => card({ title, text, fill: 'empty', image: img(`foro-${day}`), overlay: dateTag(day), tags: ['OpenClasses', 'Derecho'] })),
  '24rem',
);

const programs = `<div class="aem-chip-group" role="group" aria-label="Áreas de estudio" data-aem-chips="single" data-aem-chips-filter="home-programs">
${AREA_CHIPS.map(([value, label], i) => `  <button class="aem-chip aem-chip--primary" type="button" data-value="${value}" aria-pressed="${i === 0}"><span>${label}</span></button>`).join('\n')}
</div>
${carousel(
  PROGRAMS.map(
    ([file, pretitle, title, ects, filter]) => `<article class="aem-card aem-card--product aem-card--secondary" data-aem-filter="${filter}">
  <div class="aem-card__media"><img src="${img(file)}" alt="" loading="lazy" /></div>
  <div class="aem-card__body">
    <div class="aem-card__text">
      <p class="aem-card__pretitle">${pretitle}</p>
      <h3 class="aem-card__title"><a class="aem-card__link" href="#">${title}</a></h3>
    </div>
    <ul class="aem-tag-set"><li><span class="aem-category-tag">${ects}</span></li><li><span class="aem-category-tag">09 Mar 2026</span></li></ul>
  </div>
</article>`,
  ),
  'Títulos',
).replace('class="aem-carousel__track"', 'class="aem-carousel__track" id="home-programs"')}`;

const newsCarousel = (items: [string, string, string, string][], label: string) =>
  carousel(items.map(([file, caption, title, text]) => card({ title, text, caption, fill: 'empty', image: img(file), mediaHeight: '20rem' })), label);

const meta: Meta = {
  title: 'AEM/Pages/Home',
  parameters: {
    figmaUrl: pagesFigma('2006:44285'),
    order: 0,
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Home del portal (Figma Desktop 1920, 1280, Tablet 768 y Mobile 375) con sus imágenes: cabecera, hero con buscador de titulaciones, distribuidor, áreas de estudio, destacados, eventos, títulos filtrables por área, actualidad, investigación, compromiso social, medios, propuesta educativa, vídeos y pie. Montada con los módulos de AEM.',
      },
    },
  },
  render: () => ({
    template: `<div class="aem-page">
${moduleHtml(navigationHeader)}
<main>
${hero}
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
${section(grid(MEDIA.map(([file, ext, name, text]) => card({ logo: [img(file, ext), name], text, fill: 'secondary', link: '23/07/2025' })), '20rem'), { secondary: true, heading: { title: 'UNIR en los medios', text: 'Noticias, artículos, entrevistas y todo aquello que los medios de comunicación publican sobre UNIR y nuestros profesores, lo puedes ver aquí.', link: 'Descubre lo que dicen de nosotros' } })}
${section(grid(PROPOSAL.map(([name, title, text]) => card({ icon: name, title, text })), '20rem'), { heading: { title: 'UNIR, una propuesta educativa única' } })}
${section(grid(VIDEOS.map(([file, title]) => card({ title, fill: 'image', image: img(file), play: true, mediaHeight: '28.3125rem' })), '20rem'), { flush: true, heading: { title: 'Conoce UNIR' } })}
</main>
${moduleHtml(footer)}
</div>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
