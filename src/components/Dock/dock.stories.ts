import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Dock } from 'primeng/dock';
import { bind } from '../../stories/helpers';

const INPUTS = ['position'];

const meta: Meta = {
  title: 'Menu/Dock',
  decorators: [moduleMetadata({ imports: [Dock] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Top', 'Left', 'Right'],
  },
  args: {
    position: 'bottom',
  },
  argTypes: {
    position: { control: 'inline-radio', options: ['bottom', 'left', 'right', 'top'], description: 'Position of element.' },
  },
  render: (args) => ({
    props: { ...args, items: [
        { label: 'Inicio', icon: 'ph ph-house-line' },
        { label: 'Calendario', icon: 'ph ph-calendar-blank' },
        { label: 'Mensajes', icon: 'ph ph-chat-circle' },
        { label: 'Ajustes', icon: 'ph ph-gear' },
      ] },
    template: `
      <div style="position: relative; height: 320px; border: 1px dashed var(--p-content-border-color); border-radius: var(--p-content-border-radius)">
        <p-dock [model]="items"${bind(args, INPUTS)}>
          <ng-template #item let-item>
            <i [class]="item.icon" [attr.aria-label]="item.label" style="font-size: 2rem"></i>
          </ng-template>
        </p-dock>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Top: Story = { args: { position: 'top' } };
export const Left: Story = { args: { position: 'left' } };
export const Right: Story = { args: { position: 'right' } };
