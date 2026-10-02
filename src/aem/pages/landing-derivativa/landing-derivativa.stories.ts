import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import {
  card,
  carousel,
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

const alternatives = (
  [
    ['landing-programa', 'Tecnología Educativa y Competencias Digitales'],
    ['landing-propuesta', 'Psicopedagogía'],
    ['landing-programa', 'Educación Inclusiva e Intercultural'],
    ['landing-propuesta', 'Neuropsicología y Educación'],
  ] as [string, string][]
).map(([image, title]) =>
  card({ image: pageImg(image), overlay: '<span class="aem-tag aem-tag--accelerator">Accelerator</span>', pretitle: 'Máster Universitario en', title, tags: ['9 meses', '90 ECTS', 'Oficial'], fill: 'secondary', mediaHeight: '9.875rem' }),
);

const content = [
  landingHero({
    logo: true,
    image: pageImg('landing-hero-producto'),
    title: 'Máster en Formación del Profesorado en Educación Secundaria, Bachillerato y FP combinada',
    text: 'Fórmate con un máster oficial asistiendo a clases online en directo',
    logos: 1,
  }),
  studyPlan([
    'Con el Grado en Derecho de UNIR podrás aprender de manera práctica y prepararte para el ejercicio de las profesiones jurídicas y te abre las puertas a otros puestos especializados en entes públicos o en empresas privadas.',
    'Además, estudiarás con casos prácticos reales impartidos por abogados y socios de Gómez-Acebo &amp; Pombo, de uno de los principales despachos con especialización en todas las áreas del derecho de los negocios y la Administración.',
  ]),
  section(textImageBlock(pageImg('landing-trabajo-1'), false, 'Competencias', '¿Qué aprenderás en este máster?'), { secondary: true }),
  proposal(false),
  section(carousel(alternatives, 'Alternativas'), {
    secondary: true,
    className: 'aem-card-block',
    heading: {
      pretitle: 'Requisitos',
      title: 'Requisitos de acceso para este máster',
      text: 'Esta titulación requiere de algunas titulaciones previas para poder cursarse. Si no es tu caso, no te preocupes, tenemos alternativas para ti:',
    },
  }),
  studentsStat('100', 'de matriculados finalizan este máster'),
  landingTestimonial(),
  landingCalculator(),
  financing(),
  section(textImageBlock(pageImg('landing-trabajo-2'), true, 'Salidas profesionales', '¿Dónde podrás trabajar?')),
  studentsStat('87', 'de nuestros egresados de Psicología está ya trabajando'),
  ...landingClosing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Landing Derivativa',
  parameters: {
    figmaUrl: pagesFigma('3253:14368'),
    order: 23,
    layout: 'fullscreen',
    docs: { description: { component: 'Landing derivativa: como la de producto, con las competencias y los programas alternativos para quien no cumple los requisitos de acceso, junto al formulario lateral.' } },
  },
  render: () => ({ template: landingPage(content, moduleHtml(footer, { showContact: true }), landingForm()) }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
