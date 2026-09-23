// url=<PRIMEONE>?node-id=6641-26340
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/galleria/galleria.ts
// component=Galleria
import figma from 'figma'
import { is } from '../../figma/helpers'
import { P } from '../../figma/props'

const instance = figma.selectedInstance
const position = { Bottom: 'bottom', Top: 'top', Left: 'left', Right: 'right', 'N/A': undefined } as const
const thumbnails = is(instance, 'Thumbnail')
const indicators = is(instance, 'Indicator')
const thumbPos = thumbnails ? instance.getEnum(P.nestedThumbnailLocation, position) : undefined
const indicatorPos = indicators ? instance.getEnum(P.nestedIndicatorLocation, position) : undefined
const attrs = `${thumbnails ? '' : ' [showThumbnails]="false"'}${thumbPos && thumbPos !== 'bottom' ? ` thumbnailsPosition="${thumbPos}"` : ''}${indicators ? ' [showIndicators]="true"' : ''}${indicatorPos && indicatorPos !== 'bottom' ? ` indicatorsPosition="${indicatorPos}"` : ''}`

const example = figma.code`<p-galleria [value]="images" [numVisible]="5"${attrs}>
  <ng-template #item let-item>
    <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%" />
  </ng-template>${thumbnails ? `
  <ng-template #thumbnail let-item>
    <img [src]="item.thumbnailImageSrc" [alt]="item.alt" />
  </ng-template>` : ''}
</p-galleria>`
const imports = ["import { GalleriaModule } from 'primeng/galleria';"]

export default {
  example,
  imports,
  id: 'galleria',
  metadata: { nestable: true },
}
