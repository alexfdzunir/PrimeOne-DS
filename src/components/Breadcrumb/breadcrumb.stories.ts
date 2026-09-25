import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Breadcrumb } from 'primeng/breadcrumb';

const meta: Meta = {
  title: 'Menu/Breadcrumb',
  decorators: [moduleMetadata({ imports: [Breadcrumb] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onItemClick: fn(),
  },
  argTypes: {
    onItemClick: { action: 'onItemClick', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, home: { icon: 'ph ph-house-line' }, items: [{ label: 'Estudios' }, { label: 'Grados', icon: 'ph ph-graduation-cap' }, { label: 'Informática' }] },
    template: `<p-breadcrumb [home]="home" [model]="items" (onItemClick)="onItemClick($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
