import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Panel } from 'primeng/panel';
import { Button } from 'primeng/button';
import { bind } from '../../stories/helpers';

const INPUTS = ['header', 'toggleable', 'collapsed', 'iconPos', 'showHeader', 'toggler'];

const meta: Meta = {
  title: 'Panel/Panel',
  decorators: [moduleMetadata({ imports: [Panel, Button] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Collapsed', 'HeaderToggler', 'Footer', 'CustomIcon'],
  },
  args: {
    header: 'Encabezado',
    toggleable: true,
    content: 'Contenido de ejemplo del componente. Cambia los controles del panel inferior para ver su comportamiento real con los tokens del tema seleccionado.',
    footer: '',
    customIcon: false,
    onBeforeToggle: fn(),
    onAfterToggle: fn(),
  },
  argTypes: {
    header: { control: 'text' },
    toggleable: { control: 'boolean', description: 'Defines if content of panel can be expanded and collapsed.' },
    collapsed: { control: 'boolean', description: 'Defines the initial state of panel content, supports one or two-way binding as well.' },
    iconPos: { control: 'inline-radio', options: [undefined, 'center', 'end', 'start'], description: 'Position of the icons.' },
    showHeader: { control: 'boolean', description: 'Specifies if header of panel cannot be displayed.' },
    toggler: { control: 'inline-radio', options: [undefined, 'header', 'icon'], description: 'Specifies the toggler element to toggle the panel content.' },
    content: { control: 'text' },
    footer: { control: 'text', description: 'Texto del pie (Show Footer en Figma). Vacío, sin pie.' },
    customIcon: { control: 'boolean', description: 'Acción extra en la cabecera (Custom Icon en Figma).' },
    onBeforeToggle: { action: 'onBeforeToggle', table: { category: 'Eventos' } },
    onAfterToggle: { action: 'onAfterToggle', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <p-panel${bind(args, INPUTS)} (onBeforeToggle)="onBeforeToggle($event)" (onAfterToggle)="onAfterToggle($event)">
        <p style="margin: 0">{{ content }}</p>
        ${args['customIcon'] ? '<ng-template #icons>\n    <p-button icon="ph ph-gear-six" severity="secondary" variant="text" [rounded]="true" ariaLabel="Ajustes" />\n  </ng-template>' : ''}
        ${args['footer'] ? '<ng-template #footer>{{ footer }}</ng-template>' : ''}
      </p-panel>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
export const HeaderToggler: Story = { args: { toggler: 'header' } };
export const Footer: Story = { args: { footer: 'Actualizado hace 5 minutos' } };
export const CustomIcon: Story = { args: { customIcon: true } };
