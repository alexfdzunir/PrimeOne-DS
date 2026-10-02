// url=<AEM>?node-id=11559-9409
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/search/search.css
// component=aem-search
import figma from 'figma'
import { flag, is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const disabled = is(instance, 'Disabled')
const host = cls('aem-field-host', 'aem-search', !is(instance, 'Full Width') && 'aem-search--compact', disabled && 'aem-field-host--disabled')

export default {
  example: figma.code`<div class="${host}" role="search">
  <label class="aem-field">
    <i class="ph ph-magnifying-glass aem-search__icon" aria-hidden="true"></i>
    <input class="aem-search__input" type="search" placeholder="Buscar titulación" aria-label="Buscar titulación" autocomplete="off"${flag('disabled', disabled)} />
    <button class="aem-search__clear" type="button" aria-label="Borrar búsqueda"><i class="ph ph-x" aria-hidden="true"></i></button>
  </label>
  <ul class="aem-menu" role="listbox" hidden></ul>
</div>`,
  id: 'aem-search',
  metadata: { nestable: true },
}
