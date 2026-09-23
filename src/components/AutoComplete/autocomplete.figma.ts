// url=<PRIMEONE>?node-id=6047-9515
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/autocomplete/autocomplete.ts
// component=AutoComplete
import figma from 'figma'
import { attr, flag, is, part } from '../../figma/helpers'
import { FORMS, fieldImports, readField, stateAttrs, textProp, wrapField } from '../../figma/templates/field'

const instance = figma.selectedInstance
const input = part(instance, 'autocomplete-input-multiple') ?? part(instance, 'inputtext')
const f = readField(input, 'autocomplete')
const content = input ? (part(input, 'autocomplete-input-content') ?? part(input, 'inputtext-content')) : undefined
const placeholder = f.float || f.ifta ? undefined : textProp(content, 'Placeholder')
const control = `<p-autocomplete inputId="${f.id}" [(ngModel)]="selected" [suggestions]="items" (completeMethod)="search($event)"${attr('placeholder', placeholder)}${flag('dropdown', is(instance, 'Dropdown'))}${flag('multiple', is(instance, 'Multiple'))}${stateAttrs(f)} />`

const example = figma.code`${wrapField(f, control)}`
const imports = fieldImports(f, ["import { AutoComplete } from 'primeng/autocomplete';", FORMS])

export default {
  example,
  imports,
  id: 'autocomplete',
  metadata: { nestable: true },
}
