// url=<PRIMEONE>?node-id=7596-35989
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/button/button.ts
// component=Button
import figma from 'figma'
import { buttonTemplate } from '../../figma/templates/button'

const { example, imports } = buttonTemplate(figma.selectedInstance, 'large')

export default {
  example,
  imports,
  id: 'button-large',
  metadata: { nestable: true },
}
