import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode, icon } from '../../stories/helpers';

let seq = 0;
const PARAGRAPH = '<p>Las becas se conceden por orden de solicitud hasta agotar las plazas. Para optar a ellas debes formalizar la reserva de plaza antes del inicio del programa y presentar la documentación que acredite tu situación.</p>';

const meta: Meta = {
  title: 'AEM/Modules/Modal',
  parameters: {
    figmaUrl: figmaNode('20074:7575'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Open'],
    docs: { description: { component: 'Modal sobre `<dialog>` nativo: overlay, botón de cierre, título y contenido con scroll; pie con acciones opcional. `modal.js` lo abre desde `data-aem-modal-open` y lo cierra desde `data-aem-modal-close` o el overlay.' } },
  },
  args: { title: 'Condiciones de las becas', paragraphs: 3, showFooter: true, inline: true },
  argTypes: {
    title: { control: 'text' },
    paragraphs: { control: 'number', description: 'Párrafos del contenido (más alto que la pantalla, hace scroll).' },
    showFooter: { control: 'boolean', description: 'Pie con acciones.' },
    inline: { control: 'boolean', description: 'Muestra la caja en la página en vez del botón que abre el modal.' },
  },
  render: (args) => {
    const id = `aem-modal-${++seq}`;
    const footer = args['showFooter']
      ? `\n  <div class="aem-modal__footer">\n    <button class="aem-button aem-button--ghost" type="button" data-aem-modal-close>Cancelar</button>\n    <button class="aem-button" type="button" data-aem-modal-close>Aceptar</button>\n  </div>`
      : '';
    const body = Array.from({ length: Math.max(1, Number(args['paragraphs']) || 1) }, () => `    ${PARAGRAPH}`).join('\n');
    const dialog = `<dialog class="${cx('aem-modal', args['inline'] && 'aem-modal--static')}" id="${id}" aria-labelledby="${id}-title"${args['inline'] ? ' open' : ''}>
  <div class="aem-modal__header">
    <h2 class="aem-modal__title" id="${id}-title">${args['title']}</h2>
    <button class="aem-button aem-button--ghost aem-button--icon-only aem-button--sm" type="button" aria-label="Cerrar" data-aem-modal-close>${icon('x', 'aem-button__icon')}</button>
  </div>
  <div class="aem-modal__body">
${body}
  </div>${footer}
</dialog>`;
    return { template: args['inline'] ? dialog : `<button class="aem-button" type="button" data-aem-modal-open="${id}">Ver condiciones</button>\n${dialog}` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Open: Story = { args: { inline: false } };
