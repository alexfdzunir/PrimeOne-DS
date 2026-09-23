// url=<PRIMEONE>?node-id=314-12216
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/scrollpanel/scrollpanel.ts
// component=ScrollPanel
import figma from 'figma'
import { slotCode } from '../../figma/helpers'

const instance = figma.selectedInstance
const text = instance.getBoolean('Show Text') ? `\n  <p>${instance.getString('Content').trim()}</p>` : ''
const slot = instance.getBoolean('Show Slot') ? slotCode(instance, 'Slot') : undefined

const example = figma.code`<p-scrollpanel [style]="{ width: '100%', height: '200px' }">${text}${slot ? figma.code`\n  ${slot}` : ''}
</p-scrollpanel>`
const imports = ["import { ScrollPanel } from 'primeng/scrollpanel';"]

export default {
  example,
  imports,
  id: 'scrollpanel',
  metadata: { nestable: true },
}
