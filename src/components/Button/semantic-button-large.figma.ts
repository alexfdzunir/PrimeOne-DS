// url=<PRIMEONE>?node-id=12837-139983
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/button/button.ts
// component=Button
import figma from 'figma'
import { buttonTemplate } from '../../figma/templates/button'

const { example, imports } = buttonTemplate(figma.selectedInstance, 'large')

export default {
  example,
  imports,
  id: 'semantic-button-large',
  metadata: { nestable: true },
}
