// url=<AEM>?node-id=10812-26472
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/featured-text/featured-text.css
// component=aem-featured-text
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './featured-text.stories'

const instance = figma.selectedInstance
const args = { title: instance.getString('Title Content'), text: instance.getString('Body Content'), showLogo: instance.getBoolean('Show Logo') }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-featured-text',
  metadata: { nestable: false },
}
