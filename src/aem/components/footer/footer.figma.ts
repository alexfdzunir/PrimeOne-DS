// url=<AEM>?node-id=9888-3741
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/footer/footer.css
// component=aem-footer
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './footer.stories'

const instance = figma.selectedInstance
const args = { showContact: instance.getBoolean('Show Contact') }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-footer',
  metadata: { nestable: false },
}
