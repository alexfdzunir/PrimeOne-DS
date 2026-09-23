import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'primeng/accordion';
import { bind } from '../../stories/helpers';

const INPUTS = ['multiple', 'expandIcon', 'collapseIcon', 'selectOnFocus'];

const meta: Meta = {
  title: 'Panel/Accordion',
  decorators: [moduleMetadata({ imports: [Accordion, AccordionPanel, AccordionHeader, AccordionContent] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onOpen: fn(),
    onClose: fn(),
  },
  argTypes: {
    multiple: { control: 'boolean', description: 'When enabled, multiple tabs can be activated at the same time.', table: { defaultValue: { summary: 'false' } } },
    expandIcon: { control: 'text', description: 'Icon of a collapsed tab.' },
    collapseIcon: { control: 'text', description: 'Icon of an expanded tab.' },
    selectOnFocus: { control: 'boolean', description: 'When enabled, the focused tab is activated.', table: { defaultValue: { summary: 'false' } } },
    onOpen: { action: 'onOpen', table: { category: 'Eventos' } },
    onClose: { action: 'onClose', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: '0', tabs: [
        { value: '0', title: 'Matrícula', content: 'Plazos, documentación y formas de pago.' },
        { value: '1', title: 'Evaluación', content: 'Evaluación continua y examen final.' },
        { value: '2', title: 'Titulación', content: 'Solicitud y expedición del título.', disabled: true },
      ] },
    template: `
      <p-accordion [value]="value"${bind(args, INPUTS)} (onOpen)="onOpen($event)" (onClose)="onClose($event)">
        @for (tab of tabs; track tab.value) {
          <p-accordion-panel [value]="tab.value" [disabled]="tab.disabled ?? false">
            <p-accordion-header>{{ tab.title }}</p-accordion-header>
            <p-accordion-content>
              <p style="margin: 0">{{ tab.content }}</p>
            </p-accordion-content>
          </p-accordion-panel>
        }
      </p-accordion>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true } };
