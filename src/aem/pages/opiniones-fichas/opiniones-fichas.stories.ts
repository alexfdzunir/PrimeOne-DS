import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { closing, formPanel, hero, moduleHtml, pagesFigma, reviews, section } from '../../stories/page-parts';

const TITLE = 'Formación del Profesorado de Educación Secundaria Obligatoria y Bachillerato, Formación Profesional y Enseñanzas de Idiomas';

const content = [
  hero({ crumbs: ['Inicio', 'Educación', TITLE, 'Opiniones'], title: `Opiniones del Máster Universitario en ${TITLE}` }),
  section(
    reviews('Valoración media de 63 valoraciones', '*Opiniones recogidas por UNIR a través de encuestas de satisfacción', [
      ['La experiencia ha sido muy positiva', 'Maria Domenech Sotelo'],
      ['Lo que más he valorado de la titulación que he cursado en UNIR es la flexibilidad que permite poder compaginar trabajo y estudios, además de otras cuestiones como la calidad de los docentes, las sesiones informativas sobre todas las cuestiones del máster, etc.', 'Alan Peries Castaño'],
      ['Mi experiencia en UNIR ha sido muy buena. El temario actual, acceso a mucha bibliografía, profesorado con experiencia en Secundaria, buen funcionamiento de la plataforma y un tutor pendiente de tu progreso y necesidades.', 'María Fernández Arnejo'],
      ['Me ha encantado poder tener la oportunidad y la facilidad de compaginar mi trabajo con mi formación y siempre a mi ritmo.', 'José Antonio Podadera Jiménez'],
    ]),
    {
      heading: {
        text: 'Los alumnos que han finalizado el Máster en Formación del Profesorado de Educación, Secundaria, Bachillerato, FP e Idiomas comparten sus opiniones, que hemos recogido a través de encuestas de satisfacción. Valoran del 1 al 5 la calidad académica y del profesorado, el material didáctico, el plan de estudios o la labor de los tutores. Destacan la metodología online de UNIR, que les ha permitido compaginar los estudios con el trabajo y comenzar a desarrollar su labor profesional en ámbitos de enseñanza.',
      },
    },
  ),
  ...closing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Opiniones Fichas',
  parameters: {
    figmaUrl: pagesFigma('2107:75897'),
    order: 16,
    layout: 'fullscreen',
    docs: { description: { component: 'Opiniones de una titulación: hero, valoración media y opiniones, propuesta educativa, vídeos y formulario lateral.' } },
  },
  render: () => ({
    template: `<div class="aem-page">
${moduleHtml(navigationHeader)}
<div class="aem-page__aside-layout">
<main>
${content.join('\n')}
</main>
<aside aria-label="Solicita información">
${formPanel([
  ['calendar-blank', 'Abierta próxima convocatoria'],
  ['clock', 'Hasta 40% de descuento hasta el 15 de abril'],
  ['lightning', 'Plazas limitadas', true],
])}
</aside>
</div>
${moduleHtml(footer)}
</div>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
