import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode } from '../../stories/helpers';

const TABS = [
  ['Presentación', 'El Grado en Psicología online te prepara para trabajar en los ámbitos clínico, educativo y social.'],
  ['Plan de estudios', '240 créditos ECTS en cuatro cursos, con prácticas y Trabajo Fin de Grado.'],
  ['Metodología', 'Clases en directo, materiales interactivos y un tutor personal desde el primer día.'],
  ['Titulación', 'Título oficial reconocido por el Ministerio de Universidades.'],
  ['Precio y becas', 'Pago a plazos sin intereses y becas de hasta el 30 %.'],
  ['Opiniones', 'El 94 % de nuestros estudiantes recomendaría el grado.'],
];
let seq = 0;

const meta: Meta = {
  title: 'AEM/Navigation/Tabs',
  parameters: {
    figmaUrl: figmaNode('9111:9533'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Small', 'Bar'],
    docs: { description: { component: 'Pestañas accesibles (`role="tablist"`): la seleccionada en azul con subrayado. `tabs.js` cambia de panel con clic y con las flechas.' } },
  },
  args: { size: 'lg', tabs: 4, selected: 1, bar: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['lg', 'sm'], description: 'Size en Figma: LG 54px, SM 38px.' },
    tabs: { control: 'number', description: 'Nº Tabs en Figma.' },
    selected: { control: 'number', description: 'Pestaña seleccionada.' },
    bar: { control: 'boolean', description: 'tabs-module: barra a todo el ancho.' },
  },
  render: (args) => {
    const id = `aem-tabs-${++seq}`;
    const tabs = TABS.slice(0, Math.max(2, Math.min(TABS.length, Number(args['tabs']) || 2)));
    const current = Math.min(tabs.length, Math.max(1, Number(args['selected']) || 1));
    const buttons = tabs.map(([label], i) => `    <button ${attrs({ class: 'aem-tabs__tab', type: 'button', role: 'tab', id: `${id}-t${i}`, 'aria-selected': String(i + 1 === current), 'aria-controls': `${id}-p${i}`, tabindex: i + 1 === current ? 0 : -1 })}>${label}</button>`);
    const panels = tabs.map(([, text], i) => `  <div ${attrs({ class: 'aem-tabs__panel', role: 'tabpanel', id: `${id}-p${i}`, 'aria-labelledby': `${id}-t${i}`, tabindex: 0, hidden: i + 1 !== current })}>${text}</div>`);
    return { template: `<div class="${cx('aem-tabs', args['size'] === 'sm' && 'aem-tabs--sm', args['bar'] && 'aem-tabs--bar')}">\n  <div class="aem-tabs__list" role="tablist" aria-label="Información del grado">\n${buttons.join('\n')}\n  </div>\n${panels.join('\n')}\n</div>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Bar: Story = { args: { bar: true } };
