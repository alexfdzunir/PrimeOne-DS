// url=<PRIMEONE>?node-id=334-12695
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/blockui/blockui.ts
// component=BlockUI
import figma from 'figma'

const instance = figma.selectedInstance

const example = figma.code`<p-blockui [target]="panel" [blocked]="${instance.getBoolean('Show Block') ? 'true' : 'blocked'}" />
<p-panel #panel header="Panel">
  <p>Contenido bloqueable</p>
</p-panel>`
const imports = ["import { BlockUI } from 'primeng/blockui';", "import { Panel } from 'primeng/panel';"]

export default {
  example,
  imports,
  id: 'blockui',
  metadata: { nestable: true },
}
