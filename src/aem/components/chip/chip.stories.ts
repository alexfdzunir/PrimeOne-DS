import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

interface Args {
  severity: 'secondary' | 'primary';
  label: string;
  selected: boolean;
  disabled: boolean;
  group: boolean;
}

function chipHtml(args: Args, label: string, selected: boolean): string {
  const classes = cx('aem-chip', args.severity === 'primary' && 'aem-chip--primary');
  return `<button ${attrs({ class: classes, type: 'button', 'aria-pressed': String(selected), disabled: args.disabled })}>
  <span>${label}</span>
  ${icon('x', 'aem-chip__icon')}
</button>`;
}

const meta: Meta = {
  title: 'AEM/Inputs/Chip',
  parameters: {
    figmaUrl: figmaNode('8420:9560'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Primary', 'Group', 'Disabled'],
    docs: { description: { component: 'Chip de filtro: `aem-chip` (`--primary` el grande) con `aria-pressed`. `chip.js` lo alterna al pulsarlo.' } },
  },
  args: { severity: 'secondary', label: 'Online', selected: false, disabled: false, group: false },
  argTypes: {
    severity: { control: 'inline-radio', options: ['secondary', 'primary'], description: 'Severity en Figma: Secondary 28px, Primary 40px.' },
    label: { control: 'text' },
    selected: { control: 'boolean', description: 'State=Selected en Figma.' },
    disabled: { control: 'boolean' },
    group: { control: 'boolean', description: 'Varios chips en un grupo.' },
  },
  render: (raw) => {
    const args = raw as Args;
    if (!args.group) return { template: chipHtml(args, args.label, args.selected) };
    const labels = ['Online', 'Presencial', 'Grado', 'Máster', 'Doctorado'];
    const chips = labels.map((label, i) => chipHtml(args, label, args.selected && i < 2).replace(/^/gm, '  ')).join('\n');
    return { template: `<div class="aem-chip-group" role="group" aria-label="Filtros">\n${chips}\n</div>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Primary: Story = { args: { severity: 'primary' } };
export const Group: Story = { args: { group: true, selected: true } };
export const Disabled: Story = { args: { disabled: true } };
