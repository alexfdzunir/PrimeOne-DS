// url=<AEM>?node-id=10032-114764
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/anchor-menu/anchor-menu.css
// component=aem-anchor-menu
import figma from 'figma'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', { Section: undefined, Floating: 'aem-anchor-menu--floating' })

export default {
  example: figma.code`<nav class="${cls('aem-anchor-menu', type)}" aria-label="En esta página">
  <ul class="aem-anchor-menu__list">
    <li><a class="aem-anchor-menu__link" href="#seccion-1" aria-current="true">Presentación</a></li>
    <li><a class="aem-anchor-menu__link" href="#seccion-2">Plan de estudios</a></li>
    <li><a class="aem-anchor-menu__link" href="#seccion-3">Profesorado</a></li>
  </ul>
</nav>`,
  id: 'aem-anchor-menu',
  metadata: { nestable: false },
}
