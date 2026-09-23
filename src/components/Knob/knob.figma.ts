// url=<PRIMEONE>?node-id=277-10630
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/knob/knob.ts
// component=Knob
import figma from 'figma'
import { bind, flag, is } from '../../figma/helpers'
import { FORMS } from '../../figma/templates/field'

const instance = figma.selectedInstance

const example = figma.code`<p-knob [(ngModel)]="value"${bind('size', is(instance, 'Size', 'Double') ? '200' : undefined)}${bind('showValue', instance.getBoolean('Text') ? undefined : 'false')}${flag('disabled', is(instance, 'State', 'Disabled'))} />`
const imports = ["import { Knob } from 'primeng/knob';", FORMS]

export default {
  example,
  imports,
  id: 'knob',
  metadata: { nestable: true },
}
