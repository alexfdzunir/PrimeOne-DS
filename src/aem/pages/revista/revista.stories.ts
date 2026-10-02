import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { card, carousel, closing, grid, hero, MAGAZINE_TABS, moduleHtml, pageImg, pagesFigma, section, speakers, tabsNav } from '../../stories/page-parts';

const news = (items: [string, string, string, string?][], label: string) =>
  carousel(items.map(([file, title, text, caption]) => card({ title, text, caption, fill: 'empty', image: pageImg(file), mediaHeight: '20rem' })), label);

const content = [
  hero({ crumbs: ['Inicio', 'UNIR Revista'], title: 'UNIR Revista', text: 'Conoce la actualidad de UNIR por medio de artículos, eventos y entrevistas.' }),
  tabsNav(MAGAZINE_TABS),
  section(
    news(
      [
        ['actualidad-trabajo-social', 'UNIR acoge a los máximos representantes del ámbito académico para impulsar la Academia de Trabajo Social', 'Los expertos visibilizaron en la Universidad Internacional de La Rioja los avances en esta disciplina y consolidaron los contenidos necesarios para la constitución de la Academia de Trabajo Social.', 'Foto de familia del encuentro.'],
        ['actualidad-fso', 'El MBA de UNIR entre los mejores MBA del mundo, según el Ranking FSO 2025', 'La Universidad Internacional de La Rioja es la primera institución en obtener el reconocimiento con un MBA oficial. El éxito se extiende a toda la red Proeduca, de la que UNIR forma parte.', 'Reconocimientos recibidos por las instituciones de la red Proeduca en el ranking FSO 2025.'],
        ['actualidad-concierto', 'UNIR y la Universidad Villanueva evocaron el espíritu de la tradición vienesa en su I Concierto Universitario de Año Nuevo', 'Más de 2.000 personas celebraron en el Auditorio Nacional de Madrid el bicentenario de Johann Strauss Jr. en un recital que, a imagen de la cita vienesa, busca conectar el legado clásico con las nuevas generaciones.', 'La orquesta y el coro, dirigidos por Ernesto Monsalve.'],
        ['actualidad-arrufat', 'Miguel Arrufat: “En cinco años la IA va a cambiar totalmente la universidad”', 'El promotor de UNIR explicó durante el I Congreso Futuro Iberoamericano los cinco grandes impactos de la IA en la universidad. Su participación estuvo acompañada por la de otros expertos relevantes de la educación superior.', 'Miguel Arrufat: “En cinco años la IA va a cambiar totalmente la universidad”'],
        ['actualidad-yannelys', 'Yannelys Aparicio, catedrática de UNIR, se incorpora a la Academia Norteamericana de la Lengua Española (ANLE)', 'Esta distinción como miembro correspondiente refuerza el compromiso estratégico de la Universidad Internacional de La Rioja con la promoción y el estudio del español en los Estados Unidos.', 'Yannelys Aparicio, en la Academia Ecuatoriana de la Lengua durante el XVII Congreso ASALE en Quito.'],
      ],
      'Últimos artículos',
    ),
    { className: 'aem-card-block', heading: { title: 'Últimos artículos' } },
  ),
  section(
    grid(
      [
        card({
          title: 'Más allá del susto: el cine de terror y la fractura del sueño americano',
          text: 'Este género cinematográfico ya no solo asusta: interpela. En esta sesión exploraremos cómo el formato se ha convertido en un campo de batalla ideológico, influido por movimientos sociales y políticos.',
          fill: 'empty',
          image: pageImg('evento-terror'),
          caption: `${speakers([pageImg('avatar-tello'), pageImg('avatar-tello')])} Lucía Tello y Noelia Gregorio, ponentes del evento`,
          overlay: '<div class="aem-date-tag"><span class="aem-state-tag aem-state-tag--online">Online</span><span class="aem-date-tag__date"><span class="aem-date-tag__day">10</span><span class="aem-date-tag__meta"><span class="aem-date-tag__month">Sep 2025</span><span class="aem-date-tag__time">Horario</span></span></span></div>',
          tags: ['Openclasses', 'Artes'],
        }),
        card({
          title: 'IA y Marketing: la nueva era de la captación inteligente',
          text: 'Referentes del marketing digital analizarán cómo la inteligencia artificial está transformando la captación, personalización y automatización de campañas en esta nueva era.',
          fill: 'empty',
          image: pageImg('evento-ia-marketing'),
          caption: `${speakers([pageImg('avatar-betancort'), pageImg('avatar-pascual'), pageImg('avatar-pascual')])} Cristian Betancort, Jorge Pascual y Victor Catena, ponentes del evento`,
          overlay: '<div class="aem-date-tag"><span class="aem-state-tag aem-state-tag--online">Online</span><span class="aem-date-tag__date"><span class="aem-date-tag__day">10</span><span class="aem-date-tag__meta"><span class="aem-date-tag__month">Sep 2025</span><span class="aem-date-tag__time">Horario</span></span></span></div>',
          tags: ['Openclasses', 'Marketing y comunicación'],
        }),
      ],
      '24rem',
    ),
    { flush: true, heading: { title: 'Agenda', link: 'Ver todos los eventos' } },
  ),
  section(
    news(
      [
        ['revista-boronat', 'Reinventar mi empresa: “El máster me devolvió la ilusión y me ayudó a profesionalizar Avimur”', 'Tras más de 15 años como empresario turístico, Roberto Boronat decidió cursar el Máster Universitario en Comercio Electrónico de UNIR para transformar su agencia de viajes y adaptarla a los nuevos tiempos.'],
        ['revista-ia-docentes', 'La importancia de dominar la inteligencia artificial aplicada para docentes-investigadores', 'La incorporación de sistemas inteligentes en la investigación educativa permite al profesorado optimizar el análisis de datos, anticipar dificultades, personalizar contenidos y liderar proyectos innovadores.'],
        ['revista-colaboracion', 'El poder de la colaboración: “Conectar con el talento en formación nos ha permitido renovar nuestra visión estratégica”', 'Daniel Zaldivar, marketing manager en Omnitec Systems, compañía tecnológica colaboradora con Red Proyectum de UNIR, aprovechó la plataforma de la universidad para aportar a la formación de los futuros profesionales.'],
        ['revista-eclipse', 'El eclipse solar de 2026: ciencia, historia y una cita con el cielo', 'El 12 de agosto de 2026 tendrá lugar un eclipse total de Sol visible en parte desde el norte de España. Un fenómeno poco frecuente que podrá observarse como parcial en el resto del país.', 'Edificio principal de la Organización de los Estados Americanos (OEA) en Washington.'],
      ],
      'Artículos destacados',
    ),
    { flush: true, className: 'aem-card-block', heading: { title: 'Artículos destacados' } },
  ),
  ...closing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Revista',
  parameters: {
    figmaUrl: pagesFigma('2074:168066'),
    order: 5,
    layout: 'fullscreen',
    docs: { description: { component: 'Portada de UNIR Revista: hero, pestañas de áreas, últimos artículos, agenda de eventos con ponentes, artículos destacados, propuesta educativa y vídeos.' } },
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
