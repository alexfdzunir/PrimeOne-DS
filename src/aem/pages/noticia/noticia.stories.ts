import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { heading, indent } from '../../stories/helpers';
import { card, carousel, closing, moduleHtml, newsFormPanel, newsHero, pageImg, pagesFigma, programCard, richText, section, shareBanner } from '../../stories/page-parts';

const article = (title: string, paragraphs: string[]) => `<div class="aem-article">
  <div class="aem-rich-text">
${title ? `    <h2>${title}</h2>\n` : ''}${paragraphs.map((p) => `    <p>${p}</p>`).join('\n')}
  </div>
</div>`;
const figure = (image: string, caption = '') => `<figure class="aem-article__figure"><img src="${pageImg(image)}" alt="" loading="lazy" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;

const content = [
  newsHero(['Inicio', 'Revista - Noticias', 'Ciencias de la salud', 'Alejandro Andión, waterpolista'], 'Ciencias de la salud', 'Alejandro Andión, waterpolista: “La formación académica es fundamental, porque el deporte puede acabarse en un segundo”', 'Jorge Arana Varona', '18/06/2025'),
  section(
    `<div class="aem-article">
  <p class="aem-article__lead">El jugador de la división de honor compagina su carrera deportiva en la élite del waterpolo con sus estudios de Ciencias de la Actividad Física y del Deporte en UNIR gracias al programa PADAN de la universidad. Según el boya gallego, “te dan estabilidad y opciones cuando terminas tu vida deportiva”.</p>
  ${figure('noticia-andion', 'Alejandro Andión jugando un partido con el Club Natación Echeyde de Tenerife.')}
</div>`,
  ),
  section(
    article('', [
      '“Puedes ser muy bueno en tu disciplina, pero una lesión o una mala racha puede cambiarlo todo en un segundo. Pasas de estar en lo más alto a que nadie te conozca”, afirma Alejandro Andión (Pontevedra, 2003), jugador de la división de honor de waterpolo, la máxima categoría nacional. Con solo 22 años, ya ha pasado por clubes como el Sabadell, Rubí y actualmente compite en el Club Natación Echeyde de Tenerife.',
      'Con apenas 16 años el boya gallego (la posición de ataque más característica en el waterpolo y generalmente el jugador más fuerte y corpulento del equipo) dejó atrás su tierra natal para dar un importante salto en su carrera deportiva. “Fue una decisión dura, pero una de las mejores que he tomado”, afirma. De ese paso hace ya seis años, por lo que Alejandro dispone de una amplia experiencia en el deporte de alto nivel.',
    ]),
    { flush: true },
  ),
  section(
    `<div class="aem-banner aem-brand">
${indent(heading({ title: 'Grado en Ciencias de la Actividad Física y el Deporte' }), 2)}
  <div class="aem-banner__actions"><a class="aem-button aem-button--secondary aem-button--inverse" href="#">Solicita información</a></div>
</div>`,
    { flush: true },
  ),
  section(
    article('', [
      'Durante estos años, el atleta ha mantenido un alto nivel de esfuerzo y compromiso en su carrera dual. Desde muy pequeño tuvo claro que quería estudiar Ciencias de la Actividad Física y del Deporte (CAFyD). Tras completar un ciclo superior, encontró en la metodología virtual de UNIR la vía ideal para compatibilizar entrenamientos, partidos y estudios. “Puedo compaginar el waterpolo con los estudios y sacar adelante la carrera para dedicarme a la profesión que siempre he querido”, comenta.',
    ]),
    { flush: true },
  ),
  section(
    article('Una carrera corta que exige mirar más allá del agua', [
      'La falta de experiencia laboral es otro obstáculo que afrontan los deportistas al finalizar su carrera. “Es una pena no poder tener experiencia profesional durante la carrera deportiva, pero con los horarios que manejamos, buscar un trabajo es muy complicado”, explica. En muchas disciplinas de alto rendimiento, los entrenamientos pueden superar las 25 horas semanales.',
      'Según un estudio realizado por la Universidad Politécnica de Madrid y la Universidad de Castilla-La Mancha, el 51,1 % de los deportistas de élite españoles compaginan estudios y deporte, mientras que solo un 17 % logra combinar su carrera deportiva con un trabajo remunerado. La mayoría, un 31,9 %, se dedica exclusivamente al deporte, lo que agrava su vulnerabilidad al retirarse.',
      'A pesar de estas limitaciones, Alejandro defiende que las competencias adquiridas en el deporte son perfectamente transferibles al mundo laboral. “Creo que los deportistas, al ser capaces de levantarse temprano, hacer dobles sesiones, esforzarse cada día y ser constantes, podemos extrapolar esas cualidades al mundo laboral”, afirma. Estas habilidades blandas —como la resiliencia, la gestión del tiempo o el trabajo en equipo— son cada vez más valoradas por empresas y reclutadores.',
      'La formación académica, en este contexto, no solo actúa como una red de seguridad, sino también como una herramienta de empoderamiento. Así lo confirman expertos en gestión del talento, que destacan el perfil del deportista como altamente adaptable y comprometido.',
    ]),
    { flush: true },
  ),
  section(
    `${article('Entre la piscina y los apuntes', [
      'La rutina del jugador del Club Natación Echeyde está marcada por la exigencia física y la disciplina académica. “Un día normal para mí empieza a las 9:00 de la mañana, cuando voy al gimnasio. Entrenamos de 9:45 hasta la una del mediodía”, explica. Después de esa primera parte, toca desplazarse a la piscina para continuar con la preparación técnica y táctica.',
      'Las tardes no son más ligeras. “Entrenamos desde las 20:00 hasta las 22:00h. En ese intervalo, como, descanso un poco y aprovecho para estudiar o hacer trabajos que tengo que entregar esa semana”, cuenta. Alejandro intenta adelantarse a las semanas más exigentes, especialmente cuando hay competiciones como la Copa del Rey o torneos europeos.',
    ])}
${figure('noticia-piscina')}`,
    { flush: true },
  ),
  section(
    `${article('Un futuro ligado a la docencia y la investigación', [
      'Alejandro Andión tiene claro que su camino no termina con el grado universitario. Su objetivo es convertirse en docente de Educación Física, y para ello ya piensa en los siguientes pasos. “Después de la carrera me gustaría hacer el Máster de Profesorado. También me planteo hacer un doctorado, aunque eso dependerá de la situación en la que me encuentre”.',
      'Más allá de las aulas escolares, Alejandro también contempla la posibilidad de enseñar en la universidad. “También he visto que en la universidad podría dar clases sobre lo que me apasiona, el deporte. Es una opción que me gustaría explorar”, concluye.',
    ])}
${carousel(['noticia-piscina', 'noticia-andion', 'noticia-galeria', 'noticia-piscina'].map((file) => `<figure class="aem-article__figure aem-gallery-slide"><img src="${pageImg(file)}" alt="" loading="lazy" /></figure>`), 'Galería')}`,
    { flush: true },
  ),
  section(
    richText([], [
      'María Martín-Granizo, campeona mundial de surf y de España en esquí: “El estudio me obliga a organizarme y me ayuda a desconectar”',
      'Alberto Paredes, campeón mundial de buceo de competición: “La carrera dual es indispensable para mi proyección profesional”',
      'Irati Etxarri, jugadora de la Liga Endesa: “Algún día el baloncesto se acabará, por eso necesito formarme en otros ámbitos”',
      'Andy Criere, surfista olímpico: “La carrera dual me ha hecho mejor deportista y persona”',
    ]),
    { flush: true, heading: { title: 'Otras entrevistas con estudiantes de UNIR y atletas del PADAN' } },
  ),
  `<div class="aem-section aem-section--flush" style="padding-bottom: 0">${shareBanner('Comparte esta noticia')}</div>`,
  section(carousel([programCard(pageImg('program-generic'), 'Grado en', 'Ciencias de la Actividad Física y del Deporte', ['9 meses', '90 ECTS', '6 mar 2026'])], 'Títulos'), {
    className: 'aem-card-block',
    heading: { title: 'Títulos que te pueden interesar' },
  }),
  section(
    carousel(
      (
        [
          ['rel-epidemia', 'Epidemia: ¿qué es y qué epidemias mundiales ha habido?', 'Una epidemia es la rápida transmisión de una enfermedad en una región, la cual afecta a un gran número de personas. La malaria, el cólera o el ébola son ejemplos de las epidemias mundiales más significativas.', 'Edificio principal de la Organización de los Estados Americanos (OEA) en Washington.'],
          ['rel-albinismo', 'Albinismo: qué es, tipos y qué problemas psicológicos puede conllevar', 'El albinismo es una condición que acompaña de por vida a quien lo padece; por eso es fundamental comprender en qué consiste y qué problemas puede acarrear.', ''],
          ['rel-ensayo', '¿Qué es un ensayo clínico y qué tipos existen?', 'Para un profesional de la salud es fundamental saber qué es un ensayo clínico: definición, tipos, fases, etc., pues se trata de una práctica habitual en el ámbito sanitario.', ''],
        ] as [string, string, string, string][]
      ).map(([file, title, text, caption]) => card({ title, text, caption: caption || undefined, fill: 'empty', image: pageImg(file), mediaHeight: '20rem' })),
      'Noticias relacionadas',
    ),
    { flush: true, className: 'aem-card-block', heading: { title: 'Noticias relacionadas', link: 'Ver todos los artículos' } },
  ),
  ...closing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Noticia',
  parameters: {
    figmaUrl: pagesFigma('2074:201260'),
    order: 7,
    layout: 'fullscreen',
    docs: { description: { component: 'Noticia de la revista: hero de noticia con autor, fecha y compartir, entradilla con foto, cuerpo, banner de titulación, galería, entrevistas relacionadas, compartir, títulos, noticias relacionadas y el formulario lateral.' } },
  },
  render: () => ({
    template: `<div class="aem-page">
${moduleHtml(navigationHeader)}
<div class="aem-page__aside-layout">
<main>
${content.join('\n')}
</main>
<aside aria-label="Solicita información">
${newsFormPanel()}
</aside>
</div>
${moduleHtml(footer)}
</div>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
