// url=<PRIMEONE>?node-id=2403-47612
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/tieredmenu/tieredmenu.ts
// component=TieredMenu
import figma from 'figma'

const example = figma.code`<p-button (click)="menu.toggle($event)" label="Opciones" icon="ph ph-caret-down" iconPos="right" severity="secondary" />
<p-tieredmenu #menu [model]="items" [popup]="true" />`
const imports = ["import { TieredMenu } from 'primeng/tieredmenu';", "import { Button } from 'primeng/button';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'tieredmenu-popup',
  metadata: { nestable: true },
}
