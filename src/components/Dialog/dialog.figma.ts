// url=<PRIMEONE>?node-id=243-9556
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/dialog/dialog.ts
// component=Dialog
import figma from 'figma'
import { isInstance, prop, slotCode } from '../../figma/helpers'
import { P } from '../../figma/props'

const instance = figma.selectedInstance
const header = instance.getString(P.nestedHeader)
const showHeader = instance.getBoolean('Show Header')
const content = instance.getBoolean('Show Content') ? `\n  <p>${instance.getString(P.nestedContent)}</p>` : ''
const slot = instance.getBoolean('Slot') ? slotCode(instance, P.nestedSlot) : undefined
const width = instance.getEnum('Size', { M: '50rem', S: '25rem' })
const buttons = instance.findLayers((node) => node.name === 'button').filter(isInstance)
const labels = buttons.map((button) => button.getString('Text'))
const second = prop(instance, P.nested2ndButton) === true ? `\n    <p-button label="${labels[0] ?? 'Cancelar'}" severity="secondary" (click)="visible = false" />` : ''
const first = prop(instance, P.nested1stButton) === true ? `\n    <p-button label="${labels[1] ?? labels[0] ?? 'Guardar'}" (click)="visible = false" />` : ''
const footer = instance.getBoolean('Footer') && (first || second) ? `\n  <ng-template #footer>${second}${first}\n  </ng-template>` : ''
const attrs = `${showHeader ? ` header="${header}"` : ' [showHeader]="false"'} [(visible)]="visible" [modal]="true" [style]="{ width: '${width}' }"${instance.getBoolean('Closable') ? '' : ' [closable]="false"'}`

const example = figma.code`<p-dialog${attrs}>${content}${slot ? figma.code`\n  ${slot}` : ''}${footer}
</p-dialog>`
const imports = ["import { Dialog } from 'primeng/dialog';", ...(footer ? ["import { Button } from 'primeng/button';"] : [])]

export default {
  example,
  imports,
  id: 'dialog',
  metadata: { nestable: true },
}
