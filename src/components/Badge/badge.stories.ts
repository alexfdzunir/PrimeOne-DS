import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Badge } from 'primeng/badge';
import { bind } from '../../stories/helpers';

const INPUTS = ['size', 'severity', 'badgeDisabled'];

const meta: Meta = {
  title: 'Misc/Badge',
  decorators: [moduleMetadata({ imports: [Badge] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    value: '8',
  },
  argTypes: {
    size: { control: 'inline-radio', options: [undefined, 'large', 'small', 'xlarge'], description: 'Size of the badge, valid options are "large" and "xlarge".' },
    severity: { control: 'select', options: [undefined, 'contrast', 'danger', 'info', 'secondary', 'success', 'warn'], description: 'Severity type of the badge.' },
    badgeDisabled: { control: 'boolean', description: 'When specified, disables the component.' },
    value: { control: 'text', description: 'Value to display inside the badge.' },
  },
  render: (args) => ({
    props: args,
    template: `<p-badge [value]="value"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Danger: Story = { args: { severity: 'danger' } };
export const Large: Story = { args: { size: 'large' } };
export const Dot: Story = { args: { value: undefined } };
