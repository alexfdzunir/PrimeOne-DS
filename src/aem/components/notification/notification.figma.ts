// url=<AEM>?node-id=8605-42607
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/notification/notification.css
// component=aem-notification
import figma from 'figma'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', { Success: undefined, Error: 'aem-notification--error', Warning: 'aem-notification--warning', Information: 'aem-notification--info' })
const glyph = instance.getEnum('Type', { Success: 'check-circle', Error: 'prohibit', Warning: 'warning', Information: 'info' })
const role = instance.getEnum('Type', { Success: 'status', Error: 'alert', Warning: 'status', Information: 'status' })
const small = instance.getEnum('Size', { LG: false, SM: true })
const icon = instance.getBoolean('Show Icon') ? `\n    <i class="ph ph-${glyph} aem-notification__icon" aria-hidden="true"></i>` : ''
const link = instance.getBoolean('Show Button') ? '\n  <a class="aem-notification__link" href="#">Más información <i class="ph ph-arrow-right" aria-hidden="true"></i></a>' : ''
const body = small ? '' : `\n  <p class="aem-notification__text">${instance.getString('Description')}</p>${link}`

export default {
  example: figma.code`<div class="${cls('aem-notification', type, small && 'aem-notification--sm')}" role="${role}">
  <div class="aem-notification__head">${icon}
    <p class="aem-notification__title">${instance.getString('Title')}</p>
  </div>${body}
</div>`,
  id: 'aem-notification',
  metadata: { nestable: true },
}
