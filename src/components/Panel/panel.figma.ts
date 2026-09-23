// url=<PRIMEONE>?node-id=229-10217
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/panel/panel.ts
// component=Panel
import figma from 'figma'
import { is, part, swapIcon } from '../../figma/helpers'

const instance = figma.selectedInstance
const toggleable = is(instance, 'Toggleable')
const collapsed = toggleable && is(instance, 'Toggle Status', 'Collapsed')
const slot = instance.getBoolean('Show Slot') ? instance.getSlot('Slot') : undefined
const button = part(instance, 'button')
const icons = instance.getBoolean('Show Custom Icon') && is(instance, 'Custom Icon')
  ? `\n  <ng-template #icons>\n    <p-button icon="${(button && swapIcon(button, 'Icon')) ?? 'ph ph-gear'}" severity="secondary" rounded text />\n  </ng-template>`
  : ''
const footer = is(instance, 'Show Footer') ? `\n  <ng-template #footer>${instance.getString('Footer')}</ng-template>` : ''

const example = figma.code`<p-panel header="${instance.getString('Header')}"${toggleable ? ' [toggleable]="true"' : ''}${collapsed ? ' [collapsed]="true"' : ''}>${icons}
  <p>${instance.getString('Content')}</p>${slot ? figma.code`\n  ${slot}` : ''}${footer}
</p-panel>`
const imports = ["import { Panel } from 'primeng/panel';", ...(icons ? ["import { Button } from 'primeng/button';"] : [])]

export default {
  example,
  imports,
  id: 'panel',
  metadata: { nestable: true },
}
