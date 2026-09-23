// url=<PRIMEONE>?node-id=12407-28953
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/datepicker/datepicker.ts
// component=DatePicker
import figma from 'figma'
import { flag, is, part, prop } from '../../figma/helpers'
import { FORMS, fieldImports, readField, sizeOf, stateAttrs, wrapField } from '../../figma/templates/field'

const instance = figma.selectedInstance
const f = readField(part(instance, 'inputtext'), 'datepicker')
f.size = sizeOf(prop(instance, 'Size')) ?? f.size
const inline = is(instance, 'Type', 'Inline')
const picker = instance.getEnum('Picker Type', {
  Default: '',
  Time: ' [showTime]="true" hourFormat="24"',
  Month: ' view="month" dateFormat="mm/yy"',
  Year: ' view="year" dateFormat="yy"',
})
const buttonBar = inline ? instance.getBoolean('Bar') : instance.getBoolean('Show Bar')
const control = `<p-datepicker inputId="${f.id}" [(ngModel)]="date"${picker ?? ''}${flag('inline', inline)}${flag('showIcon', !inline && is(instance, 'Component', 'Button'))}${flag('showWeek', instance.getBoolean('Show Week'))}${flag('showButtonBar', buttonBar)}${stateAttrs(f)} />`

const example = figma.code`${inline ? control : wrapField(f, control)}`
const imports = fieldImports(inline ? { ...f, float: undefined, ifta: false } : f, ["import { DatePicker } from 'primeng/datepicker';", FORMS])

export default {
  example,
  imports,
  id: 'datepicker',
  metadata: { nestable: true },
}
