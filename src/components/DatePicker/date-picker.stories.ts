import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { bind } from '../../stories/helpers';

const INPUTS = ['placeholder', 'dateFormat', 'showIcon', 'invalid', 'disabled', 'fluid', 'variant', 'size', 'iconDisplay', 'multipleSeparator', 'rangeSeparator', 'inline', 'showOtherMonths', 'selectOtherMonths', 'icon', 'readonlyInput', 'hourFormat', 'timeOnly', 'stepHour', 'stepMinute', 'stepSecond', 'showSeconds', 'showOnFocus', 'showWeek', 'startWeekFromFirstDayOfYear', 'showClear', 'dataType', 'selectionMode', 'maxDateCount', 'showButtonBar', 'keepInvalid', 'hideOnDateTimeSelect', 'touchUI', 'timeSeparator', 'focusTrap', 'showTime', 'numberOfMonths', 'firstDayOfWeek', 'view'];

const meta: Meta = {
  title: 'Form/DatePicker',
  decorators: [moduleMetadata({ imports: [FormsModule, DatePicker] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Inline', 'Range', 'Time', 'ButtonBar', 'Invalid'],
  },
  args: {
    placeholder: 'dd/mm/aaaa',
    dateFormat: 'dd/mm/yy',
    showIcon: true,
    onFocus: fn(),
    onBlur: fn(),
    onClose: fn(),
    onSelect: fn(),
    onClear: fn(),
    onInput: fn(),
    onTodayClick: fn(),
    onClearClick: fn(),
    onMonthChange: fn(),
    onYearChange: fn(),
    onClickOutside: fn(),
    onShow: fn(),
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder text for the input.' },
    dateFormat: { control: 'text', description: 'Format of the date which can also be defined at locale settings.' },
    showIcon: { control: 'boolean', description: 'When enabled, displays a button with icon next to input.' },
    invalid: { control: 'boolean', description: 'When present, it specifies that the component should have invalid state style.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'When present, it specifies that the component should have disabled state style.', table: { defaultValue: { summary: 'false' } } },
    fluid: { control: 'boolean', description: 'Spans 100% width of the container when enabled.', table: { defaultValue: { summary: 'false' } } },
    variant: { control: 'inline-radio', options: [undefined, 'filled', 'outlined'], description: 'Specifies the input variant of the component.', table: { defaultValue: { summary: 'outlined' } } },
    size: { control: 'inline-radio', options: [undefined, 'large', 'small'], description: 'Specifies the size of the component.', table: { defaultValue: { summary: 'undefined' } } },
    iconDisplay: { control: 'inline-radio', options: [undefined, 'button', 'input'] },
    multipleSeparator: { control: 'text', description: 'Separator for multiple selection mode.' },
    rangeSeparator: { control: 'text', description: 'Separator for joining start and end dates on range selection mode.' },
    inline: { control: 'boolean', description: 'When enabled, displays the datepicker as inline. Default is false for popup mode.' },
    showOtherMonths: { control: 'boolean', description: 'Whether to display dates in other months (non-selectable) at the start or end of the current month. To make these days selectable use the selectOtherMonths option.' },
    selectOtherMonths: { control: 'boolean', description: 'Whether days in other months shown before or after the current month are selectable. This only applies if the showOtherMonths option is set to true.' },
    icon: { control: 'text', description: 'Icon of the datepicker button.' },
    readonlyInput: { control: 'boolean', description: 'When specified, prevents entering the date manually with keyboard.' },
    hourFormat: { control: 'text', description: 'Specifies 12 or 24 hour format.' },
    timeOnly: { control: 'boolean', description: 'Whether to display timepicker only.' },
    stepHour: { control: 'number', description: 'Hours to change per step.' },
    stepMinute: { control: 'number', description: 'Minutes to change per step.' },
    stepSecond: { control: 'number', description: 'Seconds to change per step.' },
    showSeconds: { control: 'boolean', description: 'Whether to show the seconds in time picker.' },
    showOnFocus: { control: 'boolean', description: 'When disabled, datepicker will not be visible with input focus.' },
    showWeek: { control: 'boolean', description: 'When enabled, datepicker will show week numbers.' },
    startWeekFromFirstDayOfYear: { control: 'boolean', description: 'When enabled, datepicker will start week numbers from first day of the year.' },
    showClear: { control: 'boolean', description: 'When enabled, a clear icon is displayed to clear the value.' },
    dataType: { control: 'text', description: 'Type of the value to write back to ngModel, default is date and alternative is string.' },
    selectionMode: { control: 'inline-radio', options: [undefined, 'multiple', 'range', 'single'], description: 'Defines the quantity of the selection, valid values are "single", "multiple" and "range".' },
    maxDateCount: { control: 'number', description: 'Maximum number of selectable dates in multiple mode.' },
    showButtonBar: { control: 'boolean', description: 'Whether to display today and clear buttons at the footer' },
    keepInvalid: { control: 'boolean', description: 'Keep invalid value when input blur.' },
    hideOnDateTimeSelect: { control: 'boolean', description: 'Whether to hide the overlay on date selection.' },
    touchUI: { control: 'boolean', description: 'When enabled, datepicker overlay is displayed as optimized for touch devices.' },
    timeSeparator: { control: 'text', description: 'Separator of time selector.' },
    focusTrap: { control: 'boolean', description: 'When enabled, can only focus on elements inside the datepicker.' },
    showTime: { control: 'boolean', description: 'Whether to display timepicker.' },
    numberOfMonths: { control: 'number', description: 'Number of months to display.' },
    firstDayOfWeek: { control: 'number', description: 'Defines the first of the week for various date calculations.' },
    view: { control: 'inline-radio', options: [undefined, 'date', 'month', 'year'], description: 'Type of view to display, valid values are "date" for datepicker and "month" for month picker.' },
    onFocus: { action: 'onFocus', table: { category: 'Eventos' } },
    onBlur: { action: 'onBlur', table: { category: 'Eventos' } },
    onClose: { action: 'onClose', table: { category: 'Eventos' } },
    onSelect: { action: 'onSelect', table: { category: 'Eventos' } },
    onClear: { action: 'onClear', table: { category: 'Eventos' } },
    onInput: { action: 'onInput', table: { category: 'Eventos' } },
    onTodayClick: { action: 'onTodayClick', table: { category: 'Eventos' } },
    onClearClick: { action: 'onClearClick', table: { category: 'Eventos' } },
    onMonthChange: { action: 'onMonthChange', table: { category: 'Eventos' } },
    onYearChange: { action: 'onYearChange', table: { category: 'Eventos' } },
    onClickOutside: { action: 'onClickOutside', table: { category: 'Eventos' } },
    onShow: { action: 'onShow', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, value: null },
    template: `<p-datepicker [(ngModel)]="value"${bind(args, INPUTS)} (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" (onClose)="onClose($event)" (onSelect)="onSelect($event)" (onClear)="onClear($event)" (onInput)="onInput($event)" (onTodayClick)="onTodayClick($event)" (onClearClick)="onClearClick($event)" (onMonthChange)="onMonthChange($event)" (onYearChange)="onYearChange($event)" (onClickOutside)="onClickOutside($event)" (onShow)="onShow($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Inline: Story = { args: { inline: true, showIcon: false } };
export const Range: Story = { args: { selectionMode: 'range' } };
export const Time: Story = { args: { showTime: true } };
export const ButtonBar: Story = { args: { showButtonBar: true } };
export const Invalid: Story = { args: { invalid: true } };
