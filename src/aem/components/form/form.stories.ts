import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, figmaNode, heading, icon, indent } from '../../stories/helpers';

let seq = 0;

function input(label: string, type = 'text', full = false): string {
  const id = `aem-form-${++seq}`;
  return `<div class="aem-field-host aem-input${full ? ' aem-form__full' : ''}">
  <label class="aem-field" for="${id}">
    <span class="aem-field__control">
      <input ${attrs({ class: 'aem-field__input', id, type, placeholder: ' ', autocomplete: type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off' })} />
      <span class="aem-field__label">${label}</span>
    </span>
  </label>
</div>`;
}

const meta: Meta = {
  title: 'AEM/Modules/Form',
  parameters: {
    figmaUrl: figmaNode('20146:10102'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Solicitud de información: cabecera y vías de contacto junto al formulario (Input Text, Checkbox), texto legal con scroll y botón de envío (`aem-form-module`, `aem-form`).' } },
  },
  args: { title: 'Solicita información', text: 'Un asesor te llamará para resolver tus dudas sobre el programa, sin compromiso.', button: 'Enviar' },
  argTypes: { title: { control: 'text' }, text: { control: 'text' }, button: { control: 'text' } },
  render: (args) => ({
    template: `<section class="aem-section aem-section--secondary">
  <div class="aem-section__inner aem-form-module">
    <div>
${indent(heading({ title: args['title'], text: args['text'] }), 6)}
      <ul class="aem-form-module__contacts">
        <li><a class="aem-link-button" href="#">${icon('phone')} +34 941 209 743</a></li>
        <li><a class="aem-link-button" href="#">${icon('whatsapp-logo')} WhatsApp</a></li>
        <li><a class="aem-link-button" href="#">${icon('chats')} Chat con un asesor</a></li>
      </ul>
    </div>
    <form class="aem-form" action="#">
${indent(input('Nombre'), 6)}
${indent(input('Apellidos'), 6)}
${indent(input('Email', 'email'), 6)}
${indent(input('Teléfono', 'tel'), 6)}
      <label class="aem-checkbox__item aem-form__full">
        <input class="aem-checkbox__input" type="checkbox" name="privacy" required />
        <span class="aem-checkbox__box">${icon('check', 'aem-checkbox__check', 'bold')}${icon('minus', 'aem-checkbox__minus', 'bold')}</span>
        <span>He leído y acepto la política de privacidad</span>
      </label>
      <p class="aem-form__legal aem-form__full" tabindex="0">Responsable: Universidad Internacional de La Rioja. Finalidad: atender tu solicitud de información y enviarte comunicaciones sobre nuestros programas. Legitimación: tu consentimiento. Destinatarios: no se cederán datos a terceros salvo obligación legal. Derechos: acceso, rectificación, supresión, oposición, limitación y portabilidad, como se explica en la política de privacidad.</p>
      <button class="aem-button aem-form__full" type="submit">${args['button']}</button>
    </form>
  </div>
</section>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
