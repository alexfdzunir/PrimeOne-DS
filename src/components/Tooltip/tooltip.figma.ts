// url=<PRIMEONE>?node-id=327-12832
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/tooltip/tooltip.ts
// component=Tooltip
import figma from 'figma'
import { part } from '../../figma/helpers'

const instance = figma.selectedInstance
const bubble = part(instance, 'tooltip-tooltip')
const text = bubble ? bubble.getString('Text') : 'Tooltip'
const position = instance.getEnum('Position', { Right: 'right', Left: 'left', Top: 'top', Bottom: 'bottom' })
const button = part(instance, 'button-small')
const label = button ? button.getString('Text') : 'Button'

const example = figma.code`<p-button label="${label}" size="small" pTooltip="${text}" tooltipPosition="${position}" />`
const imports = ["import { Button } from 'primeng/button';", "import { Tooltip } from 'primeng/tooltip';"]

export default {
  example,
  imports,
  id: 'tooltip',
  metadata: { nestable: true },
}
