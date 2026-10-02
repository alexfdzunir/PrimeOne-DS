// url=<AEM>?node-id=19076-25641
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/card-block/card-block.css
// component=aem-card-block
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './card-block.stories'

const instance = figma.selectedInstance
const args = { background: instance.getEnum('Background', { Primary: 'primary', Secondary: 'secondary' }) }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-card-block',
  metadata: { nestable: false },
}
