// url=<PRIMEONE>?node-id=290-12331
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/slider/slider.ts
// component=Slider
import figma from 'figma'
import { attr, flag, is } from '../../figma/helpers'
import { FORMS } from '../../figma/templates/field'

const instance = figma.selectedInstance
const range = is(instance, 'Range')
const model = range ? 'rangeValues' : 'value'
const slider = `<p-slider [(ngModel)]="${model}"${flag('range', range)}${attr('orientation', is(instance, 'Direction', 'Vertical') ? 'vertical' : undefined)}${flag('disabled', is(instance, 'Disabled'))} />`
const input = is(instance, 'Input') && !range ? `<input pInputText type="number" [(ngModel)]="value" />\n` : ''

const example = figma.code`${input}${slider}`
const imports = ["import { Slider } from 'primeng/slider';", ...(input ? ["import { InputText } from 'primeng/inputtext';"] : []), FORMS]

export default {
  example,
  imports,
  id: 'slider',
  metadata: { nestable: true },
}
