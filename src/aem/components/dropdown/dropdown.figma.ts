// url=<AEM>?node-id=6913-26550
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/dropdown/dropdown.css
// component=aem-dropdown
import figma from 'figma'
import { attr, flag, is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const invalid = is(instance, 'State', 'Error')
const disabled = is(instance, 'Disabled')
const selected = is(instance, 'State', 'Selected')
const label = instance.getString('Label Text')
const host = cls('aem-field-host', 'aem-dropdown', invalid && 'aem-field-host--invalid', disabled && 'aem-field-host--disabled')
const supporting = instance.getBoolean('Show Supporting Text') || invalid ? `\n  <p class="aem-field__supporting">${instance.getString('Supporting Text')}</p>` : ''

export default {
  example: figma.code`<div class="${host}" data-aem-dropdown>
  <button class="${cls('aem-field', 'aem-dropdown__trigger', selected && 'has-value')}" type="button" aria-haspopup="listbox" aria-expanded="${String(is(instance, 'State', 'Expanded'))}"${flag('disabled', disabled)}>
    <span class="aem-field__control">
      <span class="aem-dropdown__value" data-aem-dropdown-value>${selected ? instance.getString('Item Text') : ''}</span>
      <span class="aem-field__label">${label}</span>
    </span>
    <i class="ph ph-caret-down aem-dropdown__caret" aria-hidden="true"></i>
  </button>
  <ul class="aem-menu" role="listbox"${attr('aria-label', label)} hidden>
    <li class="aem-menu__item" role="option" aria-selected="${String(selected)}">${instance.getString('Item Text')}</li>
  </ul>${supporting}
</div>`,
  id: 'aem-dropdown',
  metadata: { nestable: true },
}
