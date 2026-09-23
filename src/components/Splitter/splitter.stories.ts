import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Splitter } from 'primeng/splitter';
import { bind } from '../../stories/helpers';

const INPUTS = ['layout', 'gutterSize', 'step'];

const meta: Meta = {
  title: 'Panel/Splitter',
  decorators: [moduleMetadata({ imports: [Splitter] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onResizeEnd: fn(),
  },
  argTypes: {
    layout: { control: 'inline-radio', options: [undefined, 'horizontal', 'vertical'], description: 'Orientation of the panels.' },
    gutterSize: { control: 'number', description: 'Size of the divider in pixels.' },
    step: { control: 'number', description: 'Step factor to increment/decrement the size of the panels while pressing the arrow keys.' },
    onResizeEnd: { action: 'onResizeEnd', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-splitter [style]="{ height: '280px' }" [panelSizes]="[30, 70]"${bind(args, INPUTS)} (onResizeEnd)="onResizeEnd($event)">
        <ng-template #panel><div style="display: grid; place-items: center; width: 100%">Panel 1</div></ng-template>
        <ng-template #panel><div style="display: grid; place-items: center; width: 100%">Panel 2</div></ng-template>
      </p-splitter>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Vertical: Story = { args: { layout: 'vertical' } };
export const WideGutter: Story = { args: { gutterSize: 12 } };
