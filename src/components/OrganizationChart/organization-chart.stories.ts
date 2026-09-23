import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { OrganizationChart } from 'primeng/organizationchart';
import { ORG_CHART } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['selectionMode', 'collapsible'];

const meta: Meta = {
  title: 'Data/OrganizationChart',
  decorators: [moduleMetadata({ imports: [OrganizationChart] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onNodeSelect: fn(),
    onNodeUnselect: fn(),
    onNodeExpand: fn(),
    onNodeCollapse: fn(),
  },
  argTypes: {
    selectionMode: { control: 'inline-radio', options: [undefined, 'multiple', 'single'], description: 'Defines the selection mode.' },
    collapsible: { control: 'boolean', description: 'Whether the nodes can be expanded or toggled.' },
    onNodeSelect: { action: 'onNodeSelect', table: { category: 'Eventos' } },
    onNodeUnselect: { action: 'onNodeUnselect', table: { category: 'Eventos' } },
    onNodeExpand: { action: 'onNodeExpand', table: { category: 'Eventos' } },
    onNodeCollapse: { action: 'onNodeCollapse', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, nodes: structuredClone(ORG_CHART) },
    template: `<p-organizationchart [value]="nodes"${bind(args, INPUTS)} (onNodeSelect)="onNodeSelect($event)" (onNodeUnselect)="onNodeUnselect($event)" (onNodeExpand)="onNodeExpand($event)" (onNodeCollapse)="onNodeCollapse($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Collapsible: Story = { args: { collapsible: true } };
export const Selectable: Story = { args: { selectionMode: 'single' } };
