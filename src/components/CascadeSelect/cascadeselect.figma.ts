// url=<PRIMEONE>?node-id=245-10195
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/cascadeselect/cascadeselect.ts
// component=CascadeSelect
import figma from 'figma'
import { attr, flag, is, part, prop } from '../../figma/helpers'
import { P } from '../../figma/props'
import { FORMS, fieldImports, readField, sizeOf, stateAttrs, textProp, wrapField } from '../../figma/templates/field'

const instance = figma.selectedInstance
const input = part(instance, 'cascadeselect-input')
const f = readField(input, 'cascadeselect')
if (is(instance, P.disabled, 'On')) f.disabled = true
if (is(instance, P.invalid, 'On')) f.invalid = true
if (is(instance, 'Float Label') && !f.float) f.float = 'default'
const content = input ? part(input, 'cascadeselect-input-content') : undefined
f.size = f.size ?? sizeOf(prop(content, 'Size'))
const placeholder = f.float || f.ifta ? undefined : textProp(content, 'Placeholder')
const control = `<p-cascadeselect inputId="${f.id}" [(ngModel)]="selectedCity" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']"${attr('placeholder', placeholder)}${flag('showClear', f.showClear)}${stateAttrs(f)} />`

const example = figma.code`${wrapField(f, control)}`
const imports = fieldImports(f, ["import { CascadeSelect } from 'primeng/cascadeselect';", FORMS])

export default {
  example,
  imports,
  id: 'cascadeselect',
  metadata: { nestable: true },
}
