// url=<AEM>?node-id=10741-32866
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/navigation-header/navigation-header.css
// component=aem-navigation-header
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { storyHtml } from '../../../figma/aem'
import meta from './navigation-header.stories'

const instance = figma.selectedInstance
const args = { expanded: is(instance, 'Expanded') }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-navigation-header',
  metadata: { nestable: false },
}
