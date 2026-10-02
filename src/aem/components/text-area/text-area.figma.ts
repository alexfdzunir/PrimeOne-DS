// url=<AEM>?node-id=5968-13325
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/text-area/text-area.css
// component=aem-textarea
import figma from 'figma'
import { flag, is } from '../../../figma/helpers'
import { aemSwapIcon, cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const invalid = is(instance, 'Invalid')
const disabled = is(instance, 'Disabled')
const value = is(instance, 'Filled') ? instance.getString('Input Text Filled') : ''
const host = cls('aem-field-host', 'aem-textarea', invalid && 'aem-field-host--invalid', disabled && 'aem-field-host--disabled')
const icon = instance.getBoolean('Show Suffix-Icon') ? `\n      ${aemSwapIcon(instance, 'Select Suffix-Icon', 'aem-field__icon', 'pencil-simple')}` : ''
const supporting = instance.getBoolean('Show Supporting Text') ? `\n    <p class="aem-field__supporting">${instance.getString('Supporting Text')}</p>` : ''
const count = instance.getBoolean('Show Character Count') ? `\n    <span class="aem-textarea__count" aria-live="polite">${instance.getString('Character Count')}</span>` : ''
const footer = instance.getBoolean('Show Footer') ? `\n  <div class="aem-textarea__footer">${supporting}${count}\n  </div>` : ''

export default {
  example: figma.code`<div class="${host}">
  <label class="aem-field">
    <span class="aem-textarea__head">
      <span class="aem-textarea__label">${instance.getString('Label Text')}</span>${icon}
    </span>
    <textarea class="aem-field__input" rows="3" placeholder=" " maxlength="500"${flag('disabled', disabled)}>${value}</textarea>
  </label>${footer}
</div>`,
  id: 'aem-text-area',
  metadata: { nestable: true },
}
