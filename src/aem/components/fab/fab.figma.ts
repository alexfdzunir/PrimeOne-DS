// url=<AEM>?node-id=8600-716
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/fab/fab.css
// component=aem-fab
import figma from 'figma'
import { attr, is } from '../../../figma/helpers'
import { aemSwapIcon, cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const label = instance.getString('Text')
const iconOnly = is(instance, 'Icon-Only')
const size = instance.getEnum('Size', { LG: undefined, MD: 'aem-fab--md' })
const icon = aemSwapIcon(instance, 'Select Icon', 'aem-fab__icon')
const content = iconOnly ? icon : `<span>${label}</span>${instance.getBoolean('Show Icon') ? `\n  ${icon}` : ''}`

export default {
  example: figma.code`<button class="${cls('aem-fab', size, iconOnly && 'aem-fab--icon-only')}" type="button"${attr('aria-label', iconOnly && label)}>
  ${content}
</button>`,
  id: 'aem-fab',
  metadata: { nestable: true },
}
