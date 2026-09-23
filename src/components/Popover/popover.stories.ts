import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Popover } from 'primeng/popover';
import { Button } from 'primeng/button';
import { bind } from '../../stories/helpers';

const INPUTS = ['dismissable', 'focusOnShow'];

const meta: Meta = {
  title: 'Overlay/Popover',
  decorators: [moduleMetadata({ imports: [Popover, Button] })],
  parameters: {
    controls: { expanded: true },
    docs: { story: { inline: false, height: '300px' } },
  },
  args: {
    content: 'Contenido flotante con acciones o información contextual.',
    onShow: fn(),
    onHide: fn(),
  },
  argTypes: {
    dismissable: { control: 'boolean', description: 'Enables to hide the overlay when outside is clicked.' },
    focusOnShow: { control: 'boolean', description: 'When enabled, first button receives focus on show.' },
    content: { control: 'text' },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
    onHide: { action: 'onHide', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-button label="Mostrar popover" (onClick)="popover.toggle($event)" />
      <p-popover #popover${bind(args, INPUTS)} (onShow)="onShow($event)" (onHide)="onHide($event)">
        <div class="sb-stack" style="max-width: 18rem">
          <strong>Información</strong>
          <span>{{ content }}</span>
        </div>
      </p-popover>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
