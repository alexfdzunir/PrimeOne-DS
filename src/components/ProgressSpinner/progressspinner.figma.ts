// url=<PRIMEONE>?node-id=12786-169121
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/progressspinner/progressspinner.ts
// component=ProgressSpinner
import figma from 'figma'

const instance = figma.selectedInstance
const px = instance.getEnum('Size', { XS: '16px', S: '24px', M: '32px', L: '42px', XL: '64px' })

const example = figma.code`<p-progress-spinner strokeWidth="4" [style]="{ width: '${px}', height: '${px}' }" ariaLabel="Cargando" />`
const imports = ["import { ProgressSpinner } from 'primeng/progressspinner';"]

export default {
  example,
  imports,
  id: 'progressspinner',
  metadata: { nestable: true },
}
