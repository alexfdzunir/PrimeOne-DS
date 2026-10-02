// url=<AEM>?node-id=20074-7575
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/modal/modal.css
// component=aem-modal
import figma from 'figma'
import { storyHtml } from '../../../figma/aem'
import meta from './modal.stories'

// The real pattern: the trigger and the native <dialog> that modal.js opens
const args = { inline: false }

export default {
  example: figma.code`${storyHtml(meta, args)}`,
  id: 'aem-modal',
  metadata: { nestable: false },
}
