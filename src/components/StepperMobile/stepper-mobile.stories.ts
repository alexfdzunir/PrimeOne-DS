import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PrimeOneStepperMobile } from './stepper-mobile';
import type { StepperMobileStep } from './stepper-mobile';
import { bind } from '../../stories/helpers';

const INPUTS = ['activeStep'];
const STEPS: StepperMobileStep[] = [
  { title: 'Datos personales', description: 'Nombre y contacto' },
  { title: 'Documentación', description: 'DNI y títulos' },
  { title: 'Pago', description: 'Forma de pago' },
  { title: 'Revisión', description: 'Comprueba los datos' },
  { title: 'Firma', description: 'Firma digital' },
  { title: 'Envío', description: 'Envía la solicitud' },
  { title: 'Confirmación' },
];

const meta: Meta = {
  title: 'Proeduca/StepperMobile',
  decorators: [moduleMetadata({ imports: [PrimeOneStepperMobile] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'FirstStep', 'LastStep', 'TwoSteps', 'SevenSteps'],
  },
  args: {
    activeStep: 1,
    stepCount: 4,
  },
  argTypes: {
    activeStep: { control: 'number', description: 'Zero-based index of the current step.', table: { defaultValue: { summary: '0' } } },
    stepCount: { control: 'inline-radio', options: [2, 3, 4, 5, 6, 7], description: 'Número de pasos (Figma: Steps).' },
  },
  render: (args) => ({
    props: { ...args, steps: [...STEPS.slice(0, args['stepCount'] - 1), STEPS[STEPS.length - 1]] },
    template: `<prime-one-stepper-mobile [steps]="steps"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const FirstStep: Story = { args: { activeStep: 0 } };
export const LastStep: Story = { args: { activeStep: 3 } };
export const TwoSteps: Story = { args: { stepCount: 2, activeStep: 0 } };
export const SevenSteps: Story = { args: { stepCount: 7, activeStep: 4 } };
