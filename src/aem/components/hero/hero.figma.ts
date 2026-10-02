// url=<AEM>?node-id=10260-14851
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/hero/hero.css
// component=aem-hero
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './hero.stories'

const instance = figma.selectedInstance
const args = { type: instance.getEnum('Type', { News: 'news', Ficha: 'ficha', 'Event-Upcoming': 'event', 'Event-Ongoing': 'event', 'Event-Past': 'event', Distributor: 'distributor', General: 'distributor', Profile: 'news', 'Graduation-Active': 'event', 'Graduation-Finished': 'event' }) }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-hero',
  metadata: { nestable: false },
}
