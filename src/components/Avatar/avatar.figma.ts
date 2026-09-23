// url=<PRIMEONE>?node-id=13219-82393
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/avatar/avatar.ts
// component=Avatar
import figma from 'figma'
import { avatarCode } from '../../figma/templates/avatar'

const instance = figma.selectedInstance
const code = avatarCode(instance)

const example = figma.code`${code}`
const imports = ["import { Avatar } from 'primeng/avatar';", ...(code.includes('p-overlay-badge') ? ["import { OverlayBadge } from 'primeng/overlaybadge';"] : [])]

export default {
  example,
  imports,
  id: 'avatar',
  metadata: { nestable: true },
}
