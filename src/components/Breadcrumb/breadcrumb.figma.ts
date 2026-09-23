// url=<PRIMEONE>?node-id=185-6637
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/breadcrumb/breadcrumb.ts
// component=Breadcrumb
import figma from 'figma'

const example = figma.code`<p-breadcrumb [model]="items" [home]="home" />`
const imports = ["import { Breadcrumb } from 'primeng/breadcrumb';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'breadcrumb',
  metadata: { nestable: true },
}
