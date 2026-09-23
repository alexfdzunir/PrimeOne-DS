// url=<PRIMEONE>?node-id=10-125
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/button/button.ts
// component=Button
import figma from 'figma'
import { buttonTemplate } from '../../figma/templates/button'

const { example, imports } = buttonTemplate(figma.selectedInstance)

export default {
  example,
  imports,
  id: 'button',
  metadata: { nestable: true },
}
