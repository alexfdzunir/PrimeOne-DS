import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Stepper, StepList, Step, StepPanels, StepPanel } from 'primeng/stepper';
import { Button } from 'primeng/button';

const meta: Meta = {
  title: 'Panel/Stepper',
  decorators: [moduleMetadata({ imports: [Stepper, StepList, Step, StepPanels, StepPanel, Button] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    value: 1,
    linear: false,
  },
  argTypes: {
    value: { control: 'number', description: 'A model that can hold a numeric value or be undefined.', table: { defaultValue: { summary: 'undefined' } } },
    linear: { control: 'boolean', description: 'When enabled, steps can only be completed in order.' },
  },
  render: (args) => ({
    props: { ...args, steps: [
        { value: 1, label: 'Datos', content: 'Introduce tus datos personales.' },
        { value: 2, label: 'Documentación', content: 'Adjunta la documentación requerida.' },
        { value: 3, label: 'Confirmación', content: 'Revisa y confirma la solicitud.' },
      ] },
    template: `
      <p-stepper [linear]="linear">
        <p-step-list>
          @for (step of steps; track step.value) {
            <p-step [value]="step.value">{{ step.label }}</p-step>
          }
        </p-step-list>
        <p-step-panels>
          @for (step of steps; track step.value; let first = $first, last = $last) {
            <p-step-panel [value]="step.value">
              <ng-template #content let-activateCallback="activateCallback">
                <p>{{ step.content }}</p>
                <div class="sb-row">
                  @if (!first) {
                    <p-button label="Anterior" severity="secondary" (onClick)="activateCallback(step.value - 1)" />
                  }
                  @if (!last) {
                    <p-button label="Siguiente" (onClick)="activateCallback(step.value + 1)" />
                  }
                </div>
              </ng-template>
            </p-step-panel>
          }
        </p-step-panels>
      </p-stepper>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Linear: Story = { args: { linear: true } };
