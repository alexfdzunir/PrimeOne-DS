// url=<PRIMEONE>?node-id=13219-82377
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/avatargroup/avatargroup.ts
// component=AvatarGroup
import figma from 'figma'
import { isInstance } from '../../figma/helpers'
import { avatarCode } from '../../figma/templates/avatar'

const instance = figma.selectedInstance
const avatars = instance.findLayers((node) => node.name === 'avatar').filter(isInstance).map((avatar) => `  ${avatarCode(avatar).replace(/\n/g, '\n  ')}`)

const example = figma.code`<p-avatar-group>\n${avatars.join('\n')}\n</p-avatar-group>`
const imports = ["import { Avatar } from 'primeng/avatar';", "import { AvatarGroup } from 'primeng/avatargroup';"]

export default {
  example,
  imports,
  id: 'avatargroup',
  metadata: { nestable: true },
}
