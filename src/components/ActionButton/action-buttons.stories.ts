import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneActionButtons } from './action-buttons';
import type { ActionButtonItem } from './action-buttons';
import { bind } from '../../stories/helpers';

const INPUTS = ['tooltipPosition'];
const ACTIONS: ActionButtonItem[] = [
  { id: 'copy', icon: 'ph ph-copy', label: 'Copiar' },
  { id: 'edit', icon: 'ph ph-pencil-simple', label: 'Editar' },
  { id: 'share', icon: 'ph ph-share-network', label: 'Compartir' },
  { id: 'delete', icon: 'ph ph-trash', label: 'Eliminar' },
];

const meta: Meta = {
  title: 'Proeduca/ActionButtons',
  decorators: [moduleMetadata({ imports: [PrimeOneActionButtons] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    actionClick: fn(),
  },
  argTypes: {
    tooltipPosition: { control: 'select', options: [undefined, 'bottom', 'left', 'right', 'top'], table: { defaultValue: { summary: 'bottom' } } },
    actionClick: { action: 'actionClick', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, actions: ACTIONS },
    template: `<prime-one-action-buttons [actions]="actions"${bind(args, INPUTS)} (actionClick)="actionClick($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
