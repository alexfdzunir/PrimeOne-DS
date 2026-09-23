// url=<PRIMEONE>?node-id=11862-34206
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/multiselect/multiselect.ts
// component=MultiSelect
import figma from 'figma'
import { attr, flag, is, part, prop } from '../../figma/helpers'
import { FORMS, fieldImports, readField, sizeOf, stateAttrs, textProp, wrapField } from '../../figma/templates/field'

const instance = figma.selectedInstance
const input = part(instance, 'multiselect-input')
const f = readField(input, 'multiselect')
if (is(instance, 'On Label', 'Yes') && !f.float) f.float = 'on'
f.size = sizeOf(prop(instance, 'Size')) ?? f.size
const content = input ? part(input, 'multiselect-input-content') : undefined
const chips = is(content, 'Text Config', 'Chips')
const placeholder = f.float || f.ifta ? undefined : textProp(content, 'Placeholder')
const control = `<p-multiselect inputId="${f.id}" [options]="options" optionLabel="name" [(ngModel)]="selected"${attr('placeholder', placeholder)}${attr('display', chips ? 'chip' : undefined)}${flag('showClear', f.showClear)}${stateAttrs(f)} />`

const example = figma.code`${wrapField(f, control)}`
const imports = fieldImports(f, ["import { MultiSelect } from 'primeng/multiselect';", FORMS])

export default {
  example,
  imports,
  id: 'multiselect',
  metadata: { nestable: true },
}
