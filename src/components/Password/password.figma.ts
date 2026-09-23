// url=<PRIMEONE>?node-id=287-10430
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/password/password.ts
// component=Password
import figma from 'figma'
import { attr, flag, is, part, prop } from '../../figma/helpers'
import { FORMS, fieldImports, readField, sizeOf, stateAttrs, textProp, wrapField } from '../../figma/templates/field'

const instance = figma.selectedInstance
const input = part(instance, 'inputtext')
const f = readField(input, 'password')
f.size = sizeOf(prop(instance, 'Size')) ?? f.size
const placeholder = f.float || f.ifta ? undefined : textProp(input ? part(input, 'inputtext-content') : undefined, 'Placeholder')
const control = `<p-password inputId="${f.id}" [(ngModel)]="value"${attr('placeholder', placeholder)}${flag('toggleMask', is(instance, 'Toggle Mask'))}${stateAttrs(f)} />`

const example = figma.code`${wrapField(f, control)}`
const imports = fieldImports(f, ["import { Password } from 'primeng/password';", FORMS])

export default {
  example,
  imports,
  id: 'password',
  metadata: { nestable: true },
}
