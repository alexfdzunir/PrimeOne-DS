import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

interface Args {
  type: 'button' | 'link';
  size: 'lg' | 'sm';
  label: string;
  fileType: string;
  showSubtext: boolean;
  disabled: boolean;
  columns: 0 | 1 | 2;
}

function downloadHtml(args: Args, label = args.label): string {
  const classes = cx('aem-download', args.type === 'link' && 'aem-download--link', args.size === 'sm' && 'aem-download--sm');
  const meta = args.showSubtext ? `\n    <span class="aem-download__meta">${args.fileType}</span>` : '';
  return `<a ${attrs({ class: classes, href: '#', download: true, 'aria-disabled': args.disabled && 'true' })}>
  ${icon('file-arrow-down', 'aem-download__icon')}
  <span class="aem-download__text">
    <span class="aem-download__label">${label}</span>${meta}
  </span>
</a>`;
}

const meta: Meta = {
  title: 'AEM/Buttons/Download Button',
  parameters: {
    figmaUrl: figmaNode('8598:15445'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Small', 'Link', 'Set', 'Disabled'],
    docs: { description: { component: 'Botón de descarga: icono de fichero, título y tipo de archivo. `aem-download` con `--sm` y `--link`; en grupo, `aem-download-set` de una o dos columnas.' } },
  },
  args: { type: 'button', size: 'lg', label: 'Guía del estudiante', fileType: 'PDF · 2,4 MB', showSubtext: true, disabled: false, columns: 0 },
  argTypes: {
    type: { control: 'inline-radio', options: ['button', 'link'], description: 'Type en Figma: botón con caja o link-button.' },
    size: { control: 'inline-radio', options: ['lg', 'sm'], description: 'Size en Figma: LG 72px, SM 56px.' },
    label: { control: 'text', description: 'Título del documento.' },
    fileType: { control: 'text', description: 'Tipo y peso del archivo (Subtext).' },
    showSubtext: { control: 'boolean', description: 'Show Subtext en Figma.' },
    disabled: { control: 'boolean' },
    columns: { control: 'inline-radio', options: [0, 1, 2], description: 'Grupo de botones (download-button-set): 0 un solo botón, 1 o 2 columnas.' },
  },
  render: (raw) => {
    const args = raw as Args;
    if (!args.columns) return { template: downloadHtml(args) };
    const labels = ['Guía del estudiante', 'Calendario académico', 'Normativa de evaluación', 'Plan de estudios'];
    const items = labels.map((label) => downloadHtml(args, label).replace(/^/gm, '  ')).join('\n');
    return { template: `<div class="${cx('aem-download-set', args.columns === 2 && 'aem-download-set--2')}">\n${items}\n</div>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Link: Story = { args: { type: 'link' } };
export const Set: Story = { args: { columns: 2 } };
export const Disabled: Story = { args: { disabled: true } };
