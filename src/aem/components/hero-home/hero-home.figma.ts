// url=<AEM>?node-id=10154-11605
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/hero-home/hero-home.css
// component=aem-hero-home
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './hero-home.stories'

const args = {}

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-hero-home',
  metadata: { nestable: false },
}
