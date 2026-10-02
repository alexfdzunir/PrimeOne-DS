// url=<AEM>?node-id=9322-64892
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/accordion/accordion.css
// component=aem-accordion
import figma from 'figma'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const size = instance.getEnum('Size', { MD: undefined, SM: 'aem-accordion--sm' })
const count = Number(instance.getEnum('N-Items', { '10': '10', '9': '9', '8': '8', '7': '7', '6': '6', '5': '5', '4': '4', '3': '3', '2': '2', '1': '1' })) || 1
const items = Array.from({ length: count }, (_, i) => `  <div class="aem-accordion__item">
    <h3 class="aem-accordion__heading">
      <button class="aem-accordion__trigger" type="button" id="aem-acc-h${i}" aria-expanded="false" aria-controls="aem-acc-p${i}">
        <span class="aem-accordion__title">Pregunta ${i + 1}</span>
        <span class="aem-accordion__toggle"><i class="ph ph-plus" aria-hidden="true"></i><i class="ph ph-minus" aria-hidden="true"></i></span>
      </button>
    </h3>
    <div class="aem-accordion__panel" id="aem-acc-p${i}" role="region" aria-labelledby="aem-acc-h${i}" hidden>
      <p>Respuesta</p>
    </div>
  </div>`).join('\n')

export default {
  example: figma.code`<div class="${cls('aem-accordion', size)}" data-aem-accordion="single">
${items}
</div>`,
  id: 'aem-accordion',
  metadata: { nestable: true },
}
