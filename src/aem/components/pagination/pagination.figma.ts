// url=<AEM>?node-id=9111-3815
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/pagination/pagination.css
// component=aem-pagination
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance

export default {
  example: figma.code`<nav class="${cls('aem-pagination', is(instance, 'Bottom Border') && 'aem-pagination--bar')}" aria-label="Paginación" data-pages="10" data-page="1">
  <ul class="aem-pagination__list">
    <li><button class="aem-button aem-button--ghost aem-button--sm aem-button--icon-only" type="button" aria-label="Página anterior" data-aem-page="prev"><i class="ph ph-caret-left aem-button__icon" aria-hidden="true"></i></button></li>
    <li><button class="aem-button aem-button--ghost aem-button--sm aem-button--icon-only" type="button" aria-label="Página siguiente" data-aem-page="next"><i class="ph ph-caret-right aem-button__icon" aria-hidden="true"></i></button></li>
  </ul>
</nav>`,
  id: 'aem-pagination',
  metadata: { nestable: true },
}
