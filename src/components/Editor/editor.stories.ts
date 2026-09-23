import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { Editor } from 'primeng/editor';
import { bind } from '../../stories/helpers';

const INPUTS = ['placeholder', 'invalid', 'disabled', 'debug', 'readonly'];

const meta: Meta = {
  title: 'Form/Editor',
  decorators: [moduleMetadata({ imports: [FormsModule, Editor] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'ReadOnly'],
  },
  args: {
    placeholder: 'Escribe aquí',
    onEditorInit: fn(),
    onTextChange: fn(),
    onSelectionChange: fn(),
    onEditorChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder text to show when editor is empty.' },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    debug: { control: 'text', description: 'Shortcut for debug. Note debug is a static method and will affect other instances of Quill editors on the page. Only warning and error messages are enabled by default.' },
    readonly: { control: 'boolean', description: 'Whether to instantiate the editor to read-only mode.' },
    onEditorInit: { action: 'onEditorInit', table: { category: 'Eventos' } },
    onTextChange: { action: 'onTextChange', table: { category: 'Eventos' } },
    onSelectionChange: { action: 'onSelectionChange', table: { category: 'Eventos' } },
    onEditorChange: { action: 'onEditorChange', table: { category: 'Eventos' } },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: '<p>Contenido con <strong>formato</strong>.</p>' },
    template: `<p-editor [(ngModel)]="value" [style]="{ height: '220px' }"${bind(args, INPUTS)} (onEditorInit)="onEditorInit($event)" (onTextChange)="onTextChange($event)" (onSelectionChange)="onSelectionChange($event)" (onEditorChange)="onEditorChange($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const ReadOnly: Story = { args: { readonly: true } };
