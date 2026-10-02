import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { heading, icon, indent } from '../../stories/helpers';
import { card, carousel, eventCard, figures, grid, hero, moduleHtml, pageImg, pagesFigma, profiles, programCard, richText, section, testimonials } from '../../stories/page-parts';

const programs = (pretitle: string, items: [string, string[]][]) => carousel(items.map(([title, tags]) => programCard(pageImg('program-generic'), pretitle, title, tags)), 'Titulaciones');
const contentBlock = (image: string, title: string, text: string, link: string) => `<div class="aem-content-block aem-content-block--40-60">
  <div class="aem-content-block__media"><img src="${pageImg(image)}" alt="" loading="lazy" /></div>
  <div class="aem-content-block__column">
    <div class="aem-rich-text">
      <h2>${title}</h2>
      <p>${text}</p>
    </div>${link ? `\n    <a class="aem-link-button" href="#">${link} ${icon('caret-right')}</a>` : ''}
  </div>
</div>`;
const news = (items: [string, string, string][], label: string) => carousel(items.map(([file, title, text]) => card({ title, text, fill: 'empty', image: pageImg(file), mediaHeight: '20rem' })), label);

const content = [
  hero({ crumbs: ['Inicio', 'Educación'], title: 'Área de Educación' }),
  section(
    contentBlock(
      'area-educacion',
      'Fórmate como maestro, profesor o gestor educativo',
      'Si tu vocación es la docencia o ya trabajas en el sector educativo, sabes que la formación constituye un pilar elemental para desarrollar tu profesión. En el Área de Educación de UNIR ponemos a tu disposición una enseñanza de alta calidad online para que adquieras las competencias que demanda la educación del siglo XXI.',
      '',
    ),
  ),
  section(
    programs('Grado en', [
      ['Pedagogía', ['4 cursos', '240 ECTS', '6 oct. 2025']],
      ['Maestro en Educación Infantil', ['4 cursos', '240 ECTS', '6 oct. 2025']],
      ['Maestro en Educación Primaria', ['4 cursos', '240 ECTS', '6 oct. 2025']],
      ['Maestro en Educación Infantil (Grupo Bilingüe)', ['4 cursos', '240 ECTS', '6 oct. 2025']],
    ]),
    { flush: true, className: 'aem-card-block', heading: { title: 'Grados destacados', link: 'Ver todos los grados' } },
  ),
  section(
    programs('Máster Universitario en', [
      ['Formación del Profesorado de Educación Secundaria Obligatoria y Bachillerato, Formación Profesional y Enseñanzas de Idiomas', ['1 curso', '60 ECTS', '6 oct. 2025']],
      ['Atención Educativa y Prevención de Conductas Adictivas en Niños y Adolescentes', ['1 curso', '60 ECTS', '6 oct. 2025']],
      ['Neuropsicología y Educación', ['1 curso', '60 ECTS', '6 oct. 2025']],
    ]),
    { secondary: true, className: 'aem-card-block', heading: { title: 'Másteres Oficiales destacados', link: 'Ver todos los másteres' } },
  ),
  section(
    programs('Grado en', [
      ['Pedagogía', ['4 cursos', '240 ECTS', '6 oct. 2025']],
      ['Maestro en Educación Infantil', ['4 cursos', '240 ECTS', '6 oct. 2025']],
      ['Maestro en Educación Primaria', ['4 cursos', '240 ECTS', '6 oct. 2025']],
    ]),
    { className: 'aem-card-block', heading: { title: 'Másteres de Formación Permanente destacados', link: 'Ver todos los másteres de Formación Permanente' } },
  ),
  section(
    programs('Experto Universitario en', [
      ['Enseñanza de la Religión Católica en Infantil y Primaria (DECA)', ['1 curso', '24 ECTS', '6 oct. 2025']],
      ['Trastorno del Espectro Autista', ['1 curso', '24 ECTS', '6 oct. 2025']],
      ['Psicomotricidad y Neuromotricidad', ['1 curso', '24 ECTS', '6 oct. 2025']],
    ]),
    { secondary: true, className: 'aem-card-block', heading: { title: 'Programas de Formación Permanente destacados', link: 'Ver todos los programas de Formación Permanente' } },
  ),
  section(
    grid(
      (
        [
          ['evento-presencialidad', 'Nuevos modelos de aprendizaje en la universidad pública: valor añadido de la presencialidad', 'En un mundo que no se detiene, tu bienestar no puede esperar. Noemí García, directora de Desarrollo Académico Internacional de UNIR-España, compartirá cómo estas técnicas.'],
          ['evento-gamificacion', 'Gamificación práctica: del juego al aprendizaje real', '¿Quieres descubrir cómo convertir el aprendizaje en una experiencia motivadora y divertida? En este Foro UNIR te adentrarás en el mundo de la gamificación, y verás por qué esta metodología potencia el compromiso y la participación de los alumnos.'],
          ['evento-ia-universidad', '¿Cómo está implementando la universidad pública la IA?', 'En la tercera sesión del ciclo “La universidad pública ante los retos sociales”, nos centraremos en aspectos claves como la redefinición del docente, la investigación y el humanismo frente a la irrupción de la inteligencia artificial.'],
        ] as [string, string, string][]
      ).map(([file, title, text]) => eventCard(pageImg(file), { day: '10', month: 'Sep', year: '2025' }, title, text, ['Seminarios', 'Educación'])),
      '24rem',
    ),
    { heading: { title: 'Próximos eventos' } },
  ),
  section(
    grid(
      (
        [
          ['evento-globalizacion', 'Globalización frente al impacto local: la cooperación interuniversitaria en la universidad pública', 'En la primera sesión del ciclo “La universidad pública ante los retos sociales”, analizamos cómo los cambios sociales influyen en las funciones de la educación superior y su relación con el impacto económico, social y cultural en el entorno local.'],
          ['evento-mindfulness', 'Objetivo bienestar: mindfulness y hábitos saludables', 'En un mundo que no se detiene, tu bienestar no puede esperar. Noemí García, directora de Desarrollo Académico Internacional de UNIR-España, compartió cómo estas técnicas pueden ayudarte a reconectar contigo mismo, reducir el estrés y potenciar tu rendimiento.'],
          ['evento-ia-aula', 'Experiencias prácticas del uso de la IA en el aula', 'El pasado 14 de julio, UNIR TV acogió una mesa redonda sobre el uso práctico de la inteligencia artificial en la educación. Más del 70% de los docentes ya utilizan este tipo de herramientas en sus clases. ¿Estás preparado para liderar el cambio?'],
        ] as [string, string, string][]
      ).map(([file, title, text]) => eventCard(pageImg(file), { day: '10', month: 'Sep', year: '2025', state: 'finalizado' }, title, text, ['Seminarios', 'Educación'])),
      '24rem',
    ),
    { flush: true, heading: { title: 'Eventos pasados' } },
  ),
  section(
    grid(
      (
        [
          ['lightbulb', 'Innovación', 'Nuestros títulos responden a la realidad de la práctica educativa y a la evolución de las necesidades de las aulas.'],
          ['monitor', 'Tecnología', 'Aplicamos herramientas innovadoras de la educación desde la perspectiva de las nuevas tecnologías.'],
          ['globe-simple', 'Bilingüismo', 'Te formamos en inglés para que des clases en un modelo educativo que demanda altas competencias lingüísticas.'],
        ] as [string, string, string][]
      ).map(([name, title, text]) => card({ icon: name, title, text })),
      '20rem',
    ),
    {
      flush: true,
      heading: {
        title: 'Capacítate para enseñar',
        text: 'Trabajarás con las metodologías de aprendizaje tradicionales, pero también conocerás las más novedosas para que puedas aplicarlas en el aula. Para ello te enseñaremos a manejar las herramientas que te permitirán ser un buen docente en el siglo XXI.',
      },
    },
  ),
  section(
    richText([], [
      'Estudiarás con profesionales destacados como Javier Tourón, Ingrid Mosquera, Chema Lázaro, Carmen Álvarez, Joaquín González Cabrera o Zaira Ortega.',
      'Hemos conseguido que la obtención de un empleo y el éxito en las carreras laborales de nuestros estudiantes egresados se encuentren entre los mejores de Europa.',
      'Profundizarás en las últimas tendencias y metodologías. Nuestras titulaciones están adaptadas a la educación del futuro.',
      'Contamos con bolsas de trabajo y un sistema de prácticas para garantizar un futuro laboral y la mejora constante en el ámbito profesional docente.',
      'Aprenderás de una forma práctica, para que puedas aplicar lo aprendido en el aula.',
      'Añadimos consultoría y asesoramiento para los egresados que quieran acceder a un concurso-oposición, gracias a convenios con academias especializadas.',
    ]),
    { secondary: true, heading: { title: '¿Por qué estudiar en el área de Educación de UNIR?' } },
  ),
  section(
    figures([
      ['+100', 'mil', 'profesores se han formado en UNIR', ''],
      ['+50', '', 'titulaciones sobre Educación', ''],
      ['3/4', '', 'egresados mejoran profesionalmente', ''],
    ]),
    { className: 'aem-section--accent' },
  ),
  section(
    news(
      [
        ['edu-herraez', '“La revolución de la IA exige un nuevo modelo educativo basado en competencias”, aseguran los expertos en educación Mario y Alberto Herráez', 'Los fundadores de eTwinz destacan en UNIR la importancia de enseñar competencias en el aula y la necesidad de evaluar el proceso por encima de los resultados estandarizados.'],
        ['edu-mosquera', 'Ingrid Mosquera, profesora de UNIR, Mejor Docente de España en la categoría de Universidad en los VIII Premios EDUCA ABANCA', 'La profesora de la Facultad de Ciencias de la Educación y Humanidades de UNIR ha sido reconocida en los galardones más importantes del sector educativo entre 150 profesores de toda España.'],
        ['edu-tiktok', '“Los jóvenes utilizan TikTok como plataforma de entretenimiento y aprendizaje”, coinciden investigadores en UNIR', 'Expertos de diversas universidades presentaron el recurso educativo “TikTok en el aula”, una herramienta de alfabetización digital.'],
        ['edu-peru', 'Docentes peruanos podrán estudiar maestrías online con becas del 65%', 'UNIR y Santillana Perú lanzan nuevo plan de becas en el que los beneficiarios podrán estudiar una maestría oficial entre 30 titulaciones de calidad europea reconocibles por SUNEDU.'],
        ['edu-peru', 'Expertos analizan en UNIR el papel transformador de la IA y el IoT en la enseñanza técnica y profesional', "El ciclo de debates 'IoT en educación: hacia la industria 5.0' exploró cómo las tecnologías emergentes pueden impulsar metodologías innovadoras."],
      ],
      'Actualidad',
    ),
    { secondary: true, className: 'aem-card-block', heading: { title: 'Actualidad', link: 'Ver todos los artículos' } },
  ),
  section(
    richText([], [
      'Elaboración personalizada de la programación didáctica con correcciones individualizadas.',
      'Profesionales que llevan formando a docentes más de 18 años.',
      'Metodología flexible adaptada a tu ritmo y tus necesidades.',
      'Técnicas de memorización avanzadas para consolidar conocimientos clave.',
      'Mejora de oratoria y expresión oral, para destacar en la fase de exposición.',
      'Simulacros reales de examen y tutorización personalizada.',
    ]),
    {
      heading: {
        title: 'Prepárate para las oposiciones y crece como docente de Primaria',
        text: '¿Quieres conseguir tu plaza como maestro/a? En UNIR te ofrecemos 4 cursos de preparación de oposiciones, dirigidos solo a nuestros estudiantes. Con una duración de 9 meses, están diseñados para potenciar al máximo tus posibilidades de éxito.',
      },
    },
  ),
  section(
    `${profiles([
      [
        '',
        [
          [pageImg('prof-lazaro'), 'Experto Asociado', 'Chema Lázaro Navacerrada', 'Maestro de Educación Primaria. Nominado al Premio Educa Abanca 2022 como mejor docente universitario. Formación en Neurodidáctica y ganador del Premio Nacional de Educación de 2013.'],
          [pageImg('prof-bermejo'), 'Docente UNIR', 'Raúl Bermejo Cabezas', 'Maestro de Educación Infantil y Graduado en Primaria. He publicado 3 libros hasta la fecha, y el último "Ser Maestro" está en su 6ª Edición y publicado en más de 13 países. En RR.SS me llamo @Thinksforkids con más de 100.000 seguidores.'],
          [pageImg('prof-solis'), 'Docente UNIR', 'Patricia Solís García', 'Dra y Lda. en Psicología (U. de Oviedo). Especializada en Psicología educativa y discapacidad, especialmente atención a la diversidad, con la realización de varios másteres y postgrados. Nominada a mejor docente, Premios Educa Abanca 2022.'],
          [pageImg('prof-mosquera-2'), 'Docente UNIR', 'Ingrid Mosquera Gende', 'Profesora Titular de Universidad. Mejor Docente de España Categoría Universidad VIII Premios EDUCA ABANCA 2024 (2.ª en 2023, 6.ª en 2022).'],
        ],
      ],
    ])}
<a class="aem-link-button" href="#">Conocer a los profesores de Educación ${icon('caret-right')}</a>`,
    {
      flush: true,
      heading: {
        title: 'Nuestro claustro y colaboradores',
        text: 'Los profesores del Área de Educación de UNIR muestran una vocación genuina por la enseñanza, se actualizan constantemente y son una referencia en su especialidad y el entorno online. Ellos te ayudarán a lograr tus objetivos como docente.',
      },
    },
  ),
  section(
    contentBlock(
      'podcast-maestro',
      'Escucha nuestro pódcast “Querido Maestro”',
      '¡Bienvenido al espacio de UNIR, donde transformamos la educación juntos! Descubre cómo las mejores prácticas y las últimas tendencias, presentadas por expertos líderes en el campo, pueden revolucionar tu aula.',
      'Acceder al podcast',
    ),
    { secondary: true },
  ),
  section(
    `<ul class="aem-logos">
${[1, 2, 3, 4].map((i) => `  <li><img src="${pageImg(`recurso-${i}`, 'png')}" alt="Recurso educativo ${i}" loading="lazy" /></li>`).join('\n')}
</ul>`,
    {
      heading: {
        title: 'Los recursos educativos que te ayudarán en el desarrollo profesional',
        text: 'En UNIR vas a aprender con los recursos educativos más actuales y que después podrás utilizar como docente en el aula. Harán que incrementes tus habilidades y conocimientos.',
      },
    },
  ),
  section(
    grid(
      (
        [
          ['openclass-herramientas', 'Educación a distancia: las herramientas imprescindibles para los docentes', 'Conoce las posibilidades didácticas que tienen 3 plataformas digitales indispensables para continuar el proceso educativo.'],
          ['openclass-emociones', 'Las claves para ser un buen maestro y la importancia de las emociones en el aula', 'Profundiza en las habilidades para desarrollar de forma exitosa tu labor como docente como el manejo de las emociones en el aula.'],
          ['openclass-gamificacion', 'La gamificación en el aula con los niños: el juego es algo muy serio', 'Chema Lázaro nos acerca al uso del juego como un modelo metodológicamente activo, que busca un aprendizaje a través de la acción reflexión.'],
        ] as [string, string, string][]
      ).map(([file, title, text]) => card({ title, text, fill: 'empty', image: pageImg(file), play: true })),
      '20rem',
    ),
    {
      flush: true,
      heading: {
        title: 'Las openclass más destacadas',
        text: 'Continuamente estamos organizando charlas con docentes expertos en sus áreas. En ellas se habla sobre las últimas tendencias en el sector, técnicas y herramientas que mejoran el trabajo en el aula.',
      },
    },
  ),
  section(
    testimonials([
      ['“Lo más destacable de la titulación, sin duda, son los docentes. Además, la programación está pensada de forma global para que todas las asignaturas se interconecten con un hilo conductor común.”', 'José Manuel Sanz', 'Estudiante del Máster en Profesorado', pageImg('alumni-sanz')],
    ]),
    { flush: true, heading: { title: 'Conoce la experiencia de nuestros egresados' } },
  ),
  section(
    `<div class="aem-banner aem-banner--image">
  <div class="aem-banner__media"><img src="${pageImg('banner-educacion')}" alt="" loading="lazy" /></div>
  <div class="aem-banner__body">
${indent(heading({ title: '¿Quieres estudiar nuestras titulaciones de Educación?', text: 'Si quieres saber más sobre UNIR, conocer el área de Educación o estudiar alguna de nuestras titulaciones, rellena el formulario de solicitud de información y uno de nuestros asesores se pondrá en contacto contigo.' }), 4)}
    <a class="aem-link-button" href="#">Conoce nuestra metodología ${icon('caret-right')}</a>
  </div>
</div>`,
    { flush: true },
  ),
  section(
    news(
      [
        ['revista-boronat', 'Reinventar mi empresa: “El máster me devolvió la ilusión y me ayudó a profesionalizar Avimur”', 'Tras más de 15 años como empresario turístico, Roberto Boronat decidió cursar el Máster Universitario en Comercio Electrónico de UNIR para transformar su agencia de viajes.'],
        ['revista-ia-docentes', 'La importancia de dominar la inteligencia artificial aplicada para docentes-investigadores', 'La incorporación de sistemas inteligentes en la investigación educativa permite al profesorado optimizar el análisis de datos, anticipar dificultades y personalizar contenidos.'],
        ['revista-colaboracion', 'El poder de la colaboración: “Conectar con el talento en formación nos ha permitido renovar nuestra visión estratégica”', 'Daniel Zaldivar, marketing manager en Omnitec Systems, aprovechó la plataforma de la universidad para aportar a la formación de los futuros profesionales del marketing.'],
      ],
      'Revista',
    ),
    { flush: true, className: 'aem-card-block', heading: { title: 'Revista', link: 'Ver todos los artículos de Educación' } },
  ),
  section(
    grid(
      (
        [
          ['monitor', 'Docencia 100% Online', 'Nuestra metodología te permite estudiar sin desplazarte mediante un modelo de aprendizaje personalizado'],
          ['chalkboard-teacher', 'Clases en directo', 'Nuestros profesores imparten 4.000 horas de clases online a la semana. Puedes asistir en directo o verlas en otro momento'],
          ['users', 'Mentor - UNIR', 'En UNIR nunca estarás solo. Un tutor realizará un seguimiento individualizado y te ayudará en todo lo que necesites'],
        ] as [string, string, string][]
      ).map(([name, title, text]) => card({ icon: name, title, text })),
      '20rem',
    ),
    { flush: true, heading: { title: 'UNIR, una propuesta educativa única' } },
  ),
  section(
    grid(
      (
        [
          ['video-fuerza-2', 'La fuerza que necesitas'],
          ['video-graduacion-2', 'Graduación España 2024'],
          ['video-acompanamiento-2', 'Acompañamiento personalizado'],
        ] as [string, string][]
      ).map(([file, title]) => card({ title, fill: 'image', image: pageImg(file), play: true, mediaHeight: '28.3125rem' })),
      '20rem',
    ),
    { flush: true, heading: { title: 'Conoce UNIR' } },
  ),
];

const meta: Meta = {
  title: 'AEM/Pages/Área Estudio',
  parameters: {
    figmaUrl: pagesFigma('2047:106321'),
    order: 4,
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Página de área de estudio (Educación): hero general, presentación, carruseles de grados, másteres y programas destacados, eventos, ventajas, cifras, actualidad, oposiciones, claustro, pódcast, recursos, openclass, testimonio, banner, revista, propuesta educativa y vídeos.',
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
