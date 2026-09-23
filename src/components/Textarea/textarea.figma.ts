// url=<PRIMEONE>?node-id=6209-7402
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/textarea/textarea.ts
// component=Textarea
import figma from 'figma'
import { attr, part } from '../../figma/helpers'
import { FORMS, describedBy, fieldImports, readField, stateAttrs, textProp, wrapField } from '../../figma/templates/field'

const instance = figma.selectedInstance
const f = readField(instance, 'textarea')
const placeholder = f.float || f.ifta ? undefined : textProp(part(instance, 'textarea-content'), 'Placeholder')
const control = `<textarea pTextarea id="${f.id}" rows="5" [(ngModel)]="value"${attr('placeholder', placeholder)}${stateAttrs(f, 'pSize')}${describedBy(f)}></textarea>`

const example = figma.code`${wrapField(f, control)}`
const imports = fieldImports(f, ["import { Textarea } from 'primeng/textarea';", FORMS])

export default {
  example,
  imports,
  id: 'textarea',
  metadata: { nestable: true },
}
