// url=<PRIMEONE>?node-id=323-12317
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/confirmdialog/confirmdialog.ts
// component=ConfirmDialog
import figma from 'figma'

const example = figma.code`<p-confirmdialog />
<p-button (click)="confirm()" label="Eliminar" severity="danger" />`
const imports = ["import { ConfirmDialog } from 'primeng/confirmdialog';", "import { Button } from 'primeng/button';", "import { ConfirmationService } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'confirmdialog',
  metadata: { nestable: true },
}
