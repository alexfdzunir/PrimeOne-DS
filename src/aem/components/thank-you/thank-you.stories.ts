import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, icon } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Modules/Thank You',
  parameters: {
    figmaUrl: figmaNode('11544:27137'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Página de agradecimiento tras un formulario: migas, título, texto, vías de contacto e imagen (`aem-thank-you`).' } },
  },
  args: { title: '¡Gracias por tu interés!', text: 'Hemos recibido tu solicitud. Un asesor se pondrá en contacto contigo en las próximas 24 horas para resolver tus dudas.' },
  argTypes: { title: { control: 'text' }, text: { control: 'text' } },
  render: (args) => ({
    template: `<section class="aem-section">
  <div class="aem-section__inner aem-thank-you">
    <div class="aem-thank-you__content">
      <nav class="aem-breadcrumb aem-breadcrumb--sm" aria-label="Migas de pan">
        <ol class="aem-breadcrumb__list">
          <li class="aem-breadcrumb__item"><a class="aem-breadcrumb__link" href="#">Inicio</a></li>
          <li class="aem-breadcrumb__item"><span aria-current="page">Solicitud enviada</span></li>
        </ol>
      </nav>
      <h1 class="aem-thank-you__title">${args['title']}</h1>
      <p class="aem-thank-you__text">${args['text']}</p>
      <ul class="aem-thank-you__contacts">
        <li><a class="aem-link-button" href="#">${icon('phone')} +34 941 209 743</a></li>
        <li><a class="aem-link-button" href="#">${icon('whatsapp-logo')} WhatsApp</a></li>
      </ul>
      <a class="aem-button aem-button--outlined" href="#">Volver al inicio</a>
    </div>
    <div class="aem-thank-you__media"><span class="aem-placeholder">${icon('image')}</span></div>
  </div>
</section>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
