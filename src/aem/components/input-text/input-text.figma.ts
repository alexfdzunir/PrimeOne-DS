// url=<AEM>?node-id=6913-21369
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/input-text/input-text.css
// component=aem-input
import figma from 'figma'
import { attr, flag, is } from '../../../figma/helpers'
import { aemSwapIcon, cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const phone = is(instance, 'Type', 'Phone')
const invalid = is(instance, 'Invalid')
const disabled = is(instance, 'Disabled')
const filled = is(instance, 'Filled')
const host = cls('aem-field-host', 'aem-input', phone && 'aem-input--phone', invalid && 'aem-field-host--invalid', disabled && 'aem-field-host--disabled')
const value = filled ? (phone ? instance.getString('Phone Number') : 'María') : ''
const label = phone ? 'Teléfono' : instance.getString('Label Text')
const icon = instance.getBoolean('Show Icon') ? `\n    ${aemSwapIcon(instance, 'Select Icon', 'aem-field__icon', phone ? 'phone' : undefined)}` : ''
const field = `<label class="aem-field">
    <span class="aem-field__control">
      <input class="aem-field__input" type="${phone ? 'tel' : 'text'}" placeholder=" "${attr('value', value)}${flag('disabled', disabled)}${invalid ? ' aria-invalid="true"' : ''} />
      <span class="aem-field__label">${label}</span>
    </span>${icon}
  </label>`
const body = phone ? `<div class="aem-input__row">
    <span class="aem-field aem-input__prefix">${instance.getString('Phone Code')}</span>
    ${field.replace(/\n/g, '\n  ')}
  </div>` : field
const supporting = instance.getBoolean('Show Supporting Text') || invalid ? `\n  <p class="aem-field__supporting">${instance.getString('Supporting Text')}</p>` : ''

export default {
  example: figma.code`<div class="${host}">
  ${body}${supporting}
</div>`,
  id: 'aem-input-text',
  metadata: { nestable: true },
}
