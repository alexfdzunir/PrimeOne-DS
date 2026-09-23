// url=<PRIMEONE>?node-id=324-16867
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/confirmpopup/confirmpopup.ts
// component=ConfirmPopup
import figma from 'figma'

const example = figma.code`<p-confirmpopup />
<p-button (click)="confirm($event)" label="Eliminar" severity="danger" />`
const imports = ["import { ConfirmPopup } from 'primeng/confirmpopup';", "import { Button } from 'primeng/button';", "import { ConfirmationService } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'confirmpopup',
  metadata: { nestable: true },
}
