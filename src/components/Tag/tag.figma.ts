// url=<PRIMEONE>?node-id=373-13337
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/tag/tag.ts
// component=Tag
import figma from 'figma'
import { attr, swapIcon } from '../../figma/helpers'

const instance = figma.selectedInstance
const severity = instance.getEnum('Severity', { Primary: undefined, Secondary: 'secondary', Success: 'success', Info: 'info', Warn: 'warn', Danger: 'danger', Contrast: 'contrast' })
const icon = instance.getBoolean('Show Icon') ? swapIcon(instance, 'Icon') : undefined

const example = figma.code`<p-tag value="${instance.getString('Text')}"${attr('severity', severity)}${attr('icon', icon)} />`
const imports = ["import { Tag } from 'primeng/tag';"]

export default {
  example,
  imports,
  id: 'tag',
  metadata: { nestable: true },
}
