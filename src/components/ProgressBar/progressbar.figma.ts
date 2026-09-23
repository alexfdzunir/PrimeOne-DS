// url=<PRIMEONE>?node-id=349-12860
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/progressbar/progressbar.ts
// component=ProgressBar
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance
const value = parseInt(instance.getString('Text'), 10)

const example = is(instance, 'Type', 'Indeterminate')
  ? figma.code`<p-progressbar mode="indeterminate" [style]="{ height: '6px' }" />`
  : figma.code`<p-progressbar [value]="${Number.isNaN(value) ? 50 : value}"${is(instance, 'Value', 'False') ? ' [showValue]="false"' : ''} />`
const imports = ["import { ProgressBar } from 'primeng/progressbar';"]

export default {
  example,
  imports,
  id: 'progressbar',
  metadata: { nestable: true },
}
