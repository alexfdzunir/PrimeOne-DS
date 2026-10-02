// url=<AEM>?node-id=11427-4517
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/distributor/distributor.css
// component=aem-distributor
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './distributor.stories'

const instance = figma.selectedInstance
const args = { items: instance.getEnum('N-of items', { '5': 5, '4': 4, '3': 3 }) }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-distributor',
  metadata: { nestable: false },
}
