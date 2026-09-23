// url=<PRIMEONE>?node-id=203-8804
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/inputnumber/inputnumber.ts
// component=InputNumber
import figma from 'figma'
import { attr, part } from '../../figma/helpers'
import { FORMS, fieldImports, readField, stateAttrs, wrapField } from '../../figma/templates/field'

const instance = figma.selectedInstance
const input = part(instance, 'inputtext')
const f = readField(input, 'inputnumber')
const layout = instance.getEnum('Type', { Stacked: 'stacked', 'Horizontal with Step': 'horizontal', Vertical: 'vertical', Default: undefined })
const icons = layout && layout !== 'stacked' ? ' incrementButtonIcon="ph ph-plus" decrementButtonIcon="ph ph-minus"' : ''
const buttons = layout ? ` showButtons${attr('buttonLayout', layout === 'stacked' ? undefined : layout)}${icons}` : ''
const control = `<p-inputnumber inputId="${f.id}" [(ngModel)]="value"${buttons}${stateAttrs(f)} />`

const example = figma.code`${wrapField(f, control)}`
const imports = fieldImports(f, ["import { InputNumber } from 'primeng/inputnumber';", FORMS])

export default {
  example,
  imports,
  id: 'inputnumber',
  metadata: { nestable: true },
}
