import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import {
  accordion,
  financing,
  landingCalculator,
  landingClosing,
  landingForm,
  landingHero,
  landingPage,
  landingTestimonial,
  moduleHtml,
  pageImg,
  pagesFigma,
  proposal,
  section,
  studentsStat,
  studyPlan,
  textImageBlock,
} from '../../stories/page-parts';

const specialties = accordion(
  ['Humanidades', 'Ciencias Sociales y Jurídicas', 'Técnicas', 'Expresión artística', 'Ciencias de la Salud'].map((t) => [t, 'Accede desde tu Campus online a clases en directo o en diferido, foros y recursos y examínate de forma online o presencial.'] as [string, string]),
  true,
).replace(/(<\/p>\n    <\/div>)/, '</p>\n      <a class="aem-button" href="#">Solicita información</a>\n    </div>');

const content = [
  landingHero({
    logo: true,
    image: pageImg('landing-hero-producto'),
    pretitle: 'Máster Universitario',
    title: 'Máster en Formación del Profesorado en Educación Secundaria, Bachillerato y FP combinada',
    text: 'Fórmate con un máster oficial asistiendo a clases online en directo',
    logos: 3,
  }),
  studyPlan([
    'Con el Grado en Derecho de UNIR podrás aprender de manera práctica y prepararte para el ejercicio de las profesiones jurídicas y te abre las puertas a otros puestos especializados en entes públicos o en empresas privadas.',
    'Además, estudiarás con casos prácticos reales impartidos por abogados y socios de Gómez-Acebo &amp; Pombo, de uno de los principales despachos con especialización en todas las áreas del derecho de los negocios y la Administración.',
  ]),
  section(textImageBlock(pageImg('landing-trabajo-1'), false, 'Salidas profesionales', '¿Dónde podrás trabajar?'), { secondary: true }),
  section(specialties, { className: 'aem-accordion-block', heading: { pretitle: 'Especialidades', title: 'Elige la especialidad que mejor se adapta a tu perfil' } }),
  proposal(),
  studentsStat('100', 'de matriculados finalizan este máster'),
  landingTestimonial(),
  landingCalculator(),
  financing(),
  section(textImageBlock(pageImg('landing-trabajo-2'), true, 'Salidas profesionales', '¿Dónde podrás trabajar?')),
  studentsStat('87', 'de nuestros egresados de Psicología está ya trabajando'),
  ...landingClosing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Landing Producto',
  parameters: {
    figmaUrl: pagesFigma('3178:11473'),
    order: 21,
    layout: 'fullscreen',
    docs: { description: { component: 'Landing de producto: hero con foto y logo, plan de estudios, salidas, especialidades, propuesta educativa, cifras, testimonio, calculadora de convalidaciones, financiación, reconocimientos y universidad oficial, con el formulario lateral y el pie de landing.' } },
  },
  render: () => ({ template: landingPage(content, moduleHtml(footer, { showContact: true }), landingForm()) }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
