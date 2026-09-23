import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Menubar } from 'primeng/menubar';
import { Button } from 'primeng/button';
import { MENU_ITEMS } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['autoDisplay', 'autoHide', 'autoHideDelay'];

const meta: Meta = {
  title: 'Menu/Menubar',
  decorators: [moduleMetadata({ imports: [Menubar, Button] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Mobile', 'AutoDisplay'],
    docs: { story: { inline: false, height: '320px' } },
  },
  args: {
    mobileMenu: false,
  },
  argTypes: {
    autoDisplay: { control: 'boolean', description: 'Whether to show a root submenu on mouse over.', table: { defaultValue: { summary: 'true' } } },
    autoHide: { control: 'boolean', description: 'Whether to hide a root submenu when mouse leaves.' },
    autoHideDelay: { control: 'number', description: 'Delay to hide the root submenu in milliseconds when mouse leaves.' },
    mobileMenu: { control: 'boolean', description: 'Menú hamburguesa en cualquier ancho (Figma: Display=Mobile).' },
  },
  render: (args) => ({
    props: { ...args, items: MENU_ITEMS },
    template: `
      <p-menubar [model]="items" [breakpoint]="mobileMenu ? '100000px' : '960px'"${bind(args, INPUTS)}>
        <ng-template #start><strong style="padding: 0 0.5rem">PrimeOne</strong></ng-template>
        <ng-template #end><p-button icon="ph ph-user" [rounded]="true" variant="text" ariaLabel="Perfil" /></ng-template>
      </p-menubar>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Mobile: Story = { args: { mobileMenu: true } };
export const AutoDisplay: Story = { args: { autoDisplay: true } };
