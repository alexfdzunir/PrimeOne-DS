import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import { icon } from '../../stories/helpers';
import { accordion, card, carousel, formPanel, landingHero, landingPage, moduleHtml, pageImg, pagesFigma, richText, section, shareBanner, textImageBlock } from '../../stories/page-parts';

type State = 'pre' | 'durante' | 'post';

const INTRO = 'Te invitamos a un evento en el que profesionales de los centros colaboradores, como el Centro HARA, Valores, entre otros, darán a conocer las experiencias relacionadas con la innovación que se están desarrollando en sus entidades, desde una perspectiva aplicada al ámbito de la Psicología y la Salud. Este evento anual está organizado desde el Área de Prácticas del Máster Universitario en Psicología General Sanitaria de UNIR.';
const TOPICS = [
  'Experiencias de innovación en los centros de prácticas',
  'El papel del psicólogo sanitario en equipos multidisciplinares',
  'Nuevas herramientas digitales para la intervención clínica',
  'Retos éticos y jurídicos de la práctica profesional',
];
const AGENDA: [string, string][] = [
  ['16:00 - Bienvenida e inauguración', 'Presentación del encuentro a cargo de la dirección del Máster Universitario en Psicología General Sanitaria.'],
  ['16:15 - Innovación en la práctica clínica', 'Experiencias de los centros colaboradores en la aplicación de nuevas terapias.'],
  ['16:45 - Mesa redonda', 'Profesionales de los centros debaten sobre los retos de la profesión.'],
  ['17:30 - Pausa', 'Descanso y networking entre asistentes.'],
  ['17:45 - Casos prácticos', 'Presentación de casos reales por parte de los tutores de prácticas.'],
  ['18:30 - Preguntas del público', 'Turno abierto de preguntas presenciales y online.'],
  ['19:00 - Clausura', 'Conclusiones y cierre del encuentro.'],
];

const bar = (state: State) =>
  `<div class="aem-event-bar">\n${shareBanner(state === 'post' ? 'Martes, 18 marzo 2025 · Online' : 'Martes, 18 mar 2025 / 16:00 (GMT+1) · Madrid · Presencial y online<br />Sede UNIR. Calle Zurbano, 73. 28010')}\n</div>`;

const speakers = section(
  `<ul class="aem-speakers">
${Array.from({ length: 6 }, () => `  <li><span class="aem-placeholder">${icon('image')}</span><h3>José Manuel Sanz</h3><p>Director de Psicología General Aplicada - Centro HARA</p></li>`).join('\n')}
</ul>`,
  { className: 'aem-section--accent', heading: { title: 'Conoce a los ponentes' } },
);

const product = (pretitle: string, title: string, tags: string[]) =>
  card({ image: pageImg('landing-propuesta'), overlay: '<span class="aem-tag aem-tag--accelerator">Accelerator</span>', pretitle, title, tags, fill: 'secondary', mediaHeight: '9.875rem' });
const MUPES = 'Formación del Profesorado de Educación Secundaria Obligatoria y Bachillerato, Formación Profesional y Enseñanzas de Idiomas';

function content(state: State): string[] {
  const hero = landingHero({
    logo: true,
    image: pageImg('landing-hero-producto'),
    title: state === 'durante' ? 'Fundamentos clínicos en psicoterapia: desafíos jurídicos, éticos y clínicos' : 'V Encuentro de centros de prácticas MUPGS',
    text: 'Openclass',
    logos: 3,
  });
  if (state === 'post') {
    return [
      hero,
      bar(state),
      section(
        textImageBlock(pageImg('landing-trabajo-1'), false, '', '¿Qué vimos en el evento?').replace(
          /<div class="aem-rich-text">[\s\S]*?<\/div>/,
          richText(['Un evento en el que profesionales de los centros colaboradores, como el Centro HARA, Valores, entre otros, dieron a conocer las experiencias relacionadas con la innovación que se están desarrollando en sus entidades, desde una perspectiva aplicada al ámbito de la Psicología y la Salud. Este evento anual está organizado desde el Área de Prácticas del Máster Universitario en Psicología General Sanitaria de UNIR.']),
        ),
      ),
      section(
        carousel(
          Array.from({ length: 5 }, () =>
            card({ title: 'Nuevos modelos de aprendizaje en la universidad pública: valor añadido de la presencialidad', text: 'Times Higher Education analiza 13 indicadores clave de 1.800 universidades y pone en valor nuestro espíritu internacional.', fill: 'image', image: pageImg('landing-propuesta'), play: true, mediaHeight: '28.3125rem' }),
          ),
          'Momentos destacados',
        ),
        { secondary: true, className: 'aem-card-block', heading: { title: 'Momentos destacados' } },
      ),
      section(
        `<ul class="aem-grid" style="--aem-grid-min: 16rem">
${[product('Máster Universitario en', 'Tecnología Educativa y Competencias Digitales', ['9 meses', '90 ECTS', 'Oficial']), product('Máster Universitario en', MUPES, ['1 curso', '60 ECTS', 'Oficial']), product('Máster Universitario en', 'Psicología General Sanitaria', ['2 cursos', '90 ECTS', 'Oficial'])].map((c) => `  <li>\n${c}\n  </li>`).join('\n')}
</ul>`,
        { className: 'aem-card-block', heading: { title: 'Titulaciones relacionadas' } },
      ),
      section(carousel(['Psicopedagogía', 'Neuropsicología y Educación', 'Educación Inclusiva', 'Psicología de la Educación', 'Orientación Educativa'].map((t) => product('Máster Universitario en', t, ['1 curso', '60 ECTS', 'Oficial'])), 'Te puede interesar'), {
        secondary: true,
        className: 'aem-card-block',
        heading: { title: 'Te puede interesar también' },
      }),
    ];
  }
  return [
    hero,
    bar(state),
    section(richText([INTRO]), { heading: { title: 'Introducción' } }),
    section(richText([], TOPICS), { secondary: true, heading: { title: state === 'durante' ? '¿De qué hablaremos?' : '¿Qué aprenderás?' } }),
    speakers,
    section(accordion(AGENDA.map(([t, x], i) => [t, x, i === 0 ? 'Presencial' : undefined]), state === 'durante'), { className: 'aem-accordion-block', heading: { title: 'Programa' } }),
  ];
}

const aside = formPanel([
  ['calendar-blank', '24/05/2025'],
  ['clock', 'Inscríbete ahora'],
  ['lightning', 'Plazas limitadas', true],
]).replace('<h2 class="aem-form-panel__title">Solicita información</h2>', '<h2 class="aem-form-panel__title">Regístrate para asistir</h2>');

const meta: Meta = {
  title: 'AEM/Pages/Landing Eventos',
  parameters: {
    figmaUrl: pagesFigma('3254:17498'),
    order: 24,
    storyOrder: ['Default', 'Durante', 'Despues'],
    layout: 'fullscreen',
    docs: { description: { component: 'Landing de un evento en sus tres momentos: antes (con el formulario de registro), durante (programa abierto) y después (resumen, momentos destacados y titulaciones relacionadas).' } },
  },
  args: { state: 'pre' },
  render: (args) => {
    const state = args['state'] as State;
    return { template: landingPage(content(state), moduleHtml(footer, { showContact: true }), state === 'pre' ? aside : undefined) };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = { name: 'Antes' };
export const Durante: Story = { name: 'Durante', args: { state: 'durante' } };
export const Despues: Story = { name: 'Después', args: { state: 'post' } };
