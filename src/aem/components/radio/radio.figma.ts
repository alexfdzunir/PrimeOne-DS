// url=<AEM>?node-id=6104-1373
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/radio/radio.css
// component=aem-radio
import figma from 'figma'
import { flag, is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const size = instance.getEnum('Size', { LG: undefined, SM: 'aem-radio--sm' })
const invalid = is(instance, 'State', 'Error')
const legend = instance.getBoolean('Show Label') ? `\n  <legend class="aem-radio__legend">${instance.getString('Label Text')}</legend>` : ''
const supporting = instance.getBoolean('Show Supporting Text') || invalid ? '\n  <p class="aem-radio__supporting">Texto de ayuda</p>' : ''

export default {
  example: figma.code`<fieldset class="${cls('aem-radio', size, invalid && 'aem-radio--invalid')}">${legend}
  <label class="aem-radio__item">
    <input class="aem-radio__input" type="radio" name="opcion"${flag('checked', is(instance, 'Selected'))}${flag('disabled', is(instance, 'Disabled'))} />
    <span class="aem-radio__circle"></span>
    <span>${instance.getString('Item Text')}</span>
  </label>${supporting}
</fieldset>`,
  id: 'aem-radio',
  metadata: { nestable: true },
}
