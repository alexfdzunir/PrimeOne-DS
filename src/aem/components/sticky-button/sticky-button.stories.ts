import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, icon } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Modules/Sticky Button',
  parameters: {
    figmaUrl: figmaNode('7104:14363'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Barra fija inferior en móvil: etiqueta de descuento, botón principal y accesos de llamada y chat (`aem-sticky`; `--static` la deja en el flujo, como aquí).' } },
  },
  args: { showOffer: true, button: 'Solicitar información' },
  argTypes: { showOffer: { control: 'boolean', description: 'Etiqueta de descuento.' }, button: { control: 'text' } },
  render: (args) => {
    const offer = args['showOffer'] ? `\n  <div class="aem-sticky__offer">\n    <span class="aem-tag aem-tag--highlight">-20%</span>\n    <span class="aem-sticky__price">4.800 €</span>\n  </div>` : '';
    return {
      template: `<div class="aem-sticky aem-sticky--static" style="max-width: 24.375rem; margin: 2rem auto">${offer}
  <a class="aem-button" href="#">${args['button']}</a>
  <a class="aem-button aem-button--outlined aem-button--icon-only" href="#" aria-label="Llamar">${icon('phone', 'aem-button__icon')}</a>
  <a class="aem-button aem-button--outlined aem-button--icon-only" href="#" aria-label="Chat">${icon('chats', 'aem-button__icon')}</a>
</div>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
