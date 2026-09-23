import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneInputChat } from './input-chat';
import type { ChatAttachment } from './input-chat';
import { bind } from '../../stories/helpers';

const INPUTS = ['placeholder', 'busy', 'loading', 'recording', 'recordingTime', 'transcribing', 'showAttach', 'showAudio', 'mobile', 'disabled'];
const ATTACHMENTS: ChatAttachment[] = [{ name: 'Tema 3.pdf', type: 'pdf' }];

const meta: Meta = {
  title: 'Proeduca/InputChat',
  decorators: [moduleMetadata({ imports: [PrimeOneInputChat] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    withAttachment: false,
    send: fn(),
    stop: fn(),
    attach: fn(),
    removeAttachment: fn(),
    startRecording: fn(),
    stopRecording: fn(),
    cancelRecording: fn(),
  },
  argTypes: {
    placeholder: { control: 'text', table: { defaultValue: { summary: 'Pregunta lo que quieras' } } },
    busy: { control: 'boolean', description: 'A response is being generated: shows the stop action.', table: { defaultValue: { summary: 'false' } } },
    loading: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    recording: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    recordingTime: { control: 'text', table: { defaultValue: { summary: '0:00' } } },
    transcribing: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    showAttach: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showAudio: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    mobile: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    withAttachment: { control: 'boolean' },
    send: { action: 'send', table: { category: 'Eventos' } },
    stop: { action: 'stop', table: { category: 'Eventos' } },
    attach: { action: 'attach', table: { category: 'Eventos' } },
    removeAttachment: { action: 'removeAttachment', table: { category: 'Eventos' } },
    startRecording: { action: 'startRecording', table: { category: 'Eventos' } },
    stopRecording: { action: 'stopRecording', table: { category: 'Eventos' } },
    cancelRecording: { action: 'cancelRecording', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, attachments: args['withAttachment'] ? ATTACHMENTS : [] },
    template: `<prime-one-inputchat [attachments]="attachments"${bind(args, INPUTS)} (send)="send($event)" (stop)="stop($event)" (attach)="attach($event)" (removeAttachment)="removeAttachment($event)" (startRecording)="startRecording($event)" (stopRecording)="stopRecording($event)" (cancelRecording)="cancelRecording($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Attachment: Story = { args: { withAttachment: true } };
export const Busy: Story = { args: { busy: true } };
export const Recording: Story = { args: { recording: true, recordingTime: '0:12' } };
export const Mobile: Story = { args: { mobile: true } };
