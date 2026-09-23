// url=<PRIMEONE>?node-id=12947-178229
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/skeleton/skeleton.ts
// component=Skeleton
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance

const example = figma.code`<p-skeleton width="100%" height="1rem"${is(instance, 'Animation', 'Pulse') ? ' animation="none"' : ''} />`
const imports = ["import { Skeleton } from 'primeng/skeleton';"]

export default {
  example,
  imports,
  id: 'skeleton-ds',
  metadata: { nestable: true },
}
