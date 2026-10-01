import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, figmaNode, heading, icon, indent } from '../../stories/helpers';

const ITEMS = [
  ['¿Cuáles son los requisitos de acceso?', 'Necesitas un título universitario oficial de grado o equivalente.'],
  ['¿Cómo son las clases online?', 'Clases en directo cada semana, que también puedes ver en diferido.'],
  ['¿Puedo pagar a plazos?', 'Sí, puedes fraccionar el pago en cuotas mensuales sin intereses.'],
  ['¿El título es oficial?', 'Sí, es un título oficial válido en el Espacio Europeo de Educación Superior.'],
  ['¿Hay prácticas?', 'Sí, en empresas e instituciones de tu zona con convenio con la universidad.'],
];
let seq = 0;

const meta: Meta = {
  title: 'AEM/Modules/Accordion Block',
  parameters: {
    figmaUrl: figmaNode('19214:103642'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Preguntas frecuentes: cabecera del módulo junto a un Accordion (`accordion.js`) (`aem-accordion-block`).' } },
  },
  args: { items: 5, title: 'Preguntas frecuentes', text: 'Resolvemos las dudas más habituales sobre el programa.' },
  argTypes: { items: { control: 'number' }, title: { control: 'text' }, text: { control: 'text' } },
  render: (args) => {
    const id = `aem-accb-${++seq}`;
    const count = Math.max(1, Math.min(ITEMS.length, Number(args['items']) || 1));
    const items = ITEMS.slice(0, count).map(
      ([title, text], i) => `  <div class="aem-accordion__item">
    <h3 class="aem-accordion__heading">
      <button ${attrs({ class: 'aem-accordion__trigger', type: 'button', id: `${id}-h${i}`, 'aria-expanded': String(i === 0), 'aria-controls': `${id}-p${i}` })}>
        <span class="aem-accordion__title">${title}</span>
        <span class="aem-accordion__toggle">${icon('plus')}${icon('minus')}</span>
      </button>
    </h3>
    <div ${attrs({ class: 'aem-accordion__panel', id: `${id}-p${i}`, role: 'region', 'aria-labelledby': `${id}-h${i}`, hidden: i !== 0 })}>
      <p>${text}</p>
    </div>
  </div>`,
    );
    return {
      template: `<section class="aem-section">
  <div class="aem-section__inner aem-accordion-block">
${indent(heading({ title: args['title'], text: args['text'] }), 4)}
    <div class="aem-accordion" data-aem-accordion="single">
${indent(items.join('\n'), 4)}
    </div>
  </div>
</section>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
