// url=<AEM>?node-id=9560-33771
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/list-block/list-block.css
// component=aem-list-block
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './list-block.stories'

const args = {}

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-list-block',
  metadata: { nestable: false },
}
