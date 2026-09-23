import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Timeline } from 'primeng/timeline';
import { TIMELINE_EVENTS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['align', 'layout'];

const meta: Meta = {
  title: 'Data/Timeline',
  decorators: [moduleMetadata({ imports: [Timeline] })],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    align: { control: 'select', options: [undefined, 'left', 'right', 'alternate', 'top', 'bottom'], description: 'Position of the timeline bar relative to the content.' },
    layout: { control: 'inline-radio', options: [undefined, 'horizontal', 'vertical'], description: 'Orientation of the timeline.' },
  },
  render: (args) => ({
    props: { ...args, events: TIMELINE_EVENTS },
    template: `
      <p-timeline [value]="events"${bind(args, INPUTS)}>
        <ng-template #marker let-event>
          <span style="display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; background: var(--p-primary-color); color: var(--p-primary-contrast-color)">
            <i [class]="event.icon"></i>
          </span>
        </ng-template>
        <ng-template #content let-event>{{ event.status }}</ng-template>
        <ng-template #opposite let-event><small>{{ event.date }}</small></ng-template>
      </p-timeline>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Alternate: Story = { args: { align: 'alternate' } };
export const Horizontal: Story = { args: { layout: 'horizontal', align: 'top' } };
