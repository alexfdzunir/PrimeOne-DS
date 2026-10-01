import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { Fieldset } from 'primeng/fieldset';
import { InputText } from 'primeng/inputtext';
import { PrimeOneInputPhone } from '../InputPhone/input-phone';
import { bind } from '../../stories/helpers';

const INPUTS = ['legend', 'toggleable', 'collapsed'];

const meta: Meta = {
  title: 'Panel/Fieldset',
  decorators: [moduleMetadata({ imports: [FormsModule, Fieldset, InputText, DatePicker, PrimeOneInputPhone] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Collapsed', 'Static'],
  },
  args: {
    legend: 'Datos personales',
    toggleable: true,
    onBeforeToggle: fn(),
    onAfterToggle: fn(),
  },
  argTypes: {
    legend: { control: 'text', description: 'Header text of the fieldset.' },
    toggleable: { control: 'boolean', description: 'When specified, content can toggled by clicking the legend.', table: { defaultValue: { summary: 'false' } } },
    collapsed: { control: 'boolean', description: 'Defines the initial state of content, supports one or two-way binding as well.' },
    onBeforeToggle: { action: 'onBeforeToggle', table: { category: 'Eventos' } },
    onAfterToggle: { action: 'onAfterToggle', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    // As in Figma: a form group with name, surnames, birth date, email and phone
    props: { ...args, form: { name: '', surnames: '', birthDate: null, email: '', phone: '' } },
    template: `
      <div style="max-width: 36rem">
        <p-fieldset${bind(args, INPUTS)} (onBeforeToggle)="onBeforeToggle($event)" (onAfterToggle)="onAfterToggle($event)">
          <div style="display: flex; flex-direction: column; gap: 1rem">
            <input pInputText [(ngModel)]="form.name" placeholder="Introduce tu nombre" aria-label="Nombre" autocomplete="given-name" [fluid]="true" />
            <input pInputText [(ngModel)]="form.surnames" placeholder="Introduce tus apellidos" aria-label="Apellidos" autocomplete="family-name" [fluid]="true" />
            <p-datepicker [(ngModel)]="form.birthDate" placeholder="Fecha de nacimiento" ariaLabel="Fecha de nacimiento" [showIcon]="true" iconDisplay="input" dateFormat="dd/mm/yy" [fluid]="true" />
            <input pInputText type="email" [(ngModel)]="form.email" placeholder="Introduce tu email" aria-label="Email" autocomplete="email" [fluid]="true" />
            <prime-one-inputphone [(ngModel)]="form.phone" />
          </div>
        </p-fieldset>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
export const Static: Story = { args: { toggleable: false } };
