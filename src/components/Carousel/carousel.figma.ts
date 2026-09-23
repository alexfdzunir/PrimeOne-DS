// url=<PRIMEONE>?node-id=501-30399
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/carousel/carousel.ts
// component=Carousel
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance
const vertical = is(instance, 'Direction', 'Vertical') ? ' orientation="vertical" verticalViewPortHeight="360px"' : ''

const example = figma.code`<p-carousel [value]="products" [numVisible]="3" [numScroll]="1" [circular]="true"${vertical}>
  <ng-template #item let-product>
    <h4>{{ product.name }}</h4>
    <p>{{ product.price }}</p>
  </ng-template>
</p-carousel>`
const imports = ["import { Carousel } from 'primeng/carousel';"]

export default {
  example,
  imports,
  id: 'carousel',
  metadata: { nestable: true },
}
