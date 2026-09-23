import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PrimeOneBottomBar } from './bottom-bar';
import type { MenuItem } from 'primeng/api';
import { bind } from '../../stories/helpers';

const INPUTS = ['type', 'page', 'totalPages', 'words', 'zoom', 'minZoom', 'maxZoom', 'zoomStep'];
const TOOLS: MenuItem[] = [
  { label: 'Deshacer', icon: 'ph ph-arrow-counter-clockwise' },
  { label: 'Rehacer', icon: 'ph ph-arrow-clockwise' },
  { separator: true },
  { label: 'Comentar', icon: 'ph ph-chat-centered-text' },
];

const meta: Meta = {
  title: 'Proeduca/BottomBar',
  decorators: [moduleMetadata({ imports: [PrimeOneBottomBar] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Editor'],
  },
  args: {
    type: 'paginator',
    page: 3,
    totalPages: 12,
    words: 1250,
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['editor', 'paginator'], table: { defaultValue: { summary: 'paginator' } } },
    page: { control: 'number', table: { defaultValue: { summary: '1' } } },
    totalPages: { control: 'number', table: { defaultValue: { summary: '1' } } },
    words: { control: 'number' },
    zoom: { control: 'number', table: { defaultValue: { summary: '100' } } },
    minZoom: { control: 'number', table: { defaultValue: { summary: '10' } } },
    maxZoom: { control: 'number', table: { defaultValue: { summary: '200' } } },
    zoomStep: { control: 'number', table: { defaultValue: { summary: '10' } } },
  },
  render: (args) => ({
    props: { ...args, items: TOOLS, statuses: ['Guardado'] },
    template: `<prime-one-bottom-bar [items]="items" [statuses]="statuses"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Editor: Story = { args: { type: 'editor' } };
