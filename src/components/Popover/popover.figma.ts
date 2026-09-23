// url=<PRIMEONE>?node-id=605-37190
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/popover/popover.ts
// component=Popover
import figma from 'figma'

const example = figma.code`<p-button (click)="popover.toggle($event)" icon="ph ph-share-network" label="Compartir" />
<p-popover #popover>
  <p>Contenido del popover</p>
</p-popover>`
const imports = ["import { Popover } from 'primeng/popover';", "import { Button } from 'primeng/button';"]

export default {
  example,
  imports,
  id: 'popover',
  metadata: { nestable: true },
}
