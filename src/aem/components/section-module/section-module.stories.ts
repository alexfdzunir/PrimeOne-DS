import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode, heading } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Modules/Section',
  parameters: {
    figmaUrl: figmaNode('19076:27437'),
    layout: 'fullscreen',
    controls: { expanded: true },
    storyOrder: ['Default', 'Secondary', 'Accent'],
    docs: {
      description: {
        component:
          'Sección de página (`aem-section`, estilos en `section-module.css`): banda a todo el ancho con el padding responsive del layout y una columna de 1280px. Todos los módulos van dentro. `aem-heading` es la cabecera común de los módulos.',
      },
    },
  },
  args: { background: 'primary', paddingTop: true, pretitle: 'Por qué UNIR', title: 'La universidad online con más estudiantes', subtitle: '', text: 'Más de 60.000 estudiantes de 100 países confían en nuestra metodología: clases en directo, tutor personal y evaluación continua.', link: 'Conoce nuestra metodología' },
  argTypes: {
    background: { control: 'inline-radio', options: ['primary', 'secondary', 'accent'], description: 'Background Fill en Figma.' },
    paddingTop: { control: 'boolean', description: 'Padding Top en Figma (sin él, la sección continúa la anterior).' },
    pretitle: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text', description: 'Second Headline (opcional).' },
    text: { control: 'text' },
    link: { control: 'text', description: 'Enlace (link-button). Vacío, sin enlace.' },
  },
  render: (args) => {
    const head = heading({ pretitle: args['pretitle'], title: args['title'], subtitle: args['subtitle'], text: args['text'], link: args['link'] });
    return {
      template: `<section class="${cx('aem-section', args['background'] !== 'primary' && `aem-section--${args['background']}`, !args['paddingTop'] && 'aem-section--flush')}">
  <div class="aem-section__inner">
${head.replace(/^/gm, '    ')}
  </div>
</section>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Secondary: Story = { args: { background: 'secondary' } };
export const Accent: Story = { args: { background: 'accent' } };
