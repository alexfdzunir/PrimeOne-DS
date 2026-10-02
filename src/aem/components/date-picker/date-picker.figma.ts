// url=<AEM>?node-id=7438-5959
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/date-picker/date-picker.css
// component=aem-datepicker
import figma from 'figma'
import { attr, flag, is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const invalid = is(instance, 'State', 'Error')
const disabled = is(instance, 'Disabled')
const host = cls('aem-field-host', 'aem-datepicker', invalid && 'aem-field-host--invalid', disabled && 'aem-field-host--disabled')
const open = !is(instance, 'Action', 'Default')

export default {
  example: figma.code`<div class="${host}">
  <div class="aem-field">
    <label class="aem-field__control">
      <input class="aem-field__input" type="text" inputmode="numeric" placeholder=" "${attr('value', is(instance, 'Filled') && '12/05/1995')} autocomplete="bday"${flag('disabled', disabled)} />
      <span class="aem-field__label">Fecha de nacimiento</span>
    </label>
    <button class="aem-datepicker__toggle" type="button" aria-label="Abrir calendario" aria-expanded="${String(open)}"${flag('disabled', disabled)}><i class="ph ph-calendar-blank" aria-hidden="true"></i></button>
  </div>
  <div class="aem-calendar" role="dialog" aria-label="Calendario"${open ? '' : ' hidden'}></div>
</div>`,
  id: 'aem-date-picker',
  metadata: { nestable: true },
}
