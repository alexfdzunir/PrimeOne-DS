// url=<AEM>?node-id=11544-27137
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/thank-you/thank-you.css
// component=aem-thank-you
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './thank-you.stories'

const args = {}

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-thank-you',
  metadata: { nestable: false },
}
