import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { OverlayBadge } from 'primeng/overlaybadge';
import { bind } from '../../stories/helpers';

const INPUTS = ['severity', 'badgeSize', 'badgeDisabled'];

const meta: Meta = {
  title: 'Misc/OverlayBadge',
  decorators: [moduleMetadata({ imports: [OverlayBadge] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    value: '4',
    severity: 'danger',
  },
  argTypes: {
    severity: { control: 'select', options: ['contrast', 'danger', 'info', 'secondary', 'success', 'warn'], description: 'Severity type of the badge.' },
    badgeSize: { control: 'inline-radio', options: [undefined, 'large', 'small', 'xlarge'], description: 'Size of the badge, valid options are "large" and "xlarge".' },
    badgeDisabled: { control: 'boolean', description: 'When specified, disables the component.' },
    value: { control: 'text', description: 'Value to display inside the badge.' },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-overlaybadge [value]="value"${bind(args, INPUTS)}>
        <i class="ph ph-bell" style="font-size: 2rem"></i>
      </p-overlaybadge>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
