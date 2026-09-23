import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Button } from 'primeng/button';
import { bind } from '../../stories/helpers';

const INPUTS = ['label', 'icon', 'type', 'badge', 'disabled', 'raised', 'rounded', 'text', 'plain', 'outlined', 'link', 'size', 'variant', 'badgeSeverity', 'iconPos', 'loading', 'loadingIcon', 'severity', 'fluid'];

const meta: Meta = {
  title: 'Button/Button',
  decorators: [moduleMetadata({ imports: [Button] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Secondary', 'Outlined', 'Text', 'Link', 'Danger', 'IconOnly', 'Loading', 'Small', 'Large'],
  },
  args: {
    label: 'Guardar',
    icon: 'ph ph-floppy-disk',
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    label: { control: 'text', description: 'Text of the button.' },
    icon: { control: 'text', description: 'Name of the icon.' },
    type: { control: 'text', description: 'Type of the button.' },
    badge: { control: 'text', description: 'Value of the badge.' },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should be disabled.' },
    raised: { control: 'boolean', description: 'Add a shadow to indicate elevation.' },
    rounded: { control: 'boolean', description: 'Add a circular border radius to the button.' },
    text: { control: 'boolean', description: 'Add a textual class to the button without a background initially.' },
    plain: { control: 'boolean', description: 'Add a plain textual class to the button without a background initially.' },
    outlined: { control: 'boolean', description: 'Add a border class without a background initially.' },
    link: { control: 'boolean', description: 'Add a link style to the button.' },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Defines the size of the button.' },
    variant: { control: 'inline-radio', options: [undefined, 'outlined', 'text'], description: 'Specifies the variant of the component.' },
    badgeSeverity: { control: 'select', options: [undefined, 'contrast', 'danger', 'help', 'info', 'primary', 'secondary', 'success', 'warn'], description: 'Severity type of the badge.', table: { defaultValue: { summary: 'secondary' } } },
    iconPos: { control: 'select', options: [undefined, 'bottom', 'left', 'right', 'top'], description: 'Position of the icon.' },
    loading: { control: 'boolean', description: 'Whether the button is in loading state.' },
    loadingIcon: { control: 'text', description: 'Icon to display in loading state.' },
    severity: { control: 'select', options: [undefined, 'contrast', 'danger', 'help', 'info', 'primary', 'secondary', 'success', 'warn'], description: 'Defines the style of the button.' },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'undefined' } } },
    onClick: { action: 'onClick', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `<p-button${bind(args, INPUTS)} (onClick)="onClick($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Secondary: Story = { args: { severity: 'secondary' } };
export const Outlined: Story = { args: { variant: 'outlined' } };
export const Text: Story = { args: { variant: 'text' } };
export const Link: Story = { args: { link: true, icon: undefined } };
export const Danger: Story = { args: { severity: 'danger', label: 'Eliminar', icon: 'ph ph-trash' } };
export const IconOnly: Story = { args: { label: undefined, rounded: true, icon: 'ph ph-plus' } };
export const Loading: Story = { args: { loading: true } };
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
