// url=<PRIMEONE>?node-id=12264-9078
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/InputRGPD/input-rgpd.ts
// component=PrimeOneInputRgpd
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance
const onlyChecks = is(instance, 'Only Checks', 'On')
const legal = onlyChecks || is(instance, '2 Checks', 'On')
const marketing = legal || is(instance, '1 Check', 'On')

const example = figma.code`<prime-one-inputrgpd [(ngModel)]="consent"${onlyChecks ? ' [showText]="false"' : ''}${legal ? ' [legalCheck]="true"' : ''}${marketing ? ' [marketingCheck]="true"' : ''} />`
const imports = ["import { PrimeOneInputRgpd } from 'prime-one-ds';", "import { FormsModule } from '@angular/forms';"]

export default {
  example,
  imports,
  id: 'inputrgpd',
  metadata: { nestable: true },
}
