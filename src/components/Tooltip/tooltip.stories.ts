import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Tooltip } from 'primeng/tooltip';
import { Button } from 'primeng/button';
import { bind } from '../../stories/helpers';

const INPUTS = ['tooltipEvent', 'escape', 'showDelay', 'hideDelay', 'life', 'autoHide', 'fitContent', 'hideOnEscape'];

const meta: Meta = {
  title: 'Overlay/Tooltip',
  decorators: [moduleMetadata({ imports: [Tooltip, Button] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Focus', 'Delay'],
  },
  args: {
    tooltip: 'Información adicional',
    tooltipPosition: 'top',
  },
  argTypes: {
    tooltipPosition: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'], description: 'Position of the tooltip.' },
    tooltipEvent: { control: 'inline-radio', options: [undefined, 'both', 'focus', 'hover'], description: 'Event to show the tooltip.' },
    escape: { control: 'boolean', description: 'By default the tooltip contents are rendered as text. Set to false to support html tags in the content.' },
    showDelay: { control: 'number', description: 'Delay to show the tooltip in milliseconds.' },
    hideDelay: { control: 'number', description: 'Delay to hide the tooltip in milliseconds.' },
    life: { control: 'number', description: 'Time to wait in milliseconds to hide the tooltip even it is active.' },
    autoHide: { control: 'boolean', description: 'Whether to hide tooltip when hovering over tooltip content.' },
    fitContent: { control: 'boolean', description: 'Automatically adjusts the element position when there is not enough space on the selected position.' },
    hideOnEscape: { control: 'boolean', description: 'Whether to hide tooltip on escape key press.' },
    tooltip: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center">
        <p-button label="Pasa el ratón" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition"${bind(args, INPUTS)} />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Focus: Story = { args: { tooltipEvent: 'focus' } };
export const Delay: Story = { args: { showDelay: 500, hideDelay: 300 } };
