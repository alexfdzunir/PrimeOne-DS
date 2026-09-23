// url=<PRIMEONE>?node-id=18401-23008
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/Card/card.ts
// component=PrimeOneCard
import figma from 'figma'
import { cardTemplate } from '../../figma/templates/card'

const { example, imports } = cardTemplate(figma.selectedInstance, 'horizontal-full')

export default {
  example,
  imports,
  id: 'card-horizontal-full',
  metadata: { nestable: true },
}
