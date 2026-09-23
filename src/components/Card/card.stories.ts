import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneCard } from './card';
import type { CardItem, CardTag } from './card';
import { IMAGES } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['type', 'size', 'background', 'disabled', 'interactive', 'expanded', 'metricUnit', 'imageAlt', 'tagSeverity', 'page'];

const meta: Meta = {
  title: 'Panel/Card',
  decorators: [moduleMetadata({ imports: [PrimeOneCard] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Expandable', 'Product', 'Horizontal', 'HorizontalFull', 'S', 'Grey', 'Disabled', 'Interactive'],
    docs: { description: { component: 'Familia de cards del DS en un componente: `type` cambia entre los sets de Figma (card-content, card-expandable, card-product, card-horizontal y card-horizontal-full) y `size` entre M y S. Las horizontales pasan a su layout móvil por debajo de 520px de ancho (container query): estrecha el lienzo o activa `narrow`.' } },
  },
  args: {
    type: 'default',
    size: 'm',
    background: 'white',
    disabled: false,
    interactive: false,
    avatar: 'LM',
    icon: 'ph ph-book-open',
    heading: 'Álgebra lineal',
    subtitle: 'Grado en Matemáticas',
    tag: 'Activa',
    iconRight: 'ph ph-dots-three-vertical',
    expanded: true,
    text: 'Descripción breve del indicador y su contexto de uso.',
    metric: '12',
    metricUnit: 'créditos',
    author: 'Laura Martín',
    linkLabel: 'Ver más',
    labelCaption: 'Entrega',
    pages: 2,
    imageAlt: 'Campus',
    narrow: false,
    showHeader: true,
    showAvatar: true,
    showIconLeft: true,
    showTitle: true,
    showSubtitle: true,
    showTag: true,
    showIconRight: true,
    showImage: true,
    showContent: true,
    showText: true,
    showBullets: true,
    showNumber: true,
    showTagsRow: true,
    showItems: true,
    showSlot: true,
    showFooter: true,
    showCaption: true,
    showAuthor: true,
    showLink: true,
    showButton: true,
    showLabel: true,
    showPaginator: true,
    cardClick: fn(),
    linkClick: fn(),
    pageChange: fn(),
    expandedChange: fn(),
  },
  argTypes: {
    type: { control: 'select', options: ['default', 'expandable', 'product', 'horizontal', 'horizontal-full'], description: 'Set de Figma: card-content, card-expandable, card-product, card-horizontal, card-horizontal-full.', table: { defaultValue: { summary: 'default' } } },
    size: { control: 'inline-radio', options: ['m', 's'], description: 'Figma Size M/S (Desktop/Mobile en las horizontales).', table: { defaultValue: { summary: 'm' } } },
    background: { control: 'inline-radio', options: ['white', 'grey'], description: 'Figma Background.', table: { defaultValue: { summary: 'white' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    interactive: { control: 'boolean', description: 'Hover and focus states; the card emits `cardClick`.', table: { defaultValue: { summary: 'false' } } },
    avatar: { control: 'text', description: 'Label of the avatar (Figma "Avatar").' },
    icon: { control: 'text', description: 'Left icon, Phosphor class (Figma "Icon Left" / "Show Icon").' },
    heading: { control: 'text', description: 'Card title.' },
    subtitle: { control: 'text' },
    tag: { control: 'text' },
    iconRight: { control: 'text', description: 'Right icon, Phosphor class (Figma "Icon Right").' },
    expanded: { control: 'boolean', description: 'Content visibility of the expandable card.', table: { defaultValue: { summary: 'false' } } },
    text: { control: 'text', description: 'Description (Figma "Show Text").' },
    metric: { control: 'text', description: 'Figure of the metric row (Figma "Show Number").' },
    metricUnit: { control: 'text' },
    author: { control: 'text', description: 'Author at the start of the caption row (product and horizontal cards).' },
    linkLabel: { control: 'text', description: 'Footer link with arrow (Figma "Show Button").' },
    labelCaption: { control: 'text', description: 'Small caption over the footer values (Figma "Show Label").' },
    pages: { control: 'number', description: 'Total pages; the paginator shows when it is above 0.', table: { defaultValue: { summary: '0' } } },
    imageAlt: { control: 'text', table: { defaultValue: { summary: '' } } },
    tagSeverity: { control: 'select', options: [undefined, 'contrast', 'danger', 'info', 'secondary', 'success', 'warn'] },
    page: { control: 'number', description: 'Current page of the footer paginator (1-based).', table: { defaultValue: { summary: '1' } } },
    narrow: { control: 'boolean', description: 'Fuerza el ancho móvil (Figma Size=Mobile) en las cards horizontales.' },
    showHeader: { control: 'boolean', description: 'Figma "Header" (card-content).' },
    showAvatar: { control: 'boolean', description: 'Figma "Avatar" (solo card-content).' },
    showIconLeft: { control: 'boolean', description: 'Figma "Icon Left" / "Show Icon".' },
    showTitle: { control: 'boolean', description: 'Figma "Title".' },
    showSubtitle: { control: 'boolean', description: 'Figma "Subtitle".' },
    showTag: { control: 'boolean', description: 'Figma "Tag".' },
    showIconRight: { control: 'boolean', description: 'Figma "Icon Right" (solo card-content).' },
    showImage: { control: 'boolean', description: 'Figma "Show Image" (product y horizontales).' },
    showContent: { control: 'boolean', description: 'Figma "Content".' },
    showText: { control: 'boolean', description: 'Figma "Show Text".' },
    showBullets: { control: 'boolean', description: 'Figma "Show Bullets".' },
    showNumber: { control: 'boolean', description: 'Figma "Show Number".' },
    showTagsRow: { control: 'boolean', description: 'Figma "Show Tags Row".' },
    showItems: { control: 'boolean', description: 'Figma "Show Items".' },
    showSlot: { control: 'boolean', description: 'Figma "Show Slot" (contenido proyectado).' },
    showFooter: { control: 'boolean', description: 'Figma "Show Footer".' },
    showCaption: { control: 'boolean', description: 'Figma "Show Caption": fila de fechas y etiquetas.' },
    showAuthor: { control: 'boolean', description: 'Figma "Show Author" (product y horizontales).' },
    showLink: { control: 'boolean', description: 'Figma "Show Link": fila del enlace, etiqueta y paginador.' },
    showButton: { control: 'boolean', description: 'Figma "Show Button": enlace con flecha.' },
    showLabel: { control: 'boolean', description: 'Figma "Show Label".' },
    showPaginator: { control: 'boolean', description: 'Figma "Show Paginator".' },
    cardClick: { action: 'cardClick', table: { category: 'Eventos' } },
    linkClick: { action: 'linkClick', table: { category: 'Eventos' } },
    pageChange: { action: 'pageChange', table: { category: 'Eventos' } },
    expandedChange: { action: 'expandedChange', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, media: ['product', 'horizontal', 'horizontal-full'].includes(args['type']), wide: ['horizontal', 'horizontal-full'].includes(args['type']), image: IMAGES[0].src, bullets: ['Clases en directo', 'Material descargable', 'Tutorías semanales'], tags: [
        { value: 'Activa' },
        { value: 'Online', severity: 'secondary' },
        { value: 'Aprobada', severity: 'success' },
        { value: 'Pendiente', severity: 'warn' },
        { value: 'Vencida', severity: 'danger' },
      ] as CardTag[], items: [
        { label: '12 h', icon: 'ph ph-clock' },
        { label: '4 temas', icon: 'ph ph-list-bullets' },
        { label: '2 tareas', icon: 'ph ph-check-square' },
        { label: '1 examen', icon: 'ph ph-exam' },
      ] as CardItem[], captions: ['Actualizado', '12/09/2026', 'Creado', '01/09/2026'], mediaCaptions: ['12/09/2026', '4 min'], labelValues: ['25 sep', '10:00'] },
    template: `
      <div [style.max-width]="wide && !narrow ? '720px' : '360px'">
      <prime-one-card
        [avatar]="type === 'default' && showHeader && showAvatar ? avatar : undefined"
        [icon]="showHeader && showIconLeft ? icon : undefined"
        [heading]="showHeader && showTitle ? heading : undefined"
        [subtitle]="showHeader && showSubtitle ? subtitle : undefined"
        [tag]="showHeader && showTag ? tag : undefined"
        [iconRight]="type === 'default' && showHeader && showIconRight ? iconRight : undefined"
        [image]="showImage ? image : undefined"
        [text]="showContent && showText ? text : undefined"
        [bullets]="showContent && showBullets ? bullets : []"
        [metric]="showContent && showNumber ? metric : undefined"
        [tags]="showContent && showTagsRow ? tags : []"
        [items]="showItems ? items : []"
        [author]="media && showFooter && showAuthor ? author : undefined"
        [captions]="showFooter && showCaption ? (media ? mediaCaptions : captions) : []"
        [linkLabel]="showFooter && showLink && showButton ? linkLabel : undefined"
        [labelCaption]="showFooter && showLink && showLabel ? labelCaption : undefined"
        [labelValues]="showFooter && showLink && showLabel ? labelValues : []"
        [pages]="showFooter && showLink && showPaginator ? pages : 0"${bind(args, INPUTS)} (cardClick)="cardClick($event)" (linkClick)="linkClick($event)" (pageChange)="pageChange($event)" (expandedChange)="expandedChange($event)"
      >
        @if (showSlot) {
          <div style="display: grid; place-items: center; height: 100px; border: 2px dashed var(--p-content-border-color); border-radius: var(--p-border-radius-lg); background: var(--p-form-field-filled-background); color: var(--p-text-muted-color); font-size: 0.75rem">
            Slot: contenido libre
          </div>
        }
      </prime-one-card>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Expandable: Story = { args: { type: 'expandable' } };
export const Product: Story = { args: { type: 'product' } };
export const Horizontal: Story = { args: { type: 'horizontal' } };
export const HorizontalFull: Story = { args: { type: 'horizontal-full' } };
export const S: Story = { args: { size: 's' } };
export const Grey: Story = { args: { background: 'grey' } };
export const Disabled: Story = { args: { disabled: true } };
export const Interactive: Story = { args: { interactive: true } };
