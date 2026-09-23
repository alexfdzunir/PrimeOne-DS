// url=<PRIMEONE>?node-id=263-10540
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/inputgroup/inputgroup.ts
// component=InputGroup
import figma from 'figma'
import { attr, is, part } from '../../figma/helpers'
import { FORMS, describedBy, fieldImports, readField, stateAttrs, textProp, wrapField } from '../../figma/templates/field'

const instance = figma.selectedInstance
const f = readField(part(instance, 'inputtext'), 'inputgroup')
const placeholder = textProp(part(instance, 'inputtext') ? part(part(instance, 'inputtext')!, 'inputtext-content') : undefined, 'Placeholder')
const addons = instance.findLayers((node) => node.name === '_inputgroup-addon')
const leftCount = (is(instance, 'Left') ? 1 : 0) + (is(instance, 'Second Left') ? 1 : 0)
const addon = (node: (typeof addons)[number]) =>
  `  <p-inputgroup-addon>${node.type === 'INSTANCE' ? node.getString('Text') : ''}</p-inputgroup-addon>\n`
const before = addons.slice(0, leftCount).map(addon).join('')
const after = addons.slice(leftCount).map(addon).join('')
const input = `  <input pInputText id="${f.id}" [(ngModel)]="value"${attr('placeholder', placeholder)}${stateAttrs(f, 'pSize')}${describedBy(f)} />\n`

const example = figma.code`${wrapField(f, `<p-inputgroup>\n${before}${input}${after}</p-inputgroup>`)}`
const imports = fieldImports(f, ["import { InputGroup } from 'primeng/inputgroup';", "import { InputGroupAddon } from 'primeng/inputgroupaddon';", "import { InputText } from 'primeng/inputtext';", FORMS])

export default {
  example,
  imports,
  id: 'inputgroup',
  metadata: { nestable: true },
}
