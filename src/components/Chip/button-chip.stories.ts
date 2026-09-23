import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Button } from 'primeng/button';

const meta: Meta = {
  title: 'Misc/ButtonChip',
  decorators: [moduleMetadata({ imports: [Button] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Active', 'IconRight', 'NoIcon'],
    docs: { description: { component: 'Chip de filtro del DS (Figma `buttonchip`): botón pequeño redondeado, contorneado en reposo y relleno activo.' } },
  },
  args: {
    label: 'Filtro',
    active: false,
    iconLeft: 'ph ph-funnel',
    iconRight: undefined,
  },
  argTypes: {
    label: { control: 'text' },
    active: { control: 'boolean', description: 'Estado activo (Figma: State=Active).' },
    iconLeft: { control: 'text', description: 'Icono izquierdo (Figma: Show Icon Left).' },
    iconRight: { control: 'text', description: 'Icono derecho (Figma: Show Icon Right).' },
  },
  render: (args) => ({
    props: args,
    template: `<p-button [label]="label" [icon]="iconLeft ?? iconRight" [iconPos]="!iconLeft && iconRight ? 'right' : 'left'" [rounded]="true" size="small" severity="secondary" [variant]="active ? undefined : 'outlined'" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };
export const IconRight: Story = { args: { iconLeft: undefined, iconRight: 'ph ph-caret-down' } };
export const NoIcon: Story = { args: { iconLeft: undefined } };
