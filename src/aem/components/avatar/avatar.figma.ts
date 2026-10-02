// url=<AEM>?node-id=8690-10249
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/avatar/avatar.css
// component=aem-avatar
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const small = is(instance, 'Size', 'SM')
const shadow = is(instance, 'Shadow')
const people = instance.getEnum('Num-People', { '>5': 6, '5': 5, '4': 4, '3': 3, '2': 2, '1': 1 }) as number
const avatar = (content: string) => `<span class="${cls('aem-avatar', 'aem-avatar--initials', small && 'aem-avatar--sm', shadow && 'aem-avatar--shadow')}" role="img" aria-label="Nombre Apellido">${content}</span>`
const visible = Math.min(people, 5)
const items = Array.from({ length: visible }, () => `  <li>${avatar('AG')}</li>`)
if (people > 5) items.push(`  <li><span class="${cls('aem-avatar', small && 'aem-avatar--sm')}" role="img" aria-label="Más personas">+3</span></li>`)

export default {
  example: people === 1 ? figma.code`${avatar('AG')}` : figma.code`<ul class="${cls('aem-avatar-group', small && 'aem-avatar-group--sm')}">
${items.join('\n')}
</ul>`,
  id: 'aem-avatar',
  metadata: { nestable: true },
}
