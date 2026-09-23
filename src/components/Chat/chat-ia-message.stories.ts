import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneChatIaMessage } from './chat-ia-message';
import { bind } from '../../stories/helpers';

const INPUTS = ['showActions', 'orientation', 'mobile'];

const meta: Meta = {
  title: 'Proeduca/ChatIaMessage',
  decorators: [moduleMetadata({ imports: [PrimeOneChatIaMessage] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Right', 'NoActions', 'Mobile'],
  },
  args: {
    showActions: true,
    text: 'El tema 3 trata de las transformaciones lineales y sus matrices asociadas.',
    actionClick: fn(),
  },
  argTypes: {
    showActions: { control: 'boolean', description: 'Figma "Actionbar".', table: { defaultValue: { summary: 'false' } } },
    orientation: { control: 'inline-radio', options: [undefined, 'left', 'right'], table: { defaultValue: { summary: 'left' } } },
    mobile: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    text: { control: 'text' },
    actionClick: { action: 'actionClick', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `<prime-one-chat-ia-message${bind(args, INPUTS)} (actionClick)="actionClick($event)">{{ text }}</prime-one-chat-ia-message>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Right: Story = { args: { orientation: 'right', showActions: false } };
export const NoActions: Story = { args: { showActions: false } };
export const Mobile: Story = { args: { mobile: true } };
