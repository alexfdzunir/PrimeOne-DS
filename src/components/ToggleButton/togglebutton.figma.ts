// url=<PRIMEONE>?node-id=187-6103
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/togglebutton/togglebutton.ts
// component=ToggleButton
import figma from 'figma'
import { attr, flag, is, swapIcon } from '../../figma/helpers'
import { FORMS, sizeOf } from '../../figma/templates/field'

const instance = figma.selectedInstance
const text = is(instance, 'Show Text') ? instance.getString('Text') : ''
const left = instance.getBoolean('Show Left Icon')
const right = instance.getBoolean('Show Right Icon')
const icons = left || right ? `${attr('onIcon', swapIcon(instance, 'Checked Icon'))}${attr('offIcon', swapIcon(instance, 'Icon'))}${attr('iconPos', !left && right ? 'right' : undefined)}` : ''

const example = figma.code`<p-togglebutton [(ngModel)]="checked" onLabel="${text}" offLabel="${text}"${icons}${attr('size', sizeOf(instance.getPropertyValue('Size')))}${flag('disabled', is(instance, 'Disabled'))} />`
const imports = ["import { ToggleButton } from 'primeng/togglebutton';", FORMS]

export default {
  example,
  imports,
  id: 'togglebutton',
  metadata: { nestable: true },
}
