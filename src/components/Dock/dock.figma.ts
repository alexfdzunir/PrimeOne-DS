// url=<PRIMEONE>?node-id=507-30666
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/dock/dock.ts
// component=Dock
import figma from 'figma'

const instance = figma.selectedInstance
const position = instance.getEnum('Location', { Bottom: 'bottom', Top: 'top', Left: 'left', Right: 'right' })

const example = figma.code`<p-dock [model]="items" position="${position}">
  <ng-template #item let-item>
    <img [src]="item.icon" [alt]="item.label" width="100%" />
  </ng-template>
</p-dock>`
const imports = ["import { Dock } from 'primeng/dock';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'dock',
  metadata: { nestable: true },
}
