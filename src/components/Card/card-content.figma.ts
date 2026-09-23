// url=<PRIMEONE>?node-id=13484-21907
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/Card/card.ts
// component=PrimeOneCard
import figma from 'figma'
import { cardTemplate } from '../../figma/templates/card'

const { example, imports } = cardTemplate(figma.selectedInstance, 'default')

export default {
  example,
  imports,
  id: 'card-content',
  metadata: { nestable: true },
}
