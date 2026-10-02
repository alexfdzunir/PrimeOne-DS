// url=<AEM>?node-id=9873-51891
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/featured-data/featured-data.css
// component=aem-featured-data
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './featured-data.stories'

const instance = figma.selectedInstance
const args = { severity: instance.getEnum('Severity', { Primary: 'primary', Secondary: 'secondary' }), items: instance.getEnum('N-of data', { '1': 1, '2': 2, '3': 3 }) }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-featured-data',
  metadata: { nestable: false },
}
