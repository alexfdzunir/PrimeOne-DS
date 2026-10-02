// url=<AEM>?node-id=7671-6862
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/progress-spinner/progress-spinner.css
// component=aem-spinner
import figma from 'figma'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const size = instance.getEnum('Size', { LG: undefined, SM: 'aem-spinner--sm' })

export default {
  example: figma.code`<span class="${cls('aem-spinner', size)}" role="status" aria-label="Cargando"></span>`,
  id: 'aem-progress-spinner',
  metadata: { nestable: true },
}
