import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { MeterGroup } from 'primeng/metergroup';
import { bind } from '../../stories/helpers';

const INPUTS = ['min', 'max', 'orientation', 'labelPosition', 'labelOrientation'];

const meta: Meta = {
  title: 'Misc/MeterGroup',
  decorators: [moduleMetadata({ imports: [MeterGroup] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'LabelStart', 'Vertical'],
  },
  argTypes: {
    min: { control: 'number', description: 'Mininum boundary value.' },
    max: { control: 'number', description: 'Maximum boundary value.' },
    orientation: { control: 'inline-radio', options: [undefined, 'horizontal', 'vertical'], description: 'Specifies the layout of the component, valid values are \'horizontal\' and \'vertical\'.' },
    labelPosition: { control: 'inline-radio', options: [undefined, 'end', 'start'], description: 'Specifies the label position of the component, valid values are \'start\' and \'end\'.' },
    labelOrientation: { control: 'inline-radio', options: [undefined, 'horizontal', 'vertical'], description: 'Specifies the label orientation of the component, valid values are \'horizontal\' and \'vertical\'.' },
  },
  render: (args) => ({
    props: { ...args, meters: [
        { label: 'Aprobadas', value: 45, color: 'var(--p-green-500)', icon: 'ph ph-check' },
        { label: 'En curso', value: 25, color: 'var(--p-primary-color)', icon: 'ph ph-spinner' },
        { label: 'Pendientes', value: 15, color: 'var(--p-orange-500)', icon: 'ph ph-clock' },
      ] },
    template: `<p-metergroup [value]="meters"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const LabelStart: Story = { args: { labelPosition: 'start' } };
export const Vertical: Story = { args: { orientation: 'vertical', labelOrientation: 'vertical' } };
