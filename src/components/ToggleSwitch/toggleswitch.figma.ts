// url=<PRIMEONE>?node-id=260-11899
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/toggleswitch/toggleswitch.ts
// component=ToggleSwitch
import figma from 'figma'
import { flag, is } from '../../figma/helpers'
import { FORMS } from '../../figma/templates/field'

const instance = figma.selectedInstance

const example = figma.code`<p-toggleswitch [(ngModel)]="checked"${flag('readonly', is(instance, 'Blocked', 'Yes'))}${flag('invalid', is(instance, 'Invalid'))}${flag('disabled', is(instance, 'Disabled'))} />`
const imports = ["import { ToggleSwitch } from 'primeng/toggleswitch';", FORMS]

export default {
  example,
  imports,
  id: 'toggleswitch',
  metadata: { nestable: true },
}
