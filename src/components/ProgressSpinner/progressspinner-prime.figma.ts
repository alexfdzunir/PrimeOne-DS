// url=<PRIMEONE>?node-id=367-12862
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/progressspinner/progressspinner.ts
// component=ProgressSpinner
import figma from 'figma'

const example = figma.code`<p-progress-spinner ariaLabel="Cargando" />`
const imports = ["import { ProgressSpinner } from 'primeng/progressspinner';"]

export default {
  example,
  imports,
  id: 'progressspinner-prime',
  metadata: { nestable: true },
}
