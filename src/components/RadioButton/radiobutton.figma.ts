// url=<PRIMEONE>?node-id=140-5820
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/radiobutton/radiobutton.ts
// component=RadioButton
import figma from 'figma'
import { attr, flag, is } from '../../figma/helpers'
import { FORMS, sizeOf, slug } from '../../figma/templates/field'

const instance = figma.selectedInstance
const label = instance.getBoolean('Show Label') ? instance.getString('Label') : undefined
const id = slug(label, 'option')
const control = `<p-radiobutton inputId="${id}" name="options" value="${id}" [(ngModel)]="selected"${attr('size', sizeOf(instance.getPropertyValue('Size')))}${attr('variant', is(instance, 'Filled') ? 'filled' : undefined)}${flag('disabled', is(instance, 'Disabled'))} />`

const example = figma.code`${control}${label ? `\n<label for="${id}">${label}</label>` : ''}`
const imports = ["import { RadioButton } from 'primeng/radiobutton';", FORMS]

export default {
  example,
  imports,
  id: 'radiobutton',
  metadata: { nestable: true },
}
