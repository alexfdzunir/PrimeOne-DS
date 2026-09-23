import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Paginator } from 'primeng/paginator';
import { bind } from '../../stories/helpers';

const INPUTS = ['rows', 'totalRecords', 'pageLinkSize', 'alwaysShow', 'showCurrentPageReport', 'showFirstLastIcon', 'showJumpToPageDropdown', 'showJumpToPageInput', 'showPageLinks', 'first'];

const meta: Meta = {
  title: 'Data/Paginator',
  decorators: [moduleMetadata({ imports: [Paginator] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    rows: 10,
    totalRecords: 120,
    currentPageReportTemplate: '{first} - {last} de {totalRecords}',
    onPageChange: fn(),
  },
  argTypes: {
    rows: { control: 'number', description: 'Data count to display per page.' },
    totalRecords: { control: 'number', description: 'Number of total records.' },
    pageLinkSize: { control: 'number', description: 'Number of page links to display.' },
    alwaysShow: { control: 'boolean', description: 'Whether to show it even there is only one page.' },
    showCurrentPageReport: { control: 'boolean', description: 'Whether to display current page report.' },
    showFirstLastIcon: { control: 'boolean', description: 'When enabled, icons are displayed on paginator to go first and last page.' },
    showJumpToPageDropdown: { control: 'boolean', description: 'Whether to display a dropdown to navigate to any page.' },
    showJumpToPageInput: { control: 'boolean', description: 'Whether to display a input to navigate to any page.' },
    showPageLinks: { control: 'boolean', description: 'Whether to show page links.' },
    first: { control: 'number', description: 'Zero-relative number of the first row to be displayed.' },
    currentPageReportTemplate: { control: 'text' },
    onPageChange: { action: 'onPageChange', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `<p-paginator [rowsPerPageOptions]="[10, 20, 30]" [currentPageReportTemplate]="currentPageReportTemplate"${bind(args, INPUTS)} (onPageChange)="onPageChange($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Report: Story = { args: { showCurrentPageReport: true } };
export const JumpToPage: Story = { args: { showJumpToPageInput: true } };
export const Compact: Story = { args: { showPageLinks: false, showCurrentPageReport: true } };
