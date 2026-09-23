// url=<PRIMEONE>?node-id=462-27439
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/panelmenu/panelmenu.ts
// component=PanelMenu
import figma from 'figma'

const example = figma.code`<p-panelmenu [model]="items" />`
const imports = ["import { PanelMenu } from 'primeng/panelmenu';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'panelmenu',
  metadata: { nestable: true },
}
