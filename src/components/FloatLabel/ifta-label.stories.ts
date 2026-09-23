import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';

const meta: Meta = {
  title: 'Form/IftaLabel',
  decorators: [moduleMetadata({ imports: [FormsModule, IftaLabel, InputText] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    label: 'Correo electrónico',
  },
  argTypes: {
    label: { control: 'text' },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <p-iftalabel>
        <input pInputText id="po-ifta" [(ngModel)]="value" autocomplete="off" />
        <label for="po-ifta">{{ label }}</label>
      </p-iftalabel>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
