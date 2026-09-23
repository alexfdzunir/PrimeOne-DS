// url=<PRIMEONE>?node-id=6598-27869
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/menubar/menubar.ts
// component=Menubar
import figma from 'figma'

const example = figma.code`<p-menubar [model]="items" />`
const imports = ["import { Menubar } from 'primeng/menubar';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'menubar',
  metadata: { nestable: true },
}
