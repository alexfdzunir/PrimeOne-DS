// url=<AEM>?node-id=5968-10119
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/checkbox/checkbox.css
// component=aem-checkbox
import figma from 'figma'
import { flag, is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const size = instance.getEnum('Size', { LG: undefined, SM: 'aem-checkbox--sm' })
const invalid = is(instance, 'State', 'Error')
const checked = is(instance, 'Selection', 'Selected')
const indeterminate = is(instance, 'Selection', 'Indeterminate')
const legend = instance.getBoolean('Show Label') ? `\n  <legend class="aem-checkbox__legend">${instance.getString('Label Text')}</legend>` : ''
const supporting = instance.getBoolean('Show Supporting Text') || invalid ? '\n  <p class="aem-checkbox__supporting">Texto de ayuda</p>' : ''

export default {
  example: figma.code`<fieldset class="${cls('aem-checkbox', size, invalid && 'aem-checkbox--invalid')}">${legend}
  <label class="aem-checkbox__item">
    <input class="aem-checkbox__input" type="checkbox"${flag('checked', checked)}${flag('data-indeterminate', indeterminate)}${flag('disabled', is(instance, 'Disabled'))}${invalid ? ' aria-invalid="true"' : ''} />
    <span class="aem-checkbox__box"><i class="ph-bold ph-check aem-checkbox__check" aria-hidden="true"></i><i class="ph-bold ph-minus aem-checkbox__minus" aria-hidden="true"></i></span>
    <span>${instance.getString('Item Text')}</span>
  </label>${supporting}
</fieldset>`,
  id: 'aem-checkbox',
  metadata: { nestable: true },
}
