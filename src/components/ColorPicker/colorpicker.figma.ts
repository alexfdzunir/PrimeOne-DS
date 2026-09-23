// url=<PRIMEONE>?node-id=248-9840
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/colorpicker/colorpicker.ts
// component=ColorPicker
import figma from 'figma'
import { flag, is } from '../../figma/helpers'
import { FORMS } from '../../figma/templates/field'

const instance = figma.selectedInstance

const example = figma.code`<p-colorpicker [(ngModel)]="color"${flag('inline', is(instance, 'Type', 'Inline'))} />`
const imports = ["import { ColorPicker } from 'primeng/colorpicker';", FORMS]

export default {
  example,
  imports,
  id: 'colorpicker',
  metadata: { nestable: true },
}
