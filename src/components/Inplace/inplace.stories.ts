import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { Inplace } from 'primeng/inplace';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { bind } from '../../stories/helpers';

const INPUTS = ['active', 'disabled', 'preventClick'];

const meta: Meta = {
  title: 'Misc/Inplace',
  decorators: [moduleMetadata({ imports: [FormsModule, Inplace, InputText, Button] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Active', 'Disabled'],
  },
  args: {
    display: 'Haz clic para editar',
    onActivate: fn(),
    onDeactivate: fn(),
  },
  argTypes: {
    active: { control: 'boolean', description: 'Whether the content is displayed or not.' },
    disabled: { control: 'boolean', description: 'When present, it specifies that the element should be disabled.' },
    preventClick: { control: 'boolean', description: 'Allows to prevent clicking.' },
    display: { control: 'text' },
    onActivate: { action: 'onActivate', table: { category: 'Eventos' } },
    onDeactivate: { action: 'onDeactivate', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: 'Texto editable' },
    template: `
      <p-inplace${bind(args, INPUTS)} (onActivate)="onActivate($event)" (onDeactivate)="onDeactivate($event)">
        <ng-template #display>
          <span class="sb-row"><i class="ph ph-pencil-simple"></i> {{ display }}</span>
        </ng-template>
        <ng-template #content let-closeCallback="closeCallback">
          <span class="sb-row">
            <input pInputText [(ngModel)]="value" />
            <p-button icon="ph ph-x" variant="text" severity="danger" ariaLabel="Cerrar" (onClick)="closeCallback($event)" />
          </span>
        </ng-template>
      </p-inplace>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };
export const Disabled: Story = { args: { disabled: true } };
