// url=<PRIMEONE>?node-id=12255-13183
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/speeddial/speeddial.ts
// component=SpeedDial
import figma from 'figma'
import { attr, bind, is } from '../../figma/helpers'

const instance = figma.selectedInstance
const direction = instance.getEnum('Direction', {
  Up: 'up', Down: 'down', Left: 'left', Right: 'right',
  'Up Right': 'up-right', 'Up Left': 'up-left', 'Down Right': 'down-right', 'Down Left': 'down-left', 'N/A': undefined,
})
const type = is(instance, 'Circular')
  ? instance.getEnum('Circular Type', { 'Semi-Circle': 'semi-circle', 'Quarter-Circle': 'quarter-circle', 'Full Circle': 'circle', 'N/A': 'circle' })
  : undefined

const example = figma.code`<p-speeddial [model]="items"${attr('direction', direction)}${attr('type', type)}${bind('radius', type ? '80' : undefined)} />`
const imports = ["import { SpeedDial } from 'primeng/speeddial';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'speeddial',
  metadata: { nestable: true },
}
