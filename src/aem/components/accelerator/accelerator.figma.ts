// url=<AEM>?node-id=9883-40327
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/accelerator/accelerator.css
// component=aem-accelerator
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { storyHtml } from '../../../figma/aem'
import meta from './accelerator.stories'

const instance = figma.selectedInstance
const background = instance.getEnum('Background', { Default: 'default', Inverse: 'inverse', Highlight: 'highlight' })

export default {
  example: figma.code`${storyHtml(meta, { background, vertical: is(instance, 'Device', 'Desktop-Sidebar') })}`,
  id: 'aem-accelerator',
  metadata: { nestable: false },
}
