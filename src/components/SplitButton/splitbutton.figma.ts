// url=<PRIMEONE>?node-id=223-8532
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/splitbutton/splitbutton.ts
// component=SplitButton
import figma from 'figma'
import { attr, flag, is, part, prop, swapIcon } from '../../figma/helpers'

const instance = figma.selectedInstance
const button = part(instance, 'button')
const label = button ? button.getString('Text') : 'Save'
const icon = button && prop(button, 'Show Left Icon') === true ? swapIcon(button, 'Left Icon') : undefined
const severity = button ? button.getEnum('Severity', { Primary: undefined, Secondary: 'secondary', Contrast: 'contrast', Plain: undefined }) : undefined

const example = figma.code`<p-splitbutton label="${label}"${attr('icon', icon)} [model]="items" (onClick)="save()"${attr('severity', severity)}${flag('raised', is(instance, 'Raised'))}${flag('rounded', is(instance, 'Rounded'))}${flag('disabled', is(button, 'Disabled'))} />`
const imports = ["import { SplitButton } from 'primeng/splitbutton';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'splitbutton',
  metadata: { nestable: true },
}
