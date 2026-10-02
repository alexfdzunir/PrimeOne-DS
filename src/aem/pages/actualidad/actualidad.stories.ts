import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { heading, indent } from '../../stories/helpers';
import { card, carousel, closing, eventCard, grid, hero, moduleHtml, NEWS_TABS, pageImg, pagesFigma, richText, section, tabsNav } from '../../stories/page-parts';

const news = (items: [string, string, string, string][], label: string) =>
  carousel(items.map(([file, caption, title, text]) => card({ title, text, caption, fill: 'empty', image: pageImg(file), mediaHeight: '20rem' })), label);

const content = [
  hero({ crumbs: ['Inicio', 'Actualidad'], title: 'Actualidad' }),
  tabsNav(NEWS_TABS),
  section(
    news(
      [
        ['act-ecuador', 'En el mercado laboral ecuatoriano actual el desafío ya no es “formar más”, sino formar mejor.', 'Saber y hacer: el criterio que guía la contratación en Ecuador', 'Las competencias técnicas y prácticas pueden influir tanto como un título -e incluso superarlo- a la hora de acceder a un empleo o mejorar la remuneración. UNIR integra ambos componentes.'],
        ['act-summit', 'Expertos internacionales debatieron sobre liderazgo ético, innovación y tendencias emergentes en dirección organizacional.', 'Summit Empresarial 4.0 reúne a líderes para definir el futuro de la inteligencia artificial en Ecuador', 'UNIR, junto a Nestlé, Banco del Austro y Netlife, organizó en Quito el SUMMIT Empresarial 4.0, un encuentro que reunió a expertos internacionales y a más de 270 empresarios y directivos.'],
        ['act-odio', 'El odio misógino se sitúa como uno de los más prevalentes en el ecosistema informativo español.', 'El 9% del odio en comentarios de noticias digitales se dirige contra las mujeres', 'El Monitor de Odio del grupo de investigación Hatemedia de UNIR identifica la misoginia como una de las categorías más hostiles, con una presencia predominante de insultos y amenazas.'],
        ['act-salieri', 'Ernesto Rodríguez-Monsalve durante un concierto.', 'Más de dos siglos después, ‘La bella selvaggia’ de Salieri cobra vida en Viena gracias al director español Ernesto Rodríguez-Monsalve', 'El Instituto Cervantes de Viena presentó el proyecto internacional liderado por el director de proyectos musicales y artísticos de la Universidad Internacional de La Rioja.'],
        ['act-consejos', 'En el centro, el director ejecutivo de UNIR y secretario de su Consejo Social, Javier Galiana, en la jornada.', 'UNIR participa en la Jornada de Secretarios de la Conferencia de Consejos Sociales de Universidades Españolas', 'El director ejecutivo de UNIR y secretario de su Consejo Social, Javier Galiana, destacó "el compromiso que deben asumir las universidades en los territorios donde están asentadas".'],
      ],
      'Últimas noticias',
    ),
    { className: 'aem-card-block', heading: { title: 'Últimas noticias' } },
  ),
  section(
    news(
      [
        ['dest-the', 'THE publica clasificaciones internacionales en educación desde el 2001.', 'Times Higher Education sitúa a UNIR como la primera universidad virtual en contribuir a los ODS \'educación de calidad\' e \'igualdad de género\'', 'La clasificación \'Impact Rankings\' reconoce aquellas universidades que contribuyen con los Objetivos de Desarrollo Sostenible.'],
        ['dest-uranking', 'UNIR también destaca por encima de la media en el indicador de Inserción laboral.', 'La Universidad Internacional de La Rioja, primera universidad en línea en docencia, según el U-Ranking', 'UNIR es la primera universidad menor de 15 años que clasifica en el ranking, destacando específicamente en los factores de docencia e inserción laboral.'],
        ['dest-foro-ia', 'Jorge Torres, director de la Escuela de Superior de Ingeniería y Tecnología de UNIR, moderó el evento.', 'Foro UNIR: la IA se apodera de la creatividad y transforma las empresas', 'El evento de UNIR analizó la irrupción de la inteligencia artificial en las ciencias del comportamiento, con tres expertas que dejaron conclusiones valiosas.'],
        ['dest-maestros', 'Gracias a este programa, los estudiantes terminarán el Grado con una preparación específica para superar las oposiciones.', 'UNIR y Escuela de Maestros ofrecen un Programa Universitario para preparar las oposiciones de Primaria', 'A partir del tercer curso, los estudiantes del Grado de Maestro en Educación Primaria de UNIR podrán acceder a esta formación.'],
        ['dest-unesco', 'Daniel Burgos, director de la Cátedra UNESCO.', 'UNIR lanza la nueva Red de Educación Abierta UNOE de la UNESCO como socio fundador', 'UNIR, a través de su Cátedra UNESCO en eLearning, es la única universidad española que forma parte fundacional de esta red.'],
      ],
      'Noticias destacadas',
    ),
    { flush: true, className: 'aem-card-block', heading: { title: 'Noticias destacadas' } },
  ),
  section(
    grid(
      [
        eventCard(pageImg('agenda-bienestar'), { day: '10', month: 'Sep 2025', year: 'Horario' }, 'La promoción del bienestar emocional en docentes de universidades online', 'Bajo el apoyo del Vicerrectorado de Transferencia, daremos a conocer los resultados del proyecto “Profesores resilientes y universidades saludables”, una iniciativa orientada a promover el bienestar emocional del profesorado.', ['Seminarios', 'Educación']),
        eventCard(pageImg('agenda-dificultades'), { day: '10', month: 'Sep 2025', year: 'Horario' }, 'Dificultades de aprendizaje: detección temprana y estrategias de intervención en el aula', 'En este Foro repasaremos estrategias de intervención que los docentes pueden aplicar en el aula para favorecer la detección temprana, la personalización de aprendizaje y el desarrollo de entornos educativos más accesibles.', ['Openclasses', 'Educación']),
      ],
      '24rem',
    ),
    { flush: true, heading: { title: 'Agenda', link: 'Ver todos los eventos' } },
  ),
  section(
    `<div class="aem-banner aem-banner--content">
${indent(heading({ pretitle: 'Pretitle (opcional)', title: 'Comprometidos con una sociedad mejor', text: 'En UNIR lideramos proyectos de acción social y cultural, y contamos con publicaciones que promueven el conocimiento y la investigación' }), 2)}
${indent(richText([], ['Campus Solidario', 'Supercuidadores', 'Clínica Jurídica', 'UNIR Editorial', 'Nueva revista']), 2)}
</div>`,
    { flush: true },
  ),
  ...closing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Actualidad',
  parameters: {
    figmaUrl: pagesFigma('2098:255378'),
    order: 8,
    layout: 'fullscreen',
    docs: { description: { component: 'Portada de actualidad: hero, pestañas de categorías, últimas noticias, noticias destacadas, agenda, banner de compromiso social, propuesta educativa y vídeos.' } },
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
