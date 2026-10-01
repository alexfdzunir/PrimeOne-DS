import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Content/Card',
  parameters: {
    figmaUrl: figmaNode('9448:32740'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Large', 'Video', 'Product', 'NoImage'],
    docs: {
      description: {
        component:
          'Card de noticia, evento o programa: imagen (`<img>` en la página real; aquí un fondo de marca), panel solapado con antetítulo, título enlazado (toda la card es clicable), texto y pie con etiquetas y flecha. `--lg`, `--secondary` y `--product`.',
      },
    },
  },
  args: {
    type: 'default',
    size: 'md',
    background: 'primary',
    pretitle: 'Noticias',
    title: 'Nuevos modelos de aprendizaje en la universidad: el valor de la presencialidad',
    body: 'Times Higher Education analiza 13 indicadores clave de 1.800 universidades y pone en valor nuestro espíritu internacional.',
    showImage: true,
    showPlay: false,
    showFooter: true,
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['default', 'product'], description: 'card-master o card-product en Figma.' },
    size: { control: 'inline-radio', options: ['md', 'lg'], description: 'Size en Figma.' },
    background: { control: 'inline-radio', options: ['primary', 'secondary'], description: 'Surface Fill en Figma: gris claro o blanco.' },
    pretitle: { control: 'text' },
    title: { control: 'text' },
    body: { control: 'text' },
    showImage: { control: 'boolean', description: 'Image en Figma.' },
    showPlay: { control: 'boolean', description: 'Show Play-Button en Figma (vídeo).' },
    showFooter: { control: 'boolean', description: 'Show Footer en Figma.' },
  },
  render: (args) => {
    const product = args['type'] === 'product';
    const classes = cx('aem-card', product ? 'aem-card--product' : args['size'] === 'lg' && 'aem-card--lg', args['background'] === 'secondary' && 'aem-card--secondary');
    const play = args['showPlay'] ? `\n    <button class="aem-media-button aem-card__play" type="button" aria-label="Reproducir vídeo">${icon('play', '', 'fill')}</button>` : '';
    const media = args['showImage'] ? `  <div class="aem-card__media aem-card__media--placeholder">${play}\n  </div>\n` : '';
    const accelerator = product ? `  <span class="aem-tag aem-tag--accelerator"><span class="aem-tag__text">Acelerador</span></span>\n` : '';
    const footer = args['showFooter']
      ? `\n    <div class="aem-card__footer">\n      <ul class="aem-tag-set">\n        <li><span class="aem-category-tag">Educación</span></li>\n        <li><span class="aem-category-tag">Rankings</span></li>\n      </ul>\n      <span class="aem-card__arrow" aria-hidden="true">${icon('arrow-right')}</span>\n    </div>`
      : '';
    return {
      template: `<article class="${classes}">
${media}${accelerator}  <div class="aem-card__body">
    <div class="aem-card__text">
      <p class="aem-card__pretitle">${args['pretitle']}</p>
      <h3 class="aem-card__title"><a class="aem-card__link" href="#">${args['title']}</a></h3>
      <p class="aem-card__description">${args['body']}</p>
    </div>${footer}
  </div>
</article>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Large: Story = { args: { size: 'lg' } };
export const Video: Story = { args: { showPlay: true, pretitle: 'Vídeo' } };
export const Product: Story = {
  args: { type: 'product', pretitle: 'Máster', title: 'Máster en Formación del Profesorado de Educación Secundaria', body: 'Oficial · Online · 60 ECTS', showFooter: false },
};
export const NoImage: Story = { args: { showImage: false, background: 'secondary' } };
