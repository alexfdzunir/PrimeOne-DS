// url=<PRIMEONE>?node-id=16606-22820
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/ActionButton/action-buttons.ts
// component=PrimeOneActionButtons
import figma from 'figma'

const example = figma.code`<prime-one-action-buttons [actions]="actions" (actionClick)="onAction($event)" />`
const imports = ["import { PrimeOneActionButtons } from 'prime-one-ds';"]

export default {
  example,
  imports,
  id: 'actionbutton',
  metadata: { nestable: true },
}
