// url=<AEM>?node-id=10410-43745
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/content-block/content-block.css
// component=aem-content-block
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './content-block.stories'

const instance = figma.selectedInstance
const args = { layout: instance.getEnum('Content Layout', { Full: 'full', '40/60': '40-60', '60/40': '60-40', '50/50': '50-50', '33/33/33': '33' }) }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-content-block',
  metadata: { nestable: false },
}
