// url=<PRIMEONE>?node-id=19254-256995
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/tabs/tabs.ts
// component=Tabs
import figma from 'figma'
import { is, isInstance, part, swapIcon } from '../../figma/helpers'

const instance = figma.selectedInstance
const small = is(instance, 'Size', 'S')
const tabs = instance.findLayers((node) => node.name === 'tabs-tab').filter(isInstance)
const active = Math.max(0, tabs.findIndex((tab) => is(tab, 'State', 'Highlight')))
const tabList = tabs
  .map((tab, i) => {
    const left = tab.getBoolean('Show Left Icon') ? swapIcon(tab, 'Left Icon') : undefined
    const right = tab.getBoolean('Show Right Icon') ? swapIcon(tab, 'Right Icon') : undefined
    const header = tab.getString('Header')
    return `    <p-tab value="${i}">${left ? `<i class="${left}"></i> ` : ''}${header}${right ? ` <i class="${right}"></i>` : ''}</p-tab>`
  })
  .join('\n')
const panel = part(instance, 'tabs-tabpanels')
const content = panel && !is(panel, 'Slot') ? panel.getString('Content') : ''
const panels = tabs
  .map((_, i) => (i === active && content ? `    <p-tabpanel value="${i}">\n      <p>${content}</p>\n    </p-tabpanel>` : `    <p-tabpanel value="${i}"></p-tabpanel>`))
  .join('\n')

const example = figma.code`<p-tabs value="${active}"${small ? ' [dt]="tabsSm"' : ''}>
  <p-tablist${small ? ' style="font-size: 0.75rem"' : ''}>
${tabList}
  </p-tablist>
  <p-tabpanels>
${panels}
  </p-tabpanels>
</p-tabs>`
const imports = ["import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';", ...(small ? ["import { tabsSm } from 'prime-one-ds';"] : [])]

export default {
  example,
  imports,
  id: 'tabs',
  metadata: { nestable: true },
}
