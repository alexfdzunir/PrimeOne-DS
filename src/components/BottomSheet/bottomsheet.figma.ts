// url=<PRIMEONE>?node-id=15372-229767
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/BottomSheet/bottom-sheet.ts
// component=PrimeOneBottomSheet
import figma from 'figma'
import { firstText, slotCode } from '../../figma/helpers'

const instance = figma.selectedInstance
const title = instance.getBoolean('Show Title') ? firstText(instance) ?? 'Bottom Sheet title' : ''
const slot = slotCode(instance, 'Slot')
const attrs = [
  title ? ` heading="${title}"` : '',
  instance.getBoolean('Show Handle') ? '' : ' [showHandle]="false"',
  instance.getBoolean('Show Icons') ? ' [actions]="actions"' : '',
  instance.getBoolean('Show Search') ? ' [showSearch]="true"' : '',
  instance.getBoolean('Show Buttons') ? ' primaryLabel="Button" secondaryLabel="Button"' : '',
].join('')

const example = figma.code`<prime-one-bottomsheet [(visible)]="visible"${attrs}>${slot ? figma.code`\n  ${slot}\n` : ''}</prime-one-bottomsheet>`
const imports = ["import { PrimeOneBottomSheet } from 'prime-one-ds';"]

export default {
  example,
  imports,
  id: 'bottomsheet',
  metadata: { nestable: true },
}
