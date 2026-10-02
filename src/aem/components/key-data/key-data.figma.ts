// url=<AEM>?node-id=22281-32793
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/key-data/key-data.css
// component=aem-key-data
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './key-data.stories'

const instance = figma.selectedInstance
const args = { items: instance.getEnum('N. de datos', { '6': 6, '5': 5, '4': 4, '3': 3, '2': 2 }) }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-key-data',
  metadata: { nestable: false },
}
