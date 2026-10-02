// url=<AEM>?node-id=9701-29996
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/testimonial/testimonial.css
// component=aem-testimonial
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './testimonial.stories'

const args = {}

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-testimonial',
  metadata: { nestable: false },
}
