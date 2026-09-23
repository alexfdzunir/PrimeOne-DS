import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ScrollTop } from 'primeng/scrolltop';
import { bind } from '../../stories/helpers';

const INPUTS = ['threshold', 'icon', 'behavior'];

const meta: Meta = {
  title: 'Misc/ScrollTop',
  decorators: [moduleMetadata({ imports: [ScrollTop] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    threshold: 100,
    icon: 'ph ph-arrow-up',
  },
  argTypes: {
    threshold: { control: 'number', description: 'Defines the threshold value of the vertical scroll position of the target to toggle the visibility.' },
    icon: { control: 'text', description: 'Name of the icon or JSX.Element for icon.' },
    behavior: { control: 'inline-radio', options: [undefined, 'auto', 'smooth'], description: 'Defines the scrolling behavior, "smooth" adds an animation and "auto" scrolls with a jump.' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 240px; overflow: auto; position: relative; border: 1px solid var(--p-content-border-color)">
        <p style="height: 900px; margin: 1rem">Desplázate hacia abajo para que aparezca el botón.</p>
        <p-scrolltop target="parent"${bind(args, INPUTS)} />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
