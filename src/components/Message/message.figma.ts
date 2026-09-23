// url=<PRIMEONE>?node-id=393-39252
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/message/message.ts
// component=Message
import figma from 'figma'
import { attr, flag, swapIcon } from '../../figma/helpers'

const instance = figma.selectedInstance
const severity = instance.getEnum('Severity', { Success: 'success', Info: 'info', Warn: 'warn', Error: 'error', Secondary: 'secondary', Contrast: 'contrast' })
const variant = instance.getEnum('Type', { Default: undefined, Simple: 'simple', Outlined: 'outlined' })
const size = instance.getEnum('Size', { Normal: undefined, Small: 'small', Large: 'large' })
const icon = instance.getBoolean('Show Icon') ? swapIcon(instance, 'Icon') : undefined

const example = figma.code`<p-message severity="${severity}"${attr('icon', icon)}${flag('closable', instance.getBoolean('Closable'))}${attr('variant', variant)}${attr('size', size)}>${instance.getString('Text')}</p-message>`
const imports = ["import { Message } from 'primeng/message';"]

export default {
  example,
  imports,
  id: 'message',
  metadata: { nestable: true },
}
