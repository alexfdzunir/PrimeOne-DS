import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FileUpload } from 'primeng/fileupload';
import { bind } from '../../stories/helpers';

const INPUTS = ['mode', 'multiple', 'accept', 'maxFileSize', 'chooseLabel', 'uploadLabel', 'cancelLabel', 'disabled', 'auto', 'invalidFileSizeMessageSummary', 'invalidFileSizeMessageDetail', 'invalidFileTypeMessageSummary', 'invalidFileTypeMessageDetail', 'invalidFileLimitMessageDetail', 'invalidFileLimitMessageSummary', 'previewWidth', 'chooseIcon', 'uploadIcon', 'cancelIcon', 'showUploadButton', 'showCancelButton', 'fileLimit'];

const meta: Meta = {
  title: 'Form/FileUpload',
  decorators: [moduleMetadata({ imports: [FileUpload] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Basic', 'Auto'],
    docs: { description: { component: 'Subida simulada: `customUpload` emite `uploadHandler` sin enviar ficheros a ningún servidor.' } },
  },
  args: {
    mode: 'advanced',
    multiple: true,
    accept: 'image/*',
    maxFileSize: 1000000,
    chooseLabel: 'Elegir',
    uploadLabel: 'Subir',
    cancelLabel: 'Cancelar',
    onSelect: fn(),
    onClear: fn(),
    onRemove: fn(),
    uploadHandler: fn(),
  },
  argTypes: {
    mode: { control: 'inline-radio', options: ['advanced', 'basic'], description: 'Defines the UI of the component.' },
    multiple: { control: 'boolean', description: 'Used to select multiple files at once from file dialog.' },
    accept: { control: 'text', description: 'Comma-separated list of pattern to restrict the allowed file types. Can be any combination of either the MIME types (such as "image/*") or the file extensions (such as ".jpg").' },
    maxFileSize: { control: 'number', description: 'Maximum file size allowed in bytes.' },
    chooseLabel: { control: 'text', description: 'Label of the choose button. Defaults to PrimeNG Locale configuration.' },
    uploadLabel: { control: 'text', description: 'Label of the upload button. Defaults to PrimeNG Locale configuration.' },
    cancelLabel: { control: 'text', description: 'Label of the cancel button. Defaults to PrimeNG Locale configuration.' },
    disabled: { control: 'boolean', description: 'Disables the upload functionality.' },
    auto: { control: 'boolean', description: 'When enabled, upload begins automatically after selection is completed.' },
    invalidFileSizeMessageSummary: { control: 'text', description: 'Summary message of the invalid file size.' },
    invalidFileSizeMessageDetail: { control: 'text', description: 'Detail message of the invalid file size.' },
    invalidFileTypeMessageSummary: { control: 'text', description: 'Summary message of the invalid file type.' },
    invalidFileTypeMessageDetail: { control: 'text', description: 'Detail message of the invalid file type.' },
    invalidFileLimitMessageDetail: { control: 'text', description: 'Detail message of the invalid file type.' },
    invalidFileLimitMessageSummary: { control: 'text', description: 'Summary message of the invalid file type.' },
    previewWidth: { control: 'number', description: 'Width of the image thumbnail in pixels.' },
    chooseIcon: { control: 'text', description: 'Icon of the choose button.' },
    uploadIcon: { control: 'text', description: 'Icon of the upload button.' },
    cancelIcon: { control: 'text', description: 'Icon of the cancel button.' },
    showUploadButton: { control: 'boolean', description: 'Whether to show the upload button.' },
    showCancelButton: { control: 'boolean', description: 'Whether to show the cancel button.' },
    fileLimit: { control: 'number', description: 'Maximum number of files that can be uploaded.' },
    onSelect: { action: 'onSelect', table: { category: 'Eventos' } },
    onClear: { action: 'onClear', table: { category: 'Eventos' } },
    onRemove: { action: 'onRemove', table: { category: 'Eventos' } },
    uploadHandler: { action: 'uploadHandler', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: args,
    template: `<p-fileupload [customUpload]="true"${bind(args, INPUTS)} (onSelect)="onSelect($event)" (onClear)="onClear($event)" (onRemove)="onRemove($event)" (uploadHandler)="uploadHandler($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Basic: Story = { args: { mode: 'basic', chooseLabel: 'Examinar' } };
export const Auto: Story = { args: { auto: true } };
