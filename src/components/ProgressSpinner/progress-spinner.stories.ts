import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ProgressSpinner } from 'primeng/progressspinner';
import { bind } from '../../stories/helpers';

const INPUTS = ['strokeWidth', 'fill', 'animationDuration'];

const meta: Meta = {
  title: 'Misc/ProgressSpinner',
  decorators: [moduleMetadata({ imports: [ProgressSpinner] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'ExtraSmall', 'Small', 'Large', 'ExtraLarge', 'Thin'],
  },
  args: {
    strokeWidth: '4',
    spinnerSize: '32px',
  },
  argTypes: {
    strokeWidth: { control: 'text', description: 'Width of the circle stroke.' },
    fill: { control: 'color', description: 'Color for the background of the circle.' },
    animationDuration: { control: 'text', description: 'Duration of the rotate animation.' },
    spinnerSize: { control: 'inline-radio', options: ['16px', '24px', '32px', '42px', '64px'], description: 'Tamaños del DS: XS 16, S 24, M 32, L 42 y XL 64 px.' },
  },
  render: (args) => ({
    props: args,
    template: `<p-progressspinner [style.width]="spinnerSize" [style.height]="spinnerSize"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const ExtraSmall: Story = { args: { spinnerSize: '16px' } };
export const Small: Story = { args: { spinnerSize: '24px' } };
export const Large: Story = { args: { spinnerSize: '42px' } };
export const ExtraLarge: Story = { args: { spinnerSize: '64px' } };
export const Thin: Story = { args: { strokeWidth: '2', animationDuration: '.5s' } };
