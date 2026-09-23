import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PrimeOneTapbar } from './tapbar';
import type { TapbarItem } from './tapbar';
import { bind } from '../../stories/helpers';

const INPUTS = ['active', 'showLabels'];
const ITEMS: TapbarItem[] = [
  { value: 'home', label: 'Inicio', icon: 'ph ph-house-line' },
  { value: 'subjects', label: 'Asignaturas', icon: 'ph ph-book-open' },
  { value: 'chat', label: 'Chat', icon: 'ph ph-chat-circle' },
  { value: 'profile', label: 'Perfil', icon: 'ph ph-user' },
];

const meta: Meta = {
  title: 'Proeduca/TapBar',
  decorators: [moduleMetadata({ imports: [PrimeOneTapbar] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    active: 'home',
  },
  argTypes: {
    active: { control: 'inline-radio', options: ['home', 'subjects', 'chat', 'profile'], description: 'Value of the active item.' },
    showLabels: { control: 'boolean', description: 'Figma "Text".', table: { defaultValue: { summary: 'true' } } },
  },
  render: (args) => ({
    props: { ...args, items: ITEMS },
    template: `
      <div style="max-width: 24rem">
        <prime-one-tapbar [items]="items"${bind(args, INPUTS)} />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const IconsOnly: Story = { args: { showLabels: false } };
