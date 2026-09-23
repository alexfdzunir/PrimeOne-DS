// url=<PRIMEONE>?node-id=6580-26999
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/contextmenu/contextmenu.ts
// component=ContextMenu
import figma from 'figma'

const example = figma.code`<p-contextmenu [target]="target" [model]="items" />`
const imports = ["import { ContextMenu } from 'primeng/contextmenu';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'contextmenu',
  metadata: { nestable: true },
}
