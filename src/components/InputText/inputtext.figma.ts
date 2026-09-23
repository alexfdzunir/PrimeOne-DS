// url=<PRIMEONE>?node-id=23-835
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/inputtext/inputtext.ts
// component=InputText
import figma from 'figma'
import { attr, part } from '../../figma/helpers'
import { FORMS, describedBy, fieldImports, readField, stateAttrs, textProp, withIcons, wrapField } from '../../figma/templates/field'

const instance = figma.selectedInstance
const f = readField(instance, 'inputtext')
const placeholder = f.float || f.ifta ? undefined : textProp(part(instance, 'inputtext-content'), 'Placeholder')
const control = withIcons(f, `<input pInputText id="${f.id}" [(ngModel)]="value"${attr('placeholder', placeholder)}${stateAttrs(f, 'pSize')}${describedBy(f)} />`)

const example = figma.code`${wrapField(f, control)}`
const imports = fieldImports(f, ["import { InputText } from 'primeng/inputtext';", FORMS])

export default {
  example,
  imports,
  id: 'inputtext',
  metadata: { nestable: true },
}
