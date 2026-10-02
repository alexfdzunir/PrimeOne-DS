// url=<AEM>?node-id=19076-27437
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/section-module/section-module.css
// component=aem-section-module
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { storyHtml } from '../../../figma/aem'
import meta from './section-module.stories'

const instance = figma.selectedInstance
const args = { background: instance.getEnum('Background Fill', { Primary: 'primary', Secondary: 'secondary', Accent: 'accent' }), paddingTop: is(instance, 'Padding Top') }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-section-module',
  metadata: { nestable: false },
}
