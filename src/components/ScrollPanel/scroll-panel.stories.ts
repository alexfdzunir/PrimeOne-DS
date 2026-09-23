import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ScrollPanel } from 'primeng/scrollpanel';
import { bind } from '../../stories/helpers';

const INPUTS = ['step'];

const meta: Meta = {
  title: 'Panel/ScrollPanel',
  decorators: [moduleMetadata({ imports: [ScrollPanel] })],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    step: { control: 'number', description: 'Step factor to scroll the content while pressing the arrow keys.' },
  },
  render: (args) => ({
    props: { ...args, paragraphs: Array.from({ length: 6 }, (_, i) => `Párrafo ${i + 1}. Contenido de ejemplo del componente. Cambia los controles del panel inferior para ver su comportamiento real con los tokens del tema seleccionado.`) },
    template: `
      <p-scrollpanel [style]="{ width: '100%', maxWidth: '32rem', height: '200px' }"${bind(args, INPUTS)}>
        @for (paragraph of paragraphs; track $index) {
          <p>{{ paragraph }}</p>
        }
      </p-scrollpanel>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
