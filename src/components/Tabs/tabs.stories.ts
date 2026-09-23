import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';
import { tabsSm } from './tabs.tokens';
import { bind } from '../../stories/helpers';

const INPUTS = ['scrollable', 'selectOnFocus', 'showNavigators'];

const meta: Meta = {
  title: 'Panel/Tabs',
  decorators: [moduleMetadata({ imports: [Tabs, TabList, Tab, TabPanels, TabPanel] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Small', 'Scrollable'],
  },
  args: {
    small: false,
  },
  argTypes: {
    scrollable: { control: 'boolean', description: 'When specified, enables horizontal and/or vertical scrolling.', table: { defaultValue: { summary: 'false' } } },
    selectOnFocus: { control: 'boolean', description: 'When enabled, the focused tab is activated.', table: { defaultValue: { summary: 'false' } } },
    showNavigators: { control: 'boolean', description: 'Whether to display navigation buttons in container when scrollable is enabled.', table: { defaultValue: { summary: 'true' } } },
    small: { control: 'boolean', description: 'Tamaño S del DS: tokens `tabsSm` y texto Label-S en la lista.' },
  },
  render: (args) => ({
    props: { ...args, value: '0', tabsSm: tabsSm, tabs: [
        { value: '0', title: 'Resumen', icon: 'ph ph-house-line', content: 'Resumen de la asignatura.' },
        { value: '1', title: 'Temario', icon: 'ph ph-book-open', content: 'Temas y materiales.' },
        { value: '2', title: 'Evaluación', icon: 'ph ph-exam', content: 'Actividades y exámenes.' },
      ] },
    template: `
      <p-tabs [value]="value" [dt]="small ? tabsSm : undefined"${bind(args, INPUTS)}>
        <p-tablist [style.font-size]="small ? '0.75rem' : null">
          @for (tab of tabs; track tab.value) {
            <p-tab [value]="tab.value"><i [class]="tab.icon"></i> {{ tab.title }}</p-tab>
          }
        </p-tablist>
        <p-tabpanels>
          @for (tab of tabs; track tab.value) {
            <p-tabpanel [value]="tab.value"><p style="margin: 0">{{ tab.content }}</p></p-tabpanel>
          }
        </p-tabpanels>
      </p-tabs>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Small: Story = { args: { small: true } };
export const Scrollable: Story = { args: { scrollable: true } };
