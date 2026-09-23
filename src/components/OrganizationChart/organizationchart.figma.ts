// url=<PRIMEONE>?node-id=434-25271
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/organizationchart/organizationchart.ts
// component=OrganizationChart
import figma from 'figma'
import { is, part } from '../../figma/helpers'

const instance = figma.selectedInstance
const collapsible = is(part(instance, 'organizationchart-node'), 'Toggleable')

const example = figma.code`<p-organization-chart [value]="data"${collapsible ? ' [collapsible]="true"' : ''} />`
const imports = ["import { OrganizationChart } from 'primeng/organizationchart';", "import { TreeNode } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'organizationchart',
  metadata: { nestable: true },
}
