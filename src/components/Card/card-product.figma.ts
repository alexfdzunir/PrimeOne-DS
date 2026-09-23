// url=<PRIMEONE>?node-id=13484-22317
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/card/card.ts
// component=Card
import figma from 'figma'
import { cardTemplate } from '../../figma/templates/card'

const { example, imports } = cardTemplate(figma.selectedInstance, { image: true })

export default {
  example,
  imports,
  id: 'card-product',
  metadata: { nestable: true },
}
