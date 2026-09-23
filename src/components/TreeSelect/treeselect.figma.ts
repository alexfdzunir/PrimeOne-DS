// url=<PRIMEONE>?node-id=6653-17198
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/treeselect/treeselect.ts
// component=TreeSelect
import figma from 'figma'
import { attr, flag, is, part } from '../../figma/helpers'
import { FORMS, fieldImports, readField, stateAttrs, textProp, wrapField } from '../../figma/templates/field'

const instance = figma.selectedInstance
const input = part(instance, '_treeselect-input')
const f = readField(input, 'treeselect')
if (is(instance, 'Float Label') && !f.float) f.float = 'default'
const content = input ? part(input, '_treeselect-input-content') : undefined
const chip = is(content, 'Text Config', 'Chip')
const placeholder = f.float || f.ifta ? undefined : textProp(content, 'Placeholder')
const control = `<p-treeselect inputId="${f.id}" [(ngModel)]="selectedNodes" [options]="nodes"${attr('selectionMode', chip ? 'multiple' : undefined)}${attr('display', chip ? 'chip' : undefined)}${attr('placeholder', placeholder)}${flag('showClear', f.showClear)}${stateAttrs(f)} />`

const example = figma.code`${wrapField(f, control)}`
const imports = fieldImports(f, ["import { TreeSelect } from 'primeng/treeselect';", FORMS])

export default {
  example,
  imports,
  id: 'treeselect',
  metadata: { nestable: true },
}
