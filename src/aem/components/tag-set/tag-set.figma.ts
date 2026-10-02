// url=<AEM>?node-id=7796-14394
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/tag-set/tag-set.css
// component=aem-tag-set
import figma from 'figma'
import { is } from '../../../figma/helpers'

const instance = figma.selectedInstance
const interactive = is(instance, 'Interactive')
const tag = (label: string) => (interactive ? `<a class="aem-category-tag" href="#">${label}</a>` : `<span class="aem-category-tag">${label}</span>`)
const state = instance.getBoolean('Show State Tag') ? '\n  <li><span class="aem-state-tag aem-state-tag--online">Online</span></li>' : ''

export default {
  example: figma.code`<ul class="aem-tag-set">${state}
  <li>${tag('Educación')}</li>
  <li>${tag('Psicología')}</li>
</ul>`,
  id: 'aem-tag-set',
  metadata: { nestable: true },
}
