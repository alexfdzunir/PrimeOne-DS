// url=<PRIMEONE>?node-id=397-18966
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/picklist/picklist.ts
// component=PickList
import figma from 'figma'

const example = figma.code`<p-picklist [source]="source" [target]="target" sourceHeader="Disponibles" targetHeader="Seleccionados" [dragdrop]="true" breakpoint="1400px">
  <ng-template #item let-item>
    {{ item.name }}
  </ng-template>
</p-picklist>`
const imports = ["import { PickList } from 'primeng/picklist';"]

export default {
  example,
  imports,
  id: 'picklist',
  metadata: { nestable: true },
}
