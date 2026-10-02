import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { icon } from '../../stories/helpers';
import { accordion, card, carousel, eventCard, figures, grid, hero, heroTiles, moduleHtml, pageImg, pagesFigma, profiles, section, tabsNav } from '../../stories/page-parts';

const news = (items: [string, string, string, string][]) => carousel(items.map(([file, caption, title, text]) => card({ title, text, caption, fill: 'empty', image: pageImg(file), mediaHeight: '20rem' })), 'Noticias');

const content = [
  hero({
    crumbs: ['Inicio', 'Facultades', 'Facultad de Economía y Empresa'],
    pretitle: 'Facultad de',
    title: 'Economía y Empresa',
    after: heroTiles([
      ['building-office', 'Empresa'],
      ['briefcase', 'MBA'],
      ['megaphone', 'Marketing y Comunicación'],
    ]),
  }),
  tabsNav(['La facultad', 'Eventos', 'Actualidad', 'Claustro', 'Investigación']),
  section(
    accordion([
      ['Grados', 'Consulta los 17 grados oficiales de la facultad.', '17 titulaciones'],
      ['Másteres oficiales', 'Consulta los 54 másteres oficiales de la facultad.', '54 titulaciones'],
      ['Másteres propios', 'Consulta los 8 másteres propios de la facultad.', '8 titulaciones'],
    ]),
    { className: 'aem-accordion-block', heading: { title: 'Oferta académica' } },
  ),
  section(
    `<div class="aem-content-block aem-content-block--40-60">
  <div class="aem-content-block__media"><img src="${pageImg('facultad-calidad')}" alt="" loading="lazy" /></div>
  <div class="aem-content-block__column">
    <div class="aem-rich-text">
      <h2>Un sistema de gestión de calidad ajustado a la normativa</h2>
      <p>El objetivo de UNIR es ofrecer una docencia de calidad con una vocación de mejora continua y excelencia, cumpliendo con las necesidades y expectativas de los estudiantes, personal docente y otros grupos de interés. Por ello, tenemos establecido unos criterios que están alineados con las directrices establecidas en el programa AUDIT de ANECA.</p>
    </div>
    <a class="aem-link-button" href="#">Conoce más ${icon('caret-right')}</a>
  </div>
</div>`,
    { flush: true },
  ),
  section(
    grid(
      [
        card({ logo: [pageImg('logo-the-2', 'png'), 'Times Higher Education'], title: 'UNIR, la universidad en línea nº1 del mundo en español, según Times Higher Education', text: 'La prestigiosa revista THE, que publica uno de los tres rankings más influyentes en el ámbito de la educación superior internacional, reconoce a UNIR en 2024 como la primera universidad hispanohablante en línea del mundo.', fill: 'secondary' }),
        card({ logo: [pageImg('logo-forbes-color', 'png'), 'Forbes'], title: 'Líderes en innovación educativa, según ‘Forbes’', text: 'Forbes nos posiciona entre las tres mejores universidades de España y como la primera online. Además, destaca a UNIR como un referente global en la formación online por su metodología y la experiencia interactiva que ofrece a sus estudiantes.', fill: 'secondary' }),
      ],
      '24rem',
    ),
    { secondary: true, heading: { title: 'Destacados' } },
  ),
  section(grid([eventCard(pageImg('evento-ambiental'), { day: '26', month: 'Ene', year: '2026' }, 'Profesionalización de la educación ambiental: docencia clave para la crisis climática', 'La educación ambiental es estratégica para impulsar la resiliencia climática y acompañar la transición ecosocial. Pero ¿está el sistema reconociendo y sosteniendo a quienes hacen posible este cambio desde la docencia? Lo abordamos en este Foro UNIR.', ['OpenClasses', 'Derecho'])], '24rem'), {
    heading: { title: 'Próximos eventos en directo', link: 'Ver todos los eventos' },
  }),
  section(
    grid(
      (
        [
          ['evento-puy-du-fou', 'La fórmula del éxito en el sector del ocio con Jesús Sainz, vicepresidente de Puy du Fou España', 'El parque temático de Toledo se ha convertido en un referente y sus espectáculos son reconocidos mundialmente por su calidad. Hemos hablado de todo ello, así como de los retos de su gestión, en el pasado Visión CEO.'],
          ['evento-psicoterapia', 'Escuchar al cuerpo en psicoterapia: el idioma de los síntomas somáticos', 'En esta openclass explicamos por qué y cómo incluir el lenguaje de los síntomas corporales en la práctica clínica de la psicoterapia de la mano de José Luis Marín, presidente de la Sociedad Española de Medicina Psicosomática y Psicoterapia.'],
          ['evento-chatgpt', '¿Cómo usar ChatGPT y la inteligencia artificial en tu aula?', 'Cristian Andrades, experto en EdTech y fundador de Kumubox, habló sobre la aplicación de ChatGPT y otros valiosos aportes de la IA para mejorar la experiencia educativa de tus alumnos.'],
          ['evento-pactar', 'Presentación del monográfico “Pactar es progresar”, una reflexión sobre los pactos como motor del progreso', 'UNIR, en colaboración con la Fundación Felipe González, presentaron un número monográfico de Nueva Revista bajo el lema “Una sociedad que pacta es una sociedad que progresa”.'],
        ] as [string, string, string][]
      ).map(([file, title, text]) => eventCard(pageImg(file), { day: '10', month: 'Sep', year: '2025', state: 'finalizado' }, title, text, ['OpenClasses', 'Empresa y MBA'])),
      '24rem',
    ),
    {
      flush: true,
      heading: { title: 'Eventos destacados', text: 'En UNIR te ofrecemos acceso a seminarios, jornadas y clases magistrales pasadas que sobresalen por abordar temas de gran relevancia. Accede aquí.', link: 'Ver todos los eventos' },
    },
  ),
  section(
    news([
      ['actualidad-trabajo-social', 'Foto de familia del encuentro.', 'UNIR acoge a los máximos representantes del ámbito académico para impulsar la Academia de Trabajo Social', 'Los expertos visibilizaron en la Universidad Internacional de La Rioja los avances en esta disciplina y consolidaron los contenidos necesarios para la constitución de la Academia de Trabajo Social.'],
      ['actualidad-fso', 'Reconocimientos recibidos por las instituciones de la red Proeduca en el ranking FSO 2025.', 'El MBA de UNIR entre los mejores MBA del mundo, según el Ranking FSO 2025', 'La Universidad Internacional de La Rioja es la primera institución en obtener el reconocimiento con un MBA oficial.'],
      ['actualidad-concierto', 'La orquesta y el coro, dirigidos por Ernesto Monsalve.', 'UNIR y la Universidad Villanueva evocaron el espíritu de la tradición vienesa en su I Concierto Universitario de Año Nuevo', 'Más de 2.000 personas celebraron en el Auditorio Nacional de Madrid el bicentenario de Johann Strauss Jr.'],
      ['actualidad-arrufat', 'Miguel Arrufat: “En cinco años la IA va a cambiar totalmente la universidad”', 'Miguel Arrufat: “En cinco años la IA va a cambiar totalmente la universidad”', 'El promotor de UNIR explicó durante el I Congreso Futuro Iberoamericano los cinco grandes impactos de la IA en la universidad.'],
      ['actualidad-yannelys', 'Yannelys Aparicio, en la Academia Ecuatoriana de la Lengua durante el XVII Congreso ASALE en Quito.', 'Yannelys Aparicio, catedrática de UNIR, se incorpora a la Academia Norteamericana de la Lengua Española (ANLE)', 'Esta distinción como miembro correspondiente refuerza el compromiso estratégico de UNIR con la promoción y el estudio del español en los Estados Unidos.'],
    ]),
    { flush: true, className: 'aem-card-block', heading: { title: 'Actualidad', link: 'Ver todas las noticias' } },
  ),
  section(
    news([
      ['contexto-arbeo', 'Ander Arbeo, egresado del Máster en Marketing Digital.', 'Reinventarse para entrar en el marketing digital: el salto profesional hasta Meliá', 'El cambio de sector es posible cuando se combina formación estratégica y visión profesional. Ander Arbeo lo demuestra: tras estudiar el Máster en Marketing Digital, accedió como influencer marketing de la cadena internacional de hoteles.'],
      ['contexto-venegas', 'Luis Venegas, fundador de Conta y Negocios.', 'De la improvisación a la estrategia: cómo un plan digital impulsó los ingresos de Conta y Negocios', ''],
      ['contexto-patel', 'Jorge Heili, director del Foro UNIR, junto a Alba López y Neil Patel.', 'Neil Patel asegura en el Foro UNIR que “la conversión está subiendo pese a la caída del tráfico orgánico”', 'La inteligencia artificial generativa está redefiniendo cómo los consumidores descubren marcas y toman decisiones.'],
      ['contexto-levi', 'Beril Levi, directora del Máster en Liderazgo y Desarrollo Personal de UNIR.', 'Beril Levi: “El techo de cristal no ha desaparecido, se ha vuelto más sofisticado y, a veces, más invisible”', 'La directora del Máster de Formación en Liderazgo y Desarrollo Personal de UNIR habla de la brecha de género en entornos con capacidad de decisión.'],
      ['contexto-gonzalez', 'María González Guerrero, jefa de Marca e Imagen Corporativa de Redeia.', 'María González, jefa de Marca de Redeia: "Gracias al máster de UNIR, ahora me siento más segura al tomar decisiones y defenderlas”', 'La jefa del Departamento de Marca e Imagen de la matriz de Red Eléctrica cuenta su experiencia tras estudiar el Máster en Gestión de Marca.'],
    ]),
    { flush: true, className: 'aem-card-block', heading: { title: 'Contexto' } },
  ),
  section(
    grid(
      (
        [
          ['experiencial-4p', 'Estudiantes de UNIR, durante una actividad.', 'Metodología 4P orientada a la empleabilidad', 'Aprende haciendo con las grandes plataformas de información financiera y las bolsas norteamericanas. Accede a Bloomberg o Yahoo Finance y vive la experiencia de los profesionales.'],
          ['experiencial-harvard', 'Logos de Unir y HBP.', 'Acuerdo con Harvard Business Publishing Education', 'Fórmate con los casos de negocio, simulaciones, cursos online, materiales y otros recursos de esta prestigiosa institución. Obtén, además, tu diploma Harvard ManageMentor®.'],
          ['experiencial-impact', 'Equipo de trabajo en un bootcamp.', 'Crece con nuestra metodología Impact Learning', 'Diferénciate de los demás con una metodología propia y práctica, basada en proyectos y el trabajo en equipo, mediante bootcamps y el desarrollo de una experiencia internacional.'],
          ['experiencial-tiempo-real', 'Mikel Gómez, estudiante del Máster en Asesoramiento Financiero.', 'Analiza, evalúa y proyecta en tiempo real', 'Aprende haciendo con las grandes plataformas de información financiera y las bolsas norteamericanas. Accede a Bloomberg o Yahoo Finance y vive la experiencia de los profesionales.'],
          ['experiencial-tfm', 'Estudiantes de UNIR hablando con la decana, Eva Asensio, de su TFM.', 'TFM: de estudiantes a asesores de empresas', 'Ayuda a crecer a pymes y startups en tu Trabajo Fin de Máster. Nos adaptamos de forma permanente a los últimos cambios y tendencias de la realidad laboral.'],
          ['experiencial-certificaciones', 'Arantxa Sarasola, directora de Innovación de ING, detalló en UNIR del futuro de la banca.', 'Certificaciones en las competencias más demandadas', 'Lograrás las principales certificaciones en gestión de riesgos, recursos humanos, dirección de proyectos y asesoramiento financiero, entre otras, y elevarás tu perfil.'],
          ['experiencial-lideres', 'Eva Asensio, decana de la facultad y directora de Innovación Académica de UNIR.', 'Encuentros con líderes de referencia', 'Participarás en actividades y seminarios con destacados empresarios, académicos y personalidades. Aprende de los mejores y trasládales tus inquietudes.'],
          ['experiencial-viveros', 'Alberto M. López, estudiante del MBA, destaca su experiencia en Viveros de Empleo.', 'Viveros de Empleo para estar en primera línea', 'Más de 6 años trabajando con grupos globales, 95 proyectos en marcha, 2.600 participantes… Te preparamos para ser el profesional que buscan las empresas.'],
        ] as [string, string, string, string][]
      ).map(([file, caption, title, text]) => card({ title, text, caption, fill: 'empty', image: pageImg(file) })),
      '16rem',
    ),
    { flush: true, heading: { title: 'Aprendizaje experiencial' } },
  ),
  section(
    grid(
      (
        [
          ['historia-retuerta', 'Cristina Retuerta, directiva de Ecoembes.', 'Cómo logró dirigir y liderar en puestos de responsabilidad gracias al Máster en RRHH', '“He podido crecer dentro de mi organización. Quería dedicarme a la gestión de personas y ahora tengo las capacidades para hacerlo”.'],
          ['historia-ramirez', 'Rafael Ramírez, empresario familiar en Perú.', '“El MBA me aportó los conocimientos actualizados que necesitaba para mejorar como empresario”', ''],
          ['historia-alegre', 'Guillermo Alegre, experto en marketing.', '“En el Máster en Marketing Digital recibí una enseñanza de calidad, flexible y cercana”', 'Guillermo Alegre compatibilizó sus proyectos personales y su trabajo con el máster. “Destaco el nivel tan avanzado de la Universidad”.'],
        ] as [string, string, string, string][]
      ).map(([file, caption, title, text]) => card({ title, text: text || undefined, caption, fill: 'empty', image: pageImg(file), play: true })),
      '20rem',
    ),
    { flush: true, heading: { title: 'Historias' } },
  ),
  section(
    figures([
      ['90', '%', 'mejoraron su situación laboral', ''],
      ['98', '%', 'de estudiantes satisfechos', ''],
      ['4.782', '', 'convenios de prácticas con empresas', ''],
    ]),
    { className: 'aem-section--accent', heading: { title: 'Datos de la facultad' } },
  ),
  section(
    `${profiles([
      [
        '',
        [
          [pageImg('claustro-hurtado'), 'Docente UNIR', 'Rafael Hurtado Coll', 'GRUPO ALLIANZ. Director de Inversiones y de Estrategia de la unidad de Asset Management en España. Con anterioridad fue, de septiembre de 2011 a febrero de 2020, director de Inversiones de Allianz Popular.'],
          [pageImg('claustro-rodriguez'), 'Adecco', 'Ignacio Rodríguez Velasco', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
          [pageImg('claustro-sanchez'), 'Google Inc.', 'Carlos Sánchez Corrales', 'Director de Proyectos de Innovación en Barrabés y mentor en programas de aceleración. Especialista en reestructurar empresas para enfocarlas en la innovación, el desarrollo de nuevos productos, el crecimiento ágil y los resultados.'],
          [pageImg('claustro-jaraiz'), 'Indra', 'Jaime de Jaraíz', 'LG IBERIA. Presidente y CEO. Ha ocupado diversos puestos de responsabilidad, como Presidente y CEO de LG Canadá, Vicepresidente de LG España o Director de la División Electrónica de Consumo. Licenciado en Derecho por la Universidad San Pablo-CEU.'],
        ],
      ],
    ])}
<a class="aem-link-button" href="#">Conocer el claustro completo ${icon('caret-right')}</a>`,
    { heading: { title: 'Claustro destacado', text: 'Nuestros profesores son expertos en su sector y combinan su trayectoria académica con una dilatada carrera profesional.' } },
  ),
];

const meta: Meta = {
  title: 'AEM/Pages/Facultad',
  parameters: {
    figmaUrl: pagesFigma('2026:210659'),
    order: 3,
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Página de facultad (Economía y Empresa): hero distribuidor con las áreas, pestañas, oferta académica, calidad, destacados, eventos próximos y pasados, actualidad, contexto, aprendizaje experiencial, historias en vídeo, datos de la facultad y claustro destacado.',
      },
    },
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
