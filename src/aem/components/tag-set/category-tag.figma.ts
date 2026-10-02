// url=<AEM>?node-id=5852-14093
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/tag-set/tag-set.css
// component=aem-category-tag
import figma from 'figma'
import { is } from '../../../figma/helpers'

const instance = figma.selectedInstance
const label = instance.getString('Tag')

export default {
  example: is(instance, 'Interactive')
    ? figma.code`<a class="aem-category-tag" href="#">${label}</a>`
    : figma.code`<span class="aem-category-tag">${label}</span>`,
  id: 'aem-category-tag',
  metadata: { nestable: true },
}
