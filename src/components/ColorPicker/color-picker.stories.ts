import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'primeng/colorpicker';
import { bind } from '../../stories/helpers';

const INPUTS = ['invalid', 'disabled', 'inline', 'defaultColor'];

const meta: Meta = {
  title: 'Form/ColorPicker',
  decorators: [moduleMetadata({ imports: [FormsModule, ColorPicker] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Inline'],
  },
  args: {
    onChange: fn(),
    onShow: fn(),
    onHide: fn(),
  },
  argTypes: {
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    inline: { control: 'boolean', description: 'Whether to display as an overlay or not.' },
    defaultColor: { control: 'text', description: 'Default color to display initially when model value is not present.' },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: '#0d61f2' },
    template: `<p-colorpicker [(ngModel)]="value"${bind(args, INPUTS)} (onChange)="onChange($event)" (onShow)="onShow($event)" (onHide)="onHide($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Inline: Story = { args: { inline: true } };
