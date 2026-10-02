// url=<AEM>?node-id=10067-38257
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/banner/banner.css
// component=aem-banner
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './banner.stories'

const instance = figma.selectedInstance
const args = { type: instance.getEnum('Type', { Brand: 'brand', Image: 'image', Content: 'content', Contact: 'contact' }) }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-banner',
  metadata: { nestable: false },
}
