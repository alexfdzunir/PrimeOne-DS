import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from 'primeng/inputtext';

const meta: Meta = {
  title: 'Form/InputGroup',
  decorators: [moduleMetadata({ imports: [FormsModule, InputGroup, InputGroupAddon, InputText] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Left', 'Right', 'TextAddons', 'Multiple'],
  },
  args: {
    icon: 'ph ph-user',
    prefix: '',
    placeholder: 'Usuario',
    suffix: '@unir.net',
  },
  argTypes: {
    icon: { control: 'text', description: 'Addon de icono a la izquierda. Vacío, no se muestra.' },
    prefix: { control: 'text', description: 'Addon de texto a la izquierda. Vacío, no se muestra.' },
    placeholder: { control: 'text' },
    suffix: { control: 'text', description: 'Addon de texto a la derecha. Vacío, no se muestra.' },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <p-inputgroup>
        @if (icon) {
          <p-inputgroup-addon><i [class]="icon"></i></p-inputgroup-addon>
        }
        @if (prefix) {
          <p-inputgroup-addon>{{ prefix }}</p-inputgroup-addon>
        }
        <input pInputText [(ngModel)]="value" [placeholder]="placeholder" />
        @if (suffix) {
          <p-inputgroup-addon>{{ suffix }}</p-inputgroup-addon>
        }
      </p-inputgroup>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Left: Story = { args: { suffix: '' } };
export const Right: Story = { args: { icon: '' } };
export const TextAddons: Story = { args: { icon: '', prefix: 'https://', placeholder: 'campus', suffix: '.unir.net' } };
export const Multiple: Story = { args: { icon: 'ph ph-globe', prefix: 'https://', placeholder: 'campus', suffix: '.unir.net' } };
