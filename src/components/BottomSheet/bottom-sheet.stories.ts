import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneBottomSheet } from './bottom-sheet';
import { Button } from 'primeng/button';
import type { BottomSheetAction } from './bottom-sheet';
import { bind } from '../../stories/helpers';

const INPUTS = ['heading', 'primaryLabel', 'height', 'showHandle', 'showClose', 'showSearch', 'searchPlaceholder', 'cancelLabel', 'secondaryLabel'];
const ACTIONS: BottomSheetAction[] = [
  { id: 'download', icon: 'ph ph-download-simple', label: 'Descargar' },
  { id: 'share', icon: 'ph ph-share-network', label: 'Compartir' },
  { id: 'delete', icon: 'ph ph-trash', label: 'Eliminar' },
];

const meta: Meta = {
  title: 'Proeduca/BottomSheet',
  decorators: [moduleMetadata({ imports: [PrimeOneBottomSheet, Button] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Tall', 'Full', 'Search', 'TwoButtons', 'NoHandle'],
    docs: { story: { inline: false, height: '520px' } },
  },
  args: {
    heading: 'Opciones',
    primaryLabel: 'Aceptar',
    actionClick: fn(),
    search: fn(),
    cancel: fn(),
    primary: fn(),
    secondary: fn(),
  },
  argTypes: {
    heading: { control: 'text', table: { defaultValue: { summary: '' } } },
    primaryLabel: { control: 'text' },
    height: { control: 'text', table: { defaultValue: { summary: 'auto' } } },
    showHandle: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showClose: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showSearch: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    searchPlaceholder: { control: 'text', table: { defaultValue: { summary: 'Buscar' } } },
    cancelLabel: { control: 'text', table: { defaultValue: { summary: 'Cancelar' } } },
    secondaryLabel: { control: 'text' },
    actionClick: { action: 'actionClick', table: { category: 'Eventos' } },
    search: { action: 'search', table: { category: 'Eventos' } },
    cancel: { action: 'cancel', table: { category: 'Eventos' } },
    primary: { action: 'primary', table: { category: 'Eventos' } },
    secondary: { action: 'secondary', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, actions: ACTIONS, visible: true },
    template: `
      <p-button label="Abrir hoja inferior" (onClick)="visible = true" />
      <prime-one-bottomsheet [(visible)]="visible" [actions]="actions"${bind(args, INPUTS)} (actionClick)="actionClick($event)" (search)="search($event)" (cancel)="cancel($event)" (primary)="primary($event)" (secondary)="secondary($event)" />
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Tall: Story = { args: { height: '420px' } };
export const Full: Story = { args: { height: '100%' } };
export const Search: Story = { args: { showSearch: true } };
export const TwoButtons: Story = { args: { secondaryLabel: 'Cancelar' } };
export const NoHandle: Story = { args: { showHandle: false } };
