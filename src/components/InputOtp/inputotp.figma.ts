// url=<PRIMEONE>?node-id=7167-15865
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/inputotp/inputotp.ts
// component=InputOtp
import figma from 'figma'
import { attr, bind } from '../../figma/helpers'
import { FORMS, sizeOf } from '../../figma/templates/field'

const instance = figma.selectedInstance
const size = sizeOf(instance.getEnum('Size', { Large: 'Large', Normal: undefined, Small: 'Small' }))
const length = instance.findLayers((node) => node.name === '_inputotp-input').length

const example = figma.code`<p-inputotp [(ngModel)]="code"${bind('length', length && length !== 4 ? String(length) : undefined)}${attr('size', size)} />`
const imports = ["import { InputOtp } from 'primeng/inputotp';", FORMS]

export default {
  example,
  imports,
  id: 'inputotp',
  metadata: { nestable: true },
}
