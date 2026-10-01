import type { Meta, StoryObj } from '@storybook/angular';
import { cx, figmaNode } from '../../stories/helpers';

const meta: Meta = {
  title: 'AEM/Status/Date Tag',
  parameters: {
    figmaUrl: figmaNode('7605:10939'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Range', 'Presencial', 'Past'],
    docs: { description: { component: 'Fecha de un evento: modalidad, día y mes (`aem-date-tag`, `--past` para los pasados).' } },
  },
  args: { type: 'single', state: 'online', time: 'upcoming', day: '10', lastDay: '21', month: 'sep 2026', schedule: '18:00 h' },
  argTypes: {
    type: { control: 'inline-radio', options: ['single', 'range'], description: 'Types en Figma: un día o un rango.' },
    state: { control: 'inline-radio', options: ['online', 'presencial'], description: 'State en Figma.' },
    time: { control: 'inline-radio', options: ['upcoming', 'past'], description: 'Time en Figma.' },
    day: { control: 'text' },
    lastDay: { control: 'text', description: 'Último día del rango.' },
    month: { control: 'text' },
    schedule: { control: 'text', description: 'Horario.' },
  },
  render: (args) => {
    const past = args['time'] === 'past';
    const state = past ? 'finalizado' : args['state'];
    const label = { online: 'Online', presencial: 'Presencial', finalizado: 'Finalizado' }[state as string];
    const range = args['type'] === 'range' ? `\n    <span class="aem-date-tag__dash">-</span>\n    <span class="aem-date-tag__day">${args['lastDay']}</span>` : '';
    return {
      template: `<div class="${cx('aem-date-tag', past && 'aem-date-tag--past')}">
  <span class="aem-state-tag aem-state-tag--${state}">${label}</span>
  <span class="aem-date-tag__date">
    <span class="aem-date-tag__day">${args['day']}</span>${range}
    <span class="aem-date-tag__meta">
      <span class="aem-date-tag__month">${args['month']}</span>
      <span class="aem-date-tag__time">${past ? (args['state'] === 'online' ? 'Online' : 'Presencial') : args['schedule']}</span>
    </span>
  </span>
</div>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Range: Story = { args: { type: 'range' } };
export const Presencial: Story = { args: { state: 'presencial' } };
export const Past: Story = { args: { time: 'past' } };
