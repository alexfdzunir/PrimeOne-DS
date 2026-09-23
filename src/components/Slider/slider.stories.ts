import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';
import { bind } from '../../stories/helpers';

const INPUTS = ['invalid', 'disabled', 'animate', 'min', 'max', 'orientation', 'step', 'range'];

const meta: Meta = {
  title: 'Form/Slider',
  decorators: [moduleMetadata({ imports: [FormsModule, Slider] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Range', 'Step', 'Vertical'],
  },
  args: {
    onChange: fn(),
    onSlideEnd: fn(),
  },
  argTypes: {
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    animate: { control: 'boolean', description: 'When enabled, displays an animation on click of the slider bar.' },
    min: { control: 'number', description: 'Mininum boundary value.' },
    max: { control: 'number', description: 'Maximum boundary value.' },
    orientation: { control: 'inline-radio', options: [undefined, 'horizontal', 'vertical'], description: 'Orientation of the slider.' },
    step: { control: 'number', description: 'Step factor to increment/decrement the value.' },
    range: { control: 'boolean', description: 'When specified, allows two boundary values to be picked.' },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
    onSlideEnd: { action: 'onSlideEnd', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: args['range'] ? [20, 80] : 50 },
    template: `
      <div style="width: 16rem; padding: 1rem">
        <p-slider [(ngModel)]="value"${bind(args, INPUTS)} (onChange)="onChange($event)" (onSlideEnd)="onSlideEnd($event)" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Range: Story = { args: { range: true } };
export const Step: Story = { args: { step: 10 } };
export const Vertical: Story = { args: { orientation: 'vertical' } };
