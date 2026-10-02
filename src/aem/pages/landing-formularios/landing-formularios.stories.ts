import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import { icon } from '../../stories/helpers';
import { formEnd, formField, formPhone, formSelect, landingForm, landingHero, landingPage, modalPreview, moduleHtml, pageImg, pagesFigma, studyPlan } from '../../stories/page-parts';

type Form = 'lateral' | 'solicitud' | 'descarga' | 'llamada';

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
];

const MODALS: Record<Exclude<Form, 'lateral'>, () => string> = {
  solicitud: () =>
    modalPreview(
      'Solicita información',
      `<div class="aem-form-module">
  <div>
    <p>Rellena el siguiente formulario y uno de nuestros asesores se pondrá en contacto contigo en las próximas 24 horas. O si lo prefieres:</p>
    <ul class="aem-form-module__contacts">
      <li><a class="aem-link-button" href="#">${icon('phone')} (+34) 941 209 743</a></li>
      <li><a class="aem-link-button" href="#">${icon('headset')} ¿Te llamamos?</a></li>
      <li><a class="aem-link-button" href="#">${icon('whatsapp-logo')} (+34) 941 209 743</a></li>
    </ul>
    <p>De lunes a viernes 9:00-18:00h</p>
  </div>
  <form class="aem-form" action="#">
    ${formSelect('Tipo de estudios')}
    ${formSelect('Área de estudios', '', { disabled: true })}
    ${formSelect('Título que te interesa', '', { full: true, disabled: true })}
    ${formField('Nombre')}
    ${formField('Apellidos')}
    ${formSelect('País', 'España')}
    ${formField('Código postal')}
    ${formField('Email', 'email')}
    ${formPhone()}
    ${formSelect('Nivel de estudios', '', { full: true })}
${formEnd('Solicita información')}
  </form>
</div>`,
    ),
  descarga: () =>
    modalPreview(
      'Descarga gratis el plan de estudios y solicita información',
      `<p>Completa el formulario y un asesor te contactará para informarte.</p>
<form class="aem-form" action="#">
  ${formField('Nombre')}
  ${formField('Apellidos')}
  ${formSelect('País', 'España')}
  ${formField('Código postal')}
  ${formSelect('Nivel de estudios')}
  ${formPhone()}
  ${formField('Email', 'email', true)}
${formEnd('Descargar plan de estudios y solicitar información')}
</form>`,
    ),
  llamada: () =>
    modalPreview(
      'Llama ahora',
      `<div class="aem-modal__call">
  <p>y un asesor te informará sin compromiso</p>
  <a class="aem-link-button" href="tel:+34941209743">${icon('phone')} +34 941 209 743</a>
  <p>o si prefieres</p>
  <a class="aem-button aem-button--secondary" href="#">¿Te llamamos?</a>
</div>`,
      { size: 'sm', centered: true },
    ),
};

const meta: Meta = {
  title: 'AEM/Pages/Landing Formularios',
  parameters: {
    figmaUrl: pagesFigma('3260:19452'),
    order: 25,
    storyOrder: ['Default', 'Solicitud', 'Descarga', 'Llamada'],
    layout: 'fullscreen',
    docs: { description: { component: 'Formularios de las landings: el lateral de la ficha y los modales de solicitud de información, descarga del plan de estudios y llamada.' } },
  },
  args: { form: 'lateral' },
  render: (args) => {
    const form = args['form'] as Form;
    const page = landingPage(content, moduleHtml(footer, { showContact: true }), landingForm());
    return { template: form === 'lateral' ? page : page.replace(/<\/div>\s*$/, `${MODALS[form]()}\n</div>`) };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = { name: 'Lateral' };
export const Solicitud: Story = { name: 'Solicita información', args: { form: 'solicitud' } };
export const Descarga: Story = { name: 'Descarga', args: { form: 'descarga' } };
export const Llamada: Story = { name: 'Llama ahora', args: { form: 'llamada' } };
