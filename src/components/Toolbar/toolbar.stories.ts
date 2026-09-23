import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

const meta: Meta = {
  title: 'Panel/Toolbar',
  decorators: [moduleMetadata({ imports: [Toolbar, Button, IconField, InputIcon, InputText] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'NoSearch', 'NoBorder'],
  },
  args: {
    search: true,
    border: true,
  },
  argTypes: {
    search: { control: 'boolean', description: 'Buscador central (Show Search en Figma).' },
    border: { control: 'boolean', description: 'Borde de la barra (Border en Figma).' },
  },
  render: (args) => ({
    props: { ...args, actions: [
        { icon: 'ph ph-plus', label: 'Nuevo' },
        { icon: 'ph ph-arrows-clockwise', label: 'Actualizar' },
        { icon: 'ph ph-download-simple', label: 'Descargar' },
        { icon: 'ph ph-code', label: 'Insertar código' },
        { icon: 'ph ph-share-network', label: 'Compartir' },
      ] },
    template: `
      <p-toolbar [style.border]="border ? null : 'none'">
        <ng-template #start>
          <div class="sb-row" style="gap: 0.25rem">
            @for (action of actions; track action.icon) {
              <p-button [icon]="action.icon" severity="secondary" variant="text" [ariaLabel]="action.label" />
            }
          </div>
        </ng-template>
        <ng-template #center>
          @if (search) {
            <p-iconfield>
              <p-inputicon class="ph ph-magnifying-glass" />
              <input pInputText placeholder="Buscar" />
            </p-iconfield>
          }
        </ng-template>
        <ng-template #end>
          <div class="sb-row" style="gap: 0.25rem">
            <p-button icon="ph ph-funnel" severity="secondary" variant="text" ariaLabel="Filtrar" />
            <p-button icon="ph ph-dots-three-vertical" severity="secondary" variant="text" ariaLabel="Más acciones" />
            <p-button label="Guardar" icon="ph ph-floppy-disk" />
          </div>
        </ng-template>
      </p-toolbar>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const NoSearch: Story = { args: { search: false } };
export const NoBorder: Story = { args: { border: false } };
