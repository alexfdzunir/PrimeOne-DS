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
  },
  args: {
    icon: 'ph ph-user',
    placeholder: 'Usuario',
    suffix: '@unir.net',
  },
  argTypes: {
    icon: { control: 'text' },
    placeholder: { control: 'text' },
    suffix: { control: 'text' },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <p-inputgroup>
        <p-inputgroup-addon><i [class]="icon"></i></p-inputgroup-addon>
        <input pInputText [(ngModel)]="value" [placeholder]="placeholder" />
        <p-inputgroup-addon>{{ suffix }}</p-inputgroup-addon>
      </p-inputgroup>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
