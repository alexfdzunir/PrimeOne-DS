import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { bind } from '../../stories/helpers';

const INPUTS = ['invalid', 'disabled', 'readonly', 'stars', 'iconOnClass', 'iconOffClass'];

const meta: Meta = {
  title: 'Form/Rating',
  decorators: [moduleMetadata({ imports: [FormsModule, Rating] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onRate: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    readonly: { control: 'boolean', description: 'When present, changing the value is not possible.' },
    stars: { control: 'number', description: 'Number of stars.' },
    iconOnClass: { control: 'text', description: 'Style class of the on icon.' },
    iconOffClass: { control: 'text', description: 'Style class of the off icon.' },
    onRate: { action: 'onRate', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: 3 },
    template: `<p-rating [(ngModel)]="value"${bind(args, INPUTS)} (onRate)="onRate($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Ten: Story = { args: { stars: 10 } };
export const ReadOnly: Story = { args: { readonly: true } };
