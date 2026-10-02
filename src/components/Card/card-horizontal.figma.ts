// url=<PRIMEONE>?node-id=13545-101359
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/components/Card/card.ts
// component=PrimeOneCard
import figma from 'figma'
import { cardTemplate } from '../../figma/templates/card'

const { example, imports } = cardTemplate(figma.selectedInstance, 'horizontal')

export default {
  example,
  imports,
  id: 'card-horizontal',
  metadata: { nestable: true },
}
