// url=<PRIMEONE>?node-id=330-13237
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/badge/badge.ts
// component=Badge
import figma from 'figma'
import { attr } from '../../figma/helpers'

const instance = figma.selectedInstance
const severity = instance.getEnum('Severity', { Primary: undefined, Success: 'success', Info: 'info', Warn: 'warn', Danger: 'danger', Secondary: 'secondary', Contrast: 'contrast' })
const size = instance.getEnum('Size', { XL: 'xlarge', L: 'large', M: undefined, S: 'small', XS: 'small' })

const example = figma.code`<p-badge value="${instance.getString('Text')}"${attr('severity', severity)}${attr('badgeSize', size)} />`
const imports = ["import { Badge } from 'primeng/badge';"]

export default {
  example,
  imports,
  id: 'badge',
  metadata: { nestable: true },
}
