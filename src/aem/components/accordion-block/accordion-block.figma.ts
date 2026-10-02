// url=<AEM>?node-id=19214-103642
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/accordion-block/accordion-block.css
// component=aem-accordion-block
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './accordion-block.stories'

const instance = figma.selectedInstance
const args = instance.getBoolean('Show Text') ? {} : { text: '' }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-accordion-block',
  metadata: { nestable: false },
}
