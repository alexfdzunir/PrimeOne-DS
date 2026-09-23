// url=<PRIMEONE>?node-id=452-28582
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/tieredmenu/tieredmenu.ts
// component=TieredMenu
import figma from 'figma'

const example = figma.code`<p-tieredmenu [model]="items" />`
const imports = ["import { TieredMenu } from 'primeng/tieredmenu';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'tieredmenu',
  metadata: { nestable: true },
}
