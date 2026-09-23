// url=<PRIMEONE>?node-id=13484-22124
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/card/card.ts
// component=Card
import figma from 'figma'
import { cardTemplate } from '../../figma/templates/card'

const { example, imports } = cardTemplate(figma.selectedInstance, { expandable: true })

export default {
  example,
  imports,
  id: 'card-expandable',
  metadata: { nestable: true },
}
