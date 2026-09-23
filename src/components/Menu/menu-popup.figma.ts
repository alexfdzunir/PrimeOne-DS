// url=<PRIMEONE>?node-id=2355-48581
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/menu/menu.ts
// component=Menu
import figma from 'figma'

const example = figma.code`<p-button (click)="menu.toggle($event)" icon="ph ph-dots-three-vertical" text severity="secondary" ariaLabel="Opciones" />
<p-menu #menu [model]="items" [popup]="true" />`
const imports = ["import { Menu } from 'primeng/menu';", "import { Button } from 'primeng/button';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'menu-popup',
  metadata: { nestable: true },
}
