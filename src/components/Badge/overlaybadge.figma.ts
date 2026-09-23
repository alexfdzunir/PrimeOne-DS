// url=<PRIMEONE>?node-id=6998-92179
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/overlaybadge/overlaybadge.ts
// component=OverlayBadge
import figma from 'figma'
import { attr } from '../../figma/helpers'

const instance = figma.selectedInstance
const severity = instance.getEnum('Severity', { Primary: undefined, Success: 'success', Info: 'info', Warn: 'warn', Danger: 'danger', Secondary: 'secondary', Contrast: 'contrast' })
const size = instance.getEnum('Size', { XL: 'xlarge', L: 'large', M: undefined, S: 'small', XS: 'small' })

const example = figma.code`<p-overlay-badge value="${instance.getString('Text')}"${attr('severity', severity)}${attr('badgeSize', size)}>
  <i class="ph ph-bell" style="font-size: 1.5rem"></i>
</p-overlay-badge>`
const imports = ["import { OverlayBadge } from 'primeng/overlaybadge';"]

export default {
  example,
  imports,
  id: 'overlaybadge',
  metadata: { nestable: true },
}
