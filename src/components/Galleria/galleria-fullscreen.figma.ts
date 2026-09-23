// url=<PRIMEONE>?node-id=3976-44103
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/galleria/galleria.ts
// component=Galleria
import figma from 'figma'

const example = figma.code`<p-galleria [value]="images" [(visible)]="visible" [fullScreen]="true" [circular]="true" [showItemNavigators]="true" [showThumbnails]="false" [numVisible]="5">
  <ng-template #item let-item>
    <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%" />
  </ng-template>
</p-galleria>`
const imports = ["import { GalleriaModule } from 'primeng/galleria';"]

export default {
  example,
  imports,
  id: 'galleria-fullscreen',
  metadata: { nestable: true },
}
