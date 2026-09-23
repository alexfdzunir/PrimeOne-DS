import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneNavbar } from './navbar';
import type { NavbarAction } from './navbar';
import { bind } from '../../stories/helpers';

const INPUTS = ['heading', 'logo', 'logoAlt', 'showMenuButton', 'contrast', 'mobile'];
const ACTIONS: NavbarAction[] = [
  { id: 'notifications', icon: 'ph ph-bell', label: 'Notificaciones', badge: 3 },
  { id: 'messages', icon: 'ph ph-chat-circle', label: 'Mensajes' },
];

const meta: Meta = {
  title: 'Proeduca/Navbar',
  decorators: [moduleMetadata({ imports: [PrimeOneNavbar] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    heading: 'Campus virtual',
    menuToggle: fn(),
    actionClick: fn(),
  },
  argTypes: {
    heading: { control: 'text' },
    logo: { control: 'text', description: 'Brand image URL (UNIR, Qualentum...).' },
    logoAlt: { control: 'text', table: { defaultValue: { summary: 'Logotipo' } } },
    showMenuButton: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    contrast: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    mobile: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    menuToggle: { action: 'menuToggle', table: { category: 'Eventos' } },
    actionClick: { action: 'actionClick', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, actions: ACTIONS },
    template: `<prime-one-navbar [actions]="actions"${bind(args, INPUTS)} (menuToggle)="menuToggle($event)" (actionClick)="actionClick($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Contrast: Story = { args: { contrast: true } };
export const Mobile: Story = { args: { mobile: true } };
