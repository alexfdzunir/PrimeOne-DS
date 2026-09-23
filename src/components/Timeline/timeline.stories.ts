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
    storyOrder: ['Default', 'Left', 'Alternate', 'Opposite', 'Horizontal', 'HorizontalTop', 'Icons'],
  },
  args: {
    opposite: false,
    icons: false,
  },
  argTypes: {
    align: { control: 'select', options: [undefined, 'left', 'right', 'alternate', 'top', 'bottom'], description: 'Position of the timeline bar relative to the content.' },
    layout: { control: 'inline-radio', options: [undefined, 'horizontal', 'vertical'], description: 'Orientation of the timeline.' },
    opposite: { control: 'boolean', description: 'Fechas en el lado opuesto (variante Opposite de Figma).' },
    icons: { control: 'boolean', description: 'Marcador propio de 2rem con el icono del evento.' },
  },
  render: (args) => ({
    props: { ...args, events: TIMELINE_EVENTS },
    template: `
      <p-timeline [value]="events" [style.align-items]="layout === 'horizontal' && align !== 'alternate' ? (align === 'bottom' ? 'flex-end' : 'flex-start') : null" [style.line-height]="icons && layout !== 'horizontal' ? '2rem' : null"${bind(args, INPUTS)}>
        ${args['icons'] ? '<ng-template #marker let-event>\n    <span style="display: grid; place-items: center; flex: 0 0 auto; aspect-ratio: 1; width: 2rem; min-width: 2rem; height: 2rem; min-height: 2rem; border-radius: 50%; background: var(--p-primary-color); color: var(--p-primary-contrast-color)"><i [class]="event.icon"></i></span>\n  </ng-template>' : ''}
        <ng-template #content let-event>${args['layout'] === 'horizontal' ? '<div style="min-width: 5.5rem">{{ event.status }}</div>' : '{{ event.status }}'}</ng-template>
        ${args['opposite'] ? '<ng-template #opposite let-event>{{ event.date }}</ng-template>' : ''}
      </p-timeline>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Left: Story = { args: { align: 'right' } };
export const Alternate: Story = { args: { align: 'alternate' } };
export const Opposite: Story = { args: { opposite: true, align: 'right' } };
export const Horizontal: Story = { args: { layout: 'horizontal', align: 'top' } };
export const HorizontalTop: Story = { args: { layout: 'horizontal', align: 'bottom' } };
export const Icons: Story = { args: { icons: true, opposite: true } };
