// url=<PRIMEONE>?node-id=13484-21907
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/card/card.ts
// component=Card
import figma from 'figma'
import { cardTemplate } from '../../figma/templates/card'

const { example, imports } = cardTemplate(figma.selectedInstance, {})

export default {
  example,
  imports,
  id: 'card-content',
  metadata: { nestable: true },
}
