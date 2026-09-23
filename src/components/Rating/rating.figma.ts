// url=<PRIMEONE>?node-id=290-11082
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/rating/rating.ts
// component=Rating
import figma from 'figma'
import { flag, is } from '../../figma/helpers'
import { FORMS } from '../../figma/templates/field'

const instance = figma.selectedInstance

const example = figma.code`<p-rating [(ngModel)]="value"${flag('disabled', is(instance, 'Disabled'))} />`
const imports = ["import { Rating } from 'primeng/rating';", FORMS]

export default {
  example,
  imports,
  id: 'rating',
  metadata: { nestable: true },
}
