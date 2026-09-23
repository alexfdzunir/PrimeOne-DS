// url=<PRIMEONE>?node-id=148-6321
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/checkbox/checkbox.ts
// component=Checkbox
import figma from 'figma'
import { attr, flag, is } from '../../figma/helpers'
import { FORMS, sizeOf, slug } from '../../figma/templates/field'

const instance = figma.selectedInstance
const label = instance.getBoolean('Show Label') ? instance.getString('Label') : undefined
const id = slug(label, 'checkbox')
const control = `<p-checkbox inputId="${id}" [(ngModel)]="checked" binary${attr('size', sizeOf(instance.getPropertyValue('Size')))}${attr('variant', is(instance, 'Filled') ? 'filled' : undefined)}${flag('invalid', is(instance, 'Error'))}${flag('disabled', is(instance, 'Disabled'))} />`

const example = figma.code`${control}${label ? `\n<label for="${id}">${label}</label>` : ''}`
const imports = ["import { Checkbox } from 'primeng/checkbox';", FORMS]

export default {
  example,
  imports,
  id: 'checkbox',
  metadata: { nestable: true },
}
