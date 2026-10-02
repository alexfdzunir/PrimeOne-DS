import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { card, closing, grid, hero, MAGAZINE_TABS, moduleHtml, newsletter, pageImg, pagesFigma, pagination, section, tabsNav } from '../../stories/page-parts';

const ARTICLES: [string, string, string, string][] = [
  ['cat-dificultades', 'Ana Gugel, con Alexia Antorán Pilar, psicóloga en el Centro Neuropsipe.', 'Cuando detectar a tiempo las dificultades de aprendizaje transforma el aula y cambia el futuro del alumnado', 'El Monitor de Odio del grupo de investigación Hatemedia de UNIR identifica la misoginia como una de las categorías más hostiles, con una presencia predominante de insultos.'],
  ['cat-coeficiente', 'El concepto de coeficiente intelectual tiene su origen a comienzos del siglo XX.', '¿Qué es el coeficiente intelectual y cómo se calcula?', 'El director ejecutivo de UNIR y secretario de su Consejo Social, Javier Galiana, que participó en el encuentro celebrado en la Universidad de La Rioja, destacó "el compromiso" de la universidad.'],
  ['cat-examen-oral', 'Un examen oral requiere un enfoque diferente al de las pruebas escritas.', '¿Cómo preparar un examen oral? Consejos y trucos', 'UNIR contará con una beca destinada a premiar el mérito académico y la participación en la vida universitaria. Será otorgada al estudiante que cumpla con todos los requisitos.'],
  ['cat-solera', 'Ana Gugel, presentadora del Foro UNIR, con la especialista.', 'Elena Solera, escritora: “Ya no podemos limitar el aula a explicar contenidos, tenemos que enseñar a pensar”', 'UNIR reúne los testimonios de personas afectadas y las opiniones de expertos sanitarios e investigadores, quienes explican las distintas fases del proceso de dependencia.'],
  ['cat-oposiciones', 'Cada oposición cuenta con sus requisitos particulares.', 'Oposiciones 2026: todo lo que debes saber', 'UNIR, centro formador oficial de SAP, podrá impartir programas homologados con certificaciones oficiales en áreas claves, reforzando la empleabilidad en un sector que necesita profesionales.'],
  ['cat-inclusion', 'Cristina de la Peña Álvarez, coordinadora académica de la Mención en Pedagogía Terapéutica de UNIR', 'Cómo convertir la inclusión en una práctica diaria para garantizar la diversidad en las aulas', 'La cifra de estudiantes con necesidades especiales no deja de crecer en España. Cristina de la Peña, coordinadora de la Mención en Pedagogía Terapéutica de UNIR, explica cómo atenderlos.'],
  ['cat-gallego', 'Ana Gugel, presentadora del Foro UNIR, junto a la doctora en Educación y docente de UNIR.', 'Carmen Gallego: “El bienestar no es un extra, es la base del aprendizaje”', 'En la última edición del Foro UNIR, la docente de la universidad y expertas en educación emocional analizaron cómo integrar el bienestar en las aulas y responder a las nuevas necesidades.'],
  ['cat-lengua', 'El primer paso para ser docente de Lengua y Literatura es contar con un grado o licenciatura.', '¿Cómo ser profesor de Lengua y Literatura?', 'Sentir pasión por la lengua española y la literatura, así como una gran vocación docente, son los requisitos indispensables para convertirse en docente de Lengua y Literatura.'],
];

const content = [
  hero({ crumbs: ['Inicio', 'Revista - Noticias', 'Educación'], title: 'Artículos de Educación', text: 'Conoce toda nuestra oferta de estudios en educación. ¡Descubre el programa perfecto para ti!' }),
  tabsNav(MAGAZINE_TABS).replace('aria-selected="true" tabindex="0">Portada', 'aria-selected="false" tabindex="-1">Portada').replace('aria-selected="false" tabindex="-1">Educación', 'aria-selected="true" tabindex="0">Educación'),
  section(`${grid(ARTICLES.map(([file, caption, title, text]) => card({ title, text, caption, fill: 'empty', image: pageImg(file), mediaHeight: '20rem' })), '16rem')}\n${pagination(1, 20)}`),
  section(newsletter('Suscríbete a nuestra newsletter', 'Mantente al día en todo lo relativo a Educación.'), { flush: true }),
  ...closing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Revista Categoría',
  parameters: {
    figmaUrl: pagesFigma('2074:187688'),
    order: 6,
    layout: 'fullscreen',
    docs: { description: { component: 'Categoría de UNIR Revista (Educación): hero, pestañas, rejilla de artículos con paginación, newsletter, propuesta educativa y vídeos.' } },
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
