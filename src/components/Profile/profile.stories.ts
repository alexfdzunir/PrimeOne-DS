import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneProfile } from './profile';
import { bind } from '../../stories/helpers';

const INPUTS = ['name', 'image', 'linkLabel', 'contrast', 'showToggle', 'expanded'];

const meta: Meta = {
  title: 'Proeduca/Profile',
  decorators: [moduleMetadata({ imports: [PrimeOneProfile] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Expanded', 'Contrast'],
  },
  args: {
    name: 'Laura Martín',
    editProfile: fn(),
    toggle: fn(),
  },
  argTypes: {
    name: { control: 'text' },
    image: { control: 'text' },
    linkLabel: { control: 'text', table: { defaultValue: { summary: 'Editar perfil' } } },
    contrast: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    showToggle: { control: 'boolean', description: 'Chevron action (Figma "Icon Right").', table: { defaultValue: { summary: 'true' } } },
    expanded: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    editProfile: { action: 'editProfile', table: { category: 'Eventos' } },
    toggle: { action: 'toggle', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 18rem">
        <prime-one-profile${bind(args, INPUTS)} (editProfile)="editProfile($event)" (toggle)="toggle($event)" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Expanded: Story = { args: { expanded: true } };
export const Contrast: Story = { args: { contrast: true } };
