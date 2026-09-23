import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Divider } from 'primeng/divider';
import { bind } from '../../stories/helpers';

const INPUTS = ['layout', 'type', 'align'];

const meta: Meta = {
  title: 'Panel/Divider',
  decorators: [moduleMetadata({ imports: [Divider] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Dashed', 'Left', 'Right', 'Vertical', 'VerticalTop', 'VerticalBottom'],
  },
  args: {
    content: 'O',
  },
  argTypes: {
    layout: { control: 'inline-radio', options: [undefined, 'horizontal', 'vertical'], description: 'Specifies the orientation.' },
    type: { control: 'inline-radio', options: [undefined, 'dashed', 'dotted', 'solid'], description: 'Border style type.' },
    align: { control: 'select', options: [undefined, 'bottom', 'center', 'left', 'right', 'top'], description: 'Alignment of the content.' },
    content: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div [style.display]="layout === 'vertical' ? 'flex' : 'block'" style="gap: 1rem; min-height: 6rem">
        <p style="margin: 0">Contenido anterior al separador.</p>
        <p-divider${bind(args, INPUTS)}>
          @if (content) {
            <b>{{ content }}</b>
          }
        </p-divider>
        <p style="margin: 0">Contenido posterior al separador.</p>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Dashed: Story = { args: { type: 'dashed', content: '' } };
export const Left: Story = { args: { align: 'left', content: 'Sección' } };
export const Right: Story = { args: { align: 'right', content: 'Sección' } };
export const Vertical: Story = { args: { layout: 'vertical' } };
export const VerticalTop: Story = { args: { layout: 'vertical', align: 'top' } };
export const VerticalBottom: Story = { args: { layout: 'vertical', align: 'bottom' } };
