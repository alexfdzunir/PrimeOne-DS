import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { card, closing, grid, hero, moduleHtml, NEWS_TABS, pageImg, pagesFigma, pagination, section, tabsNav } from '../../stories/page-parts';

const ARTICLES: [string, string, string, string][] = [
  ['vida-odio', 'Elías Said, Julio Montero y Almudena Ruiz, miembros del grupo Hatemedia.', 'El 9% del odio en comentarios de noticias digitales se dirige contra las mujeres', 'El Monitor de Odio del grupo de investigación Hatemedia de UNIR identifica la misoginia como una de las categorías más hostiles, con una presencia predominante de insultos y amenazas.'],
  ['vida-consejos', 'En el centro, el director ejecutivo de UNIR y secretario de su Consejo Social, Javier Galiana, en la jornada.', 'UNIR participa en la Jornada de Secretarios de la Conferencia de Consejos Sociales de Universidades Españolas', 'El director ejecutivo de UNIR y secretario de su Consejo Social, Javier Galiana, destacó "el compromiso que deben asumir las universidades en los territorios donde están asentadas".'],
  ['vida-beca', 'La convocatoria estará abierta desde el 3 de febrero hasta el 7 de mayo de 2026 y está dirigida a estudiantes que residen en España.', 'UNIR reconoce el talento universitario en una nueva convocatoria de la ‘Beca Santander Excelencia 360º’', 'UNIR contará con una beca destinada a premiar el mérito académico y la participación en la vida universitaria.'],
  ['vida-documental', 'Producción financiada por el Ministerio de Consumo y dirigida por Gemma Mestre-Bach, de UNIR.', '‘Bajo Control’, el documental que analiza el grave problema de la adicción al juego entre los jóvenes', 'UNIR reúne los testimonios de personas afectadas y las opiniones de expertos sanitarios e investigadores, quienes explican las distintas fases del proceso de dependencia.'],
  ['vida-sap', 'Representantes de UNIR y SAP durante la firma del convenio.', 'UNIR y SAP se alían para formar profesionales en una de las tecnologías más demandadas del mercado', 'UNIR, centro formador oficial de SAP, podrá impartir programas homologados con certificaciones oficiales en áreas claves, reforzando la empleabilidad.'],
  ['vida-amcho', 'Leonor Fernández, de AMCHO, y Andrés Pascual, de UNIR, con el ganador.', 'Andrés Henao Salazar, ganador del premio al mejor Chief Happiness Officer de España y Latinoamérica', 'La primera edición de este galardón, impulsado por UNIR y AMCHO, reconoce al psicólogo colombiano y especialista en recursos humanos.'],
  ['vida-salud-mental', 'La especialización periodística y la gestión de la confianza con las fuentes son determinantes.', 'El enfoque humano en las noticias sobre salud mental reduce el estigma social, según una investigación de UNIR', 'El estudio analiza el tratamiento informativo de los trastornos mentales en España y propone recomendaciones para los medios.'],
  ['vida-bienestar', 'Fermín Torrano, investigador principal del proyecto.', 'UNIR crea un programa pionero para reforzar el bienestar emocional del profesorado universitario en la era digital', 'Esta investigación, financiada por el Vicerrectorado de Transferencia, busca ayudar a las universidades a avanzar en su compromiso con la salud mental.'],
];

const content = [
  hero({ crumbs: ['Inicio', 'Noticias', 'Vida académica'], title: 'Artículos de Vida Académica' }),
  tabsNav(NEWS_TABS).replace('aria-selected="true" tabindex="0">Toda la actualidad', 'aria-selected="false" tabindex="-1">Toda la actualidad').replace('aria-selected="false" tabindex="-1">Vida Académica', 'aria-selected="true" tabindex="0">Vida Académica'),
  section(`${grid(ARTICLES.map(([file, caption, title, text]) => card({ title, text, caption, fill: 'empty', image: pageImg(file), mediaHeight: '20rem' })), '16rem')}\n${pagination(1, 20)}`),
  ...closing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Actualidad Categoría',
  parameters: {
    figmaUrl: pagesFigma('2098:272669'),
    order: 9,
    layout: 'fullscreen',
    docs: { description: { component: 'Categoría de actualidad (Vida académica): hero, pestañas, rejilla de noticias con paginación, propuesta educativa y vídeos.' } },
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
