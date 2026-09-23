import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PrimeOneChatMessage } from './chat-message';
import { bind } from '../../stories/helpers';

const INPUTS = ['author', 'time', 'orientation', 'avatar', 'showAvatar', 'showName', 'showTime', 'grouped', 'mobile'];

const meta: Meta = {
  title: 'Proeduca/ChatMessage',
  decorators: [moduleMetadata({ imports: [PrimeOneChatMessage] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    author: 'Laura Martín',
    time: '10:24',
    text: '¿Alguien tiene los apuntes del tema 3?',
  },
  argTypes: {
    author: { control: 'text' },
    time: { control: 'text' },
    orientation: { control: 'inline-radio', options: [undefined, 'left', 'right'], table: { defaultValue: { summary: 'left' } } },
    avatar: { control: 'text' },
    showAvatar: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showName: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showTime: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    grouped: { control: 'boolean', description: 'Follows a message of the same author (Figma "Group").', table: { defaultValue: { summary: 'false' } } },
    mobile: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    text: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `<prime-one-chat-message${bind(args, INPUTS)}>{{ text }}</prime-one-chat-message>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Right: Story = { args: { orientation: 'right' } };
export const Grouped: Story = { args: { grouped: true } };
export const Mobile: Story = { args: { mobile: true } };
