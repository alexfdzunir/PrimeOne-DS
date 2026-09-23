// url=<PRIMEONE>?node-id=334-13139
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/chip/chip.ts
// component=Chip
import figma from 'figma'
import { attr, flag, is, part, phIcon } from '../../figma/helpers'

const instance = figma.selectedInstance
const image = is(instance, 'Image')
const icon = !image && instance.getBoolean('Show Icon') ? phIcon(part(instance, 'Placeholder')) : undefined

const example = figma.code`<p-chip label="${instance.getString('Text')}"${image ? ' image="assets/avatar.png"' : attr('icon', icon)}${flag('removable', instance.getBoolean('Removable'))} />`
const imports = ["import { Chip } from 'primeng/chip';"]

export default {
  example,
  imports,
  id: 'chip',
  metadata: { nestable: true },
}
