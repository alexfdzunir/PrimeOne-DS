import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneSidebar } from './sidebar';
import type { SidebarSection, SidebarUser } from './sidebar';
import { bind } from '../../stories/helpers';

const INPUTS = ['logoAlt', 'collapsed', 'mobile', 'showLogout', 'logoutLabel'];
const SECTIONS: SidebarSection[] = [
  {
    primary: true,
    items: [
      { id: 'home', label: 'Inicio', icon: 'ph ph-house-line', active: true },
      { id: 'subjects', label: 'Asignaturas', icon: 'ph ph-book-open' },
      { id: 'calendar', label: 'Calendario', icon: 'ph ph-calendar-blank' },
    ],
  },
  { items: [{ id: 'help', label: 'Ayuda', icon: 'ph ph-question' }] },
];

const USER: SidebarUser = { name: 'Laura Martín' };

const meta: Meta = {
  title: 'Proeduca/Sidebar',
  decorators: [moduleMetadata({ imports: [PrimeOneSidebar] })],
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
  args: {
    itemClick: fn(),
    profileClick: fn(),
    logout: fn(),
  },
  argTypes: {
    logoAlt: { control: 'text', table: { defaultValue: { summary: 'Logotipo' } } },
    collapsed: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    mobile: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    showLogout: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    logoutLabel: { control: 'text', table: { defaultValue: { summary: 'Cerrar sesión' } } },
    itemClick: { action: 'itemClick', table: { category: 'Eventos' } },
    profileClick: { action: 'profileClick', table: { category: 'Eventos' } },
    logout: { action: 'logout', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, sections: SECTIONS, user: USER },
    template: `
      <div style="height: 560px; display: flex">
        <prime-one-sidebar [sections]="sections" [user]="user"${bind(args, INPUTS)} (itemClick)="itemClick($event)" (profileClick)="profileClick($event)" (logout)="logout($event)" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
export const Mobile: Story = { args: { mobile: true } };
