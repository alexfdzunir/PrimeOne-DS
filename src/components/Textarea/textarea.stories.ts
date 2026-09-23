import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { bind } from '../../stories/helpers';

const INPUTS = ['autoResize', 'pSize', 'variant', 'fluid', 'invalid'];

const meta: Meta = {
  title: 'Form/Textarea',
  decorators: [moduleMetadata({ imports: [FormsModule, Textarea] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    placeholder: 'Escribe un comentario',
    rows: 5,
    disabled: false,
    onResize: fn(),
  },
  argTypes: {
    autoResize: { control: 'boolean', description: 'When present, textarea size changes as being typed.' },
    pSize: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Defines the size of the component.' },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'undefined' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'undefined' } } },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
    onResize: { action: 'onResize', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `<textarea pTextarea [(ngModel)]="value" [placeholder]="placeholder" [rows]="rows" [disabled]="disabled"${bind(args, INPUTS)} (onResize)="onResize($event)"></textarea>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const AutoResize: Story = { args: { autoResize: true } };
export const Filled: Story = { args: { variant: 'filled' } };
export const Invalid: Story = { args: { invalid: true } };
