// url=<AEM>?node-id=21034-28885
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/comparison-block/comparison-block.css
// component=aem-comparison-block
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './comparison-block.stories'

const args = {}

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-comparison-block',
  metadata: { nestable: false },
}
