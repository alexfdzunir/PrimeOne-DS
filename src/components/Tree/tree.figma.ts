// url=<PRIMEONE>?node-id=422-22831
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/tree/tree.ts
// component=Tree
import figma from 'figma'
import { flag, is, part } from '../../figma/helpers'

const instance = figma.selectedInstance
const checkbox = is(part(instance, 'tree-treenode'), 'Show Checkbox')

const example = figma.code`<p-tree [value]="nodes"${checkbox ? ' selectionMode="checkbox" [(selection)]="selectedNodes"' : ''}${flag('filter', instance.getBoolean('Show Filter'))} />`
const imports = ["import { Tree } from 'primeng/tree';", "import { TreeNode } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'tree',
  metadata: { nestable: true },
}
