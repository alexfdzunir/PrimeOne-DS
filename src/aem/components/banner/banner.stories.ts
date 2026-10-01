import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode, heading, icon } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Modules/Banner',
  parameters: {
    figmaUrl: figmaNode('10067:38257'),
    layout: 'fullscreen',
    controls: { expanded: true },
    storyOrder: ['Default', 'Content', 'Image', 'Contact'],
    docs: { description: { component: 'Banner dentro de una sección: de marca (azul con la curva), de contenido, con imagen o de contacto (enlaces o newsletter).' } },
  },
  args: { type: 'brand', title: 'Becas de hasta el 30 % para el curso 2026-2027', button: 'Solicita información' },
  argTypes: {
    type: { control: 'inline-radio', options: ['brand', 'content', 'image', 'contact'], description: 'Type en Figma.' },
    title: { control: 'text' },
    button: { control: 'text' },
  },
  render: (args) => {
    const type = args['type'] as string;
    const head = heading({
      pretitle: 'Becas y ayudas',
      title: args['title'],
      subtitle: type === 'contact' ? '' : 'Solicítalas antes del 15 de diciembre',
      text: 'Fracciona el pago en cuotas sin intereses y combina la beca con las ayudas de tu comunidad. <strong>Te asesoramos sin compromiso.</strong>',
      level: 2,
    });
    const button = type === 'brand' ? `<div class="aem-banner__actions"><a class="aem-button aem-button--secondary aem-button--inverse aem-button--lg" href="#">${args['button']}</a></div>` : `<div class="aem-banner__actions"><a class="aem-button aem-button--lg" href="#">${args['button']}</a></div>`;
    let inner = `${head}\n${button}`;
    if (type === 'image') inner = `<div class="aem-banner__media aem-card__media--placeholder"></div>\n<div class="aem-banner__body">\n${head.replace(/^/gm, '  ')}\n  ${button}\n</div>`;
    if (type === 'contact')
      inner = `${head}
<div class="aem-banner__contact">
  <p class="aem-heading__subtitle">Recibe nuestras novedades</p>
  <form class="aem-banner__form" action="#">
    <div class="aem-field-host"><label class="aem-field"><span class="aem-field__control"><input class="aem-field__input" type="email" placeholder=" " autocomplete="email"><span class="aem-field__label">Email</span></span></label></div>
    <button class="aem-button" type="submit">Suscribirme</button>
  </form>
  <a class="aem-link-button" href="#">${icon('phone')} +34 941 209 743</a>
</div>`;
    return {
      template: `<section class="aem-section">
  <div class="aem-section__inner">
    <div class="${cx('aem-banner', type === 'brand' ? 'aem-brand' : `aem-banner--${type}`)}">
${inner.replace(/^/gm, '      ')}
    </div>
  </div>
</section>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Content: Story = { args: { type: 'content' } };
export const Image: Story = { args: { type: 'image' } };
export const Contact: Story = { args: { type: 'contact', title: '¿Hablamos?', button: 'Contactar' } };
