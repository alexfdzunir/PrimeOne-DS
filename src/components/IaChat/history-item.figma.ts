// url=<PRIMEONE>?node-id=18630-263959
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/IaChat/history-item.ts
// component=PrimeOneHistoryItem
import figma from 'figma'
import { is, jsText } from '../../figma/helpers'

const instance = figma.selectedInstance

const example = figma.code`<prime-one-history-item label="${jsText(instance.getString('Label'))}" time="${instance.getString('Time')}"${is(instance, 'State', 'Active') ? ' [active]="true"' : ''} (select)="openConversation()" />`
const imports = ["import { PrimeOneHistoryItem } from 'prime-one-ds';"]

export default {
  example,
  imports,
  id: 'history-item',
  metadata: { nestable: true },
}
