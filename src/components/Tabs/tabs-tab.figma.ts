// url=<PRIMEONE>?node-id=320-12255
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/tabs/tabs.ts
// component=Tab
import figma from 'figma'
import { swapIcon } from '../../figma/helpers'

const instance = figma.selectedInstance
const header = instance.getString('Header')
const left = instance.getBoolean('Show Left Icon') ? swapIcon(instance, 'Left Icon') : undefined
const right = instance.getBoolean('Show Right Icon') ? swapIcon(instance, 'Right Icon') : undefined
const label = `${left ? `<i class="${left}"></i>\n  ` : ''}${header}${right ? `\n  <i class="${right}"></i>` : ''}`
const multiline = left || right

const example = multiline ? figma.code`<p-tab value="0">\n  ${label}\n</p-tab>` : figma.code`<p-tab value="0">${label}</p-tab>`
const imports = ["import { Tab } from 'primeng/tabs';"]

export default {
  example,
  imports,
  id: 'tabs-tab',
  metadata: { nestable: true },
}
