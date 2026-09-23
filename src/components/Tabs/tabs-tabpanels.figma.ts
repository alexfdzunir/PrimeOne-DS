// url=<PRIMEONE>?node-id=6555-1638
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/tabs/tabs.ts
// component=TabPanels
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance
const content = is(instance, 'Slot') ? '' : `\n    <p>${instance.getString('Content')}</p>\n  `

const example = figma.code`<p-tabpanels>\n  <p-tabpanel value="0">${content}</p-tabpanel>\n</p-tabpanels>`
const imports = ["import { TabPanels, TabPanel } from 'primeng/tabs';"]

export default {
  example,
  imports,
  id: 'tabs-tabpanels',
  metadata: { nestable: true },
}
