import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ConfirmTrigger } from '../../stories/demo';

const meta: Meta = {
  title: 'Overlay/ConfirmPopup',
  decorators: [moduleMetadata({ imports: [ConfirmPopup, ConfirmTrigger] })],
  parameters: {
    controls: { expanded: true },
    docs: { story: { inline: false, height: '300px' } },
  },
  args: {
    message: '¿Quieres continuar?',
    icon: 'ph ph-question',
    acceptLabel: 'Sí',
    rejectLabel: 'No',
    accepted: fn(),
    rejected: fn(),
  },
  argTypes: {
    message: { control: 'text' },
    icon: { control: 'text' },
    acceptLabel: { control: 'text' },
    rejectLabel: { control: 'text' },
    accepted: { action: 'accepted', table: { category: 'Eventos' } },
    rejected: { action: 'rejected', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding-top: 8rem">
        <p-confirmpopup />
        <po-confirm-trigger label="Continuar" severity="secondary" [message]="message" [icon]="icon" [acceptLabel]="acceptLabel" [rejectLabel]="rejectLabel" (accepted)="accepted($event)" (rejected)="rejected($event)" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
