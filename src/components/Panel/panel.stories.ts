import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Panel } from 'primeng/panel';
import { bind } from '../../stories/helpers';

const INPUTS = ['header', 'toggleable', 'collapsed', 'iconPos', 'showHeader', 'toggler'];

const meta: Meta = {
  title: 'Panel/Panel',
  decorators: [moduleMetadata({ imports: [Panel] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Collapsed', 'HeaderToggler'],
  },
  args: {
    header: 'Encabezado',
    toggleable: true,
    content: 'Contenido de ejemplo del componente. Cambia los controles del panel inferior para ver su comportamiento real con los tokens del tema seleccionado.',
    onBeforeToggle: fn(),
    onAfterToggle: fn(),
  },
  argTypes: {
    header: { control: 'text' },
    toggleable: { control: 'boolean', description: 'Defines if content of panel can be expanded and collapsed.' },
    collapsed: { control: 'boolean', description: 'Defines the initial state of panel content, supports one or two-way binding as well.' },
    iconPos: { control: 'inline-radio', options: [undefined, 'center', 'end', 'start'], description: 'Position of the icons.' },
    showHeader: { control: 'boolean', description: 'Specifies if header of panel cannot be displayed.' },
    toggler: { control: 'inline-radio', options: [undefined, 'header', 'icon'], description: 'Specifies the toggler element to toggle the panel content.' },
    content: { control: 'text' },
    onBeforeToggle: { action: 'onBeforeToggle', table: { category: 'Eventos' } },
    onAfterToggle: { action: 'onAfterToggle', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-panel${bind(args, INPUTS)} (onBeforeToggle)="onBeforeToggle($event)" (onAfterToggle)="onAfterToggle($event)">
        <p style="margin: 0">{{ content }}</p>
      </p-panel>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
export const HeaderToggler: Story = { args: { toggler: 'header' } };
