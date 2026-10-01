import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode, icon } from '../../stories/helpers';

const TEXT = `<div class="aem-rich-text">
  <h2>Aprende con los mejores profesionales</h2>
  <p>Nuestro claustro combina la <strong>experiencia docente</strong> con la práctica profesional: más de 2.000 profesores que trabajan en lo que enseñan.</p>
  <p>Cada asignatura tiene clases en directo, materiales actualizados y un tutor que te acompaña. <a href="#">Conoce la metodología</a>.</p>
</div>`;

const meta: Meta = {
  title: 'AEM/Modules/Content Block',
  parameters: {
    figmaUrl: figmaNode('10410:43745'),
    layout: 'fullscreen',
    controls: { expanded: true },
    storyOrder: ['Default', 'TextImage', 'Halves', 'Thirds', 'Full'],
    docs: { description: { component: 'Bloque editorial en las proporciones de Figma (40/60, 60/40, 50/50, 33/33/33 o completo) con imagen y texto enriquecido (`aem-rich-text`).' } },
  },
  args: { layout: '40-60' },
  argTypes: { layout: { control: 'inline-radio', options: ['full', '40-60', '60-40', '50-50', '33'], description: 'Content Layout en Figma.' } },
  render: (args) => {
    const layout = args['layout'] as string;
    const media = `<div class="aem-content-block__media"><div class="aem-placeholder">${icon('image')}</div></div>`;
    const columns = {
      full: [TEXT],
      '40-60': [media, TEXT],
      '60-40': [TEXT, media],
      '50-50': [media, TEXT],
      '33': [media, media, media].map((m, i) => `<div>\n${m}\n<div class="aem-rich-text"><h3>${['Clases en directo', 'Tutor personal', 'Prácticas'][i]}</h3><p>Aprende a tu ritmo con el apoyo de profesionales en activo.</p></div>\n</div>`),
    }[layout] ?? [TEXT];
    return {
      template: `<section class="aem-section">
  <div class="aem-section__inner">
    <div class="${cx('aem-content-block', layout !== 'full' && `aem-content-block--${layout}`)}">
${columns.map((c) => c.replace(/^/gm, '      ')).join('\n')}
    </div>
  </div>
</section>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const TextImage: Story = { args: { layout: '60-40' } };
export const Halves: Story = { args: { layout: '50-50' } };
export const Thirds: Story = { args: { layout: '33' } };
export const Full: Story = { args: { layout: 'full' } };
