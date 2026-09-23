// url=<PRIMEONE>?node-id=452-28358
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/menu/menu.ts
// component=Menu
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance
const popup = is(instance, 'Type', 'Popup')

const example = popup
  ? figma.code`<p-button (click)="menu.toggle($event)" icon="ph ph-dots-three-vertical" text severity="secondary" ariaLabel="Opciones" />
<p-menu #menu [model]="items" [popup]="true" />`
  : figma.code`<p-menu [model]="items" />`
const imports = ["import { Menu } from 'primeng/menu';", "import { MenuItem } from 'primeng/api';", ...(popup ? ["import { Button } from 'primeng/button';"] : [])]

export default {
  example,
  imports,
  id: 'menu',
  metadata: { nestable: true },
}
