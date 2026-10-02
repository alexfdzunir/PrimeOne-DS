// url=<AEM>?node-id=20146-10102
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/form/form.css
// component=aem-form
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './form.stories'

const args = {}

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-form',
  metadata: { nestable: false },
}
