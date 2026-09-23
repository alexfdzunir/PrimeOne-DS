import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { bind } from '../../stories/helpers';

const INPUTS = ['iconPosition'];

const meta: Meta = {
  title: 'Form/IconField',
  decorators: [moduleMetadata({ imports: [FormsModule, InputText, IconField, InputIcon] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    icon: 'ph ph-magnifying-glass',
    placeholder: 'Buscar',
  },
  argTypes: {
    iconPosition: { control: 'inline-radio', options: [undefined, 'left', 'right'], description: 'Position of the icon.' },
    icon: { control: 'text' },
    placeholder: { control: 'text' },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <p-iconfield${bind(args, INPUTS)}>
        <p-inputicon [class]="icon" />
        <input pInputText [(ngModel)]="value" [placeholder]="placeholder" />
      </p-iconfield>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Right: Story = { args: { iconPosition: 'right' } };
