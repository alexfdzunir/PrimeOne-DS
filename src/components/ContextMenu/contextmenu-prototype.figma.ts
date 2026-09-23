// url=<PRIMEONE>?node-id=452-28461
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/contextmenu/contextmenu.ts
// component=ContextMenu
import figma from 'figma'

const example = figma.code`<img #target src="assets/imagen.jpg" alt="Imagen" />
<p-contextmenu [target]="target" [model]="items" />`
const imports = ["import { ContextMenu } from 'primeng/contextmenu';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'contextmenu-prototype',
  metadata: { nestable: true },
}
