// url=<AEM>?node-id=7575-6116
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/tag-set/tag-set.css
// component=aem-state-tag
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', { Live: 'live', Online: 'online', Presencial: 'presencial', Finalizado: 'finalizado' })
const label = instance.getEnum('Type', { Live: 'Live', Online: 'Online', Presencial: 'Presencial', Finalizado: 'Finalizado' })

export default {
  example: figma.code`<span class="aem-state-tag aem-state-tag--${type}">${label}</span>`,
  id: 'aem-state-tag',
  metadata: { nestable: true },
}
