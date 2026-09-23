import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { bind } from '../../stories/helpers';

const INPUTS = ['header', 'subheader'];

const meta: Meta = {
  title: 'Panel/Card',
  decorators: [moduleMetadata({ imports: [Card, Button] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    header: 'Álgebra lineal',
    subheader: 'Grado en Matemáticas',
    content: 'Contenido de ejemplo del componente. Cambia los controles del panel inferior para ver su comportamiento real con los tokens del tema seleccionado.',
    showFooter: true,
  },
  argTypes: {
    header: { control: 'text', description: 'Header of the card.' },
    subheader: { control: 'text', description: 'Subheader of the card.' },
    content: { control: 'text' },
    showFooter: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-card [style]="{ maxWidth: '26rem' }"${bind(args, INPUTS)}>
        <p style="margin: 0">{{ content }}</p>
        <ng-template #footer>
          @if (showFooter) {
            <div class="sb-row">
              <p-button label="Cancelar" severity="secondary" variant="outlined" />
              <p-button label="Ver asignatura" />
            </div>
          }
        </ng-template>
      </p-card>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Simple: Story = { args: { subheader: undefined, showFooter: false } };
