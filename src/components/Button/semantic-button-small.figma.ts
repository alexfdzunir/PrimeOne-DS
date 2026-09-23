// url=<PRIMEONE>?node-id=12837-144193
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/button/button.ts
// component=Button
import figma from 'figma'
import { buttonTemplate } from '../../figma/templates/button'

const { example, imports } = buttonTemplate(figma.selectedInstance, 'small')

export default {
  example,
  imports,
  id: 'semantic-button-small',
  metadata: { nestable: true },
}
