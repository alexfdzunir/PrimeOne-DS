// url=<PRIMEONE>?node-id=6408-44516
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/orderlist/orderlist.ts
// component=OrderList
import figma from 'figma'

const example = figma.code`<p-orderlist [value]="products" dataKey="id" [dragdrop]="true">
  <ng-template #item let-product>
    {{ product.name }}
  </ng-template>
</p-orderlist>`
const imports = ["import { OrderList } from 'primeng/orderlist';"]

export default {
  example,
  imports,
  id: 'orderlist',
  metadata: { nestable: true },
}
