// url=<AEM>?node-id=7009-13428
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/filter/filter.css
// component=aem-filter
import figma from 'figma'
import { attr, is } from '../../../figma/helpers'
import { aemSwapIcon, cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const label = instance.getString('Text')
const type = instance.getEnum('Type', { Row: undefined, Column: 'aem-filter--column' })
const multiple = is(instance, 'State', 'Multiselection')
const chosen = multiple || is(instance, 'State', 'Uniselection')
const icon = instance.getBoolean('Show Prefix-Icon') ? `\n    ${aemSwapIcon(instance, 'Select Icon', 'aem-filter__icon')}` : ''
const count = multiple ? instance.getString('Selection Number') : ''

export default {
  example: figma.code`<div class="${cls('aem-filter', type)}" data-aem-dropdown>
  <button class="${cls('aem-field', 'aem-filter__trigger', chosen && 'has-value')}" type="button" aria-haspopup="listbox" aria-expanded="${String(is(instance, 'State', 'Displayed'))}">${icon}
    <span>${label} <span data-aem-dropdown-count>${count}</span></span>
    <i class="ph ph-caret-down aem-filter__caret" aria-hidden="true"></i>
  </button>
  <ul class="aem-menu" role="listbox"${attr('aria-label', label)}${multiple ? ' aria-multiselectable="true"' : ''} hidden></ul>
</div>`,
  id: 'aem-filter',
  metadata: { nestable: true },
}
