// url=<AEM>?node-id=9016-19780
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/breadcrumb/breadcrumb.css
// component=aem-breadcrumb
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const size = instance.getEnum('Size', { MD: undefined, SM: 'aem-breadcrumb--sm' })

export default {
  example: figma.code`<nav class="${cls('aem-breadcrumb', size, is(instance, 'Inverse') && 'aem-breadcrumb--inverse')}" aria-label="Migas de pan">
  <ol class="aem-breadcrumb__list">
    <li class="aem-breadcrumb__item"><a class="aem-breadcrumb__link" href="#">Inicio</a></li>
    <li class="aem-breadcrumb__item"><a class="aem-breadcrumb__link" href="#">Grados</a></li>
    <li class="aem-breadcrumb__item"><span aria-current="page">Grado en Psicología</span></li>
  </ol>
</nav>`,
  id: 'aem-breadcrumb',
  metadata: { nestable: true },
}
