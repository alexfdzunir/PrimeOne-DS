// url=<PRIMEONE>?node-id=373-13726
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/skeleton/skeleton.ts
// component=Skeleton
import figma from 'figma'

const example = figma.code`<p-skeleton width="10rem" height="4rem" />`
const imports = ["import { Skeleton } from 'primeng/skeleton';"]

export default {
  example,
  imports,
  id: 'skeleton',
  metadata: { nestable: true },
}
