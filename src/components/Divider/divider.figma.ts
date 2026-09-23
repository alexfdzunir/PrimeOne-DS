// url=<PRIMEONE>?node-id=302-11810
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/divider/divider.ts
// component=Divider
import figma from 'figma'
import { attr, is, part } from '../../figma/helpers'

const instance = figma.selectedInstance
const vertical = is(instance, 'Direction', 'Vertical')
const align = instance.getEnum('Align', { 'N/A': undefined, Left: 'left', Center: 'center', Right: 'right', Top: 'top', Bottom: 'bottom' })
const content = is(instance, 'Content') ? part(instance, 'divider-content') : undefined
const text = content ? content.getString('Text') : undefined
const attrs = `${attr('layout', vertical ? 'vertical' : undefined)}${attr('type', is(instance, 'Type', 'Dashed') ? 'dashed' : undefined)}${attr('align', align)}`

const example = text ? figma.code`<p-divider${attrs}>\n  <b>${text}</b>\n</p-divider>` : figma.code`<p-divider${attrs} />`
const imports = ["import { Divider } from 'primeng/divider';"]

export default {
  example,
  imports,
  id: 'divider',
  metadata: { nestable: true },
}
