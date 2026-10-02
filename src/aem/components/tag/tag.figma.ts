// url=<AEM>?node-id=7573-6728
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/tag/tag.css
// component=aem-tag
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { aemSwapIcon, cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const severity = instance.getEnum('Severity', { Primary: undefined, Highlight: 'aem-tag--highlight', Subtle: 'aem-tag--subtle' })
const classes = cls('aem-tag', severity, is(instance, 'Fill', 'False') && 'aem-tag--plain')
const icon = instance.getBoolean('Show Icon') ? `\n  ${aemSwapIcon(instance, 'Select Icon', 'aem-tag__icon')}` : ''

export default {
  example: figma.code`<span class="${classes}">${icon}
  <span class="aem-tag__text">${instance.getString('Label Text')}</span>
</span>`,
  id: 'aem-tag',
  metadata: { nestable: true },
}
