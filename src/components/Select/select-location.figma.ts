// url=<PRIMEONE>?node-id=12160-25067
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/select/select.ts
// component=Select
import figma from 'figma'
import { selectTemplate } from '../../figma/templates/select'

const { example, imports } = selectTemplate(figma.selectedInstance, 'select-location', 'locations', 'selectedLocation')

export default {
  example,
  imports,
  id: 'select-location',
  metadata: { nestable: true },
}
