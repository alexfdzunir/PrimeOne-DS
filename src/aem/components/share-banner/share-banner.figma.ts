// url=<AEM>?node-id=16517-16736
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/share-banner/share-banner.css
// component=aem-share-banner
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './share-banner.stories'

const args = {}

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-share-banner',
  metadata: { nestable: false },
}
