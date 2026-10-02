// url=<AEM>?node-id=7104-14363
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/sticky-button/sticky-button.css
// component=aem-sticky-button
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { storyHtml } from '../../../figma/aem'
import meta from './sticky-button.stories'

const instance = figma.selectedInstance
const args = { showOffer: is(instance, 'Show Tag') }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-sticky-button',
  metadata: { nestable: false },
}
