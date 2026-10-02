// url=<AEM>?node-id=11567-9273
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/filter-module/filter-module.css
// component=aem-filter-module
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { storyHtml } from '../../../figma/aem'
import meta from './filter-module.stories'

const instance = figma.selectedInstance
const args = { selected: is(instance, 'Filtered') ? 3 : 0 }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-filter-module',
  metadata: { nestable: false },
}
