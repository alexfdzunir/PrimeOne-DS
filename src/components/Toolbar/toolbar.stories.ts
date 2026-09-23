import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { ACTION_ITEMS } from '../../stories/data';

const meta: Meta = {
  title: 'Panel/Toolbar',
  decorators: [moduleMetadata({ imports: [Toolbar, Button, SplitButton] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    title: 'Documento sin título',
  },
  argTypes: {
    title: { control: 'text' },
  },
  render: (args) => ({
    props: { ...args, items: ACTION_ITEMS },
    template: `
      <p-toolbar>
        <ng-template #start>
          <div class="sb-row">
            <p-button icon="ph ph-plus" label="Nuevo" />
            <p-button icon="ph ph-printer" severity="secondary" variant="text" [rounded]="true" ariaLabel="Imprimir" />
          </div>
        </ng-template>
        <ng-template #center>
          <strong>{{ title }}</strong>
        </ng-template>
        <ng-template #end>
          <p-splitbutton label="Guardar" icon="ph ph-floppy-disk" [model]="items" />
        </ng-template>
      </p-toolbar>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
