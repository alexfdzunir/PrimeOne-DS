// url=<PRIMEONE>?node-id=12080-18079
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/InputPhone/input-phone.ts
// component=PrimeOneInputPhone
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance

const example = figma.code`<prime-one-inputphone [(ngModel)]="phone"${is(instance, 'Float Label', 'On') ? ' [floatLabel]="true"' : ''}${is(instance, 'Size', 'SM') ? ' size="small"' : ''}${is(instance, 'Invalid', 'Yes') ? ' [invalid]="true"' : ''}${is(instance, 'Disabled', 'Yes') ? ' [disabled]="true"' : ''} />`
const imports = ["import { PrimeOneInputPhone } from 'prime-one-ds';", "import { FormsModule } from '@angular/forms';"]

export default {
  example,
  imports,
  id: 'inputphone',
  metadata: { nestable: true },
}
