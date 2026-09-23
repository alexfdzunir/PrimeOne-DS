// url=<PRIMEONE>?node-id=7421-323985
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/floatlabel/floatlabel.ts
// component=FloatLabel
import figma from 'figma'
import { is, part } from '../../figma/helpers'
import { P } from '../../figma/props'
import { FORMS, fieldImports, readField, stateAttrs, wrapField } from '../../figma/templates/field'

const instance = figma.selectedInstance
const f = readField(part(instance, 'inputtext'), 'floatlabel')
f.float = instance.getEnum(P.variant, { On: 'on' as const, In: 'in' as const }) ?? 'default'
f.invalid = f.invalid || is(instance, P.invalid)
f.disabled = f.disabled || is(instance, P.disabled)
f.filled = f.filled || is(instance, P.filled)
const control = `<input pInputText id="${f.id}" [(ngModel)]="value"${stateAttrs(f, 'pSize')} />`

const example = figma.code`${wrapField(f, control)}`
const imports = fieldImports(f, ["import { InputText } from 'primeng/inputtext';", FORMS])

export default {
  example,
  imports,
  id: 'floatlabel',
  metadata: { nestable: true },
}
