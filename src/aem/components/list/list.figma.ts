// url=<AEM>?node-id=10431-64022
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/list/list.css
// component=aem-list
import figma from 'figma'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', { Unordered: undefined, Ordered: 'aem-list--ordered', Flag: 'aem-list--icon', Icon: 'aem-list--icon' })
// Flag is the icon list with the flag glyph; Inverse comes from the dark context (.aem-dark), not a modifier
const glyph = instance.getEnum('Type', { Unordered: '', Ordered: '', Flag: 'flag', Icon: 'check-circle' })
const tag = type === 'aem-list--ordered' ? 'ol' : 'ul'
const count = Number(instance.getPropertyValue('N-items')) || 3
const items = Array.from({ length: count }, (_, i) => `  <li>${glyph ? `<i class="ph ph-${glyph} aem-list__icon" aria-hidden="true"></i>` : ''}<span>Elemento ${i + 1}</span></li>`).join('\n')

export default {
  example: figma.code`<${tag} class="${cls('aem-list', type)}">
${items}
</${tag}>`,
  id: 'aem-list',
  metadata: { nestable: true },
}
