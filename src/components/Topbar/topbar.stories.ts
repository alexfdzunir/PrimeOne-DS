import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneTopbar } from './topbar';
import type { MenuItem } from 'primeng/api';
import { bind } from '../../stories/helpers';

const INPUTS = ['heading', 'subtitle', 'actionLabel', 'actionIcon', 'showBack', 'mobile', 'contrast'];
const SECTIONS: MenuItem[] = [{ label: 'Grado en Ingeniería Informática' }, { label: 'Máster en Ciberseguridad' }];

const meta: Meta = {
  title: 'Proeduca/Topbar',
  decorators: [moduleMetadata({ imports: [PrimeOneTopbar] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Contrast', 'Mobile', 'NoBack', 'NoAction'],
  },
  args: {
    heading: 'Mis asignaturas',
    subtitle: 'Grado en Ingeniería Informática',
    actionLabel: 'Nueva',
    actionIcon: 'ph ph-plus',
    back: fn(),
    action: fn(),
  },
  argTypes: {
    heading: { control: 'text' },
    subtitle: { control: 'text' },
    actionLabel: { control: 'text' },
    actionIcon: { control: 'text' },
    showBack: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    mobile: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    contrast: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    back: { action: 'back', table: { category: 'Eventos' } },
    action: { action: 'action', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, sections: SECTIONS },
    template: `<prime-one-topbar [sections]="sections"${bind(args, INPUTS)} (back)="back($event)" (action)="action($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Contrast: Story = { args: { contrast: true } };
export const Mobile: Story = { args: { mobile: true, contrast: true, actionLabel: undefined, actionIcon: undefined } };
export const NoBack: Story = { args: { showBack: false } };
export const NoAction: Story = { args: { actionLabel: undefined, actionIcon: undefined } };
