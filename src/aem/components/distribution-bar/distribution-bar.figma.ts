// url=<AEM>?node-id=9993-48196
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/distribution-bar/distribution-bar.css
// component=aem-distribution-bar
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './distribution-bar.stories'

const args = {}

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-distribution-bar',
  metadata: { nestable: false },
}
