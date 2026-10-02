// url=<PRIMEONE>?node-id=14343-208299
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/components/TapBar/tapbar.ts
// component=PrimeOneTapbar
import figma from 'figma'

const example = figma.code`<prime-one-tapbar [items]="items" [(active)]="section" />`
const imports = ["import { PrimeOneTapbar } from 'prime-one-ds';"]

export default {
  example,
  imports,
  id: 'tapbar',
  metadata: { nestable: true },
}
