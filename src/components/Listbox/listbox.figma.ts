// url=<PRIMEONE>?node-id=6212-6733
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/listbox/listbox.ts
// component=Listbox
import figma from 'figma'
import { flag, is, part, prop } from '../../figma/helpers'
import { FORMS } from '../../figma/templates/field'

const instance = figma.selectedInstance
const checkbox = prop(part(instance, 'listbox-option'), 'Check') === true

const example = figma.code`<p-listbox [options]="options" optionLabel="name" [(ngModel)]="selected"${flag('multiple', checkbox)}${flag('checkbox', checkbox)}${flag('filter', instance.getBoolean('Show Filter'))}${flag('invalid', is(instance, 'State', 'Invalid'))}${flag('disabled', is(instance, 'State', 'Disabled'))} />`
const imports = ["import { Listbox } from 'primeng/listbox';", FORMS]

export default {
  example,
  imports,
  id: 'listbox',
  metadata: { nestable: true },
}
