import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { bind } from '../../stories/helpers';

const INPUTS = ['invalid', 'disabled', 'optionDisabled', 'unselectable', 'multiple', 'allowEmpty', 'size', 'fluid'];

const meta: Meta = {
  title: 'Form/SelectButton',
  decorators: [moduleMetadata({ imports: [FormsModule, SelectButton] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onOptionClick: fn(),
    onChange: fn(),
  },
  argTypes: {
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    optionDisabled: { control: 'text', description: 'Name of the disabled field of an option.' },
    unselectable: { control: 'boolean', description: 'Whether selection can be cleared.' },
    multiple: { control: 'boolean', description: 'When specified, allows selecting multiple values.' },
    allowEmpty: { control: 'boolean', description: 'Whether selection can not be cleared.' },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'undefined' } } },
    onOptionClick: { action: 'onOptionClick', table: { category: 'Eventos' } },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: 'week', views: [{ label: 'Día', value: 'day' }, { label: 'Semana', value: 'week' }, { label: 'Mes', value: 'month' }] },
    template: `<p-selectbutton [(ngModel)]="value" [options]="views" optionLabel="label" optionValue="value"${bind(args, INPUTS)} (onOptionClick)="onOptionClick($event)" (onChange)="onChange($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true } };
export const Small: Story = { args: { size: 'small' } };
export const Invalid: Story = { args: { invalid: true } };
