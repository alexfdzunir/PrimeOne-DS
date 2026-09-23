import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { OrganizationChart } from 'primeng/organizationchart';
import { ORG_CHART } from '../../stories/data';
import { bind } from '../../stories/helpers';

const INPUTS = ['collapsible', 'selectionMode'];

const meta: Meta = {
  title: 'Data/OrganizationChart',
  decorators: [moduleMetadata({ imports: [OrganizationChart] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Static', 'Selectable'],
  },
  args: {
    collapsible: true,
    onNodeSelect: fn(),
    onNodeUnselect: fn(),
    onNodeExpand: fn(),
    onNodeCollapse: fn(),
  },
  argTypes: {
    collapsible: { control: 'boolean', description: 'Whether the nodes can be expanded or toggled.' },
    selectionMode: { control: 'inline-radio', options: [undefined, 'multiple', 'single'], description: 'Defines the selection mode.' },
    onNodeSelect: { action: 'onNodeSelect', table: { category: 'Eventos' } },
    onNodeUnselect: { action: 'onNodeUnselect', table: { category: 'Eventos' } },
    onNodeExpand: { action: 'onNodeExpand', table: { category: 'Eventos' } },
    onNodeCollapse: { action: 'onNodeCollapse', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, nodes: structuredClone(ORG_CHART) },
    template: `
      <div style="overflow-x: auto">
        <p-organizationchart [value]="nodes"${bind(args, INPUTS)} (onNodeSelect)="onNodeSelect($event)" (onNodeUnselect)="onNodeUnselect($event)" (onNodeExpand)="onNodeExpand($event)" (onNodeCollapse)="onNodeCollapse($event)" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Static: Story = { args: { collapsible: false } };
export const Selectable: Story = { args: { selectionMode: 'single' } };
