// url=<AEM>?node-id=7605-10939
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/date-tag/date-tag.css
// component=aem-date-tag
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const past = is(instance, 'Time', 'Past')
const online = is(instance, 'State', 'Online')
const state = past ? 'finalizado' : online ? 'online' : 'presencial'
const label = past ? 'Finalizado' : online ? 'Online' : 'Presencial'
const range = is(instance, 'Types', 'Day range')
const months = is(instance, 'Types', 'Month range')
const day = months ? instance.getString('First Month') : instance.getString('Day')
const last = range ? `\n    <span class="aem-date-tag__dash">-</span>\n    <span class="aem-date-tag__day">${instance.getString('Last Day')}</span>` : months ? `\n    <span class="aem-date-tag__dash">-</span>\n    <span class="aem-date-tag__day">${instance.getString('Last Month')}</span>` : ''
const meta = instance.getBoolean('Show Meta data') ? `
    <span class="aem-date-tag__meta">
      <span class="aem-date-tag__month">${instance.getString('Month / Year')}</span>
      <span class="aem-date-tag__time">${instance.getString('Time / Year')}</span>
    </span>` : ''

export default {
  example: figma.code`<div class="${cls('aem-date-tag', past && 'aem-date-tag--past')}">
  <span class="aem-state-tag aem-state-tag--${state}">${label}</span>
  <span class="aem-date-tag__date">
    <span class="aem-date-tag__day">${day}</span>${last}${meta}
  </span>
</div>`,
  id: 'aem-date-tag',
  metadata: { nestable: true },
}
