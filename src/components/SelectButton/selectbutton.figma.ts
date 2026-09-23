// url=<PRIMEONE>?node-id=191-6703
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/selectbutton/selectbutton.ts
// component=SelectButton
import figma from 'figma'
import { flag, is } from '../../figma/helpers'
import { FORMS } from '../../figma/templates/field'

const instance = figma.selectedInstance

const example = figma.code`<p-selectbutton [options]="options" [(ngModel)]="value" optionLabel="label" optionValue="value"${flag('multiple', is(instance, 'Multiple'))}${flag('invalid', is(instance, 'Invalid'))} />`
const imports = ["import { SelectButton } from 'primeng/selectbutton';", FORMS]

export default {
  example,
  imports,
  id: 'selectbutton',
  metadata: { nestable: true },
}
