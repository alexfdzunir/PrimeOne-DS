// url=<PRIMEONE>?node-id=4461-50366
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/drawer/drawer.ts
// component=Drawer
import figma from 'figma'
import { is, isInstance } from '../../figma/helpers'

const instance = figma.selectedInstance
const position = instance.getEnum('Position', { Left: undefined, Right: 'right', Top: 'top', Bottom: 'bottom', 'N/A': undefined })
const full = is(instance, 'Fullscreen')
const header = instance.getBoolean('Show Header') ? ` header="${instance.getString('Header')}"` : ''
const labels = instance.findLayers((node) => node.name === 'button').filter(isInstance).map((button) => button.getString('Text'))
const footer = instance.getBoolean('Show Footer')
  ? `\n  <ng-template #footer>\n${labels.map((label, i) => `    <p-button label="${label}"${i === 0 && labels.length > 1 ? ' severity="secondary"' : ''} (click)="visible = false" />`).join('\n')}\n  </ng-template>`
  : ''

const example = figma.code`<p-drawer [(visible)]="visible"${header}${position ? ` position="${position}"` : ''}${full ? ' [fullScreen]="true"' : ''}>
  <p>${instance.getString('Content')}</p>${footer}
</p-drawer>`
const imports = ["import { Drawer } from 'primeng/drawer';", ...(footer ? ["import { Button } from 'primeng/button';"] : [])]

export default {
  example,
  imports,
  id: 'drawer',
  metadata: { nestable: true },
}
