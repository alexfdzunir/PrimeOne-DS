import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Tag } from 'primeng/tag';
import { bind } from '../../stories/helpers';

const INPUTS = ['value', 'severity', 'icon', 'rounded'];

const meta: Meta = {
  title: 'Misc/Tag',
  decorators: [moduleMetadata({ imports: [Tag] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Success', 'Danger', 'Rounded', 'Icon'],
  },
  args: {
    value: 'Nuevo',
  },
  argTypes: {
    value: { control: 'text', description: 'Value to display inside the tag.' },
    severity: { control: 'select', options: [undefined, 'contrast', 'danger', 'info', 'secondary', 'success', 'warn'], description: 'Severity type of the tag.' },
    icon: { control: 'text', description: 'Icon of the tag to display next to the value.' },
    rounded: { control: 'boolean', description: 'Whether the corners of the tag are rounded.' },
  },
  render: (args) => ({
    props: args,
    template: `<p-tag${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Success: Story = { args: { severity: 'success', value: 'Aprobado' } };
export const Danger: Story = { args: { severity: 'danger', value: 'Suspenso' } };
export const Rounded: Story = { args: { rounded: true } };
export const Icon: Story = { args: { icon: 'ph ph-star' } };
