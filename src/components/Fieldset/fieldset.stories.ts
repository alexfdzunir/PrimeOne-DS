import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Fieldset } from 'primeng/fieldset';
import { bind } from '../../stories/helpers';

const INPUTS = ['legend', 'toggleable', 'collapsed'];

const meta: Meta = {
  title: 'Panel/Fieldset',
  decorators: [moduleMetadata({ imports: [Fieldset] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    legend: 'Datos personales',
    toggleable: true,
    content: 'Contenido de ejemplo del componente. Cambia los controles del panel inferior para ver su comportamiento real con los tokens del tema seleccionado.',
    onBeforeToggle: fn(),
    onAfterToggle: fn(),
  },
  argTypes: {
    legend: { control: 'text', description: 'Header text of the fieldset.' },
    toggleable: { control: 'boolean', description: 'When specified, content can toggled by clicking the legend.', table: { defaultValue: { summary: 'false' } } },
    collapsed: { control: 'boolean', description: 'Defines the initial state of content, supports one or two-way binding as well.' },
    content: { control: 'text' },
    onBeforeToggle: { action: 'onBeforeToggle', table: { category: 'Eventos' } },
    onAfterToggle: { action: 'onAfterToggle', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-fieldset${bind(args, INPUTS)} (onBeforeToggle)="onBeforeToggle($event)" (onAfterToggle)="onAfterToggle($event)">
        <p style="margin: 0">{{ content }}</p>
      </p-fieldset>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
export const Static: Story = { args: { toggleable: false } };
