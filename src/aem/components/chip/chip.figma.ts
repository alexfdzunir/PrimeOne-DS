// url=<AEM>?node-id=8420-9560
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/chip/chip.css
// component=aem-chip
import figma from 'figma'
import { flag, is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const severity = instance.getEnum('Severity', { Secondary: undefined, Primary: 'aem-chip--primary' })
const selected = is(instance, 'State', 'Selected')
const suffix = instance.getBoolean('Show Suffix-Icon') ? '\n  <i class="ph ph-x aem-chip__icon" aria-hidden="true"></i>' : ''

export default {
  example: figma.code`<button class="${cls('aem-chip', severity)}" type="button" aria-pressed="${String(selected)}"${flag('disabled', is(instance, 'Disabled'))}>
  <span>${instance.getString('Text')}</span>${suffix}
</button>`,
  id: 'aem-chip',
  metadata: { nestable: true },
}
