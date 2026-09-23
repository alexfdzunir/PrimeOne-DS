// url=<PRIMEONE>?node-id=6977-102044
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/imagecompare/imagecompare.ts
// component=ImageCompare
import figma from 'figma'

const example = figma.code`<p-image-compare>
  <ng-template #left>
    <img src="assets/antes.jpg" alt="Antes" />
  </ng-template>
  <ng-template #right>
    <img src="assets/despues.jpg" alt="Después" />
  </ng-template>
</p-image-compare>`
const imports = ["import { ImageCompare } from 'primeng/imagecompare';"]

export default {
  example,
  imports,
  id: 'imagecompare',
  metadata: { nestable: true },
}
