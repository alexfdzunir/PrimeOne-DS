import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { PrimeOneInputRgpd } from './input-rgpd';
import { bind } from '../../stories/helpers';

const INPUTS = ['showText', 'legalCheck', 'marketingCheck', 'privacyUrl', 'groupUrl', 'invalid', 'disabled'];

const meta: Meta = {
  title: 'Proeduca/InputRGPD',
  decorators: [moduleMetadata({ imports: [FormsModule, PrimeOneInputRgpd] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Marketing', 'Invalid'],
  },
  argTypes: {
    showText: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    legalCheck: { control: 'boolean', description: 'Mandatory legal acceptance checkbox (Figma "2 Checks" / "Only Checks").', table: { defaultValue: { summary: 'false' } } },
    marketingCheck: { control: 'boolean', description: 'Optional communications checkbox (Figma "1 Check" / "2 Checks" / "Only Checks").', table: { defaultValue: { summary: 'false' } } },
    privacyUrl: { control: 'text' },
    groupUrl: { control: 'text' },
    invalid: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
  },
  render: (args) => ({
    props: { ...args, value: null },
    template: `<prime-one-inputrgpd [(ngModel)]="value"${bind(args, INPUTS)} />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Marketing: Story = { args: { marketingCheck: true } };
export const Invalid: Story = { args: { invalid: true } };
