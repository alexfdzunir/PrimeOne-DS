import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import { accordion, card, carousel, landingClosing, landingHero, landingPage, moduleHtml, pageImg, pagesFigma, proposal, richText, section, stat } from '../../stories/page-parts';

const programs = (
  [
    ['Administración y Dirección de Empresas Especializadas en Alta Gestión de Recursos Humanos', 'Desarrolla una visión estratégica e integral del entorno empresarial y dirige equipos en organizaciones de cualquier sector.'],
    ['Derecho Digital y Protección de Datos', 'Especialízate en el marco jurídico de la economía digital, la privacidad y la ciberseguridad.'],
    ['Acceso a la Abogacía y la Procura', 'Prepárate para el examen de acceso y ejerce como abogado o procurador con un enfoque práctico.'],
    ['Derecho Penal Económico', 'Domina la responsabilidad penal de las empresas y la prevención de delitos en el ámbito corporativo.'],
  ] as [string, string][]
).map(([title, text]) =>
  card({ image: pageImg('landing-programa'), overlay: '<span class="aem-tag aem-tag--accelerator">Accelerator</span>', pretitle: 'Máster en', title, text, tags: ['9 meses', '90 ECTS'], fill: 'secondary', mediaHeight: '9.875rem' }),
);

const list = (intro: string, items: string[]) => richText([intro], items);
const studies = accordion(
  [
    ['Grados', '#0', 'Oficial'],
    ['Másteres', '#1', 'Oficial'],
    ['Títulos propios', '#2'],
  ],
  true,
)
  .replace('<p>#0</p>', list('Grados oficiales del área jurídica, adaptados al Espacio Europeo de Educación Superior:', ['Grado en Derecho', 'Grado en Criminología', 'Grado en Relaciones Laborales y Recursos Humanos', 'Grado en Ciencias Políticas', 'Doble Grado en Derecho y Ciencias Políticas', 'Doble Grado en Derecho y Criminología']))
  .replace('<p>#1</p>', list('Másteres universitarios con validez oficial en España y en el Espacio Europeo:', ['Máster en Acceso a la Abogacía y la Procura', 'Máster en Derecho Digital', 'Máster en Asesoría Jurídica de Empresas', 'Máster en Compliance']))
  .replace('<p>#2</p>', list('Títulos propios para especializarte en un área concreta del derecho:', ['Experto Universitario en Derecho Inmobiliario', 'Experto Universitario en Mediación', 'Curso de Protección de Datos']));

const content = [
  landingHero({ title: 'Grado o Máster Oficial en el Área Jurídica', text: 'Fórmate con un máster oficial asistiendo a clases online en directo' }),
  section(carousel(programs, 'Títulos más demandados'), { className: 'aem-card-block', heading: { title: 'Títulos más demandados' } }),
  section(studies, { secondary: true, className: 'aem-accordion-block', heading: { title: 'Grados' } }),
  proposal(false),
  stat({ pretitle: 'Estudiantes', title: 'Más de 249.000 estudiantes como tú ya lo han logrado', text: 'Nuestro compromiso es tu éxito. Nos ajustamos a tus necesidades para ayudarte a alcanzar tus metas.' }, '100', '%', 'de matriculados finalizan este máster'),
  ...landingClosing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Landing Distributiva',
  parameters: {
    figmaUrl: pagesFigma('3202:12463'),
    order: 20,
    layout: 'fullscreen',
    docs: { description: { component: 'Landing distributiva de un área: hero de marca, carrusel de títulos más demandados, acordeón por tipo de estudio, propuesta educativa, cifra, reconocimientos y universidad oficial, con el pie de landing.' } },
  },
  render: () => ({ template: landingPage(content, moduleHtml(footer, { showContact: true })) }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
