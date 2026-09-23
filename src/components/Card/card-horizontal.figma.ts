// url=<PRIMEONE>?node-id=13545-101359
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/card/card.ts
// component=Card
import figma from 'figma'
import { cardTemplate } from '../../figma/templates/card'

const { example, imports } = cardTemplate(figma.selectedInstance, { image: true })

export default {
  example,
  imports,
  id: 'card-horizontal',
  metadata: { nestable: true },
}
