// url=<PRIMEONE>?node-id=13484-22124
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/components/Card/card.ts
// component=PrimeOneCard
import figma from 'figma'
import { cardTemplate } from '../../figma/templates/card'

const { example, imports } = cardTemplate(figma.selectedInstance, 'expandable')

export default {
  example,
  imports,
  id: 'card-expandable',
  metadata: { nestable: true },
}
