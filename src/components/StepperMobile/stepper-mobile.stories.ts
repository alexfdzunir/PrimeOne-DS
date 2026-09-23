import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PrimeOneStepperMobile } from './stepper-mobile';
import type { StepperMobileStep } from './stepper-mobile';
import { bind } from '../../stories/helpers';

const INPUTS = ['activeStep'];
const STEPS: StepperMobileStep[] = [
  { title: 'Datos personales', description: 'Nombre y contacto' },
  { title: 'Documentación', description: 'DNI y títulos' },
  { title: 'Pago', description: 'Forma de pago' },
  { title: 'Confirmación' },
];

const meta: Meta = {
  title: 'Proeduca/StepperMobile',
  decorators: [moduleMetadata({ imports: [PrimeOneStepperMobile] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    activeStep: 1,
  },
  argTypes: {
    activeStep: { control: 'number', description: 'Zero-based index of the current step.', table: { defaultValue: { summary: '0' } } },
  },
  render: (args) => ({
    props: { ...args, steps: STEPS },
    template: `<prime-one-stepper-mobile [steps]="steps"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
