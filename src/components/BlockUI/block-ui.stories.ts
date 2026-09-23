import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { BlockUI } from 'primeng/blockui';
import { Panel } from 'primeng/panel';
import { bind } from '../../stories/helpers';

const INPUTS = ['blocked'];

const meta: Meta = {
  title: 'Misc/BlockUI',
  decorators: [moduleMetadata({ imports: [BlockUI, Panel] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    blocked: true,
    content: 'Contenido de ejemplo del componente. Cambia los controles del panel inferior para ver su comportamiento real con los tokens del tema seleccionado.',
  },
  argTypes: {
    blocked: { control: 'boolean', description: 'Current blocked state as a boolean.' },
    content: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-blockui [target]="panel"${bind(args, INPUTS)} />
      <p-panel #panel header="Panel bloqueable">
        <p style="margin: 0">{{ content }}</p>
      </p-panel>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
