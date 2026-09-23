import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneNavbar } from './navbar';
import type { NavbarAction } from './navbar';
import { UNIR_LOGO, UNIR_LOGO_NEGATIVE } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['heading', 'showMenuButton', 'contrast', 'mobile'];
const ACTIONS: NavbarAction[] = [
  { id: 'notifications', icon: 'ph ph-bell', label: 'Notificaciones', badge: 3 },
  { id: 'messages', icon: 'ph ph-chat-circle', label: 'Mensajes' },
];

const meta: Meta = {
  title: 'Proeduca/Navbar',
  decorators: [moduleMetadata({ imports: [PrimeOneNavbar] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Contrast', 'Mobile', 'MobileContrast'],
  },
  args: {
    heading: 'Campus virtual',
    menuToggle: fn(),
    actionClick: fn(),
  },
  argTypes: {
    heading: { control: 'text' },
    showMenuButton: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    contrast: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    mobile: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    menuToggle: { action: 'menuToggle', table: { category: 'Eventos' } },
    actionClick: { action: 'actionClick', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, actions: ACTIONS, logoSrc: args['contrast'] ? UNIR_LOGO_NEGATIVE : UNIR_LOGO },
    template: `<prime-one-navbar [logo]="logoSrc" logoAlt="UNIR" [actions]="actions"${bind(args, INPUTS)} (menuToggle)="menuToggle($event)" (actionClick)="actionClick($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Contrast: Story = { args: { contrast: true } };
export const Mobile: Story = { args: { mobile: true } };
export const MobileContrast: Story = { args: { mobile: true, contrast: true } };
