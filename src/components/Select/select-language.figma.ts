// url=<PRIMEONE>?node-id=11857-29312
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/select/select.ts
// component=Select
import figma from 'figma'
import { selectTemplate } from '../../figma/templates/select'

const { example, imports } = selectTemplate(figma.selectedInstance, 'select-language', 'languages', 'selectedLanguage')

export default {
  example,
  imports,
  id: 'select-language',
  metadata: { nestable: true },
}
