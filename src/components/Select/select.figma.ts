// url=<PRIMEONE>?node-id=11862-24364
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/select/select.ts
// component=Select
import figma from 'figma'
import { selectTemplate } from '../../figma/templates/select'

const { example, imports } = selectTemplate(figma.selectedInstance, 'select', 'options', 'selected')

export default {
  example,
  imports,
  id: 'select',
  metadata: { nestable: true },
}
