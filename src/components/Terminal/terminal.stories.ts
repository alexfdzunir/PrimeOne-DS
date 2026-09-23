import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Terminal, TerminalService } from 'primeng/terminal';
import { TerminalResponder } from '../../stories/demo';
import { bind } from '../../stories/helpers';

const INPUTS = ['welcomeMessage', 'prompt'];

const meta: Meta = {
  title: 'Misc/Terminal',
  decorators: [moduleMetadata({ imports: [Terminal, TerminalResponder], providers: [TerminalService] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    welcomeMessage: 'PrimeOne Terminal. Escribe help',
    prompt: 'unir $',
  },
  argTypes: {
    welcomeMessage: { control: 'text', description: 'Initial text to display on terminal.' },
    prompt: { control: 'text', description: 'Prompt text for each command.' },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-terminal #terminal${bind(args, INPUTS)} />
      <po-terminal-responder [terminal]="terminal" />
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
