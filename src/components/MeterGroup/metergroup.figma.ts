// url=<PRIMEONE>?node-id=6962-59067
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/metergroup/metergroup.ts
// component=MeterGroup
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance
const attrs = `${is(instance, 'Label Position', 'Start') ? ' labelPosition="start"' : ''}${is(instance, 'Label Orientation', 'Vertical') ? ' labelOrientation="vertical"' : ''}${is(instance, 'Orientation', 'Vertical') ? ' orientation="vertical"' : ''}`

const example = figma.code`<p-metergroup [value]="meters"${attrs} />`
const imports = ["import { MeterGroup } from 'primeng/metergroup';", "import { MeterItem } from 'primeng/types/metergroup';"]

export default {
  example,
  imports,
  id: 'metergroup',
  metadata: { nestable: true },
}
