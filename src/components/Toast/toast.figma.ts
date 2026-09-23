// url=<PRIMEONE>?node-id=393-42317
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/toast/toast.ts
// component=Toast
import figma from 'figma'
import { jsText } from '../../figma/helpers'

const instance = figma.selectedInstance
const severity = instance.getEnum('Severity', { Success: 'success', Contrast: 'contrast', Error: 'error', Info: 'info', Secondary: 'secondary', Warn: 'warn' })
const text = jsText(instance.getString('Text'))

const example = figma.code`<p-toast />
<p-button label="Mostrar" (click)="messageService.add({ severity: '${severity}', summary: '${text}', life: 3000 })" />`
const imports = ["import { Toast } from 'primeng/toast';", "import { Button } from 'primeng/button';", "import { MessageService } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'toast',
  metadata: { nestable: true },
}
