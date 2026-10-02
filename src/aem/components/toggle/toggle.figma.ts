// url=<AEM>?node-id=6484-7306
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/toggle/toggle.css
// component=aem-toggle
import figma from 'figma'
import { flag, is } from '../../../figma/helpers'

const instance = figma.selectedInstance
const label = instance.getBoolean('Show label') ? `\n  <span class="aem-toggle__label">${instance.getString('Label Text')}</span>` : ''

export default {
  example: figma.code`<div class="aem-toggle">${label}
  <label class="aem-toggle__control">
    <span>${instance.getString('Option Text')}</span>
    <input class="aem-toggle__input" type="checkbox" role="switch"${flag('checked', is(instance, 'Selected'))}${flag('disabled', is(instance, 'Disabled'))} />
    <span class="aem-toggle__track"><span class="aem-toggle__handle"><i class="ph-bold ph-x aem-toggle__off" aria-hidden="true"></i><i class="ph-bold ph-check aem-toggle__on" aria-hidden="true"></i></span></span>
  </label>
</div>`,
  id: 'aem-toggle',
  metadata: { nestable: true },
}
