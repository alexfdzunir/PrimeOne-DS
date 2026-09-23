// url=<PRIMEONE>?node-id=18045-130597
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/button/button.ts
// component=Button
import figma from 'figma'
import { attr, is, swapIcon, text } from '../../figma/helpers'

const instance = figma.selectedInstance
const left = instance.getBoolean('Show Icon Left') ? swapIcon(instance, 'Icon Left') : undefined
const right = instance.getBoolean('Show Icon Right') ? swapIcon(instance, 'Icon Right') : undefined
const label = text(instance, 'Text') ?? 'Chip'
const active = is(instance, 'State', 'Active')

const example = figma.code`<p-button label="${label}"${attr('icon', left ?? right)}${attr('iconPos', !left && right ? 'right' : undefined)} rounded size="small" severity="secondary"${active ? '' : ' variant="outlined"'} />`
const imports = ["import { Button } from 'primeng/button';"]

export default {
  example,
  imports,
  id: 'buttonchip',
  metadata: { nestable: true },
}
