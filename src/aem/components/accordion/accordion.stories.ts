import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

const ITEMS = [
  ['¿Cuáles son los requisitos de acceso?', 'Necesitas un título universitario oficial de grado o equivalente. Si tu título es extranjero, te ayudamos con la homologación.'],
  ['¿Cómo son las clases online?', 'Clases en directo cada semana, que también puedes ver en diferido, y un tutor personal que te acompaña durante todo el programa.'],
  ['¿Puedo pagar a plazos?', 'Sí, puedes fraccionar el pago en cuotas mensuales sin intereses y consultar las becas y ayudas disponibles.'],
  ['¿El título es oficial?', 'Sí, es un título oficial reconocido por el Ministerio de Universidades y válido en el Espacio Europeo de Educación Superior.'],
];
let seq = 0;

const meta: Meta = {
  title: 'AEM/Content/Accordion',
  parameters: {
    figmaUrl: figmaNode('9322:64892'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Small', 'Single'],
    docs: { description: { component: 'Acordeón accesible (botón con `aria-expanded` y panel): `aem-accordion` y `--sm`. `accordion.js` abre y cierra; `data-aem-accordion="single"` deja uno abierto.' } },
  },
  args: { size: 'md', items: 4, expanded: 1, showTag: false, single: false, disabled: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'sm'], description: 'Size en Figma.' },
    items: { control: 'number', description: 'N-Items en Figma.' },
    expanded: { control: 'number', description: 'Elemento abierto al empezar (0 ninguno).' },
    showTag: { control: 'boolean', description: 'Show Tag en Figma.' },
    single: { control: 'boolean', description: 'Solo un elemento abierto a la vez.' },
    disabled: { control: 'boolean', description: 'Deshabilita el último elemento.' },
  },
  render: (args) => {
    const id = `aem-acc-${++seq}`;
    const count = Math.max(1, Math.min(ITEMS.length, Number(args['items']) || 1));
    const items = ITEMS.slice(0, count).map(([title, text], i) => {
      const open = Number(args['expanded']) === i + 1;
      const tag = args['showTag'] && i === 0 ? `<span class="aem-tag">Nuevo</span>` : '';
      return `  <div class="aem-accordion__item">
    <h3 class="aem-accordion__heading">
      <button ${attrs({ class: 'aem-accordion__trigger', type: 'button', id: `${id}-h${i}`, 'aria-expanded': String(open), 'aria-controls': `${id}-p${i}`, disabled: args['disabled'] && i === count - 1 })}>
        <span class="aem-accordion__title">${title}${tag}</span>
        <span class="aem-accordion__toggle">${icon('plus')}${icon('minus')}</span>
      </button>
    </h3>
    <div ${attrs({ class: 'aem-accordion__panel', id: `${id}-p${i}`, role: 'region', 'aria-labelledby': `${id}-h${i}`, hidden: !open })}>
      <p>${text}</p>
    </div>
  </div>`;
    });
    return { template: `<div ${attrs({ class: cx('aem-accordion', args['size'] === 'sm' && 'aem-accordion--sm'), 'data-aem-accordion': args['single'] && 'single' })} style="max-width: 37.5rem">\n${items.join('\n')}\n</div>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Single: Story = { args: { single: true, showTag: true } };
