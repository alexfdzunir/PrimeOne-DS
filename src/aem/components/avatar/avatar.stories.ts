import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode } from '../../stories/helpers';

const PEOPLE = [
  ['AG', 'Andrea García'],
  ['RM', 'Ramón Montané'],
  ['LP', 'Lucía Pérez'],
  ['JS', 'Javier Sanz'],
  ['MT', 'Marta Torres'],
  ['DC', 'Daniel Castro'],
  ['EN', 'Elena Navarro'],
];

const meta: Meta = {
  title: 'AEM/Content/Avatar',
  parameters: {
    figmaUrl: figmaNode('8690:10249'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Group', 'Collapsed'],
    docs: { description: { component: 'Avatar redondo con foto (`<img>`) o iniciales mientras no la hay (`--initials`), solo o en grupo (`aem-avatar-group`) con contador de los que no caben.' } },
  },
  args: { size: 'md', people: 1, max: 5, shadow: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'sm'], description: 'Size en Figma: MD 40px, SM 24px.' },
    people: { control: 'number', description: 'Num-People en Figma.' },
    max: { control: 'number', description: 'Avatares visibles antes del contador (Collapsed Group).' },
    shadow: { control: 'boolean', description: 'Shadow en Figma.' },
  },
  render: (args) => {
    const small = args['size'] === 'sm';
    const count = Math.max(1, Math.min(PEOPLE.length, Number(args['people']) || 1));
    const max = Math.max(1, Number(args['max']) || 5);
    const item = (cls: string, content: string, label: string) =>
      `<span ${attrs({ class: cx('aem-avatar', cls, small && 'aem-avatar--sm', args['shadow'] && 'aem-avatar--shadow'), role: 'img', 'aria-label': label })}>${content}</span>`;
    if (count === 1) return { template: item('aem-avatar--initials', PEOPLE[0][0], PEOPLE[0][1]) };
    const visible = count > max ? PEOPLE.slice(0, max - 1) : PEOPLE.slice(0, count);
    const items = visible.map(([initials, name]) => `  <li>${item('aem-avatar--initials', initials, name)}</li>`);
    if (count > max) items.push(`  <li>${item('', `+${count - visible.length}`, `${count - visible.length} personas más`)}</li>`);
    return { template: `<ul class="${cx('aem-avatar-group', small && 'aem-avatar-group--sm')}">\n${items.join('\n')}\n</ul>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Group: Story = { args: { people: 4 } };
export const Collapsed: Story = { args: { people: 7, max: 5 } };
