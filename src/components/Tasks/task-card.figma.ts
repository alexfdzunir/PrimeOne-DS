// url=<PRIMEONE>?node-id=19102-38374
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/Tasks/task-card.ts
// component=PrimeOneTaskCard
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance

const example = figma.code`<prime-one-task-card [task]="task"${instance.getBoolean('Show Date') ? '' : ' [showDate]="false"'}${instance.getBoolean('Show Type') ? '' : ' [showType]="false"'}${is(instance, 'Device', 'Mobile') ? ' [mobile]="true"' : ''} (open)="openTask($event)" />`
const imports = ["import { PrimeOneTaskCard } from 'prime-one-ds';"]

export default {
  example,
  imports,
  id: 'task-card',
  metadata: { nestable: true },
}
