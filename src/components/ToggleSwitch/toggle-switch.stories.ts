import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { bind } from '../../stories/helpers';

const INPUTS = ['invalid', 'disabled', 'readonly', 'size'];

const meta: Meta = {
  title: 'Form/ToggleSwitch',
  decorators: [moduleMetadata({ imports: [FormsModule, ToggleSwitch] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onChange: fn(),
  },
  argTypes: {
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    readonly: { control: 'boolean', description: 'When present, it specifies that the component cannot be edited.' },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: true },
    template: `<p-toggleswitch [(ngModel)]="value"${bind(args, INPUTS)} (onChange)="onChange($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };
